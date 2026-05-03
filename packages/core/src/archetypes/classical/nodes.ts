import { SkillNode } from "../../schema/SkillNode";

export const CLASSICAL_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "classical-001",
    label: "Rest Stroke (Apoyando)",
    archetype: "classical",
    tier: 1,
    branch: "technique",
    xpReward: 100,
    prerequisites: [],
    unlockCondition: undefined,
    position: { x: 250, y: 800 },
    content: {
      description:
        "The rest stroke, known in Spanish as apoyando, is the foundational right-hand technique of classical guitar. The finger plucks through the string and comes to rest on the adjacent string, producing a full, projecting tone essential for melodic lines and scale passages.",
      objectives: [
        "Produce a clear, resonant rest stroke on each finger (i, m, a) independently",
        "Alternate i and m fingers in a smooth rest-stroke pattern at 60 bpm on a single string",
        "Apply rest strokes to play a simple melody cleanly across multiple strings",
      ],
      tips: [
        "Keep the plucking finger curved and make contact near the tip—not the flat of the fingertip",
        "Allow the follow-through to rest on the adjacent string naturally; do not force it",
        "Practice in front of a mirror to check that your wrist stays arched and stable",
      ],
    },
    exercises: [
      {
        id: "ex-classical-001-1",
        type: "technique",
        prompt:
          "Using only the i finger, play rest strokes on each of the six open strings from low to high and back. Focus on even tone and consistent follow-through.",
        bpm: 50,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-classical-001-2",
        type: "technique",
        prompt:
          "Alternate i and m fingers in rest strokes on the open B string for two minutes, keeping every note equal in volume and timing.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-classical-001-3",
        type: "performance",
        prompt:
          "Play the first phrase of a simple melody (e.g., Ode to Joy on the B string) using only rest strokes. Aim for a singing, connected tone.",
        bpm: 55,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "technique", value: "rest stroke (apoyando)" },
      { type: "articulation", value: "legato melody" },
    ],
  },

  {
    id: "classical-002",
    label: "Free Stroke (Tirando)",
    archetype: "classical",
    tier: 1,
    branch: "technique",
    xpReward: 100,
    prerequisites: [],
    unlockCondition: undefined,
    position: { x: 600, y: 800 },
    content: {
      description:
        "The free stroke, tirando in Spanish, is the versatile right-hand technique where the finger plucks the string and moves freely through the air without touching the adjacent string. It is the default stroke for arpeggios, chords, and any passage where multiple strings must ring simultaneously.",
      objectives: [
        "Execute clean free strokes on all fingers (p, i, m, a) with a consistent, bright tone",
        "Play a simple arpeggio pattern (p-i-m-a) with all notes ringing freely without damping",
        "Distinguish by ear the tonal difference between rest and free strokes on the same note",
      ],
      tips: [
        "The finger should move toward your palm after plucking—think of a gentle scooping motion",
        "Avoid tensing the hand; a relaxed hand produces a warmer, more resonant free-stroke tone",
        "Use free strokes for any passage where adjacent open strings need to continue ringing",
      ],
    },
    exercises: [
      {
        id: "ex-classical-002-1",
        type: "technique",
        prompt:
          "Practice p (thumb) free strokes across the low E, A, and D strings individually, ensuring a warm, full sound that does not dampen neighboring strings.",
        bpm: 52,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-classical-002-2",
        type: "technique",
        prompt:
          "Arpeggiate a simple open-string pattern (p on low E, i on G, m on B, a on high e) using free strokes. Let all four notes ring together.",
        bpm: 56,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-classical-002-3",
        type: "ear-training",
        prompt:
          "Play the same single note using a rest stroke then a free stroke. Listen carefully and describe in your own words the tonal difference you hear.",
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "technique", value: "free stroke (tirando)" },
      { type: "technique", value: "arpeggio" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "classical-003",
    label: "Arpeggio Patterns (p-i-m-a)",
    archetype: "classical",
    tier: 2,
    branch: "technique",
    xpReward: 120,
    prerequisites: ["classical-001", "classical-002"],
    unlockCondition: undefined,
    position: { x: 100, y: 600 },
    content: {
      description:
        "Arpeggio technique is the cornerstone of classical guitar accompaniment and texture. Training the right-hand fingers to move independently in the p-i-m-a pattern and its variations develops the coordination needed for virtually every classical study and piece.",
      objectives: [
        "Play the p-i-m-a pattern on a static chord at 66 bpm with even tone across all four fingers",
        "Execute the p-a-m-i pattern cleanly as a preparation for tremolo",
        "Maintain independent finger movement without sympathetic tension in unused fingers",
        "Apply an arpeggio pattern across a simple two-chord progression without breaking the flow",
      ],
      tips: [
        "Keep p, i, m, and a fingers all prepared (resting lightly on their strings) before the pattern begins",
        "Practice each finger individually before combining them into a full pattern",
        "Start at a tempo that feels almost too slow—evenness matters far more than speed at this stage",
      ],
    },
    exercises: [
      {
        id: "ex-classical-003-1",
        type: "technique",
        prompt:
          "On an open Am chord, repeat the p-i-m-a pattern for two minutes at 66 bpm. Listen for any uneven notes and adjust finger pressure accordingly.",
        bpm: 66,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-classical-003-2",
        type: "technique",
        prompt:
          "Practice the p-m-i-a and p-a-m-i variations on a static E minor chord to build flexibility and independence.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-classical-003-3",
        type: "performance",
        prompt:
          "Play a four-bar passage alternating between Am and E chords using p-i-m-a arpeggios. Keep the pattern uninterrupted through each chord change.",
        bpm: 63,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "arpeggio (p-i-m-a)" },
      { type: "rhythm-pattern", value: "arpeggiated accompaniment" },
    ],
  },

  {
    id: "classical-004",
    label: "Left Hand Position & Posture",
    archetype: "classical",
    tier: 2,
    branch: "technique",
    xpReward: 120,
    prerequisites: ["classical-001"],
    unlockCondition: undefined,
    position: { x: 350, y: 600 },
    content: {
      description:
        "Classical guitar left-hand technique demands a specific hand frame: arched fingers, thumb centered behind the neck, and the wrist slightly dropped. This posture allows all four fingers to reach each fret with maximum efficiency and minimal tension, forming the biomechanical foundation for advanced playing.",
      objectives: [
        "Maintain a correct classical thumb position (centered, pointing upward) throughout a two-minute exercise",
        "Arch all four fretting fingers so that each one contacts only its target string",
        "Execute a one-finger-per-fret exercise (chromatic crawl) cleanly across all six strings",
        "Identify and release any tension in the forearm, wrist, or hand during playing",
      ],
      tips: [
        "Imagine holding a small ball in your fretting hand—that gentle arch is the target hand shape",
        "Check that your left elbow hangs freely; a pinched elbow raises tension throughout the arm",
        "Use the footstool or guitar support to position the instrument so the neck naturally meets a relaxed hand",
      ],
    },
    exercises: [
      {
        id: "ex-classical-004-1",
        type: "technique",
        prompt:
          "Play a chromatic exercise (frets 1-2-3-4) on each string from low to high at 50 bpm, checking hand shape and thumb position before each string.",
        bpm: 50,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-classical-004-2",
        type: "technique",
        prompt:
          "Hold each finger down on its fret while the other fingers play, practicing independence without collapsing the arch of the hand.",
        bpm: 46,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-classical-004-3",
        type: "theory",
        prompt:
          "Describe in your own words the three key elements of classical left-hand position (thumb, finger arch, wrist drop) and why each matters for tone and injury prevention.",
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "classical hand frame" },
      { type: "technique", value: "one-finger-per-fret" },
    ],
  },

  {
    id: "classical-005",
    label: "Scales in Position",
    archetype: "classical",
    tier: 2,
    branch: "fretboard-theory",
    xpReward: 120,
    prerequisites: ["classical-002"],
    unlockCondition: undefined,
    position: { x: 600, y: 600 },
    content: {
      description:
        "Playing scales in a fixed left-hand position develops fretboard fluency, right-hand alternation, and the muscle memory required for reading and performing classical pieces. Single-position major and natural minor scales are the essential vocabulary of classical guitar technique.",
      objectives: [
        "Play a one-octave G major scale in second position ascending and descending cleanly at 72 bpm",
        "Play the A natural minor scale in first position with accurate fingering and no buzzing",
        "Alternate i-m fingers in rest strokes throughout both scales without breaking the pattern",
        "Perform both scales from memory without looking at the fretting hand",
      ],
      tips: [
        "Assign one finger per fret within your chosen position and commit to it—consistent fingering builds faster memory",
        "Practice hands separately if coordination breaks down: isolate right-hand alternation on open strings, then add left-hand notes",
        "Use a metronome and increase by only 2-4 bpm once a tempo is comfortable for three consecutive run-throughs",
      ],
    },
    exercises: [
      {
        id: "ex-classical-005-1",
        type: "technique",
        prompt:
          "Play the G major scale in second position ascending and descending four times without stopping, using strict i-m alternation.",
        bpm: 72,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-classical-005-2",
        type: "technique",
        prompt:
          "Play the A natural minor scale in first position. After each run-through, increase the metronome by 4 bpm until you reach 88 bpm.",
        bpm: 72,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-classical-005-3",
        type: "ear-training",
        prompt:
          "Sing each scale degree as you play it, matching pitch with your voice. This builds the connection between the visual pattern and the sound.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "scale", value: "G major" },
      { type: "scale", value: "A natural minor" },
      { type: "technique", value: "i-m alternation" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "classical-006",
    label: "Tremolo Technique",
    archetype: "classical",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["classical-003"],
    unlockCondition: undefined,
    position: { x: 50, y: 400 },
    content: {
      description:
        "Tremolo is the p-a-m-i pattern repeated at speed so that the melody note (played by a, m, i in succession) sounds continuous while the thumb provides a bass accompaniment. It is the defining technique of pieces like Tárrega's Recuerdos de la Alhambra and demands extreme right-hand evenness.",
      objectives: [
        "Play the p-a-m-i cycle slowly and evenly on a single string, with each of the four strokes at the same volume",
        "Gradually increase the tremolo pattern from 60 to 100 bpm over several practice sessions",
        "Combine tremolo melody on the high e string with a thumb bass line on the low E string",
        "Sustain a four-bar tremolo passage without the melody notes fading or becoming uneven",
      ],
      tips: [
        "Think of tremolo as four separate free strokes, not one blurred motion—clarity comes before speed",
        "Record yourself and listen back: the thumb bass and the melody should be clearly distinguishable",
        "Practice the a-m-i portion alone before adding the thumb to build finger independence",
      ],
    },
    exercises: [
      {
        id: "ex-classical-006-1",
        type: "technique",
        prompt:
          "On an open E chord, repeat p-a-m-i for two minutes at 60 bpm. Count each finger stroke as a sixteenth note and use a metronome.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-006-2",
        type: "technique",
        prompt:
          "Isolate the a-m-i triplet on the high e string at 80 bpm, keeping all three notes perfectly equal in volume and timing.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-006-3",
        type: "performance",
        prompt:
          "Play the opening four bars of a simple tremolo study combining p bass notes with the a-m-i melody pattern. Focus on balance between bass and melody.",
        bpm: 72,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "tremolo (p-a-m-i)" },
      { type: "rhythm-pattern", value: "continuous sixteenth notes" },
    ],
  },

  {
    id: "classical-007",
    label: "CAGED System",
    archetype: "classical",
    tier: 3,
    branch: "fretboard-theory",
    xpReward: 150,
    prerequisites: ["classical-004", "classical-005"],
    unlockCondition: undefined,
    position: { x: 300, y: 400 },
    content: {
      description:
        "The CAGED system maps the five open chord shapes (C, A, G, E, D) across the entire guitar neck, revealing how any chord, scale, or arpeggio can be played in multiple positions. Understanding CAGED unlocks fretboard geography and is invaluable for both classical reading and improvisation.",
      objectives: [
        "Identify and play all five CAGED chord shapes for the G major chord across the neck",
        "Connect a major scale pattern to each CAGED position in a single key",
        "Move between two adjacent CAGED positions without losing musical continuity",
        "Explain how each CAGED shape relates to an open chord transposed up the neck",
      ],
      tips: [
        "Learn one shape per week—rushing through all five at once leads to confusion rather than fluency",
        "Draw the five shapes on blank fretboard diagrams to reinforce visual memory",
        "Choose a single key (G or C) and explore all five shapes in that key before changing keys",
      ],
    },
    exercises: [
      {
        id: "ex-classical-007-1",
        type: "theory",
        prompt:
          "Sketch out all five CAGED shapes for the key of G major on blank fretboard diagrams. Label the root note in each shape.",
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-007-2",
        type: "technique",
        prompt:
          "Play a G major chord in the C-shape (3rd fret), A-shape (5th fret), and G-shape (7th fret) positions consecutively, moving smoothly between them.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-007-3",
        type: "performance",
        prompt:
          "Improvise a four-bar melody using only the notes of the G major scale within a single CAGED position. Then repeat the melody in the adjacent position.",
        bpm: 68,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "CAGED system" },
      { type: "chord-type", value: "movable chord shapes" },
      { type: "scale", value: "major scale positions" },
    ],
  },

  {
    id: "classical-008",
    label: "Sight Reading Basics",
    archetype: "classical",
    tier: 3,
    branch: "music-theory",
    xpReward: 150,
    prerequisites: ["classical-005"],
    unlockCondition: undefined,
    position: { x: 550, y: 400 },
    content: {
      description:
        "Sight reading is the ability to perform music directly from notation without prior practice. For classical guitarists, reading standard notation (not tablature) is a professional expectation and dramatically expands the repertoire available to study and perform.",
      objectives: [
        "Identify all natural notes on the first five frets of the guitar on the staff without hesitation",
        "Sight-read a Grade 1 single-voice melody at a slow tempo without stopping",
        "Recognize quarter, half, and whole note rhythms and translate them to steady time while reading",
        "Read and play a four-bar excerpt at first sight using notes only in first position",
      ],
      tips: [
        "Read ahead: keep your eyes one to two beats ahead of where your fingers are playing",
        "Never stop to fix a mistake during sight reading—keep the pulse and move forward",
        "Spend five minutes per day on new sight-reading material; consistent short sessions beat occasional long ones",
      ],
    },
    exercises: [
      {
        id: "ex-classical-008-1",
        type: "theory",
        prompt:
          "Name each note on lines and spaces of the treble clef for notes in first position (open string to 4th fret). Quiz yourself with flashcards until each name comes instantly.",
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-008-2",
        type: "performance",
        prompt:
          "Choose a Grade 1 classical guitar piece you have never seen before and read it from start to finish at a tempo slow enough to name every note. Do not stop.",
        bpm: 52,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-008-3",
        type: "ear-training",
        prompt:
          "Play a short notated melody, then sing it back from memory. This reinforces the connection between written notation and sound.",
        bpm: 56,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "sight reading" },
      { type: "rhythm-pattern", value: "standard notation rhythms" },
      { type: "key", value: "first position" },
    ],
  },

  {
    id: "classical-009",
    label: "Dynamic Control",
    archetype: "classical",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["classical-003"],
    unlockCondition: undefined,
    position: { x: 750, y: 400 },
    content: {
      description:
        "Dynamic control—the ability to play at different volumes with intention and consistency—is what separates musical performance from mechanical execution. Classical guitar notation regularly calls for pp (pianissimo) through ff (fortissimo) as well as gradual crescendos and diminuendos.",
      objectives: [
        "Play a single phrase at four distinct dynamic levels: pp, p, f, and ff, with each clearly distinguishable",
        "Execute a smooth four-bar crescendo from p to f without sudden jumps",
        "Achieve a quiet pp tone that still projects clearly and has good sustain",
        "Apply dynamic shaping to a known piece to convey musical phrasing",
      ],
      tips: [
        "Dynamics on classical guitar primarily come from right-hand speed and angle of attack—not pressing harder with the left hand",
        "For pp, slow the finger stroke and approach the string at a shallower angle",
        "Mark dynamics in pencil on your score and practice one phrase at a time with its intended dynamic",
      ],
    },
    exercises: [
      {
        id: "ex-classical-009-1",
        type: "technique",
        prompt:
          "Play eight bars of a known arpeggio pattern: two bars pp, two bars p, two bars f, two bars ff. Record yourself and confirm all four levels are audibly distinct.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-009-2",
        type: "technique",
        prompt:
          "Play a single long scale passage starting at pp and ending at ff in a smooth crescendo. Repeat in reverse (ff to pp diminuendo).",
        bpm: 66,
        durationSeconds: 120,
        xpValue: 50,
      },
      {
        id: "ex-classical-009-3",
        type: "performance",
        prompt:
          "Select a 16-bar piece you already know well and mark in a dynamic plan (where are the peaks and valleys). Perform it with full attention to those dynamics.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "dynamic", value: "pp to ff range" },
      { type: "dynamic", value: "crescendo and diminuendo" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "classical-010",
    label: "Bach Repertoire",
    archetype: "classical",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["classical-006", "classical-007"],
    unlockCondition: undefined,
    position: { x: 150, y: 200 },
    content: {
      description:
        "J.S. Bach's lute and keyboard works, transcribed for classical guitar, are the gold standard of counterpoint study and polyphonic playing. Pieces like the Bourée in E minor and Prelude in D minor demand that the guitarist voice multiple independent lines simultaneously—bass, inner voices, and melody.",
      objectives: [
        "Learn the Bourée in E minor (BWV 996) from the Lute Suite No. 1 up to performance tempo",
        "Clearly voice three or more simultaneous parts so each line is independently audible",
        "Maintain a steady pulse through technically demanding passages without rushing",
        "Memorize at least the first section (A part) of one Bach piece",
      ],
      tips: [
        "Isolate and practice each voice (bass, inner, melody) separately before combining them",
        "Record yourself and check that the melody notes are louder than the accompaniment voices",
        "Learn at 50% tempo first and only increase speed when every note is correct and relaxed",
      ],
    },
    exercises: [
      {
        id: "ex-classical-010-1",
        type: "technique",
        prompt:
          "Play the first eight bars of the Bourée in E minor slowly, exaggerating the dynamic difference between melody notes and bass/inner voices.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 70,
      },
      {
        id: "ex-classical-010-2",
        type: "performance",
        prompt:
          "Perform the complete A section of a Bach piece (Bourée or Prelude) from memory at a stable tempo. If you make an error, keep going.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 65,
      },
      {
        id: "ex-classical-010-3",
        type: "ear-training",
        prompt:
          "Listen to a professional recording of the piece you are learning. Follow along with the score and mark any phrasing or dynamic choices you want to incorporate.",
        durationSeconds: 120,
        xpValue: 65,
      },
    ],
    musicElements: [
      { type: "technique", value: "polyphonic voicing" },
      { type: "rhythm-pattern", value: "Baroque dance forms" },
      { type: "key", value: "E minor" },
    ],
  },

  {
    id: "classical-011",
    label: "Spanish Romantic Pieces",
    archetype: "classical",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["classical-007", "classical-008"],
    unlockCondition: undefined,
    position: { x: 450, y: 200 },
    content: {
      description:
        "Francisco Tárrega's miniatures—Lágrima, Adelita, and Malaguena—represent the quintessential Romantic classical guitar repertoire and showcase cantabile melody, expressive rubato, and the idiomatic Spanish guitar sound. These pieces unite technical precision with deep musical feeling.",
      objectives: [
        "Learn Lágrima by Tárrega in its entirety and perform it with expressive phrasing",
        "Apply tasteful rubato to the melody line while keeping the accompaniment supportive and steady",
        "Bring out the singing quality of the melody above the arpeggio or chord accompaniment",
        "Sight-read through Adelita or Malaguena and identify the main technical challenges before learning it",
      ],
      tips: [
        "Lágrima has a contrasting middle section in E major—be sure the mood shift is clearly communicated",
        "Rubato means 'robbed time': slow slightly into important notes and push forward through less important ones",
        "Tárrega marks indicate his intentions for tone color—observe them as carefully as the pitches",
      ],
    },
    exercises: [
      {
        id: "ex-classical-011-1",
        type: "technique",
        prompt:
          "Practice the opening melody of Lágrima with heavy vibrato and rest strokes to make it sing. Record yourself and compare to a professional performance.",
        bpm: 66,
        durationSeconds: 120,
        xpValue: 65,
      },
      {
        id: "ex-classical-011-2",
        type: "performance",
        prompt:
          "Perform Lágrima in its entirety from memory with full dynamic shaping and expressive rubato. The performance should feel musical, not mechanical.",
        bpm: 72,
        durationSeconds: 120,
        xpValue: 70,
      },
      {
        id: "ex-classical-011-3",
        type: "ear-training",
        prompt:
          "Listen to at least two different guitarists' recordings of Lágrima. Note three specific musical choices (tempo, dynamics, articulation) where they differ.",
        durationSeconds: 120,
        xpValue: 65,
      },
    ],
    musicElements: [
      { type: "dynamic", value: "expressive rubato" },
      { type: "technique", value: "cantabile melody" },
      { type: "key", value: "E minor / E major" },
    ],
  },

  {
    id: "classical-012",
    label: "Concert Performance Prep",
    archetype: "classical",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["classical-009"],
    unlockCondition: undefined,
    position: { x: 700, y: 200 },
    content: {
      description:
        "Preparing for concert performance demands skills that go beyond playing notes correctly: secure memorization, physical stage presence, and managing the physiological effects of performance anxiety. Every professional classical guitarist develops a systematic pre-performance routine.",
      objectives: [
        "Memorize a two-to-three piece program and perform it without a score three times in a row",
        "Practice 'performance runs'—playing through a piece without stopping regardless of errors",
        "Develop a pre-performance routine that manages nerves (breathing, warm-up, mental focus)",
        "Perform the program for at least one listener (friend, teacher, or recorded video) and evaluate the result",
      ],
      tips: [
        "Simulate performance conditions during practice: sit in a chair, play from memory, and start from the beginning if you stop—this trains the mental stamina a real performance demands",
        "Slow breathing (inhale 4 counts, exhale 6) before going on stage measurably reduces adrenaline-related shaking",
        "Accept that memory slips happen; practice 'recovery': keep your hands moving and find the next landmark in the piece",
      ],
    },
    exercises: [
      {
        id: "ex-classical-012-1",
        type: "performance",
        prompt:
          "Record a full performance of your prepared piece from memory. Watch the video immediately after and note two things you did well and two things to improve.",
        durationSeconds: 120,
        xpValue: 70,
      },
      {
        id: "ex-classical-012-2",
        type: "technique",
        prompt:
          "Practice the 'performance run' method: play your piece from beginning to end without stopping under any circumstance. Do this three times in a single session.",
        durationSeconds: 120,
        xpValue: 65,
      },
      {
        id: "ex-classical-012-3",
        type: "theory",
        prompt:
          "Write out your personal pre-performance routine: physical warm-up, mental focus strategy, breathing exercise, and the order in which you do them.",
        durationSeconds: 120,
        xpValue: 65,
      },
    ],
    musicElements: [
      { type: "technique", value: "memorization" },
      { type: "dynamic", value: "stage presence and projection" },
    ],
  },
];
