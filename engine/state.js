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
