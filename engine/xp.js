// FRETCRAFT — Multi-dimensional XP system
// Dimensions: duration × focus × type × accuracy × BPM × reflection + spacing bonus
// Prereq gating: full XP if met, 25% exploration if not

// ═══════════════════════════════════════════════════
//  PRACTICE MODAL
// ═══════════════════════════════════════════════════
var mState = { dur:15, foc:2, typ:2, acc:2, bpm:2, ref:2 };
var focL = ['','Mindless ×0.5','Focused ×1.0','Deliberate ×2.0'], focM = [0,.5,1.0,2.0];
var typL = ['','Blocked ×1.0','Interleaved ×1.3'],              typM = [0,1.0,1.3];
var accL = ['','Rough ~50%','Good ~80%','Clean ~95%','Perfect'], accM = [0,.5,1.0,1.3,1.5];
var bpmL = ['','Below target','Partial','At target ×1.4'],      bpmM = [0,.8,1.0,1.4];
var refL = ['','Skipped','Logged ×1.2'],                        refM = [0,1.0,1.2];

function spacingBonus(nodeId){
  var last = S.lastPractice[nodeId];
  if (!last) return 0;
  var hrs = (Date.now()-last)/3600000;
  return hrs >= 48 ? 30 : hrs >= 20 ? 15 : 0;
}

function calcXP(){
  var base = mState.dur * focM[mState.foc] * typM[mState.typ] * accM[mState.acc] * bpmM[mState.bpm] * refM[mState.ref];
  var node = S.sel ? nById(S.sel) : null;
  var space = node ? spacingBonus(node.id) : 0;
  var raw = Math.round(base) + space;
  var met = node ? prereqsDone(node) : true;
  return { raw:raw, nodeXP:met?raw:0, globalXP:met?raw:Math.round(raw*.25), space:space, met:met };
}

function openModal(){
  var name = 'General Practice';
  if (S.sel){ var n=nById(S.sel); if(n) name=n.verb+': '+n.name; }
  document.getElementById('modal-skill-name').textContent = name;
  updModal();
  document.getElementById('modal-ovl').classList.add('open');
}
function closeModal(){ document.getElementById('modal-ovl').classList.remove('open'); }

function updModal(){
  mState.dur = +document.getElementById('s-dur').value;
  mState.foc = +document.getElementById('s-foc').value;
  mState.typ = +document.getElementById('s-typ').value;
  mState.acc = +document.getElementById('s-acc').value;
  mState.bpm = +document.getElementById('s-bpm').value;
  mState.ref = +document.getElementById('s-ref').value;

  document.getElementById('l-dur').textContent = mState.dur+' min';
  document.getElementById('l-foc').textContent = focL[mState.foc];
  document.getElementById('l-typ').textContent = typL[mState.typ];
  document.getElementById('l-acc').textContent = accL[mState.acc];
  document.getElementById('l-bpm').textContent = bpmL[mState.bpm];
  document.getElementById('l-ref').textContent = refL[mState.ref];

  var calc = calcXP();
  var node = S.sel ? nById(S.sel) : null;

  // Spacing bonus note
  var sn = document.getElementById('spacing-note');
  if (calc.space > 0){ sn.style.display='block'; document.getElementById('spacing-amt').textContent=calc.space; }
  else { sn.style.display='none'; }

  // Prereq warning
  var pw = document.getElementById('prereq-warn');
  if (node && !calc.met){
    pw.style.display = 'block';
    var missing = (node.parents||[]).filter(function(pid){ return nState(pid)!=='done'; })
      .map(function(pid){ var p=nById(pid); return p?p.verb+' ('+p.name+')':pid; }).join(', ');
    pw.innerHTML = '<strong>⚠ Prerequisites not yet mastered:</strong> '+missing+'<br>'+
      'You can explore this skill, but XP won\'t count toward node mastery until prerequisites are complete. '+
      'You\'ll earn <strong>25% ('+Math.round(calc.raw*.25)+' XP)</strong> as exploration credit.';
  } else { pw.style.display='none'; }

  // XP display
  var displayXP = calc.met ? calc.nodeXP : Math.round(calc.raw*.25);
  document.getElementById('xp-val').textContent = '+'+displayXP+' XP';
  document.getElementById('xp-formula').textContent =
    mState.dur+'×'+focM[mState.foc]+'×'+typM[mState.typ]+'×'+accM[mState.acc]+'×'+bpmM[mState.bpm]+'×'+refM[mState.ref]+
    (calc.space?'+'+calc.space+' space':'')+(calc.met?'':' ×0.25 (explore)');

  // Gate info
  var gi = document.getElementById('gate-info');
  if (!node||node.gate){ gi.innerHTML='<span style="color:var(--t3)">—</span>'; }
  else if (calc.met){ gi.innerHTML='<span style="color:#34d399">✦ Met — full XP</span>'; }
  else {
    var done2=(node.parents||[]).filter(function(pid){return nState(pid)==='done';}).length;
    var tot2=(node.parents||[]).length;
    gi.innerHTML='<span style="color:#f87171">'+done2+'/'+tot2+' done<br>Explore at 25%</span>';
  }
}

function submitSession(){
  var calc = calcXP();
  var node = S.sel ? nById(S.sel) : null;
  if (node) S.lastPractice[node.id] = Date.now();

  S.xp += calc.globalXP;
  S.streak = Math.min(365, S.streak+1);

  if (node && !node.gate){
    if (calc.met){
      var prev = S.pts[node.id]||0;
      var gain = Math.round(calc.nodeXP * .45);
      var now = Math.min(node.max, prev+gain);
      S.pts[node.id] = now;
      if (prev < node.max && now >= node.max){
        S.xp += 80;
        S.achs.push({ ico:'⭐', txt:node.verb+': '+node.name+' mastered', xp:calc.nodeXP+80 });
        popup('⭐ MASTERED! +80 BONUS', '#c084fc');
        checkGates();
      } else {
        S.achs.push({ ico:'✦', txt:'Practiced '+node.verb+': '+node.name, xp:calc.globalXP });
        popup('+'+calc.globalXP+' XP', null);
      }
    } else {
      S.achs.push({ ico:'🔭', txt:'Explored: '+node.name, xp:calc.globalXP });
      popup('+'+calc.globalXP+' XP (explore)', null);
    }
  } else {
    S.achs.push({ ico:'🎸', txt:'General practice', xp:calc.globalXP });
    popup('+'+calc.globalXP+' XP', null);
  }

  closeModal();
  renderLeft(); renderTree(); renderCard(); renderHeader(); renderAchs();
}

document.getElementById('modal-ovl').addEventListener('click', function(e){ if(e.target===this) closeModal(); });
