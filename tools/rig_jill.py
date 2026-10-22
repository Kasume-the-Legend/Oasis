"""Gives characters the same skeleton as a donor VRM (Washu.vrm is the current one; Jill_Valentine.vrm also works) (VRM humanoid names, shoulders, all finger bones, face and gear bones).
Usage: python3 tools/rig_jill.py donor.vrm out_dir name=src.glb[:tpose_from.vrm] ...
 - every source mesh (static or rigged: its own skin is thrown away) is fitted to Jill's height and gets skin weights copied from the nearest vertices of Jill's mesh
 - an A-pose source (arms angled down) can be given a pose donor after a colon: its arms are first re-posed to a T-pose (linear blend skinning with that VRM's weights),
   because weights copied by position only work when the two bodies are in the same pose"""
import sys, os, json
import numpy as np
from scipy.spatial import cKDTree
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_vrm import load, save, accessor, compact, shrink_images, lit_material, node_world, add_vrm


def prims_of(j):
    for m in j['meshes']:
        for p in m['primitives']: yield p


def donor_arrays(dj, db):
    P, J, W = [], [], []
    for p in prims_of(dj):
        if 'JOINTS_0' not in p['attributes']: continue
        a, _ = accessor(dj, db, p['attributes']['POSITION']); jj, _ = accessor(dj, db, p['attributes']['JOINTS_0']); w, _ = accessor(dj, db, p['attributes']['WEIGHTS_0'])
        ct = dj['accessors'][p['attributes']['WEIGHTS_0']]['componentType']
        if ct != 5126: w = w.astype(np.float32) / (65535 if ct == 5123 else 255)
        P.append(a); J.append(jj.astype(int)); W.append(w)
    return np.concatenate(P), np.concatenate(J), np.concatenate(W)


def rot_between(a, b):
    a = a / np.linalg.norm(a); b = b / np.linalg.norm(b); v = np.cross(a, b); c = float(a @ b)
    if c < -0.9999: return np.diag([-1.0, -1.0, 1.0])
    k = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]]); return np.eye(3) + k + k @ k / (1 + c)


def bake_tpose(src, pose_vrm, dst):
    """re-pose an A-pose static mesh into a T-pose: rig it from pose_vrm (an A-pose rigged VRM of similar build), swing the arms out, write the posed mesh as a plain GLB"""
    from make_vrm import rig_static
    tmp = dst + '.tmp.vrm'; dj0, db0 = load(pose_vrm); rig_static(src, tmp, 'tmp', dj0, db0, vrm=False, size=512)
    j, b = load(tmp); prim = j['meshes'][0]['primitives'][0]
    Q, _ = accessor(j, b, prim['attributes']['POSITION']); N, _ = accessor(j, b, prim['attributes']['NORMAL']); JJ, _ = accessor(j, b, prim['attributes']['JOINTS_0']); WW, _ = accessor(j, b, prim['attributes']['WEIGHTS_0'])
    sk = j['skins'][0]['joints']; Wm, _ = node_world(j); names = [j['nodes'][i].get('name', '').replace('mixamorig:', '') for i in sk]; pos = {n: Wm[sk[i]][:3, 3] for i, n in enumerate(names)}
    Qn = Q.astype(np.float64).copy(); Nn = N.astype(np.float64).copy(); Qo = Q.astype(np.float64); No = N.astype(np.float64); nj = len(sk)
    dense = np.zeros((len(Q), nj)); [np.add.at(dense, (np.arange(len(Q)), JJ[:, k].astype(int)), WW[:, k]) for k in range(4)]
    out_p = Qo * 0; out_n = No * 0; ident = np.ones(len(Q))
    group = {}   # joint index -> ('u'|'l', side)
    Tu = {}; Tl = {}
    for side, sx in (('Left', 1.0), ('Right', -1.0)):
        S, E, H = pos[side + 'Arm'], pos[side + 'ForeArm'], pos[side + 'Hand']; t = np.array([sx, 0, 0])
        Ru = rot_between(E - S, t); E2 = S + Ru @ (E - S); Rl = rot_between(Ru @ (H - E), t)
        Tu[side] = (S, Ru); Tl[side] = (E, E2, Rl @ Ru, Ru, Rl)
        for i, n in enumerate(names):
            if n == side + 'Arm': group[i] = ('u', side)
            elif n in (side + 'ForeArm', side + 'Hand') or n.startswith(side + 'Hand'): group[i] = ('l', side)
    acc_p = np.zeros_like(Qo); acc_n = np.zeros_like(No); rest = np.ones(len(Q))
    for i, (g, side) in group.items():
        w = dense[:, i]
        if g == 'u': S, Ru = Tu[side]; vp = S + (Qo - S) @ Ru.T; vn = No @ Ru.T
        else: E, E2, Rt, Ru, Rl = Tl[side]; vp = E2 + (Qo - E) @ Rt.T; vn = No @ Rt.T
        acc_p += w[:, None] * vp; acc_n += w[:, None] * vn; rest -= w
    newp = acc_p + rest[:, None] * Qo; newn = acc_n + rest[:, None] * No; newn /= np.maximum(np.linalg.norm(newn, axis=1, keepdims=True), 1e-9)
    # write a static glb: the original source file with the posed positions / normals swapped in
    sj, sb = load(src); sp = sj['meshes'][0]['primitives'][0]
    # the rigged temp was fitted (scaled/centred); fit the source the same way by writing its own fitted copy: reuse the temp file's mesh, drop the skin
    for key in ('JOINTS_0', 'WEIGHTS_0'): j['meshes'][0]['primitives'][0]['attributes'].pop(key, None)
    for data, comp, typ, key in ((newp.astype('<f4').tobytes(), 5126, 'VEC3', 'POSITION'), (newn.astype('<f4').tobytes(), 5126, 'VEC3', 'NORMAL')):
        while len(b) % 4: b.append(0)
        j['bufferViews'].append({'buffer': 0, 'byteOffset': len(b), 'byteLength': len(data)}); b += data
        a = {'bufferView': len(j['bufferViews']) - 1, 'componentType': comp, 'count': len(Q), 'type': typ}
        if key == 'POSITION': a['min'] = newp.min(0).tolist(); a['max'] = newp.max(0).tolist()
        j['accessors'].append(a); prim['attributes'][key] = len(j['accessors']) - 1
    j.pop('skins', None); j.pop('animations', None); j.pop('extensions', None); j['extensionsUsed'] = [e for e in j.get('extensionsUsed', []) if e != 'VRMC_vrm']
    nodes = [{'name': 'mesh', 'mesh': 0}]; j['nodes'] = nodes; j['scenes'] = [{'nodes': [0]}]; j['scene'] = 0
    nb = compact(j, b); save(dst, j, nb); os.remove(tmp)
    print('  baked T-pose arms', dst)


def rig_vrm(src, dst, name, donor_vrm, size=1024):
    j, b = load(src); dj, db = load(donor_vrm)
    W0, _ = node_world(dj)
    prim = j['meshes'][0]['primitives'][0]; P, _ = accessor(j, b, prim['attributes']['POSITION'])
    DP, DJ, DW = donor_arrays(dj, db)
    h = DP[:, 1].max() - DP[:, 1].min(); s = h / (P[:, 1].max() - P[:, 1].min())
    cx = (DP[:, 0].max() + DP[:, 0].min()) / 2; cz = (DP[:, 2].max() + DP[:, 2].min()) / 2
    Q = (P - np.array([(P[:, 0].max() + P[:, 0].min()) / 2, P[:, 1].min(), (P[:, 2].max() + P[:, 2].min()) / 2])) * s + np.array([cx, DP[:, 1].min(), cz])
    print(' ', name, 'height', round(float(h), 3), 'arm span', round(float(np.ptp(Q[:, 0])), 3), 'donor', round(float(np.ptp(DP[:, 0])), 3))
    # the donor is stretched (arms) to this character's arm span, mesh and skeleton together, so elbows and wrists sit where this character's own do
    sx0 = abs(float(W0[dj['extensions']['VRMC_vrm']['humanoid']['humanBones']['leftUpperArm']['node']][0, 3])); dmax = float(np.abs(DP[:, 0]).max()); cmax = float(np.abs(Q[:, 0]).max())
    ra = float(np.clip((cmax - sx0) / (dmax - sx0), 0.7, 1.6)) if dmax > sx0 else 1.0
    def wp(P):
        P = np.array(P, dtype=np.float64, copy=True); ax = np.abs(P[..., 0]); m = ax > sx0; P[..., 0] = np.where(m, np.sign(P[..., 0]) * (sx0 + (ax - sx0) * ra), P[..., 0]); return P
    print('  arm stretch', round(ra, 3)); DP = wp(DP).astype(np.float32)
    nj = len(dj['skins'][0]['joints']); dense = np.zeros((len(DP), nj), np.float32)
    for k in range(4): np.add.at(dense, (np.arange(len(DP)), DJ[:, k]), DW[:, k])
    # secondary joints (hair, bust, skirt, gear...) are not body bones: their weight goes to the nearest humanoid ancestor so limbs keep moving as limbs
    sk0 = dj['skins'][0]['joints']; par = {}
    for i, n in enumerate(dj['nodes']):
        for c in n.get('children', []): par[c] = i
    hum = {v['node'] for v in dj['extensions']['VRMC_vrm']['humanoid']['humanBones'].values()}; pos_in = {n: i for i, n in enumerate(sk0)}; hips_i = pos_in.get(dj['extensions']['VRMC_vrm']['humanoid']['humanBones']['hips']['node'], 0)
    def anc(n):
        while n is not None and n not in hum: n = par.get(n)
        return pos_in.get(n, hips_i) if n is not None else hips_i
    cm = np.array([anc(n) for n in sk0]); d2 = np.zeros_like(dense)
    for jj in range(nj): d2[:, cm[jj]] += dense[:, jj]
    dense = d2
    d, idx = cKDTree(DP).query(Q, k=8); wgt = 1.0 / (d + 1e-3) ** 2; wgt /= wgt.sum(1, keepdims=True)
    out = np.einsum('vk,vkj->vj', wgt, dense[idx]); top = np.argsort(-out, 1)[:, :4]; w4 = np.take_along_axis(out, top, 1); w4 /= np.maximum(w4.sum(1, keepdims=True), 1e-6)
    # a source that carries its own normals / uvs keeps them; swap positions, add Jill's joints and weights
    prim['attributes'].pop('JOINTS_0', None); prim['attributes'].pop('WEIGHTS_0', None); prim.pop('targets', None)
    for data, comp, typ, key in ((Q.astype('<f4').tobytes(), 5126, 'VEC3', 'POSITION'), (top.astype('<u2').tobytes(), 5123, 'VEC4', 'JOINTS_0'), (w4.astype('<f4').tobytes(), 5126, 'VEC4', 'WEIGHTS_0')):
        while len(b) % 4: b.append(0)
        j['bufferViews'].append({'buffer': 0, 'byteOffset': len(b), 'byteLength': len(data)}); b += data
        a = {'bufferView': len(j['bufferViews']) - 1, 'componentType': comp, 'count': len(Q), 'type': typ}
        if key == 'POSITION': a['min'] = Q.min(0).tolist(); a['max'] = Q.max(0).tolist()
        j['accessors'].append(a); prim['attributes'][key] = len(j['accessors']) - 1
    # Jill's skeleton: her node tree, her skin and inverse bind matrices; her 24 mesh nodes are replaced by one node carrying this character's mesh
    nodes = json.loads(json.dumps(dj['nodes'])); first = None
    for i, n in enumerate(nodes):
        if 'mesh' in n:
            if first is None: first = i; nodes[i] = {'name': 'char1', 'mesh': 0, 'skin': 0}
            else: n.pop('mesh', None); n.pop('skin', None)
    j['nodes'] = nodes; j['scenes'] = json.loads(json.dumps(dj['scenes'])); j['scene'] = dj.get('scene', 0); j['skins'] = json.loads(json.dumps(dj['skins'][:1])); j.pop('animations', None)
    par = {}
    for i, n in enumerate(dj['nodes']):
        for c in n.get('children', []): par[c] = i
    Wn = []
    for i in range(len(nodes)):
        M = np.array(W0[i], dtype=np.float64).copy(); M[:3, 3] = wp(M[:3, 3]); Wn.append(M)
    for i, n in enumerate(nodes):
        if i not in par: continue
        Rp = np.array(W0[par[i]], dtype=np.float64)[:3, :3]; Rp = Rp / np.maximum(np.linalg.norm(Rp, axis=0), 1e-9); t = Rp.T @ (Wn[i][:3, 3] - Wn[par[i]][:3, 3]); nodes[i]['translation'] = [float(v) for v in t]
    sk0 = dj['skins'][0]['joints']; ibm = np.stack([np.linalg.inv(Wn[n]).T.reshape(16) for n in sk0]).astype(np.float32); data = ibm.astype('<f4').tobytes()
    while len(b) % 4: b.append(0)
    j['bufferViews'].append({'buffer': 0, 'byteOffset': len(b), 'byteLength': len(data)}); b += data
    j['accessors'].append({'bufferView': len(j['bufferViews']) - 1, 'componentType': 5126, 'count': ibm.shape[0], 'type': 'MAT4'}); j['skins'][0]['inverseBindMatrices'] = len(j['accessors']) - 1
    shrink_images(j, b, size); lit_material(j, True, 0)
    # VRM 1.0 metadata: this character's name, Jill's humanoid bone map
    j['extensions'] = {'VRMC_vrm': {'specVersion': '1.0', 'meta': {'name': name, 'version': '1.0', 'authors': ['Kasume'], 'licenseUrl': 'https://vrm.dev/licenses/1.0/', 'avatarPermission': 'everyone', 'commercialUsage': 'personalNonProfit', 'creditNotation': 'unnecessary', 'allowRedistribution': 'prohibited', 'modification': 'prohibited'}, 'humanoid': dj['extensions']['VRMC_vrm']['humanoid']}}
    j['extensionsUsed'] = [e for e in j.get('extensionsUsed', []) if not e.startswith('VRMC_')] + ['VRMC_vrm']
    nb = compact(j, b); save(dst, j, nb)


if __name__ == '__main__':
    donor, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
    for a in sys.argv[3:]:
        name, src = a.split('=', 1); pose = None
        if ':' in src: src, pose = src.split(':', 1)
        if pose: t = os.path.join(out, '_' + name + '_t.glb'); bake_tpose(src, pose, t); src = t
        rig_vrm(src, os.path.join(out, name.replace(' ', '_') + '.vrm'), name, donor)
