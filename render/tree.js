// FRETCRAFT — Constellation tree renderer
// renderTree: all edges and nodes into SVG cam-g
// Reads: NODES, S, filterMap, CROSS_HINTS, archOpacity, nState, nById

// ═══════════════════════════════════════════════════
//  RENDER TREE
// ═══════════════════════════════════════════════════
var filterMap = { rhythm:'gR', technique:'gT', fretboard:'gF', harmony:'gH', lead:'gL', gate:'gG', theory:'gTh', eartraining:'gEa' };

function renderTree(){
  var edgesEl = document.getElementById('edges-g');
  var nodesEl = document.getElementById('nodes-g');
  var eHtml = '', nHtml = '';
  var ci = 0;

  // ── EDGES ──
  NODES.forEach(function(node){
    (node.parents || []).forEach(function(pid){
      ci++;
      var p = nById(pid); if (!p) return;
      var pSt = nState(p.id), nSt = nState(node.id);
      var hot = pSt==='done' && (nSt==='done'||nSt==='prog');
      var active = pSt==='done';
      var col = hot ? 'rgba(200,168,75,.55)' : active ? 'rgba(200,168,75,.15)' : 'rgba(100,80,140,.13)';
      var sw = hot ? 1.8 : active ? 0.8 : 0.5;
      var opacity = hot ? 0.85 : active ? 0.45 : 0.22;
      // Gentle cubic bezier — control points pull toward midpoint vertically
      var my = (p.y+node.y)/2;
      var path = 'M'+p.x+','+p.y+' C'+p.x+','+my+' '+node.x+','+my+' '+node.x+','+node.y;
      eHtml += '<path d="'+path+'" fill="none" stroke="'+col+'" stroke-width="'+sw+'" opacity="'+opacity+'" stroke-linecap="round"/>';
      // Travelling particle on hot edges
      if (hot){
        var pid2 = 'ep'+ci;
        eHtml += '<path id="'+pid2+'" d="'+path+'" fill="none"/>'+
          '<circle r="1.8" fill="rgba(200,168,75,.72)"><animateMotion dur="'+(1.6+(ci%10)*.18).toFixed(1)+'s" repeatCount="indefinite"><mpath href="#'+pid2+'"/></animateMotion></circle>';
      }
    });
  });

  // ── NODES ──
  NODES.forEach(function(node){
    var ns = nState(node.id);
    var pts = S.pts[node.id] || 0;
    var pct = node.gate ? 0 : Math.min(1, pts/node.max);
    var isSel = S.sel === node.id;
    var isGate = node.gate === true;
    var isMastery = node.id === 'mastery';
    var isRoot = node.id === 'root';

    var bColor = branchColor(node.br); // branch color = node color
    var lv = LV[node.l] || LV[0];
    var R = isGate ? (isMastery ? 42 : 24) : lv.nodeR;
    var ri = R - 4;

    var isDone = ns==='done', isProg = ns==='prog';

    // Archetype-based opacity layered on top of state opacity
    var baseOpacity = isDone ? 1 : isProg ? 0.82 : 0.35;
    var archMult = archOpacity(node.id);
    var nodeOpacity = (baseOpacity * archMult).toFixed(2);
    var fillOpacity = isDone ? 0.85 : isProg ? 0.45 : 0.12;
    var strokeColor = isDone ? bColor : isProg ? bColor : 'rgba(150,130,170,.4)';
    var strokeW = isDone ? 2.2 : isProg ? 1.5 : 1;
    var flt = (isDone||isSel||isGate) ? ' filter="url(#'+filterMap[node.br]+')"' : '';

    // Corona rings for mastered nodes
    var corona = '';
    if (isDone && !isGate){
      corona = '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+7)+'" fill="none" stroke="'+bColor+'" stroke-width="1" opacity=".18"/>'+
               '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+14)+'" fill="none" stroke="'+bColor+'" stroke-width=".5" opacity=".08"/>';
    }
    if (isGate && isDone){
      corona = '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+10)+'" fill="none" stroke="var(--gold2)" stroke-width="1.2" opacity=".35">'+
               '<animate attributeName="r" values="'+(R+8)+';'+(R+18)+';'+(R+8)+'" dur="3s" repeatCount="indefinite"/>'+
               '<animate attributeName="opacity" values=".35;.06;.35" dur="3s" repeatCount="indefinite"/></circle>';
    }
    if (isMastery){
      corona = '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+14)+'" fill="none" stroke="var(--gold2)" stroke-width="1.8" opacity="'+(isDone?.4:.15)+'">'+
               '<animate attributeName="r" values="'+(R+10)+';'+(R+26)+';'+(R+10)+'" dur="2.5s" repeatCount="indefinite"/>'+
               '<animate attributeName="opacity" values=".4;.04;.4" dur="2.5s" repeatCount="indefinite"/></circle>';
    }

    // Song highlight ring (temporary, from clicking a song goal)
    var highlighted = S.songHighlight && S.songHighlight.indexOf(node.id) >= 0;
    var songRing = highlighted
      ? '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+9)+'" fill="none" stroke="rgba(45,212,191,.55)" stroke-width="2" stroke-dasharray="4,3">'+
        '<animateTransform attributeName="transform" type="rotate" from="0 '+node.x+' '+node.y+'" to="360 '+node.x+' '+node.y+'" dur="8s" repeatCount="indefinite"/>'+
        '</circle>' : '';
    var selPulse = isSel ? '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+6)+'" fill="none" stroke="'+bColor+'" stroke-width="1.2" opacity=".5">'+
      '<animate attributeName="r" values="'+(R+4)+';'+(R+14)+';'+(R+4)+'" dur="1.8s" repeatCount="indefinite"/>'+
      '<animate attributeName="opacity" values=".5;0;.5" dur="1.8s" repeatCount="indefinite"/></circle>' : '';

    // Progress arc
    var arc = '';
    if (isProg && pct > 0){
      var ang = pct*2*Math.PI-Math.PI/2;
      var ax = (node.x+ri*Math.cos(ang)).toFixed(2), ay = (node.y+ri*Math.sin(ang)).toFixed(2);
      var lg = pct>.5?1:0;
      arc = '<path d="M'+node.x+','+(node.y-ri)+' A'+ri+','+ri+' 0 '+lg+',1 '+ax+','+ay+'" fill="none" stroke="'+bColor+'" stroke-width="2.2" stroke-linecap="round" opacity=".82"/>';
    }

    // 4-point star shape for mastered nodes
    function starPts(cx,cy,outerR,innerR,n){
      var pts2='';
      for(var i=0;i<n*2;i++){
        var a=Math.PI/n*i-Math.PI/2;
        var r2=i%2===0?outerR:innerR;
        pts2+=(i?'L':'M')+(cx+r2*Math.cos(a)).toFixed(1)+','+(cy+r2*Math.sin(a)).toFixed(1);
      }
      return pts2+'Z';
    }
    var starOverlay = isDone ? '<path d="'+starPts(node.x,node.y,R+2,R*0.45,4)+'" fill="'+bColor+'" opacity=".32"/>' : '';

    // Text colors
    var nameColor = isDone ? bColor : isProg ? bColor : 'rgba(140,120,155,.55)';
    var verbColor = isDone ? 'rgba(240,192,96,.85)' : isProg ? bColor : 'rgba(100,80,120,.4)';
    var ptsColor  = isDone ? bColor+'99' : 'rgba(200,168,75,.4)';

    var R_text = isGate ? 12 : lv.nodeR <= 14 ? 13 : lv.nodeR <= 17 ? 13 : 13;
    var ico_fs = isMastery ? 26 : isGate ? 16 : isRoot ? 18 : [14,15,16,17,18][node.l]||14;
    var lbl = node.name.length > 13 ? node.name.slice(0,12)+'…' : node.name;

    nHtml += '<g class="nd" data-id="'+node.id+'" onclick="selNode(\''+node.id+'\')" style="cursor:pointer;opacity:'+nodeOpacity+'"'+flt+'>';
    nHtml += selPulse + corona + songRing;
    // Soft glow halo
    nHtml += '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R+4)+'" fill="'+bColor+'" opacity="'+(isDone?.14:isProg?.06:.02)+'"/>';
    // Main body
    nHtml += '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+R+'" fill="'+bColor+'" opacity="'+fillOpacity+'" stroke="'+strokeColor+'" stroke-width="'+strokeW+'"/>';
    // Inner highlight
    nHtml += '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+(R-6)+'" fill="white" opacity="'+(isDone?.1:isProg?.04:.02)+'"/>';
    nHtml += arc + starOverlay;
    // Icon
    nHtml += '<text x="'+node.x+'" y="'+(node.y-(isGate||isRoot?2:4))+'" text-anchor="middle" dominant-baseline="middle" font-size="'+ico_fs+'">'+node.ico+'</text>';
    // Verb (only show when done, above node name)
    if (!isGate && isDone && node.verb){
      nHtml += '<text x="'+node.x+'" y="'+(node.y+R+8)+'" text-anchor="middle" font-size="5.5" fill="'+verbColor+'" font-family="\'Segoe UI\',sans-serif" letter-spacing=".1em">'+node.verb+'</text>';
    }
    // Name
    if (!isGate){
      nHtml += '<text x="'+node.x+'" y="'+(node.y+R+(isDone?17:11))+'" text-anchor="middle" font-size="'+R_text+'" fill="'+nameColor+'" font-family="Cinzel,Georgia,serif">'+lbl+'</text>';
    } else {
      nHtml += '<text x="'+node.x+'" y="'+(node.y+R+10)+'" text-anchor="middle" font-size="'+(isMastery?10:8)+'" fill="'+(isDone?'var(--gold2)':'rgba(200,168,75,.45)')+'" font-family="Cinzel,Georgia,serif">'+node.name+'</text>';
    }
    // Points for in-progress
    if (!isGate && isProg){
      nHtml += '<text x="'+node.x+'" y="'+(node.y+R+22)+'" text-anchor="middle" font-size="5.5" fill="'+ptsColor+'" font-family="\'Segoe UI\',sans-serif">'+pts+'/'+node.max+'</text>';
    }
    // Invisible hit target
    nHtml += '<circle cx="'+node.x+'" cy="'+node.y+'" r="'+R+'" fill="rgba(0,0,0,0)"/>';
    nHtml += '</g>';
  });

  // Branch labels below root — icon, name, short description
  var branchX = {rhythm:-590, technique:-380, fretboard:-80, theory:130, eartraining:340, harmony:560, lead:780};
  var branchDesc = {
    rhythm:      'Pulse, timing & rhythmic feel',
    technique:   'Fretting, picking & physical control',
    fretboard:   'Notes, scales & neck navigation',
    theory:      'Intervals, scales & chord construction',
    eartraining: 'Listening & sound recognition',
    harmony:     'Chords, voicings & progressions',
    lead:        'Melody, improvisation & expression'
  };
  Object.keys(branchX).forEach(function(brId){
    var brData = BR.find(function(b){ return b.id===brId; });
    var bx = branchX[brId];
    nHtml += '<line x1="'+bx+'" y1="60" x2="'+bx+'" y2="74" stroke="'+brData.color+'" stroke-width="1.5" opacity=".4"/>';
    nHtml += '<text x="'+bx+'" y="88" text-anchor="middle" dominant-baseline="middle" font-size="20">'+brData.ico+'</text>';
    nHtml += '<text x="'+bx+'" y="107" text-anchor="middle" font-size="13" fill="'+brData.color+'" opacity=".9" font-family="Cinzel,Georgia,serif" letter-spacing=".06em">'+brData.name+'</text>';
    nHtml += '<text x="'+bx+'" y="120" text-anchor="middle" font-size="8" fill="'+brData.color+'" opacity=".5" font-family="\'Segoe UI\',sans-serif" letter-spacing=".04em">'+branchDesc[brId]+'</text>';
  });

  edgesEl.innerHTML = eHtml;
  nodesEl.innerHTML = nHtml;
}
