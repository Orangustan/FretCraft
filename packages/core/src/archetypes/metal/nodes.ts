import { SkillNode } from "../../schema/SkillNode";

export const METAL_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "metal-001",
    label: "Alternate Picking",
    archetype: "metal",
    tier: 1,
    branch: "technique",
    xpReward: 100,
    prerequisites: [],
    unlockCondition: undefined,
    position: { x: 250, y: 200 },
    content: {
      description:
        "Alternate picking—strict down-up-down-up motion with the pick—is the mechanical engine behind metal lead playing and fast single-note riffs. Ingraining perfect alternate picking mechanics from the start prevents the inefficient habits that cap speed and accuracy at higher tempos.",
      objectives: [
        "Alternate-pick a single string at 100 bpm (sixteenth notes) with even attack on every stroke",
        "Maintain strict down-up alternation even when crossing from one string to another",
        "Play a simple single-string riff using alternate picking at 90 bpm without breaking the pattern",
      ],
      tips: [
        "Keep pick movement small and economical—the pick should barely clear the string on each stroke",
        "Anchor your picking hand lightly on the bridge to stabilize the wrist and reduce extraneous motion",
        "Use a metronome from the very first repetition; speed without a reference builds bad timing habits",
      ],
    },
    exercises: [
      {
        id: "ex-metal-001-1",
        type: "technique",
        prompt:
          "Alternate-pick the open low-E string as steady sixteenth notes for two minutes. Every note must be even in attack and timing—use a metronome.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-metal-001-2",
        type: "technique",
        prompt:
          "Practice a three-note-per-string scale fragment using strict alternate picking, paying special attention to the string-change strokes.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-metal-001-3",
        type: "performance",
        prompt:
          "Play a 16-bar single-note riff of your own design on one string using only alternate picking at 100 bpm. Record it and check for any rushed or dragged notes.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "technique", value: "alternate picking" },
      { type: "rhythm-pattern", value: "sixteenth note runs" },
    ],
  },

  {
    id: "metal-002",
    label: "Palm Muting & Chugging",
    archetype: "metal",
    tier: 1,
    branch: "technique",
    xpReward: 100,
    prerequisites: [],
    unlockCondition: undefined,
    position: { x: 600, y: 200 },
    content: {
      description:
        "Palm muting is the backbone of heavy metal rhythm guitar: resting the picking-hand heel on the strings near the bridge creates a tight, percussive chug that defines the genre's aggression and power. Controlled mute pressure combined with downstroke or alternate picking delivers everything from thrash chugs to djent-style articulation.",
      objectives: [
        "Produce a consistently muted, low-pitched chug on the low E and A strings with no unintentional open tone",
        "Vary mute pressure to blend between full mute, partial mute, and open string within a single riff",
        "Sustain palm-muted sixteenth-note chugs at 120 bpm for 30 seconds without fatigue or tone change",
      ],
      tips: [
        "Rest only the fleshy heel of the palm—too much hand weight kills sustain and slows the picking hand",
        "Position matters: closer to the bridge gives a brighter, more cutting chug; further back gives a darker, muddier sound",
        "With high-gain distortion every imprecision is amplified—practice clean first to expose technique flaws",
      ],
    },
    exercises: [
      {
        id: "ex-metal-002-1",
        type: "technique",
        prompt:
          "Palm-mute downstroke eighth notes on the open low-E string for two minutes at 100 bpm. Keep every note equal in length and attack.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-metal-002-2",
        type: "technique",
        prompt:
          "Play a two-bar riff alternating four palm-muted sixteenth notes with two open (unmuted) quarter-note strums. This develops mute on/off switching.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-metal-002-3",
        type: "performance",
        prompt:
          "Create a four-bar riff on the low E and A strings using only palm-muted notes. Record it with distortion and listen for tightness and consistency.",
        bpm: 120,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "technique", value: "palm muting" },
      { type: "articulation", value: "muted chug" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "metal-003",
    label: "Drop Tuning & Power Chord Riffs",
    archetype: "metal",
    tier: 2,
    branch: "harmony-chords",
    xpReward: 120,
    prerequisites: ["metal-001", "metal-002"],
    unlockCondition: undefined,
    position: { x: 100, y: 400 },
    content: {
      description:
        "Drop tunings—most commonly Drop D (D-A-D-G-B-e) and Drop B—lower the lowest string by a whole step, enabling one-finger power chords and heavier open-string riffs that are central to modern metal. The altered tuning expands the guitar's range downward while simplifying certain rhythm patterns.",
      objectives: [
        "Tune the guitar to Drop D accurately by ear and with a tuner",
        "Play movable one-finger power chords across the bottom three strings in Drop D",
        "Construct and perform a four-bar Drop D riff mixing power chords and palm-muted single notes",
        "Explain how Drop B differs from Drop D and what genres commonly use each",
      ],
      tips: [
        "In Drop D, the three lowest strings (D-A-D) form a power chord with a single barre—this is the main rhythmic advantage",
        "Recalibrate your ear every time you tune down; the guitar will feel and sound different and that is the point",
        "Use a clip-on tuner whenever changing to drop tuning to avoid pitch drift during a practice session",
      ],
    },
    exercises: [
      {
        id: "ex-metal-003-1",
        type: "technique",
        prompt:
          "In Drop D, play movable one-finger power chords at frets 0, 2, 3, 5, and 7 on the lowest three strings, palm-muting throughout.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-metal-003-2",
        type: "performance",
        prompt:
          "Write and perform a four-bar Drop D riff that mixes open-string chugs with power chords at two or more different fret positions.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-metal-003-3",
        type: "theory",
        prompt:
          "Explain in your own words why Drop D makes power chords easier, and name two well-known metal songs that use Drop D tuning.",
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "power chord" },
      { type: "technique", value: "drop tuning" },
    ],
  },

  {
    id: "metal-004",
    label: "Gallop & Thrash Rhythms",
    archetype: "metal",
    tier: 2,
    branch: "rhythm-timing",
    xpReward: 120,
    prerequisites: ["metal-002"],
    unlockCondition: undefined,
    position: { x: 350, y: 400 },
    content: {
      description:
        "Gallop rhythms (long-short-short or short-short-long 16th note groupings) and thrash-metal palm-muted 16th-note patterns are the rhythmic signatures of classic heavy metal and thrash. Mastering these patterns at speed requires both picking-hand endurance and locked-in timing.",
      objectives: [
        "Execute the forward gallop (long-short-short: D-DD) cleanly at 130 bpm",
        "Execute the backward gallop (short-short-long: DD-D) cleanly at 130 bpm",
        "Play a 16-bar thrash rhythm (all palm-muted 16th notes) at 150 bpm without losing the beat",
        "Combine both gallop variants in a single four-bar riff",
      ],
      tips: [
        "The forward gallop is: one quarter note + two eighth notes per beat—feel it as 'ONE-and-a'",
        "Keep the picking hand moving in a constant 16th-note motion; ghost strokes on silent beats stabilize timing",
        "Endurance for 150 bpm thrash rhythms is built gradually—increase by 5 bpm per session once stable",
      ],
    },
    exercises: [
      {
        id: "ex-metal-004-1",
        type: "technique",
        prompt:
          "On the open low-E string, play the forward gallop (D-DD) on repeat for two minutes palm-muted. Increase by 5 bpm each time you play through it cleanly.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-metal-004-2",
        type: "technique",
        prompt:
          "Play a 16-bar full palm-muted 16th-note pattern (all downstrokes then alternate) on the low-E string at thrash tempo.",
        bpm: 140,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-metal-004-3",
        type: "performance",
        prompt:
          "Write a four-bar thrash riff using a power chord and both gallop variants. Perform it repeatedly at 130 bpm until it feels locked in.",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "forward and backward gallop" },
      { type: "rhythm-pattern", value: "16th-note thrash pulse" },
      { type: "time-signature", value: "4/4" },
    ],
  },

  {
    id: "metal-005",
    label: "Pentatonic/Natural Minor Soloing",
    archetype: "metal",
    tier: 2,
    branch: "fretboard-theory",
    xpReward: 120,
    prerequisites: ["metal-001"],
    unlockCondition: undefined,
    position: { x: 600, y: 400 },
    content: {
      description:
        "The minor pentatonic and natural minor scales are the primary melodic vocabulary for classic and modern metal leads. From Black Sabbath to Pantera, the dark, aggressive sound of minor-based soloing defines the genre's lead guitar identity.",
      objectives: [
        "Play the minor pentatonic scale in all five positions across the neck in A minor",
        "Play the A natural minor (Aeolian) scale in position 1 and position 2 cleanly at 90 bpm",
        "Improvise a four-bar metal lead phrase using pentatonic scale vocabulary over a power chord drone",
        "Connect two pentatonic positions in one fluid melodic run",
      ],
      tips: [
        "The natural minor scale adds two extra notes to the pentatonic—use them to add color and tension to your lines",
        "Target the b3 and b7 of the minor scale for the most 'metal' sounding phrases",
        "Practice your scale runs with distortion: imperfect technique is instantly revealed at high gain",
      ],
    },
    exercises: [
      {
        id: "ex-metal-005-1",
        type: "technique",
        prompt:
          "Play the A minor pentatonic scale position 1 (box shape at 5th fret) ascending and descending four times using strict alternate picking.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-metal-005-2",
        type: "technique",
        prompt:
          "Play the A natural minor scale in position 1. Then play it in position 2 (starting at the 7th fret). Connect them in a single ascending run.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-metal-005-3",
        type: "performance",
        prompt:
          "Improvise for 60 seconds over an A power chord drone using pentatonic and natural minor vocabulary. Focus on aggressive phrasing and strong note choices.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "scale", value: "minor pentatonic" },
      { type: "scale", value: "A natural minor" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "metal-006",
    label: "Sweep Arpeggios",
    archetype: "metal",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["metal-003", "metal-004"],
    unlockCondition: undefined,
    position: { x: 50, y: 600 },
    content: {
      description:
        "Sweep picking uses a single continuous pick stroke across multiple strings while the fretting hand plays an arpeggio shape, producing fast cascading runs that are a hallmark of melodic death metal and neo-classical metal. Synchronizing both hands precisely is the core challenge.",
      objectives: [
        "Execute a three-string minor arpeggio sweep ascending and descending at 80 bpm with each note clear and separate",
        "Extend to a five-string sweep arpeggio without blurring adjacent notes",
        "Incorporate a sweep into a short lead phrase surrounded by single-note lines",
        "Gradually increase sweep tempo from 60 to 100 bpm over multiple practice sessions",
      ],
      tips: [
        "Roll the fretting finger across the arpeggio strings instead of pressing them simultaneously—this prevents unintended ringing",
        "The pick motion is a slow, controlled drag—never a strum. Slow it down until every note speaks individually",
        "Learn the ascending and descending directions separately before combining them",
      ],
    },
    exercises: [
      {
        id: "ex-metal-006-1",
        type: "technique",
        prompt:
          "Sweep a three-string Am arpeggio (5th-fret shape) up and down at 60 bpm. Each note must ring individually—if two notes blur together, slow down.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-006-2",
        type: "technique",
        prompt:
          "Expand to a five-string Am sweep arpeggio. Practice the ascending stroke alone 10 times, then the descending stroke alone 10 times, then combine.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-006-3",
        type: "performance",
        prompt:
          "Build a four-bar lead passage that uses one five-string sweep arpeggio as its climax, bookended by single-note pentatonic lines.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "sweep picking" },
      { type: "chord-type", value: "minor arpeggio" },
    ],
  },

  {
    id: "metal-007",
    label: "Two-Hand Tapping",
    archetype: "metal",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["metal-004", "metal-005"],
    unlockCondition: undefined,
    position: { x: 300, y: 600 },
    content: {
      description:
        "Two-hand tapping allows the picking hand to fret notes on the guitar neck, dramatically extending the range of arpeggios, runs, and intervallic leaps possible in a single phrase. Popularized by Eddie Van Halen, it became fundamental to 80s shred and modern metal technique.",
      objectives: [
        "Tap a basic three-note tapping lick (tap-pull-hammer) cleanly and in time at 100 bpm",
        "Perform an extended two-hand tapping arpeggio across four or more strings",
        "Integrate a tapping passage into a full lead phrase that begins and ends with conventional picking",
        "Achieve a smooth, even tone for tapped notes equal to picked notes in volume",
      ],
      tips: [
        "Use the middle finger of the picking hand to tap so the pick remains in your grip between tapping passages",
        "The tap, pull-off, and hammer-on must all produce equal volume—the pull-off is usually the weakest, so practice it in isolation",
        "Keep the tapping finger perpendicular to the string and land directly on the fret for maximum clarity",
      ],
    },
    exercises: [
      {
        id: "ex-metal-007-1",
        type: "technique",
        prompt:
          "On the high e string, practice the pattern: tap fret 12, pull off to fret 8 (ring finger), hammer on to fret 5 (index). Repeat for two minutes.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-007-2",
        type: "technique",
        prompt:
          "Extend tapping across three strings using a descending arpeggio shape. Each string gets one tap followed by a pull-off to a fretted note.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-007-3",
        type: "performance",
        prompt:
          "Compose and perform an eight-bar lead that begins with pentatonic picking, transitions into a tapping section, and returns to picking to close.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "two-hand tapping" },
      { type: "technique", value: "hammer-on and pull-off" },
    ],
  },

  {
    id: "metal-008",
    label: "Diminished & Harmonic Minor",
    archetype: "metal",
    tier: 3,
    branch: "fretboard-theory",
    xpReward: 150,
    prerequisites: ["metal-005"],
    unlockCondition: undefined,
    position: { x: 550, y: 600 },
    content: {
      description:
        "The diminished scale and harmonic minor scale bring a dark, neo-classical tension to metal lead playing. The raised 7th degree of the harmonic minor creates an exotic, almost Middle-Eastern flavor, while the symmetrical diminished scale offers a uniquely unstable and dissonant color for aggressive solos.",
      objectives: [
        "Play the A harmonic minor scale in position 1 cleanly, emphasizing the augmented second interval",
        "Play the diminished (whole-half) scale starting from A in position 1",
        "Construct a short lick using harmonic minor that resolves to the tonic",
        "Identify by ear the difference between natural minor and harmonic minor in a melody",
      ],
      tips: [
        "The harmonic minor is like natural minor but with a raised 7th—that one note change transforms the scale's character entirely",
        "The augmented second (b6 to 7) is the fingerprint of harmonic minor; lean into it for maximum drama",
        "The whole-half diminished scale repeats its pattern every three frets—once you know one octave you know them all",
      ],
    },
    exercises: [
      {
        id: "ex-metal-008-1",
        type: "technique",
        prompt:
          "Play the A harmonic minor scale ascending and descending in position 1, four times in a row. Highlight the raised 7th (G#) by giving it a slight accent.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-008-2",
        type: "technique",
        prompt:
          "Play the whole-half diminished scale starting on A. Notice the symmetry—each grouping of three frets repeats the same finger pattern.",
        bpm: 76,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-008-3",
        type: "ear-training",
        prompt:
          "Play an A natural minor scale, then immediately play an A harmonic minor scale. Describe the emotional difference you hear between the two.",
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "scale", value: "harmonic minor" },
      { type: "scale", value: "diminished (whole-half)" },
      { type: "key", value: "A minor" },
    ],
  },

  {
    id: "metal-009",
    label: "Tremolo Picking",
    archetype: "metal",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["metal-001"],
    unlockCondition: undefined,
    position: { x: 750, y: 600 },
    content: {
      description:
        "Tremolo picking—sustaining a single note with maximum-speed alternate picking—creates the rapid, blurred pitch effect central to black metal and death metal. It transforms a single note into a wall of sound and demands peak picking-hand speed, endurance, and consistency.",
      objectives: [
        "Sustain a tremolo-picked note for four full beats at 160 bpm (32nd notes) without losing tempo",
        "Move tremolo picking across two adjacent strings while maintaining continuous speed",
        "Apply tremolo picking to a simple single-note riff melody at high tempo",
        "Sustain a one-minute tremolo picking exercise without significant fatigue or tone degradation",
      ],
      tips: [
        "Tremolo picking comes from wrist rotation, not arm movement—keep the forearm still and let the wrist do the work",
        "Start at 120 bpm and increase by 4 bpm per session; rushing to maximum speed before accuracy is set builds bad habits",
        "Use a lighter pick gauge (0.73mm) for maximum speed, or a heavier gauge (1.0mm+) for more attack and control—experiment to find your preference",
      ],
    },
    exercises: [
      {
        id: "ex-metal-009-1",
        type: "technique",
        prompt:
          "Tremolo-pick the open low-E string for two minutes at 140 bpm. Focus on keeping every note equal in volume and maintaining a relaxed wrist.",
        bpm: 140,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-009-2",
        type: "technique",
        prompt:
          "Tremolo-pick a simple three-note melodic figure (e.g., frets 5-7-8 on high e) at 150 bpm, moving between strings without breaking the picking rhythm.",
        bpm: 150,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-metal-009-3",
        type: "performance",
        prompt:
          "Apply tremolo picking to the first four bars of a black-metal or thrash melody riff. Record it with distortion and evaluate consistency.",
        bpm: 160,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "tremolo picking" },
      { type: "rhythm-pattern", value: "continuous 32nd notes" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "metal-010",
    label: "Speed Building & Accuracy",
    archetype: "metal",
    tier: 4,
    branch: "technique",
    xpReward: 200,
    prerequisites: ["metal-006", "metal-007"],
    unlockCondition: undefined,
    position: { x: 150, y: 800 },
    content: {
      description:
        "Systematic speed building with a metronome is the scientifically proven method for increasing picking and fretting speed while preserving accuracy. Practicing too fast too soon embeds tension and errors; methodical tempo scaling rewires muscle memory cleanly and permanently.",
      objectives: [
        "Establish a 'clean floor' tempo for a target exercise—the fastest speed with zero errors—and document it",
        "Increase a scale run or riff from the clean floor by 20 bpm over ten practice sessions using the metronome",
        "Execute a previously difficult passage at the target speed with relaxed hands and consistent tone",
        "Apply the burst technique (practicing in short four-note bursts then linking them) to a difficult passage",
      ],
      tips: [
        "The '3 times clean' rule: only increase the metronome after playing three consecutive error-free repetitions",
        "Tension is the enemy of speed—if your forearm or hand tightens up, the tempo is too high; back down 10 bpm",
        "Record your sessions: objective playback reveals whether the speed gain was real or just felt fast",
      ],
    },
    exercises: [
      {
        id: "ex-metal-010-1",
        type: "technique",
        prompt:
          "Choose a 16th-note scale run or lick. Find the tempo where you can play it three times cleanly in a row. That is your baseline. Practice 10 minutes daily at that tempo, then add 4 bpm.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 65,
      },
      {
        id: "ex-metal-010-2",
        type: "technique",
        prompt:
          "Use burst practice: play only the first four notes of a fast riff at maximum clean speed. Loop just those four notes 20 times. Then add the next four notes.",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 70,
      },
      {
        id: "ex-metal-010-3",
        type: "performance",
        prompt:
          "Perform a 30-second sweep or tapping passage at a tempo 20 bpm faster than last month's baseline. Record it and compare to your earlier recording.",
        bpm: 120,
        durationSeconds: 120,
        xpValue: 65,
      },
    ],
    musicElements: [
      { type: "technique", value: "metronome tempo scaling" },
      { type: "dynamic", value: "consistent tone at speed" },
    ],
  },

  {
    id: "metal-011",
    label: "Neo-Classical Phrasing",
    archetype: "metal",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["metal-007", "metal-008"],
    unlockCondition: undefined,
    position: { x: 450, y: 800 },
    content: {
      description:
        "Neo-classical metal phrasing combines Baroque-influenced sequenced runs, sweep arpeggios, and harmonic minor scale vocabulary into an aggressive, guitar-based classical style pioneered by Yngwie Malmsteen. The approach demands technical fluency, a deep scale vocabulary, and the musical sense to make fast passages feel dramatic rather than merely fast.",
      objectives: [
        "Play a six-note descending harmonic minor sequence (three-notes-per-string) at 140 bpm",
        "Combine a sweep arpeggio with a scalar run in a single unbroken phrase",
        "Apply classical phrasing concepts (sequence, inversion, resolution) to a metal lead context",
        "Perform a 16-bar neo-classical lead that demonstrates sweep arpeggios, scalar runs, and a strong melodic resolution",
      ],
      tips: [
        "Yngwie's key concept: every fast run starts and ends on a musically strong note—speed is the delivery, not the point",
        "Practice sequences (1-2-3, 2-3-4, 3-4-5…) through the harmonic minor scale to build the finger patterns used in neo-classical runs",
        "Listen to Vivaldi and Bach as well as Malmsteen—understanding the classical source material makes the metal application more musical",
      ],
    },
    exercises: [
      {
        id: "ex-metal-011-1",
        type: "technique",
        prompt:
          "Play a descending A harmonic minor sequence in groups of six (every group shifts down one scale degree) across two strings at 120 bpm.",
        bpm: 120,
        durationSeconds: 120,
        xpValue: 65,
      },
      {
        id: "ex-metal-011-2",
        type: "technique",
        prompt:
          "Connect a five-string Am sweep arpeggio directly into a descending harmonic minor scalar run ending on the root note. Practice the transition at 100 bpm.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 70,
      },
      {
        id: "ex-metal-011-3",
        type: "performance",
        prompt:
          "Compose and perform a 16-bar neo-classical lead section. Include at least one sweep arpeggio, one scalar sequence run, and a clear harmonic resolution at the end.",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 65,
      },
    ],
    musicElements: [
      { type: "scale", value: "harmonic minor" },
      { type: "technique", value: "neo-classical sequencing" },
      { type: "chord-type", value: "sweep arpeggio" },
    ],
  },

  {
    id: "metal-012",
    label: "Metal Composition",
    archetype: "metal",
    tier: 4,
    branch: "music-theory",
    xpReward: 200,
    prerequisites: ["metal-009"],
    unlockCondition: undefined,
    position: { x: 700, y: 800 },
    content: {
      description:
        "Composing metal guitar parts requires understanding song structure (intro, verse, pre-chorus, chorus, breakdown, solo, outro), riff development, and how to create tension and release across a full track. A well-composed metal song feels inevitable—each section flows naturally into the next.",
      objectives: [
        "Write a complete 16-bar metal song skeleton with defined intro, verse, and chorus riffs",
        "Compose a breakdown section that creates maximum tension and contrast with the main riff",
        "Create a solo section that complements the song's key and feel rather than feeling inserted",
        "Record a demo of the complete structure to evaluate how each section flows into the next",
      ],
      tips: [
        "Start with one great riff and build the entire song around it—every other section should contrast with or develop from that core idea",
        "Breakdowns work through rhythmic simplification: strip away notes, slow the rhythm, and add space",
        "Dynamics in metal composition mean contrasting dense, heavy sections with sparse, quiet ones—not just playing louder or softer",
      ],
    },
    exercises: [
      {
        id: "ex-metal-012-1",
        type: "theory",
        prompt:
          "Sketch a song map for a metal track: label each section (intro, verse, chorus, breakdown, solo, outro), its length in bars, and its main riff or mood.",
        durationSeconds: 120,
        xpValue: 65,
      },
      {
        id: "ex-metal-012-2",
        type: "performance",
        prompt:
          "Record each section of your composed metal track separately (intro riff, verse riff, chorus riff, breakdown, solo sketch). Listen back and evaluate the contrast between sections.",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 70,
      },
      {
        id: "ex-metal-012-3",
        type: "performance",
        prompt:
          "Perform the complete song structure from start to finish in one continuous take. Focus on transitions between sections—are they smooth or jarring?",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 65,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "song structure" },
      { type: "dynamic", value: "tension and release" },
      { type: "technique", value: "riff composition" },
    ],
  },
];
