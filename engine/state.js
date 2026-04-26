// FRETCRAFT — Game state and core helpers
// var S: single source of truth
// nById, nState, prereqsDone, getRank: pure, no side effects

// ═══════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════
var S = {
  xp: 0,  streak: 1,  sel: null,
  pts: {},  achs: [],
  lastPractice: {},
  songHighlight: null,
  archetype: null,
  archSongs: [],
  testedOut: {},
  inPreTest: false,
};

// Seed some demo progress so tree looks alive
['root','pick_hold','open_str','q_strum','pw_chord','first_mel',
 'e_strum','fret_bas','first_pos','tab_read','open_chd','blues_sc',
 'chromatic','intervals','pitch_match','interval_rec_p'].forEach(function(id){
  var n = NODES.find(function(x){ return x.id === id; });
  if (n && !n.gate) { S.pts[id] = n.max; S.xp += n.max * 2; }
});
S.pts['chord_tr'] = 40; S.pts['alt_pick'] = 65; S.pts['pent_b1'] = 80;
S.pts['barre'] = 35; S.pts['blues_voc'] = 55;
S.xp += 360;
S.achs = [
  { ico:'⭐', txt:'HOLD: Posture mastered',      xp:100 },
  { ico:'⭐', txt:'VOICE: Open Chords mastered', xp:160 },
  { ico:'⭐', txt:'READ: Tab Reading mastered',  xp:80  },
];

function nById(id){ return NODES.find(function(n){ return n.id === id; }); }

function nState(id){
  var n = nById(id); if (!n) return 'locked';
  var p = S.pts[id] || 0;
  if (n.gate) return p >= 1 ? 'done' : 'locked';
  return p >= n.max ? 'done' : p > 0 ? 'prog' : 'locked';
}

function branchColor(brId){
  var b = BR.find(function(x){ return x.id === brId; });
  return b ? b.color : '#c8a84b';
}

function prereqsDone(node){
  return (node.parents || []).every(function(pid){ return nState(pid) === 'done'; });
}

// Ranks based on XP
var RANKS = [
  {name:'Initiate',xp:0},{name:'Seeker',xp:200},{name:'Adept',xp:500},
  {name:'Scholar',xp:1000},{name:'Virtuoso',xp:1800},{name:'Expert',xp:3000},
  {name:'Master',xp:5000},{name:'Luminary',xp:8000},{name:'Sage',xp:12000},{name:'Transcendent',xp:20000},
];
function getRank(){
  var r = RANKS[0];
  for (var i = 0; i < RANKS.length; i++){ if (S.xp >= RANKS[i].xp) r = RANKS[i]; }
  return r;
}
