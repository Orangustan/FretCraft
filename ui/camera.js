// FRETCRAFT — Pan, zoom, touch camera
// cam: {tx,ty,sc} — applyT, fitView, mouse/wheel/touch handlers

// ═══════════════════════════════════════════════════
//  PAN / ZOOM
// ═══════════════════════════════════════════════════
var cam = { tx:0, ty:0, sc:1 };
var drag = { on:false, sx:0, sy:0, cx:0, cy:0 };

function applyT(){
  document.getElementById('cam-g').setAttribute('transform',
    'translate('+cam.tx.toFixed(1)+','+cam.ty.toFixed(1)+') scale('+cam.sc.toFixed(4)+')');
}

function fitView(){
  var vp = document.getElementById('vp');
  var vw = vp.clientWidth, vh = vp.clientHeight;
  if (!vw || !vh) return;
  var xs = NODES.map(function(n){ return n.x; });
  var ys = NODES.map(function(n){ return n.y; });
  var minX = Math.min.apply(null,xs)-80, maxX = Math.max.apply(null,xs)+80;
  var minY = Math.min.apply(null,ys)-80, maxY = Math.max.apply(null,ys)+80;
  cam.sc = Math.min(vw/(maxX-minX), vh/(maxY-minY)) * 0.88;
  cam.tx = vw/2 - (minX+(maxX-minX)/2)*cam.sc;
  cam.ty = vh - 50 - maxY*cam.sc;
  applyT();
}

function fitToActiveNodes(){
  var vp = document.getElementById('vp');
  var vw = vp.clientWidth, vh = vp.clientHeight;
  if (!vw || !vh){ fitView(); return; }

  // Nodes currently being practiced (in-progress, non-gate)
  var inProg = NODES.filter(function(n){ return !n.gate && nState(n.id) === 'prog'; });

  var focusSet = {};
  if (inProg.length){
    inProg.forEach(function(n){
      focusSet[n.id] = true;
      // immediate parents
      (n.parents||[]).forEach(function(pid){ focusSet[pid] = true; });
      // immediate children
      NODES.forEach(function(c){
        if ((c.parents||[]).indexOf(n.id) >= 0) focusSet[c.id] = true;
      });
    });
  } else {
    // New-student fallback: frame all Foundation (L0) nodes + g0 gate
    NODES.forEach(function(n){
      if (n.l === 0 || n.id === 'g0') focusSet[n.id] = true;
    });
  }

  var focus = NODES.filter(function(n){ return focusSet[n.id]; });
  if (!focus.length){ fitView(); return; }

  var xs = focus.map(function(n){ return n.x; });
  var ys = focus.map(function(n){ return n.y; });
  var pad = 140;
  var minX = Math.min.apply(null,xs) - pad;
  var maxX = Math.max.apply(null,xs) + pad;
  var minY = Math.min.apply(null,ys) - pad;
  var maxY = Math.max.apply(null,ys) + pad;

  cam.sc = Math.min(vw/(maxX-minX), vh/(maxY-minY), 1.8);
  cam.tx = vw/2 - ((minX+maxX)/2) * cam.sc;
  cam.ty = vh/2 - ((minY+maxY)/2) * cam.sc;
  applyT();
}

function zoom(f){
  var vp = document.getElementById('vp');
  var cx = vp.clientWidth/2, cy = vp.clientHeight/2;
  cam.tx = (cam.tx-cx)*f+cx; cam.ty = (cam.ty-cy)*f+cy;
  cam.sc = Math.max(0.08, Math.min(4, cam.sc*f));
  applyT();
}

var VP = document.getElementById('vp');
VP.addEventListener('mousedown', function(e){
  if (e.button !== 0) return;
  drag.on=true; drag.sx=e.clientX; drag.sy=e.clientY; drag.cx=cam.tx; drag.cy=cam.ty;
  e.preventDefault();
});
window.addEventListener('mousemove', function(e){
  if (!drag.on) return;
  cam.tx = drag.cx+(e.clientX-drag.sx); cam.ty = drag.cy+(e.clientY-drag.sy); applyT();
});
window.addEventListener('mouseup', function(){ drag.on=false; });
VP.addEventListener('wheel', function(e){
  e.preventDefault();
  var r = VP.getBoundingClientRect();
  var f = e.deltaY < 0 ? 1.12 : 0.9;
  var cx = e.clientX-r.left, cy = e.clientY-r.top;
  cam.tx=(cam.tx-cx)*f+cx; cam.ty=(cam.ty-cy)*f+cy;
  cam.sc=Math.max(0.08,Math.min(4,cam.sc*f)); applyT();
}, {passive:false});
var t0 = {on:false,sx:0,sy:0,cx:0,cy:0,d0:0,z0:1};
VP.addEventListener('touchstart', function(e){
  if (e.touches.length===1){t0.on=true;t0.sx=e.touches[0].clientX;t0.sy=e.touches[0].clientY;t0.cx=cam.tx;t0.cy=cam.ty;}
  else if (e.touches.length===2){t0.d0=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);t0.z0=cam.sc;}
  e.preventDefault();
}, {passive:false});
VP.addEventListener('touchmove', function(e){
  if (e.touches.length===1&&t0.on){cam.tx=t0.cx+(e.touches[0].clientX-t0.sx);cam.ty=t0.cy+(e.touches[0].clientY-t0.sy);applyT();}
  else if (e.touches.length===2){var d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);cam.sc=Math.max(0.08,Math.min(4,t0.z0*(d/t0.d0)));applyT();}
  e.preventDefault();
}, {passive:false});
VP.addEventListener('touchend', function(){ t0.on=false; });
