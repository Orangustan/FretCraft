// ── PRE-TEST ──────────────────────────────────────────────

var PRETEST_BRANCH_ORDER = [
  { key:'rhythm',      ico:'🥁', name:'Rhythm & Timing',
    desc:'Tests your sense of pulse, subdivision, and rhythmic feel.' },
  { key:'technique',   ico:'⚡', name:'Technique',
    desc:'Tests physical guitar technique: fretting, picking, and articulation.' },
  { key:'fretboard',   ico:'🗺', name:'Fretboard Knowledge',
    desc:'Tests your knowledge of where notes and scales live on the neck.' },
  { key:'theory',      ico:'📖', name:'Music Theory',
    desc:'Tests conceptual understanding: intervals, scales, chord construction.' },
  { key:'eartraining', ico:'👂', name:'Ear Training',
    desc:'Tests your ability to identify sounds by ear, without looking.' },
  { key:'harmony',     ico:'🎶', name:'Harmony & Chords',
    desc:'Tests chord knowledge, voicings, and harmonic progressions.' },
  { key:'lead',        ico:'⭐', name:'Lead & Improvisation',
    desc:'Tests single-note playing, scale application, and musical expression.' }
];

var PRETEST_QUESTIONS = {
  rhythm: [
    { level:0,
      question:"Pick up your guitar and strum any chord you know to a metronome at 60 BPM for 8 beats. Does your strumming feel even — each beat the same distance apart?",
      rubric:"Even means a listener could not tell which beat you started on.",
      nodeIds:['q_strum','e_strum','whole_half'] },
    { level:1,
      question:"Play a down-up eighth-note strumming pattern on any chord for 8 beats at 60 BPM. Each down-up pair should feel equal. Does it stay locked to the beat?",
      rubric:"The upstroke should land exactly halfway between downstrokes.",
      nodeIds:['16th_r','syncop','strum_st'] },
    { level:2,
      question:"Play a shuffle feel — a long-short pattern (like a heartbeat: DUM-da, DUM-da) — over a 12-bar blues. Does it feel like a real blues groove?",
      rubric:"The short note should feel like it belongs to the next beat, not the previous one.",
      nodeIds:['triplets','subdiv_int','funk'] },
    { level:3,
      question:"Count and play in 7/8 time — group the beats as 3+2+2 — for at least 16 beats without losing your place or stopping.",
      rubric:"You should be able to do this without counting aloud after the first few bars.",
      nodeIds:['odd_time','poly_r'] }
  ],
  technique: [
    { level:0,
      question:"On the high E string (thinnest), press your finger just behind the 5th fret and pick the string once firmly. Does the note ring out clearly with no buzz and no muting from your other fingers?",
      rubric:"Clean means it rings for at least 2 full seconds without dying or buzzing.",
      nodeIds:['pick_hold','fret_bas'] },
    { level:1,
      question:"On the G string, hammer on from the 5th fret to the 7th fret using only your fretting hand, then pull off back to the 5th. Do both notes ring clearly — without picking either one?",
      rubric:"The pull-off must ring, not just go silent. You should hear a clear pitch, not a thud.",
      nodeIds:['alt_pick','h_po','slides'] },
    { level:2,
      question:"Bend the G string at the 7th fret upward until it matches the pitch of the 9th fret (a whole step). Pick the 9th fret first so you know your target, then bend to match it. Do you reach the pitch accurately?",
      rubric:"Accurate means a tuner or your ear confirms the bend reached the target note.",
      nodeIds:['bends','vibrato','legato','trill'] },
    { level:3,
      question:"Play a 3-string descending sweep arpeggio on strings 1-3 using an E-shape major chord at the 7th fret, at any slow tempo. Is it clean — one fluid motion with no noise between strings?",
      rubric:"Each note should sound individually, not blurred together or muted.",
      nodeIds:['alt_spd','economy','sweep','tech_int'] }
  ],
  fretboard: [
    { level:0,
      question:"Without looking anything up: what is the note at the 5th fret of the A string? Say it aloud, then find two other places on the neck where that same note appears.",
      rubric:"Answer: D. The same note appears at the 7th fret of the G string and open D string.",
      nodeIds:['open_str','first_pos','tab_read'] },
    { level:1,
      question:"Play the minor pentatonic scale starting at the 5th fret of the low E string, ascending through all 5 strings and back down, from memory. Do you know the shape without hesitating?",
      rubric:"No hesitation means you do not pause to remember the next note. The shape is automatic.",
      nodeIds:['pent_b1','full_fr','pent_5p'] },
    { level:2,
      question:"Play a C major chord in 3 different positions on the neck — not just open position. Each voicing should ring cleanly with no muted strings.",
      rubric:"Examples: open C, CAGED A-shape at 3rd fret, CAGED G-shape at 8th fret.",
      nodeIds:['caged','maj_sc','notation'] },
    { level:3,
      question:"Play a Dorian scale starting from the 5th fret of the low E string. Name the one note that makes Dorian sound different from the natural minor scale you already know.",
      rubric:"The characteristic note is the natural 6th (raised 6th compared to natural minor). In A Dorian: F# instead of F.",
      nodeIds:['modes_a','transcr','fret_pro'] }
  ],
  theory: [
    { level:0,
      question:"What note is a whole step (2 frets) above the open A string? Find it on the guitar and play it. Now — what is a half step? Play a half step above the note you just found.",
      rubric:"Whole step above A = B (2nd fret A string). Half step above B = C (3rd fret A string).",
      nodeIds:['chromatic','intervals'] },
    { level:1,
      question:"Build a G major scale from scratch using the formula W-W-H-W-W-W-H. Name all 7 notes in order, then play them on the guitar starting from the 3rd fret of the low E string.",
      rubric:"G A B C D E F# G. If you had to count frets rather than recall the pattern, that is level 3 of mastery.",
      nodeIds:['major_sc_th','scale_degrees','minor_scales'] },
    { level:2,
      question:"In the key of G major, what chord is built on the 2nd scale degree? What quality is it — major, minor, or diminished? Play it.",
      rubric:"Answer: A minor (ii chord). Every major key has a minor chord on the 2nd degree.",
      nodeIds:['triad_theory','chord_function'] },
    { level:3,
      question:"Play a G7 chord, then resolve it to C major. Now explain: which two notes inside G7 create the tension that makes it want to resolve? Name them and describe why.",
      rubric:"The tritone between B (3rd) and F (7th). B wants to rise to C. F wants to fall to E. This is the engine of Western harmony.",
      nodeIds:['diatonic_harm','voice_leading','extended_harm'] }
  ],
  eartraining: [
    { level:0,
      question:"Hum or sing the pitch of the open A string before you play it. Then play it. Did your hum match the pitch? Now try with the open D string — hum first, then play.",
      rubric:"Matching means your hum and the guitar note sound like the same pitch, not similar.",
      nodeIds:['pitch_match','interval_rec_p'] },
    { level:1,
      question:"Have someone play a chord (or play one yourself and immediately look away from the fretboard). Before checking — is it major or minor? Test yourself with at least 3 different chords.",
      rubric:"You should be right at least 2 out of 3 times without guessing.",
      nodeIds:['maj_min_qual','interval_rec_d'] },
    { level:2,
      question:"Play a recording of a song you know well. Listen to the first chord. Without looking up the key — find the root note of that chord on your guitar by ear alone. Does it feel stable when you play it against the recording?",
      rubric:"Stable means the note you found creates no tension against the chord — it sits in it.",
      nodeIds:['chord_qual_rec','melodic_dict'] },
    { level:3,
      question:"Listen to any ii-V-I progression (search for an ii-V-I backing track on YouTube). Can you identify the moment the dominant chord (V) resolves to the tonic (I)? Can you hear the tension release?",
      rubric:"You should be able to predict the resolution a beat before it happens — that pull is the V chord.",
      nodeIds:['harmonic_dict','modal_rec','relative_pitch'] }
  ],
  harmony: [
    { level:0,
      question:"Play an open G major chord, then open C major, then open D major, then back to G — in time, no stopping. Do all transitions happen without a gap in the sound?",
      rubric:"No gap means the next chord rings before the previous one fully dies. Smooth, not stuttering.",
      nodeIds:['open_chd','chord_tr','pw_chord'] },
    { level:1,
      question:"Play an F major barre chord using the E shape at the 1st fret. All 6 strings must ring clearly — no buzzes, no muted strings. Hold it for 4 beats.",
      rubric:"This is the classic beginner-to-intermediate dividing line. Buzzing on any string = level 3 or below.",
      nodeIds:['barre','chd_prog','7th_chd'] },
    { level:2,
      question:"Play this chord sequence using any voicings you know: Gmaj7, Em7, Am7, D7, Gmaj7. Do all four chord qualities sound correct — major 7, minor 7, minor 7, dominant 7?",
      rubric:"If you had to look up any of these voicings or are unsure of the chord quality, that is level 3 of mastery.",
      nodeIds:['inversions','chd_mel','reharm'] },
    { level:3,
      question:"Play the same Gmaj7, Em7, Am7, D7 progression using only the top 4 strings (strings 1-4). Each chord change should move each voice by the smallest possible interval.",
      rubric:"Voice leading: the notes in your chords should move like singers — each part moving smoothly, not leaping.",
      nodeIds:['adv_harm','solo_arr','harm_pro'] }
  ],
  lead: [
    { level:0,
      question:"On the high E string at the 5th fret, press firmly just behind the fret and pick the string with a firm downstroke. Does the note ring clearly — no fret buzz, no string noise, sustaining for at least 2 seconds?",
      rubric:"This tests basic note production — the foundation of all single-note playing.",
      nodeIds:['first_mel'] },
    { level:1,
      question:"Play the opening riff of Smoke on the Water — or any melody you know — on a single string, entirely by ear. No tab, no looking it up. Does it sound recognizable?",
      rubric:"Recognizable means someone hearing it would identify the song within 4 bars.",
      nodeIds:['blues_sc','blues_voc','phrasing'] },
    { level:2,
      question:"Using the minor pentatonic scale starting at the 5th fret of the low E, create a 4-note phrase that feels like it has a beginning and an end. Play it exactly the same way 3 times in a row.",
      rubric:"Repeating it identically 3 times proves it was intentional, not accidental.",
      nodeIds:['lead_chg','modal_i','style_v','arpeg'] },
    { level:3,
      question:"Find an A minor backing track (search for an A minor blues backing track, slow tempo, on YouTube). Play over it for 30 seconds using the pentatonic scale. Do your notes feel like they belong in the music — musically responsive, not just technically correct?",
      rubric:"Musically responsive means you are listening and reacting to the track, not just running scales.",
      nodeIds:['adv_imp','composit','sig_style'] }
  ]
};

var RESPONSE_MULTIPLIERS = [0, 0.20, 0.50, 0.85, 1.0];
var _ptArch = null;
var _ptBranchIdx = 0;
var _ptQuestionIdx = 0;
var _ptBranchHighest = {};

function applyPretestResponse(nodeIds, responseIndex){
  var mult = RESPONSE_MULTIPLIERS[responseIndex];
  nodeIds.forEach(function(nodeId){
    var node = nById(nodeId);
    if (!node) return;
    var pts = Math.floor(node.max * mult);
    S.pts[nodeId] = Math.max(S.pts[nodeId] || 0, pts);
    if (responseIndex === 4){ S.testedOut[nodeId] = true; }
  });
}

function applyBranchResults(branchKey, highestCleanLevel){
  var questions = PRETEST_QUESTIONS[branchKey];
  questions.forEach(function(q, idx){
    if (idx <= highestCleanLevel){ applyPretestResponse(q.nodeIds, 4); }
  });
}

function startPreTest(archetypeId){
  _ptArch = archetypeId;
  _ptBranchIdx = 0;
  _ptQuestionIdx = 0;
  _ptBranchHighest = {};
  S.testedOut = {};
  S.inPreTest = true;
  document.getElementById('pretest-screen').classList.add('active');
  showPtIntro();
}

function showPtIntro(){
  document.getElementById('pt-content').innerHTML =
    '<div class="pt-intro">'+
    '<div class="pt-logo">FRETCRAFT</div>'+
    '<div class="pt-heading">Find Your Starting Point</div>'+
    '<div class="pt-body">'+
      'Before we light your constellation, let us find where you are.<br>'+
      'This takes about 10&ndash;15 minutes. <strong>You will need your guitar.</strong><br><br>'+
      'Answer honestly &mdash; the goal is to start at your real level,<br>'+
      'not to impress anyone. You can retake this anytime.'+
    '</div>'+
    '<div class="pt-actions">'+
      '<button class="pt-btn-primary" onclick="runPreTest()">Begin Assessment &rarr;</button>'+
      '<button class="pt-btn-secondary" onclick="skipPreTestBeginner()">I am a complete beginner</button>'+
      '<button class="pt-btn-secondary" onclick="skipPreTestAdvanced()">I am advanced &mdash; trust me</button>'+
    '</div>'+
    '</div>';
}

function runPreTest(){
  _ptBranchIdx = 0;
  _ptQuestionIdx = 0;
  _ptBranchHighest = {};
  showPtQuestion();
}

function showPtQuestion(){
  var branch = PRETEST_BRANCH_ORDER[_ptBranchIdx];
  var question = PRETEST_QUESTIONS[branch.key][_ptQuestionIdx];
  var branchNum = _ptBranchIdx + 1;
  document.getElementById('pt-content').innerHTML =
    '<div class="pt-question-screen">'+
    '<div class="pt-progress">Branch '+branchNum+' of 7 &mdash; '+branch.name+'</div>'+
    '<div class="pt-branch-header">'+
      '<div class="pt-branch-ico">'+branch.ico+'</div>'+
      '<div>'+
        '<div class="pt-branch-name">'+branch.name+'</div>'+
        '<div class="pt-branch-desc">'+branch.desc+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="pt-challenge">'+
      '<div class="pt-challenge-text">'+question.question+'</div>'+
      '<div class="pt-rubric"><span class="pt-rubric-ico">&#10003;</span>'+question.rubric+'</div>'+
    '</div>'+
    '<div class="pt-responses">'+
      '<button class="pt-response" onclick="handlePtResponse(0)">'+
        '<span class="pt-response-num">&#9312;</span>'+
        '<span class="pt-response-label">I could not do this</span></button>'+
      '<button class="pt-response" onclick="handlePtResponse(1)">'+
        '<span class="pt-response-num">&#9313;</span>'+
        '<span class="pt-response-label">I struggled through it</span></button>'+
      '<button class="pt-response" onclick="handlePtResponse(2)">'+
        '<span class="pt-response-num">&#9314;</span>'+
        '<span class="pt-response-label">I did it but not cleanly</span></button>'+
      '<button class="pt-response" onclick="handlePtResponse(3)">'+
        '<span class="pt-response-num">&#9315;</span>'+
        '<span class="pt-response-label">I did it cleanly</span></button>'+
      '<button class="pt-response" onclick="handlePtResponse(4)">'+
        '<span class="pt-response-num">&#9316;</span>'+
        '<span class="pt-response-label">I could do this in my sleep</span></button>'+
    '</div>'+
    '<div class="pt-skip-branch" onclick="skipPtBranch()">Skip this branch &rarr;</div>'+
    '</div>';
}

function handlePtResponse(responseIndex){
  var branch = PRETEST_BRANCH_ORDER[_ptBranchIdx];
  var branchKey = branch.key;
  var questions = PRETEST_QUESTIONS[branchKey];
  var currentQ = questions[_ptQuestionIdx];

  applyPretestResponse(currentQ.nodeIds, responseIndex);

  if (responseIndex >= 3){ _ptBranchHighest[branchKey] = _ptQuestionIdx; }

  var isLastQuestion = _ptQuestionIdx >= questions.length - 1;
  var shouldStop = responseIndex <= 1;

  if (!shouldStop && !isLastQuestion){
    _ptQuestionIdx++;
    showPtQuestion();
    return;
  }

  var highestClean = _ptBranchHighest[branchKey];
  if (highestClean !== undefined){ applyBranchResults(branchKey, highestClean); }
  advancePtBranch();
}

function skipPtBranch(){ advancePtBranch(); }

function advancePtBranch(){
  _ptBranchIdx++;
  _ptQuestionIdx = 0;
  if (_ptBranchIdx >= PRETEST_BRANCH_ORDER.length){
    checkGates();
    showPtResults();
  } else {
    showPtQuestion();
  }
}

function showPtResults(){
  var levelLabels = ['Foundation','Early','Intermediate','Advanced'];
  var branchColors = {
    rhythm:'#60a5fa',technique:'#34d399',fretboard:'#fbbf24',
    theory:'#94a3b8',eartraining:'#e879f9',harmony:'#f87171',lead:'#c084fc'
  };
  var rowsHtml = PRETEST_BRANCH_ORDER.map(function(branch){
    var questions = PRETEST_QUESTIONS[branch.key];
    var allIds = [];
    questions.forEach(function(q){ allIds = allIds.concat(q.nodeIds); });
    var unique = allIds.filter(function(id,i){ return allIds.indexOf(id)===i; });
    var total = 0; var counted = 0;
    unique.forEach(function(id){
      var node = nById(id); if (!node) return;
      total += Math.min(1, (S.pts[id]||0)/node.max);
      counted++;
    });
    var avgPct = counted ? Math.round(total/counted*100) : 0;
    var highestClean = _ptBranchHighest[branch.key];
    var levelLabel = highestClean !== undefined ? (levelLabels[highestClean]||'Advanced') : 'Discovering';
    var bColor = branchColors[branch.key]||'var(--gold)';
    return '<div class="pt-results-row">'+
      '<div class="pt-r-ico">'+branch.ico+'</div>'+
      '<div class="pt-r-name">'+branch.name+'</div>'+
      '<div class="pt-r-bar"><div class="pt-r-fill" style="width:'+avgPct+'%;background:'+bColor+';box-shadow:0 0 6px '+bColor+'66"></div></div>'+
      '<div class="pt-r-level" style="color:'+bColor+'">'+levelLabel+'</div>'+
    '</div>';
  }).join('');

  var mastered = NODES.filter(function(n){ return !n.gate && nState(n.id)==='done'; }).length;
  var inProg   = NODES.filter(function(n){ return !n.gate && nState(n.id)==='prog'; }).length;
  var locked   = NODES.filter(function(n){ return !n.gate && nState(n.id)==='locked'; }).length;

  document.getElementById('pt-content').innerHTML =
    '<div class="pt-results">'+
    '<div class="pt-heading">Your Constellation Is Ready</div>'+
    '<div class="pt-results-grid">'+rowsHtml+'</div>'+
    '<div class="pt-results-summary">'+
      '<strong>'+mastered+'</strong> skills marked as mastered &nbsp;&middot;&nbsp; '+
      '<strong>'+inProg+'</strong> in progress &nbsp;&middot;&nbsp; '+
      '<strong>'+locked+'</strong> ready to unlock'+
    '</div>'+
    '<div style="text-align:center">'+
      '<button class="pt-btn-primary" onclick="finishPreTest()">Enter Your Constellation &rarr;</button>'+
    '</div>'+
    '</div>';
}

function finishPreTest(){
  S.inPreTest = false;
  document.getElementById('pretest-screen').classList.remove('active');
  checkGates();
  enterTree();
}

function skipPreTestBeginner(){
  S.inPreTest = false;
  document.getElementById('pretest-screen').classList.remove('active');
  enterTree();
}

function skipPreTestAdvanced(){
  var arch = ARCHETYPES.find(function(a){ return a.id===_ptArch; });
  if (arch){
    PRETEST_BRANCH_ORDER.forEach(function(branch){
      PRETEST_QUESTIONS[branch.key].forEach(function(q){
        if (q.level <= 1){
          q.nodeIds.forEach(function(nodeId){
            if (arch.core.length===0 || arch.core.indexOf(nodeId)>=0){
              applyPretestResponse([nodeId], 3);
            }
          });
        }
      });
    });
  }
  S.inPreTest = false;
  document.getElementById('pretest-screen').classList.remove('active');
  checkGates();
  enterTree();
}
