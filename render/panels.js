// FRETCRAFT — Panel renderers
// renderLeft, renderCard, renderHeader, renderAchs

// ═══════════════════════════════════════════════════
//  LEFT PANEL
// ═══════════════════════════════════════════════════
function renderLeft(){
  // Song goals from archetype
  var sg = document.getElementById('song-goals-sec');
  if (!sg) return;
  sg.innerHTML = '';
  sg.className = '';
  var songs = S.archSongs || [];
  if (!songs.length) return;
  var arch = ARCHETYPES.find(function(a){ return a.id===S.archetype; });
  var ac = arch ? arch.color : 'var(--gold)';
  var sh = '<div class="sec-label">Song Goals</div>';
  songs.forEach(function(song){
    var met2 = song.nodes.filter(function(nid){ return nState(nid)==='done'; }).length;
    var tot2 = song.nodes.length;
    var pct2 = Math.round(met2/tot2*100);
    sh += '<div style="margin-bottom:.45rem;cursor:pointer" onclick="highlightSongNodes('+JSON.stringify(song.nodes)+')" title="Highlight required skills on tree">'+
      '<div style="font-size:.62rem;color:var(--t1);font-weight:600;margin-bottom:.08rem">'+song.title+'</div>'+
      '<div style="font-size:.5rem;color:var(--t3);margin-bottom:.18rem">'+song.artist+'</div>'+
      '<div style="display:flex;align-items:center;gap:.4rem">'+
        '<div style="flex:1;height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden">'+
          '<div style="height:100%;width:'+pct2+'%;background:'+ac+';border-radius:2px;transition:width .4s"></div>'+
        '</div>'+
        '<span style="font-size:.5rem;color:'+ac+';font-weight:700;white-space:nowrap">'+pct2+'%</span>'+
      '</div></div>';
  });
  sg.className = 'panel-sec';
  sg.innerHTML = sh;
}

// Highlight song required nodes on tree (adds a temporary pulse to those nodes)
function highlightSongNodes(nodeIds){
  S.songHighlight = nodeIds;
  renderTree();
  toast('🎵 Song path highlighted on constellation');
  setTimeout(function(){ S.songHighlight = null; renderTree(); }, 8000);
}

// ═══════════════════════════════════════════════════
//  RIGHT PANEL — NODE CARD
// ═══════════════════════════════════════════════════
function renderCard(){
  var el = document.getElementById('node-card');
  if (!S.sel){
    el.innerHTML = '<div class="nc-empty"><div class="nc-empty-ico">🌌</div>'+
      '<div style="font-size:.58rem;letter-spacing:.07em">Select a star to begin</div>'+
      '<div style="font-size:.5rem;color:rgba(200,168,75,.22);margin-top:.3rem;line-height:1.7">Larger stars = higher difficulty<br>Color marks the branch</div></div>';
    return;
  }
  var node = nById(S.sel); if (!node) return;
  var pts = S.pts[node.id] || 0;
  var pct = node.gate ? 0 : Math.min(100, Math.round(pts/node.max*100));
  var ns = nState(node.id);
  var bColor = branchColor(node.br);
  var lv = LV[node.l] || LV[0];
  var met = prereqsDone(node);

  var fillGrad = ns==='done'
    ? 'linear-gradient(90deg,rgba(0,0,0,.3),'+bColor+')'
    : 'linear-gradient(90deg,rgba(0,0,0,.3),rgba(200,168,75,.6))';

  el.innerHTML =
    '<div class="node-card">'+
    '<div class="nc-top">'+
      '<div class="nc-ico">'+node.ico+'</div>'+
      '<div>'+
        '<div class="nc-verb" style="color:'+bColor+'">'+node.verb+'</div>'+
        '<div class="nc-name">'+node.name+
          (S.archetype ? function(){
            var role=nodeRole(node.id);
            var label=role==='core'?'Core Path':role==='useful'?'Useful':'Optional';
            var cls='role-'+role;
            return ' <span class="role-badge '+cls+'">'+label+'</span>';
          }() : '')+
        '</div>'+
        '<div class="nc-meta">'+lv.name+' · '+lv.meta+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="nc-branch-badge" style="background:'+bColor+'18;border-color:'+bColor+'50;color:'+bColor+'">'+
      '<span style="width:5px;height:5px;border-radius:50%;background:'+bColor+';box-shadow:0 0 4px '+bColor+';display:inline-block"></span>'+
      BR.find(function(b){return b.id===node.br;}).name+
    '</div>'+
    '<div class="nc-desc">'+node.desc+'</div>'+
    (node.gate
      ? '<div class="gate-status" style="background:'+bColor+'14;border:1px solid '+bColor+'40;color:'+(ns==='done'?bColor:'rgba(200,168,75,.5)')+'">'+
          (ns==='done'?'✦ Gate Cleared — Constellation Aligned':'⬡ Gate Locked — master surrounding stars to unlock')+'</div>'
      : '<div class="pts-block">'+
          '<div class="pts-row"><span class="pts-lbl">Mastery Points</span>'+
          '<span class="pts-val" style="color:'+(ns==='done'?bColor:ns==='prog'?'var(--gold)':'var(--t3)')+'">'+pts+'/'+node.max+'</span></div>'+
          '<div class="pts-track"><div class="pts-fill" style="width:'+pct+'%;background:'+fillGrad+'"></div></div>'+
          '<div class="pts-sub">'+pct+'% · '+(ns==='done'?'✦ Mastered':ns==='prog'?'In progress':met?'Ready to start':'Prerequisites not yet met')+'</div>'+
        '</div>')+
    '<div class="tips-label">Practice Tips</div>'+
    '<div class="tips">'+node.tips.map(function(t){
      return '<div class="tip"><span class="tip-arrow">→</span><span>'+t+'</span></div>';
    }).join('')+'</div></div>';

  document.getElementById('research-box').innerHTML =
    '<strong>📚 '+lv.name+' — Research Basis</strong>'+node.ref;
}

// ═══════════════════════════════════════════════════
//  HEADER
// ═══════════════════════════════════════════════════
function renderHeader(){
  document.getElementById('h-xp').textContent = S.xp.toLocaleString();
  var done = NODES.filter(function(n){ return !n.gate && nState(n.id)==='done'; }).length;
  document.getElementById('h-sk').textContent = done;
  document.getElementById('h-streak').textContent = S.streak;
  document.getElementById('h-rank').textContent = getRank().name;
  var topLv = 0;
  for (var l=4; l>=0; l--){
    if (NODES.filter(function(n){ return n.l===l && !n.gate; }).some(function(n){ return nState(n.id)==='done'; })){
      topLv=l; break;
    }
  }
  document.getElementById('h-level').textContent = LV[topLv].name;
}

function renderAchs(){
  var el = document.getElementById('achs-list');
  if (!S.achs.length){ el.innerHTML='<div class="ach-empty">Achievements appear here as you practice.</div>'; return; }
  el.innerHTML = S.achs.slice(-5).reverse().map(function(a){
    return '<div class="ach"><span class="ach-ico">'+a.ico+'</span><span class="ach-txt">'+a.txt+'</span><span class="ach-xp">+'+a.xp+'</span></div>';
  }).join('');
}

// ── WIKI ──
function renderWiki() {
  var el = document.getElementById('wiki-content');
  var glossary = {
    'chromatic':     { term:'Chromatic Scale',     def:'The 12 notes of Western music arranged by half steps. Every fret on the guitar is one half step.' },
    'intervals':     { term:'Interval',             def:'The distance between two notes, measured in half steps. Intervals are the building blocks of all scales and chords.' },
    'major_sc_th':   { term:'Major Scale',          def:'A 7-note scale built from the pattern W-W-H-W-W-W-H (W=whole step, H=half step). The foundation of Western music.' },
    'scale_degrees': { term:'Scale Degrees / Roman Numerals', def:'Numbering the notes of a scale 1–7. Roman numerals (I, IV, V) describe chord relationships that stay the same in every key.' },
    'minor_scales':  { term:'Relative Minor',       def:'Every major key has a relative minor that uses the same notes. C major and A minor share all 7 notes.' },
    'triad_theory':  { term:'Triad',                def:'A 3-note chord built by stacking thirds: root + 3rd + 5th. The basis of all chord harmony.' },
    'chord_function':{ term:'Chord Function',       def:'The harmonic role of a chord: Tonic (home), Subdominant (leaving), Dominant (tension). The V chord resolves to I because of the leading tone.' },
    'diatonic_harm': { term:'Diatonic Harmony',     def:'The 7 chords built from a major scale, each with a predictable quality and Roman numeral label.' },
    'voice_leading': { term:'Voice Leading',        def:'Moving each chord voice by the smallest possible interval. The principle that makes harmonic motion feel smooth and inevitable.' },
    'extended_harm': { term:'Extended Harmony',     def:'Chords built beyond the 7th: 9ths, 11ths, 13ths. The tritone substitution: replacing any dominant 7 with the chord a tritone away.' },
    'pitch_match':   { term:'Audiation',            def:'Hearing music in your mind before or without playing it. Gordon (1997): the foundational skill of all musicianship.' },
    'maj_min_qual':  { term:'Chord Quality',        def:'Whether a chord is major, minor, dominant, diminished, or augmented. The quality is defined by the 3rd.' },
    'interval_rec_d':{ term:'Diatonic Intervals',   def:'The named intervals within an octave: minor 2nd through major 7th. Each has a unique sound recognizable by ear.' },
    'chord_qual_rec':{ term:'Harmonic Ear',         def:'The ability to identify chord quality by ear alone, in real time, without an instrument.' },
    'melodic_dict':  { term:'Melodic Dictation',    def:'Hearing a melody and reproducing it on guitar from memory. The gateway to playing by ear.' },
    'harmonic_dict': { term:'Harmonic Dictation',   def:'Hearing a chord progression and identifying each chord and its Roman numeral function.' },
    'modal_rec':     { term:'Modal Colour',         def:'The distinctive emotional quality of each mode, determined by its characteristic note: Dorian (natural 6), Lydian (#4), Mixolydian (b7).' },
    'relative_pitch':{ term:'Relative Pitch',       def:'Identifying any note, interval, or chord by ear using a reference pitch. Entirely learnable — the professional standard.' },
  };

  var mastered = Object.keys(glossary).filter(function(id) {
    return nState(id) === 'done';
  });

  if (!mastered.length) {
    el.innerHTML = '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:.75rem;color:var(--t3);font-style:italic;line-height:1.8">Master Theory and Ear Training nodes to unlock glossary entries.<br>Start with <strong style="color:var(--gold)">HOLD: Posture & Hold</strong> and work upward.</div>';
    return;
  }

  el.innerHTML = mastered.map(function(id) {
    var g = glossary[id];
    var nd = nById(id);
    var bc = nd ? (BR.find(function(b){return b.id===nd.br;})||{color:'var(--gold)'}).color : 'var(--gold)';
    return '<div style="margin-bottom:1rem;padding:.65rem .8rem;background:var(--bg4);border:1px solid var(--border);border-left:3px solid '+bc+';border-radius:.1rem">' +
      '<div style="font-family:\'Cinzel\',Georgia,serif;font-size:.65rem;letter-spacing:.08em;color:'+bc+';margin-bottom:.25rem">'+g.term+'</div>' +
      '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:.72rem;color:var(--t2);line-height:1.7;font-weight:300">'+g.def+'</div>' +
      '</div>';
  }).join('');
}
