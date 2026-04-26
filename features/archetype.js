// FRETCRAFT — Archetype onboarding UI
// renderArchGrid, selectArchetype, startWithArchetype
// renderArchHUD, showArchPicker, highlightSongNodes

// ── Node role for current archetype
function nodeRole(nodeId){
  if (!S.archetype) return 'core'; // all-rounder or not selected
  var arch = ARCHETYPES.find(function(a){ return a.id===S.archetype; });
  if (!arch) return 'core';
  if (arch.core.length === 0) return 'core'; // all-rounder
  if (arch.core.indexOf(nodeId) >= 0) return 'core';
  if (arch.useful.indexOf(nodeId) >= 0) return 'useful';
  return 'optional';
}

// ── Render archetype selection grid
function renderArchGrid(){
  var el = document.getElementById('arch-grid');
  el.innerHTML = ARCHETYPES.map(function(arch){
    var brDots = arch.coreBranches.map(function(brId){
      var br = BR.find(function(b){ return b.id===brId; });
      return '<div class="ac-dot" style="background:'+br.color+';box-shadow:0 0 4px '+br.color+'"></div>';
    }).join('');
    var songs = arch.songs.slice(0,3).map(function(s){
      return '<div class="ac-song-item"><div class="ac-song-dot" style="color:'+arch.color+'"></div>'+s.title+' — '+s.artist+'</div>';
    }).join('');
    return '<div class="arch-card" id="ac-'+arch.id+'" onclick="selectArchetype(\''+arch.id+'\')"'+
      ' style="border-color:'+arch.color+'44;color:'+arch.color+'">'+
      '<div class="ac-ico">'+arch.ico+'</div>'+
      '<div class="ac-name" style="color:'+arch.color+'">'+arch.name+'</div>'+
      '<div class="ac-tagline" style="white-space:pre-line;color:var(--t3)">'+arch.tagline+'</div>'+
      '<div class="ac-branches">'+brDots+'</div>'+
      '<div class="ac-core-label" style="color:'+arch.color+'">Core branches</div>'+
      '<div class="ac-songs" style="color:'+arch.color+'66">'+songs+'</div>'+
      '</div>';
  }).join('');
}

var _selectedArch = null;

function selectArchetype(id){
  _selectedArch = id;
  document.querySelectorAll('.arch-card').forEach(function(el){ el.classList.remove('selected'); });
  var el = document.getElementById('ac-'+id);
  if (el){
    var arch = ARCHETYPES.find(function(a){ return a.id===id; });
    el.classList.add('selected');
    el.style.color = arch.color;
    el.style.borderColor = arch.color;
    el.style.boxShadow = '0 0 20px '+arch.color+'44';
  }
  var btn = document.getElementById('arch-start');
  btn.classList.add('ready');
}

function startWithArchetype(forceId){
  var id = forceId || _selectedArch;
  if (!id) return;
  var skipDirect = (id === 'skip_to_tree');
  if (skipDirect) { id = 'all_rounder'; }
  S.archetype = id;
  var arch = ARCHETYPES.find(function(a){ return a.id===id; });
  S.archSongs = arch ? arch.songs : [];
  document.getElementById('archetype-screen').style.display = 'none';
  if (skipDirect) {
    enterTree();
  } else {
    startPreTest(id);
  }
}

function enterTree(){
  document.getElementById('pretest-screen').classList.remove('active');
  var app = document.getElementById('app');
  app.style.display = 'flex';
  app.style.height = '100%';
  renderArchHUD();
  renderLeft();
  renderTree();
  renderCard();
  renderHeader();
  renderAchs();
  setTimeout(fitView, 80);
}

function renderArchHUD(){
  var arch = ARCHETYPES.find(function(a){ return a.id===S.archetype; });
  if (!arch) return;
  document.getElementById('arch-hud-slot').innerHTML =
    '<div class="arch-hud" onclick="showArchPicker()" title="Change archetype">'+
    '<div class="ah-row">'+
      '<div class="ah-ico">'+arch.ico+'</div>'+
      '<div>'+
        '<div class="ah-name" style="color:'+arch.color+'">'+arch.name+'</div>'+
        '<div class="ah-tagline">'+arch.tagline.split('\n')[0]+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="ah-change">↻ Change archetype</div>'+
    '</div>';
}

function showArchPicker(){
  // Fade the screen back in for re-selection
  var scr = document.getElementById('archetype-screen');
  scr.style.display = 'flex';
  // Re-highlight current selection
  if (S.archetype) selectArchetype(S.archetype);
}

// ── Apply archetype node opacity in renderTree:
//    core = full opacity (already default)
//    useful = 80% opacity
//    optional = 40% opacity (visible but clearly deprioritised)
function archOpacity(nodeId){
  var role = nodeRole(nodeId);
  return role==='core' ? 1 : role==='useful' ? 0.72 : 0.38;
}

// ── SONG ANALYZER (stub — full implementation in features/song-analyzer.js) ──
function processPDF(file) {
  var el = document.getElementById('sa-result');
  el.innerHTML = '<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:.7rem;color:var(--t3);padding:.8rem;font-style:italic">Song analyzer coming in the next build session.</div>';
}

// ── Tab switching
function switchTab(tab) {
  ['tree','practice','analyze','wiki'].forEach(function(t) {
    document.getElementById('view-'+t).classList.toggle('on', t===tab);
    document.getElementById('tnav-'+t).classList.toggle('on', t===tab);
  });
}

// Override switchTab to render wiki on demand
var _switchTab = switchTab;
switchTab = function(tab) {
  _switchTab(tab);
  if (tab === 'wiki') renderWiki();
};

// Drag-and-drop on analyze tab
var dz = document.getElementById('drop-zone');
if (dz) {
  dz.addEventListener('dragover', function(e) { e.preventDefault(); dz.classList.add('drag'); });
  dz.addEventListener('dragleave', function() { dz.classList.remove('drag'); });
  dz.addEventListener('drop', function(e) {
    e.preventDefault(); dz.classList.remove('drag');
    var f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') processPDF(f);
    else toast('Please drop a PDF file');
  });
  document.getElementById('pdf-input').addEventListener('change', function() {
    if (this.files[0]) processPDF(this.files[0]);
  });
}

// Modal close on backdrop
document.getElementById('modal-ovl').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
