// FRETCRAFT — Progression logic
// selNode, checkGates, flash, toast, popup helpers

// ═══════════════════════════════════════════════════
//  INTERACTIONS
// ═══════════════════════════════════════════════════
function selNode(id){ S.sel = id; renderCard(); renderTree(); }

function checkGates(){
  NODES.filter(function(n){ return n.gate; }).forEach(function(gate){
    if (nState(gate.id)==='done') return;
    if ((gate.parents||[]).every(function(pid){ return nState(pid)==='done'; })){
      S.pts[gate.id] = 1;
      S.xp += 500;
      S.achs.push({ ico:'🌟', txt:gate.name+' — Constellation Aligned!', xp:500 });
      toast('🌟 '+gate.name+' unlocked! +500 XP');
    }
  });
}

function popup(msg, color){
  var el = document.createElement('div');
  el.className = 'xp-pop';
  el.textContent = msg;
  el.style.left = (window.innerWidth/2-60)+'px';
  el.style.top  = (window.innerHeight/2-40)+'px';
  if (color) el.style.color = color;
  document.body.appendChild(el);
  setTimeout(function(){ el.remove(); }, 1600);
}

function toast(msg){
  var el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function(){ el.classList.add('out'); setTimeout(function(){ el.remove(); }, 250); }, 3000);
}
