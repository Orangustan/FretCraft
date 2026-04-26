// FRETCRAFT — Nebula background renderer
// buildBG: SVG defs (filters, gradients) + star field. Called once at boot.

// ═══════════════════════════════════════════════════
//  BUILD NEBULA BACKGROUND  (SVG, drawn once)
// ═══════════════════════════════════════════════════
function buildBG(){
  var xs=NODES.map(function(n){return n.x;}), ys=NODES.map(function(n){return n.y;});
  var minX=Math.min.apply(null,xs)-120, maxX=Math.max.apply(null,xs)+120;
  var minY=Math.min.apply(null,ys)-120, maxY=Math.max.apply(null,ys)+120;
  var W=maxX-minX, H=maxY-minY;
  var svg = document.getElementById('tree-svg');

  // Defs
  var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  defs.innerHTML =
    // Glow filters (one per branch color + gate)
    '<filter id="gR"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gT"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gF"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gH"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gL"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gG"><feGaussianBlur stdDeviation="12" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gM"><feGaussianBlur stdDeviation="20" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gTh"><feGaussianBlur stdDeviation="5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<filter id="gEa"><feGaussianBlur stdDeviation="6" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>'+
    '<radialGradient id="nb0" cx="22%" cy="88%" r="32%"><stop offset="0%" stop-color="#5c2a08" stop-opacity=".22"/><stop offset="100%" stop-color="#090502" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="nb1" cx="38%" cy="72%" r="28%"><stop offset="0%" stop-color="#3d1a05" stop-opacity=".18"/><stop offset="100%" stop-color="#090502" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="nb2" cx="52%" cy="52%" r="26%"><stop offset="0%" stop-color="#8b4010" stop-opacity=".16"/><stop offset="100%" stop-color="#090502" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="nb3" cx="66%" cy="72%" r="28%"><stop offset="0%" stop-color="#3d1a05" stop-opacity=".18"/><stop offset="100%" stop-color="#090502" stop-opacity="0"/></radialGradient>'+
    '<radialGradient id="nb4" cx="80%" cy="88%" r="32%"><stop offset="0%" stop-color="#5c2a08" stop-opacity=".2"/><stop offset="100%" stop-color="#090502" stop-opacity="0"/></radialGradient>';
  svg.insertBefore(defs, svg.firstChild);

  // Background group
  var bg = document.getElementById('bg-g');
  var h = '<rect x="'+minX+'" y="'+minY+'" width="'+W+'" height="'+H+'" fill="#090502"/>';
  // Nebula clouds
  for (var i=0;i<5;i++) h += '<rect x="'+minX+'" y="'+minY+'" width="'+W+'" height="'+H+'" fill="url(#nb'+i+')" opacity="1"/>';
  // Stars
  var seed = 271828;
  for (var s=0; s<350; s++){
    seed=(seed*1664525+1013904223)>>>0;
    var sx=((seed%W)+minX).toFixed(0);
    seed=(seed*1664525+1013904223)>>>0;
    var sy=((seed%H)+minY).toFixed(0);
    seed=(seed*1664525+1013904223)>>>0;
    var sr=((seed%14)/10+0.25).toFixed(1);
    seed=(seed*1664525+1013904223)>>>0;
    var sa=((seed%28)/100+0.03).toFixed(2);
    var twinkle = seed%4===0;
    // Stars: warm amber sparks, occasional hot-white twinkers
    if (twinkle){
      h += '<circle cx="'+sx+'" cy="'+sy+'" r="'+sr+'" fill="rgba(245,200,120,'+sa+')">'+
           '<animate attributeName="opacity" values="'+sa+';'+(parseFloat(sa)*2.8).toFixed(2)+';'+sa+'" dur="'+(2+seed%4)+'s" repeatCount="indefinite"/></circle>';
    } else {
      h += '<circle cx="'+sx+'" cy="'+sy+'" r="'+sr+'" fill="rgba(200,118,42,'+sa+')" opacity=".65"/>';
    }
  }
  bg.innerHTML = h;
}
