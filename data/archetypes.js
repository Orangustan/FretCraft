// FRETCRAFT — Archetype definitions and CROSS_HINTS
// 8 archetypes + 31 cross-branch informational connections

// ═══════════════════════════════════════════════════════════════
//  ARCHETYPE SYSTEM
//  Each archetype defines:
//    core[]    — node ids that are PRIMARY (fully lit, prioritised)
//    useful[]  — node ids that are HELPFUL but not required
//    songs[]   — goal songs with required node ids
//    buffs     — which practice dimensions to pre-weight
//  Nodes not in core or useful are "optional" — dimmed slightly
//  but still fully earnable. No content is locked or removed.
// ═══════════════════════════════════════════════════════════════

// ── CROSS-BRANCH INFORMATIONAL CONNECTIONS ─────────────────────
// Option 1: visual guidance only — drawn as dashed lines on the tree
// Does NOT affect XP gating or gate prerequisites
// Format: [fromId, toId]
var CROSS_HINTS = [
  // Theory → Fretboard
  ['chromatic',     'full_fr'],      // chromatic → knowing all notes
  ['intervals',     'pent_b1'],      // interval understanding → pentatonic relationship
  ['major_sc_th',   'maj_sc'],       // scale construction → scale positions
  ['minor_scales',  'pent_5p'],      // minor/relative → 5-position pentatonic
  // Theory → Harmony
  ['scale_degrees', 'chd_prog'],     // Roman numerals → chord progressions
  ['triad_theory',  '7th_chd'],      // triads → seventh chord extension
  ['triad_theory',  'arpeg'],        // triad theory → arpeggio application
  ['chord_function','reharm'],       // tension understanding → reharmonization
  ['chord_function','chd_mel'],      // harmonic function → chord melody
  ['diatonic_harm', 'adv_harm'],     // diatonic theory → advanced harmony
  ['extended_harm', 'harm_pro'],     // extended harmony → professional arranging
  // Theory → Lead
  ['diatonic_harm', 'adv_imp'],      // full harmonic vocab → advanced improvisation
  ['voice_leading', 'solo_arr'],     // voice leading → solo arrangement
  ['voice_leading', 'inversions'],   // voice leading → inversion choices
  // Ear Training → Lead
  ['maj_min_qual',  'blues_voc'],    // major/minor ear → blues tonality
  ['chord_qual_rec','lead_chg'],     // chord recognition → targeting chord tones
  ['melodic_dict',  'transcr'],      // melodic dictation → full transcription
  ['modal_rec',     'modal_i'],      // modal ear → modal improvisation
  ['modal_rec',     'modes_a'],      // modal ear → modal fretboard application
  ['relative_pitch','fret_pro'],     // relative pitch → fretboard mastery
  ['relative_pitch','sig_style'],    // relative pitch → signature style
  // Ear Training → Harmony
  ['chord_qual_rec','7th_chd'],      // chord quality ear → seventh chord application
  ['harmonic_dict', 'chd_prog'],     // hearing progressions → applying them
  ['harmonic_dict', 'reharm'],       // harmonic dictation → reharmonization
  // Theory ↔ Ear Training (horizontal connections — parallel track)
  ['intervals',     'interval_rec_p'],  // knowing intervals ↔ hearing them
  ['major_sc_th',   'maj_min_qual'],    // scale construction ↔ major/minor quality
  ['scale_degrees', 'interval_rec_d'], // naming intervals ↔ hearing intervals
  ['triad_theory',  'chord_qual_rec'], // chord construction ↔ chord quality recognition
  ['chord_function','harmonic_dict'],  // function analysis ↔ harmonic ear
  ['diatonic_harm', 'harmonic_dict'],  // diatonic knowledge ↔ harmonic dictation
  ['voice_leading', 'melodic_dict'],   // voice leading ↔ hearing melodic motion
];

var ARCHETYPES = [
  {
    id:'rocker',
    ico:'🔥', name:'The Rocker',
    color:'#f87171',
    tagline:'Power, energy, and riffs.\nElectric guitar is your weapon.',
    desc:'Power chords, palm muting, pentatonic lead, alternate picking. You want to play with a band and sound massive.',
    coreBranches:['rhythm','technique','lead'],
    core:['root','q_strum','whole_half','pick_hold','open_str','pw_chord','e_strum','fret_bas','tab_read','blues_sc','alt_pick','h_po','slides','bends','syncop','strum_st','16th_r','triplets','pent_b1','blues_voc','lead_chg','phrasing','vibrato','legato','trill','alt_spd','funk','pent_5p','economy','tapping','sweep','tech_int','adv_imp','sig_style','sess_rhy','ext_tech','chromatic','intervals','major_sc_th','scale_degrees','minor_scales','pitch_match','interval_rec_p','maj_min_qual'],
    useful:['first_pos','open_chd','chord_tr','7th_chd','phrasing','full_fr','caged','chd_prog','barre','odd_time','maj_sc','notation','chd_mel','reharm','style_v','arpeg','poly_r','ens_rhy','transcr','solo_arr','composit','subdiv_int','modal_i','triad_theory','chord_function','interval_rec_d','chord_qual_rec','melodic_dict'],
    songs:[
      {title:'Smoke on the Water', artist:'Deep Purple',   nodes:['q_strum','tab_read','first_pos']},
      {title:'Back in Black',      artist:'AC/DC',          nodes:['pw_chord','alt_pick','syncop','strum_st']},
      {title:'Enter Sandman',      artist:'Metallica',      nodes:['pw_chord','alt_pick','h_po','bends','pent_b1']},
      {title:'Sweet Child O\' Mine',artist:'Guns N\' Roses',nodes:['pent_b1','alt_pick','bends','vibrato','lead_chg']},
    ],
  },
  {
    id:'songwriter',
    ico:'🎸', name:'The Songwriter',
    color:'#fbbf24',
    tagline:'Chords, voice, and emotion.\nMusic is what you feel.',
    desc:'Open chords, fingerpicking, capo mastery, chord progressions. You want to write and perform your own songs.',
    coreBranches:['harmony','rhythm','lead'],
    core:['root','q_strum','whole_half','open_str','pw_chord','open_chd','chord_tr','e_strum','blues_sc','first_mel','tab_read','barre','chd_prog','7th_chd','syncop','strum_st','triplets','16th_r','blues_voc','phrasing','lead_chg','inversions','chd_mel','reharm','composit','subdiv_int','chromatic','intervals','major_sc_th','scale_degrees','minor_scales','triad_theory','pitch_match','interval_rec_p','maj_min_qual','interval_rec_d'],
    useful:['pick_hold','fret_bas','first_pos','h_po','slides','bends','vibrato','trill','pent_b1','full_fr','pent_5p','alt_pick','legato','alt_spd','tech_int','funk','odd_time','poly_r','caged','maj_sc','notation','modal_i','arpeg','style_v','chord_function','diatonic_harm','chord_qual_rec','melodic_dict','harmonic_dict'],
    songs:[
      {title:'Wish You Were Here', artist:'Pink Floyd',     nodes:['open_chd','chord_tr','e_strum','first_pos']},
      {title:'Wonderwall',         artist:'Oasis',           nodes:['open_chd','chord_tr','strum_st']},
      {title:'Fast Car',           artist:'Tracy Chapman',   nodes:['open_chd','strum_st','16th_r','chord_tr']},
      {title:'Blackbird',          artist:'The Beatles',     nodes:['first_pos','open_chd','tab_read','h_po']},
    ],
  },
  {
    id:'blues',
    ico:'🎷', name:'The Blues Player',
    color:'#60a5fa',
    tagline:'Feel, expression, and soul.\nEvery note tells a story.',
    desc:'Blues scale, string bending, vibrato, call and response. The most expressive tradition in guitar history.',
    coreBranches:['lead','technique','rhythm'],
    core:['root','pick_hold','open_str','q_strum','blues_sc','first_mel','fret_bas','e_strum','whole_half','alt_pick','h_po','slides','bends','vibrato','pent_b1','full_fr','pent_5p','blues_voc','lead_chg','phrasing','syncop','strum_st','triplets','legato','trill','modal_i','style_v','adv_imp','subdiv_int','tech_int','funk','chromatic','intervals','major_sc_th','minor_scales','pitch_match','interval_rec_p','maj_min_qual','chord_qual_rec','melodic_dict'],
    useful:['open_chd','chord_tr','barre','chd_prog','7th_chd','first_pos','tab_read','alt_spd','economy','caged','maj_sc','arpeg','transcr','odd_time','poly_r','ens_rhy','adv_harm','solo_arr','composit','scale_degrees','triad_theory','interval_rec_d','harmonic_dict'],
    songs:[
      {title:'Pride & Joy',        artist:'Stevie Ray Vaughan',nodes:['blues_sc','blues_voc','bends','vibrato']},
      {title:'Red House',          artist:'Jimi Hendrix',      nodes:['blues_voc','bends','vibrato','phrasing']},
      {title:'The Thrill Is Gone', artist:'BB King',           nodes:['blues_voc','vibrato','phrasing','lead_chg']},
      {title:'Crossroads',         artist:'Cream',             nodes:['blues_sc','bends','alt_pick','phrasing']},
    ],
  },
  {
    id:'jazz',
    ico:'🎹', name:'The Jazz Explorer',
    color:'#34d399',
    tagline:'Harmony, theory, and sophistication.\nThe music that changes how you hear everything.',
    desc:'7th chords, chord melody, reharmonization, modal improvisation. Jazz makes every other style deeper.',
    coreBranches:['harmony','fretboard','lead'],
    core:['root','pick_hold','open_str','open_chd','chord_tr','first_pos','tab_read','whole_half','e_strum','barre','chd_prog','7th_chd','pent_b1','full_fr','pent_5p','caged','maj_sc','notation','inversions','chd_mel','reharm','modal_i','arpeg','style_v','adv_harm','solo_arr','fret_pro','harm_pro','subdiv_int','triplets','chromatic','intervals','major_sc_th','scale_degrees','minor_scales','triad_theory','chord_function','diatonic_harm','voice_leading','extended_harm','pitch_match','interval_rec_p','maj_min_qual','interval_rec_d','chord_qual_rec','melodic_dict','harmonic_dict','modal_rec'],
    useful:['blues_sc','blues_voc','phrasing','lead_chg','vibrato','slides','h_po','bends','trill','legato','alt_pick','alt_spd','tech_int','odd_time','poly_r','funk','ens_rhy','adv_imp','composit','transcr','modes_a','sess_rhy','sig_style','relative_pitch'],
    songs:[
      {title:'Autumn Leaves',      artist:'Traditional Jazz', nodes:['7th_chd','chd_prog','modal_i','arpeg']},
      {title:'Summertime',         artist:'Gershwin',         nodes:['7th_chd','inversions','chd_mel','phrasing']},
      {title:'Fly Me to the Moon', artist:'Bart Howard',      nodes:['7th_chd','chd_prog','inversions','reharm']},
      {title:'All of Me',          artist:'Gerald Marks',     nodes:['barre','7th_chd','modal_i','lead_chg']},
    ],
  },
  {
    id:'shredder',
    ico:'⚡', name:'The Shredder',
    color:'#c084fc',
    tagline:'Speed, precision, and technical mastery.\nThe instrument as athletic pursuit.',
    desc:'Alternate picking, economy picking, sweep picking, tapping, legato runs. Technical guitar at its extreme edge.',
    coreBranches:['technique','lead','fretboard'],
    core:['root','pick_hold','fret_bas','open_str','first_pos','tab_read','whole_half','e_strum','alt_pick','h_po','slides','bends','pent_b1','full_fr','pent_5p','vibrato','legato','trill','alt_spd','economy','tapping','sweep','tech_int','modes_a','adv_imp','subdiv_int','16th_r','triplets','ext_tech','sig_style','fret_pro','chromatic','intervals','major_sc_th','scale_degrees','minor_scales','pitch_match','interval_rec_p','maj_min_qual'],
    useful:['q_strum','syncop','strum_st','funk','odd_time','poly_r','ens_rhy','caged','maj_sc','notation','transcr','open_chd','chord_tr','barre','chd_prog','7th_chd','inversions','arpeg','modal_i','style_v','adv_harm','solo_arr','composit','triad_theory','diatonic_harm','interval_rec_d','melodic_dict','modal_rec'],
    songs:[
      {title:'Eruption',           artist:'Van Halen',         nodes:['alt_pick','tapping','vibrato','alt_spd']},
      {title:'Cliffs of Dover',    artist:'Eric Johnson',       nodes:['alt_pick','legato','alt_spd','phrasing']},
      {title:'Technical Difficulties',artist:'Racer X',        nodes:['alt_spd','economy','sweep','legato']},
      {title:'For the Love of God',artist:'Steve Vai',         nodes:['vibrato','legato','tapping','modes_a']},
    ],
  },
  {
    id:'classical',
    ico:'🎼', name:'The Classical Player',
    color:'#f0c060',
    tagline:'Precision, fingerstyle, and timeless repertoire.\nGuitar as a concert instrument.',
    desc:'Fingerpicking, standard notation, arpeggios, vibrato, extended techniques. The most demanding physical discipline.',
    coreBranches:['technique','fretboard','harmony'],
    core:['root','fret_bas','open_str','first_pos','tab_read','open_chd','chord_tr','whole_half','h_po','slides','pent_b1','full_fr','vibrato','legato','trill','caged','maj_sc','notation','inversions','chd_mel','arpeg','subdiv_int','modes_a','transcr','adv_harm','solo_arr','tech_int','fret_pro','harm_pro','ext_tech','chromatic','intervals','major_sc_th','scale_degrees','minor_scales','triad_theory','chord_function','voice_leading','pitch_match','interval_rec_p','interval_rec_d','maj_min_qual','chord_qual_rec','melodic_dict'],
    useful:['pick_hold','pw_chord','e_strum','q_strum','triplets','alt_pick','blues_sc','bends','pent_5p','reharm','odd_time','notation','maj_sc','poly_r','ens_rhy','funk','chd_prog','barre','7th_chd','syncop','adv_imp','composit','modal_i','style_v','sess_rhy','sig_style','diatonic_harm','extended_harm','harmonic_dict','modal_rec','relative_pitch'],
    songs:[
      {title:'Romanza (Romance)',   artist:'Traditional Spanish',nodes:['first_pos','open_chd','tab_read','vibrato']},
      {title:'Recuerdos de la Alhambra',artist:'Tárrega',       nodes:['notation','vibrato','legato','chd_mel']},
      {title:'Asturias',           artist:'Albéniz',             nodes:['alt_pick','notation','caged','chd_mel']},
      {title:'Lagrima',            artist:'Tárrega',             nodes:['first_pos','notation','chd_mel','arpeg']},
    ],
  },
  {
    id:'all_rounder',
    ico:'🌟', name:'The All-Rounder',
    color:'#c8a84b',
    tagline:'Balanced, curious, and comprehensive.\nThe full Berklee-track musician.',
    desc:'All five branches treated equally. You want to understand music deeply across styles and become a complete guitarist.',
    coreBranches:['rhythm','technique','fretboard','harmony','lead'],
    core:[], // empty = all nodes are "core" — fully lit
    useful:[],
    songs:[
      {title:'Wish You Were Here', artist:'Pink Floyd',     nodes:['open_chd','chord_tr','e_strum','first_pos']},
      {title:'Sultans of Swing',   artist:'Dire Straits',   nodes:['barre','chd_prog','blues_voc','phrasing']},
      {title:'Little Wing',        artist:'Jimi Hendrix',   nodes:['open_chd','inversions','phrasing','vibrato']},
      {title:'Tears in Heaven',    artist:'Eric Clapton',   nodes:['open_chd','first_pos','tab_read','vibrato']},
    ],
  },
  {
    id:'casual',
    ico:'🎵', name:'The Casual Strummer',
    color:'#34d399',
    tagline:'A few chords, a few songs, and a good time.\nNo grind required.',
    desc:'Open chords, simple strumming, chord transitions, and a small song library. Sustainable, enjoyable, low-pressure playing.',
    coreBranches:['harmony','rhythm'],
    core:['root','q_strum','whole_half','open_str','pw_chord','first_mel','open_chd','chord_tr','e_strum','blues_sc','tab_read','barre','chd_prog','syncop','strum_st','triplets','chromatic','intervals','pitch_match','maj_min_qual'],
    useful:['pick_hold','fret_bas','first_pos','h_po','slides','blues_voc','phrasing','16th_r','subdiv_int','major_sc_th','scale_degrees','interval_rec_p'],
    songs:[
      {title:'Knockin\' on Heaven\'s Door',artist:'Bob Dylan',  nodes:['open_chd','chord_tr','q_strum']},
      {title:'Wonderwall',          artist:'Oasis',              nodes:['open_chd','chord_tr','strum_st']},
      {title:'Horse With No Name',  artist:'America',            nodes:['open_chd','e_strum','syncop']},
      {title:'Brown Eyed Girl',     artist:'Van Morrison',       nodes:['open_chd','strum_st','barre']},
    ],
  },
];
