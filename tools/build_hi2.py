import re
s=open('Survivor.html',encoding='utf-8').read()
c=open('hi2/nx_campaign.js',encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    assert s.count(a)>=1,a
    s=s.replace(a,b,n)
rep('<title>Harbor Inn: Survivor</title>','<title>Harbor Inn 2: N X</title>')
rep('<h1>Harbor Inn</h1><p>S &nbsp; U &nbsp; R &nbsp; V &nbsp; I &nbsp; V &nbsp; O &nbsp; R</p>','<h1>Harbor Inn 2</h1><p>N &nbsp; X</p>')
rep("room: 'lobby', door: null","room: 'ridge', door: null")
rep("loadRoom('lobby', null,","loadRoom('ridge', null,")
rep("if (RM.id === 'pier') UI.go('end')","if (RM.id === 'pier' || RM.id === 'lift') UI.go('end')")
rep("RM.def.event === 'end2' && G.flags.finalDead","RM.def.event === 'end2' && (G.flags.finalDead || window.__NX)")
rep("{ 0: 'CELLAR', 1: 'GROUND FLOOR', 2: 'UPPER FLOOR', 3: 'ROOF', 4: 'LABORATORY', 5: 'SEWERS AND HARBOR', 6: 'GARDEN' }","{ 0: 'CELLAR', 1: 'ADMIN LEVEL', 2: 'UPPER FLOOR', 3: 'ROOF', 4: 'SUB-LEVEL 1', 5: 'SUB-LEVEL 2', 6: 'SURFACE' }")
rep("makeZombie(keySeed(key, RM.enemies.length + String(G.room || '').length * 3 + (e.cr ? 1 : 0)))","makeZombie(keySeed(key, RM.enemies.length + String(G.room || '').length * 3 + (e.cr ? 1 : 0)), (window.__NX && ZV && ZV.names.includes('parasite')) ? 'parasite' : null)")
rep("appId: 'oasis-survivor-v1'","appId: 'oasis-survivor2-nx-v1'")
rep('Could not find that game. Check the code','Could not find that Harbor Inn 2 game. Both of you must open Harbor Inn 2: NX (not Harbor Inn 1). Check the code')
rep('YOU MADE IT OUT','END OF CHAPTER 1')
rep("Hale is gone. The three medals lie in the gate, and the boat engine turns over. The harbor lights come up one by one as you cast off. Behind you, Harbor Inn goes dark at last. The night is over.","The Spire lift groans upward into the dark. Below you, the Hive stirs. Chapter 2 is coming.")
m='/* ---------- per-frame update, input, HUD ---------- */'
rep(m,c+'\n'+m)
open('HarborInn2.html','w',encoding='utf-8').write(s)
