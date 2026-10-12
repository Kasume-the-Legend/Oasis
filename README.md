# Oasis Mixamo Rig (v1)

The one-to-one Mixamo skeleton from your three FBX files, kept exactly as exported and saved for every character we import later.

- `mixamo_rig.json` is the full skeleton, 65 bones (Hips through all five fingers per hand, toes and head top). It stores the rest-pose local transforms in cm, Y-up, facing +Z, and the three baked clips at 30 fps with every bone: `swim` (Swimming, 2.12 s loop), `strike` (Strike Forward Jog, 1.3 s), `catch` (Goalkeeper Catch, 1.1 s). Quaternions are Int16/16000 and hips position is Int16/20 cm.
- `mixamo_rig.js` is the small reusable library, plain JS with no dependencies except three.js.
  - `MXR.load(data)` decodes the clips.
  - `MXR.build(THREE, data)` builds the bone hierarchy (`rig.by.Hips`, `rig.by.LeftArm`, and so on). Attach any mesh to a bone.
  - `MXR.pose(rig, clipA, tA, loopA, clipB, tB, loopB, w)` plays a clip, or cross-fades A to B.
  - `MXR.VRM_MAP` maps VRM humanoid bone names to Mixamo bones, so VRoid/VRM characters can be retargeted onto this rig, or driven by these clips, later.
- The hips stay in place (no root drift) and bone names use the standard `mixamorig:` prefix.

Used by Blitzball (all 12 swimmers). New Mixamo clips can be added to the same JSON with the same bake step.
