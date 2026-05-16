import type { SkillNode } from "../../schema/SkillNode";

// Positions are in 3D world units (NOT 2D SVG pixels).
// X range: -10 to +10. Y range: -5 to +5. Tier 1 is at the bottom.
// This tree is designed so NO prerequisite edges cross one another.
//
// Layout (read bottom-up):
//
//  T5(y=+5):              [Smoke on the Water x=0]
//                        /          |           \
//  T4(y=+2.5):  [Riff Mech x=-6] [Open Chords x=0] [Chord Harmony x=6]
//               /      \               |                    |
//  T3(y=0): [FingerCoord x=-8] [Fretboard x=-4]  [Strum 1 x=3]
//            /     \                 |          /      |      \
//  T2(y=-2.5): [RH x=-9] [LH x=-6] [Posture x=-3] [Quarter x=2] [Eighth x=5] [Rests x=8]
//                   \       /             |               \         /          /
//  T1(y=-5):    [Technique x=-5]                 [Rhythm x=5]

export const UNIVERSAL_NODES: SkillNode[] = [

  // ════════════════════════════════════════
  // TIER 1 — Foundation (2 root nodes)
  // ════════════════════════════════════════

  {
    id: "u-technique",
    label: "Technique",
    archetype: "universal",
    tier: 1,
    branch: "technique",
    xpReward: 80,
    prerequisites: [],
    position: { x: -5, y: -5 },
    content: {
      description:
        "Build the physical foundation of guitar playing. Correct posture, hand position, and body mechanics prevent injury and make every other skill possible.",
      objectives: [
        "Sit or stand with the guitar comfortably supported",
        "Identify the roles of the fretting hand and picking hand",
        "Maintain relaxed shoulders and arms throughout",
      ],
    },
    exercises: [
      {
        id: "ex-u-tech-1",
        type: "technique",
        prompt:
          "Sit with the guitar resting on your right leg, neck angled upward. Breathe and check that your shoulders are relaxed and down. Hold 60 seconds.",
        xpValue: 30,
        durationSeconds: 60,
        selfAssessment: true,
        focusPoints: ["Shoulders down", "Guitar body against chest", "Fretting arm free to move"],
      },
      {
        id: "ex-u-tech-2",
        type: "technique",
        prompt:
          "Curl your fretting-hand fingers as if holding a tennis ball — this is the natural curved fretting position. Hold 30 seconds, then relax.",
        xpValue: 25,
        durationSeconds: 30,
        selfAssessment: true,
        focusPoints: ["Fingertips curved", "No tension in forearm", "Thumb relaxed behind neck"],
      },
      {
        id: "ex-u-tech-3",
        type: "technique",
        prompt:
          "Place the pick between thumb and side of index finger. Strum the open strings slowly — 10 down-strokes. Focus on a relaxed, wrist-driven motion.",
        xpValue: 25,
        selfAssessment: true,
        focusPoints: ["Pick held lightly", "Motion comes from wrist", "Consistent pick angle"],
      },
    ],
  },

  {
    id: "u-rhythm",
    label: "Rhythm & Timing",
    archetype: "universal",
    tier: 1,
    branch: "rhythm-timing",
    xpReward: 80,
    prerequisites: [],
    position: { x: 5, y: -5 },
    content: {
      description:
        "Rhythm is the heartbeat of music. Before learning notes or chords, understanding how music divides into time gives you the framework everything else hangs on.",
      objectives: [
        "Understand beats, measures, and 4/4 time",
        "Tap a steady pulse with your foot",
        "Strum steadily on every beat",
      ],
    },
    exercises: [
      {
        id: "ex-u-rhy-1",
        type: "theory",
        prompt:
          "Set a metronome to 60 BPM. Tap your foot on every click for 60 seconds. Count aloud: 1-2-3-4, 1-2-3-4. Each group of 4 is one measure.",
        xpValue: 30,
        durationSeconds: 60,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Foot lands exactly on the click", "Count every beat", "No rushing"],
      },
      {
        id: "ex-u-rhy-2",
        type: "theory",
        prompt:
          "Clap on beats 1 and 3 while tapping your foot on all 4 beats at 60 BPM. This is the basic feel of most popular music.",
        xpValue: 25,
        durationSeconds: 60,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Foot and clap are in sync", "Claps land only on 1 and 3"],
      },
      {
        id: "ex-u-rhy-3",
        type: "technique",
        prompt:
          "Strum the open strings with one down-stroke on every beat at 60 BPM for 8 measures (32 beats). Even volume, don't stop.",
        xpValue: 25,
        durationSeconds: 32,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["One strum per beat", "Even volume on every strum", "Keep going if you miss"],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 2 — Technique Children (require only u-technique)
  // ════════════════════════════════════════

  {
    id: "u-tech-rh",
    label: "Right Hand Mechanics",
    archetype: "universal",
    tier: 2,
    branch: "technique",
    xpReward: 100,
    prerequisites: ["u-technique"],
    position: { x: -9, y: -2.5 },
    content: {
      description:
        "The picking hand generates tone, articulation, and rhythm. Where and how you pick determines everything about your sound.",
      objectives: [
        "Alternate pick: down on beat, up on the 'and'",
        "Vary picking position for different tones",
        "Palm mute cleanly near the bridge",
      ],
    },
    exercises: [
      {
        id: "ex-u-rh-1",
        type: "technique",
        prompt:
          "Alternate pick the open 4th string at 60 BPM for 60 seconds: down-stroke on the beat, up-stroke between beats. Count '1-and-2-and-3-and-4-and'.",
        xpValue: 40,
        durationSeconds: 60,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Down on numbers, up on 'and'", "Even volume both directions", "Wrist relaxed"],
      },
      {
        id: "ex-u-rh-2",
        type: "technique",
        prompt:
          "Pick the open 3rd string near the soundhole for 8 beats, then near the bridge for 8 beats. Hear the tone change. Repeat 4 times.",
        xpValue: 30,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Soundhole = warm/full", "Bridge = bright/twangy", "Consistent pick angle"],
      },
      {
        id: "ex-u-rh-3",
        type: "technique",
        prompt:
          "Palm mute: rest the side of your picking hand on the bridge saddles, then alternate pick the 6th string for 30 seconds at 65 BPM.",
        xpValue: 30,
        durationSeconds: 30,
        bpm: 65,
        selfAssessment: true,
        focusPoints: ["Palm rests lightly on bridge", "Tight, muted thump sound", "Still alternate picking"],
      },
    ],
  },

  {
    id: "u-tech-lh",
    label: "Left Hand Fretting",
    archetype: "universal",
    tier: 2,
    branch: "technique",
    xpReward: 100,
    prerequisites: ["u-technique"],
    position: { x: -6, y: -2.5 },
    content: {
      description:
        "The fretting hand presses strings cleanly. Fingertip placement just behind the fret wire and a curved arch prevent buzzing and muting adjacent strings.",
      objectives: [
        "Fret with fingertips just behind each fret wire",
        "Arch fingers so they don't mute neighboring strings",
        "Keep the thumb behind the neck opposite the middle finger",
      ],
    },
    exercises: [
      {
        id: "ex-u-lh-1",
        type: "technique",
        prompt:
          "Press the 1st string at fret 3 with your ring finger. Pick it — if it buzzes, move your fingertip closer to the fret wire. Adjust and hold for 2 minutes.",
        xpValue: 35,
        durationSeconds: 120,
        selfAssessment: true,
        focusPoints: ["Fingertip just behind fret wire", "Arch high over other strings", "Thumb behind neck"],
      },
      {
        id: "ex-u-lh-2",
        type: "technique",
        prompt:
          "Spider crawl: place 1 finger per fret on strings 6–1 (frets 1–4), then climb back down. 5 slow repetitions. Every note must ring clean.",
        xpValue: 35,
        selfAssessment: true,
        focusPoints: ["Each note rings clean, no buzzing", "Fingers stay close to the fretboard", "Minimum pressure needed"],
      },
      {
        id: "ex-u-lh-3",
        type: "technique",
        prompt:
          "Press frets 1-2-3-4 on the 6th string one finger at a time, picking each. Then reverse: 4-3-2-1. 5 passes. Focus on clean tone throughout.",
        xpValue: 30,
        selfAssessment: true,
        bpm: 55,
        focusPoints: ["One finger per fret", "Pick each note clearly", "No squeezing — minimal pressure"],
      },
    ],
  },

  {
    id: "u-tech-posture",
    label: "Posture & Setup",
    archetype: "universal",
    tier: 2,
    branch: "technique",
    xpReward: 60,
    prerequisites: ["u-technique"],
    position: { x: -3, y: -2.5 },
    content: {
      description:
        "Good posture is the invisible technique that makes everything easier. Poor posture creates tension, pain, and limits speed and accuracy.",
      objectives: [
        "Neutral spine — no hunching over the guitar body",
        "Guitar neck at 30–45° angle upward",
        "Fretting elbow hangs freely below the neck",
      ],
    },
    exercises: [
      {
        id: "ex-u-pos-1",
        type: "technique",
        prompt:
          "Sit at the edge of a chair with the guitar on your right leg. Check: shoulders even, back straight, can breathe easily. Adjust until it feels natural.",
        xpValue: 20,
        selfAssessment: true,
        focusPoints: ["No hunching over the body", "Can see frets without bending neck down"],
      },
      {
        id: "ex-u-pos-2",
        type: "technique",
        prompt:
          "Raise the guitar neck to 45°. Notice how the fretting hand reaches the nut without stretching. Lower it, then restore. Repeat 10 times.",
        xpValue: 20,
        selfAssessment: true,
        focusPoints: ["Neck angled up, not flat", "Left elbow drops naturally"],
      },
      {
        id: "ex-u-pos-3",
        type: "technique",
        prompt:
          "Play any note on frets 1–3 sitting, then stand with a strap at the same height. Alternate sitting and standing for 2 minutes. Posture should feel the same.",
        xpValue: 20,
        selfAssessment: true,
        focusPoints: ["Strap keeps guitar at sitting height", "Posture consistent both ways"],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 2 — Rhythm Children (require only u-rhythm)
  // ════════════════════════════════════════

  {
    id: "u-rhythm-quarter",
    label: "Quarter Notes",
    archetype: "universal",
    tier: 2,
    branch: "rhythm-timing",
    xpReward: 80,
    prerequisites: ["u-rhythm"],
    position: { x: 2, y: -2.5 },
    content: {
      description:
        "Quarter notes last 1 beat each — the most fundamental unit. Four fill one measure. Most strumming and riff playing lives at the quarter-note level.",
      objectives: [
        "Strum one down-stroke per metronome click",
        "Feel a quarter note as 'one click of the metronome'",
        "Sustain steady quarter notes at 80 BPM",
      ],
    },
    exercises: [
      {
        id: "ex-u-qn-1",
        type: "technique",
        prompt:
          "Strum a down-stroke on every metronome click at 60 BPM for 2 minutes. Open strings only. Say beat numbers aloud: 1, 2, 3, 4.",
        xpValue: 30,
        durationSeconds: 120,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["One strum per click", "Even tone on every beat", "Count stays steady"],
      },
      {
        id: "ex-u-qn-2",
        type: "technique",
        prompt:
          "Quarter notes at 80 BPM for 90 seconds. This is a common song tempo — get comfortable here.",
        xpValue: 25,
        durationSeconds: 90,
        bpm: 80,
        selfAssessment: true,
        focusPoints: ["Stay on the click at faster tempo", "Wrist stays loose", "No rushing between beats"],
      },
      {
        id: "ex-u-qn-3",
        type: "performance",
        prompt:
          "Strum quarter notes on the Smoke on the Water intro chord (open Em feel — strings 6 and 5 open) for 2 minutes at 70 BPM.",
        xpValue: 25,
        durationSeconds: 120,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["Steady, even strum feel", "Both strings ring clearly", "Don't rush or slow down"],
      },
    ],
  },

  {
    id: "u-rhythm-eighth",
    label: "Eighth Notes",
    archetype: "universal",
    tier: 2,
    branch: "rhythm-timing",
    xpReward: 100,
    prerequisites: ["u-rhythm"],
    position: { x: 5, y: -2.5 },
    content: {
      description:
        "Eighth notes divide each beat in half — 8 per measure. Down-up strumming creates eighth notes. This is where strumming patterns begin.",
      objectives: [
        "Count 'one-and-two-and-three-and-four-and'",
        "Strum down on numbers, up on 'and'",
        "Maintain a pendulum-like arm motion",
      ],
    },
    exercises: [
      {
        id: "ex-u-en-1",
        type: "theory",
        prompt:
          "Without the guitar: clap on every beat (1-2-3-4) while tapping your foot. Then add claps between beats on the 'ands'. Count aloud at 60 BPM for 2 minutes.",
        xpValue: 30,
        durationSeconds: 120,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Foot stays on the beat", "Hands are exactly twice the foot's speed", "Ands are perfectly between beats"],
      },
      {
        id: "ex-u-en-2",
        type: "technique",
        prompt:
          "Strum all open strings with continuous down-up motion at 60 BPM for 2 minutes. Down on 1-2-3-4, up on each 'and'. Keep moving even if you miss an up-strum.",
        xpValue: 40,
        durationSeconds: 120,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Arm moves like a pendulum", "Up-strokes are lighter but present", "Never stop the arm"],
      },
      {
        id: "ex-u-en-3",
        type: "performance",
        prompt:
          "Alternate 1 measure of quarter notes and 1 measure of eighth notes for 4 cycles at 70 BPM. Feel how the eighth notes feel busier and more energetic.",
        xpValue: 30,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["Clear feel difference between sections", "Tempo stays consistent", "Even volume on ups and downs"],
      },
    ],
  },

  {
    id: "u-rhythm-rests",
    label: "Rests & Silence",
    archetype: "universal",
    tier: 2,
    branch: "rhythm-timing",
    xpReward: 80,
    prerequisites: ["u-rhythm"],
    position: { x: 8, y: -2.5 },
    content: {
      description:
        "Silence is as musical as sound. Rests are counted beats of silence — stopping cleanly on cue is one of the most expressive skills in rhythm guitar.",
      objectives: [
        "Count through rests without losing the beat",
        "Mute strings cleanly with the strumming hand",
        "Use silence to create rhythmic tension and release",
      ],
    },
    exercises: [
      {
        id: "ex-u-rest-1",
        type: "theory",
        prompt:
          "At 60 BPM: strum on beat 1, count 2 silently, strum beat 3, count 4 silently. 8 measures. Stay in time through the silence — count it, don't skip it.",
        xpValue: 25,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Beats 2 and 4 are silent but counted", "Strum lands exactly on 1 and 3", "Don't rush to fill the silence"],
      },
      {
        id: "ex-u-rest-2",
        type: "technique",
        prompt:
          "Lay your picking hand flat on the strings immediately after strumming to mute. Strum-mute alternating at quarter notes, 70 BPM, 2 minutes.",
        xpValue: 30,
        durationSeconds: 120,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["Mute is immediate and clean", "No string sustain bleeds through", "Motion stays even with the beat"],
      },
      {
        id: "ex-u-rest-3",
        type: "performance",
        prompt:
          "Play this 1-measure riff with a rest: D - D - (rest) D (rest) — 8 times at 65 BPM. The rests create the signature rhythmic punch.",
        xpValue: 25,
        bpm: 65,
        selfAssessment: true,
        focusPoints: ["Rests are clean — no bleed", "Strums hit with rhythmic intention", "Pattern feels musical"],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 3 — Integration Nodes
  // ════════════════════════════════════════

  {
    id: "u-finger-coord",
    label: "Finger Coordination",
    archetype: "universal",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["u-tech-rh", "u-tech-lh"],
    position: { x: -8, y: 0 },
    content: {
      description:
        "Music requires the left and right hands to work as one. Fret and pick must land on the same beat — every time. This is where technique becomes real.",
      objectives: [
        "Fret a note cleanly the instant the pick strikes",
        "Play a single-note line with both hands synchronized",
        "Maintain coordination at 70 BPM for 1 minute",
      ],
    },
    exercises: [
      {
        id: "ex-u-fc-1",
        type: "technique",
        prompt:
          "Fret fret 2 of the 3rd string with your middle finger. Pick it. Release — pick the open string. Repeat 2 minutes at 60 BPM. Fret and pick must land together.",
        xpValue: 50,
        durationSeconds: 120,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Fret and pick land simultaneously", "No buzzing on fretted note", "Open string rings cleanly too"],
      },
      {
        id: "ex-u-fc-2",
        type: "technique",
        prompt:
          "Chromatic run: frets 1-2-3-4 on every string from 6th to 1st, alternate picking, one note per click at 55 BPM. Go up and back 3 times.",
        xpValue: 55,
        bpm: 55,
        selfAssessment: true,
        focusPoints: ["Every note rings clean", "Pick direction alternates consistently", "Fretting hand stays relaxed"],
      },
      {
        id: "ex-u-fc-3",
        type: "performance",
        prompt:
          "Play the riff: 6th string 0-2-3, 5th string 0-2-3 at 65 BPM, quarter notes. Repeat 8 times. Two-hand coordination in action.",
        xpValue: 45,
        bpm: 65,
        selfAssessment: true,
        focusPoints: ["Clean string transitions", "Fret just before the pick", "Steady tempo throughout"],
      },
    ],
  },

  {
    id: "u-fretboard-basics",
    label: "Fretboard Basics",
    archetype: "universal",
    tier: 3,
    branch: "fretboard-theory",
    xpReward: 120,
    prerequisites: ["u-tech-posture"],
    position: { x: -4, y: 0 },
    content: {
      description:
        "The fretboard is a visual map of all music. Each fret raises pitch by one semitone. Knowing the open strings and first-position notes gives you a foundation to navigate anywhere.",
      objectives: [
        "Name the six open strings: E-A-D-G-B-e",
        "Find all natural notes on the 6th string (frets 0–12)",
        "Locate the same note in two different positions",
      ],
    },
    exercises: [
      {
        id: "ex-u-fb-1",
        type: "theory",
        prompt:
          "Play each open string from 6th to 1st while saying its name: E-A-D-G-B-e. Use the mnemonic 'Eddie Ate Dynamite, Good Bye Eddie.' 10 times.",
        xpValue: 40,
        selfAssessment: true,
        focusPoints: ["Name matches the string every time", "Can say them fast and slow", "Match the name to the sound"],
      },
      {
        id: "ex-u-fb-2",
        type: "theory",
        prompt:
          "Play the natural notes on the 6th string: E(0) F(1) G(3) A(5) B(7) C(8) D(10) E(12). Say each name aloud. 5 passes up and back.",
        xpValue: 40,
        selfAssessment: true,
        focusPoints: ["Name matches the note played", "No buzzing", "You skip frets for whole steps"],
      },
      {
        id: "ex-u-fb-3",
        type: "theory",
        prompt:
          "Find the note G in 3 different places: 6th string fret 3, 5th string fret 10, and 4th string fret 5. Play each and compare — they're all G, different octaves.",
        xpValue: 40,
        selfAssessment: true,
        focusPoints: ["All 3 are the same note name", "Different octaves — higher or lower", "Use ear to confirm similarity"],
      },
    ],
  },

  {
    id: "u-strum-1",
    label: "First Strum Patterns",
    archetype: "universal",
    tier: 3,
    branch: "rhythm-timing",
    xpReward: 180,
    prerequisites: ["u-rhythm-quarter", "u-rhythm-eighth", "u-rhythm-rests"],
    position: { x: 3, y: 0 },
    content: {
      description:
        "Strum patterns combine note values and rests into repeating rhythmic grooves. These are the figures that make songs feel like songs.",
      objectives: [
        "Play Pattern 1: D-DU-UDU (the folk/pop strum)",
        "Play Pattern 2: D-D-UDU (driving pattern)",
        "Switch between patterns at 70 BPM cleanly",
      ],
    },
    exercises: [
      {
        id: "ex-u-sp-1",
        type: "technique",
        prompt:
          "Pattern 1 — D-DU-UDU at 60 BPM, open strings. Count: '1 (2) and (3) and 4 and'. The arm moves even on rests. 3 minutes.",
        xpValue: 60,
        durationSeconds: 180,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Arm moves even when not strumming", "Pattern feels like 1 breath, not 7 moves", "Groove it"],
      },
      {
        id: "ex-u-sp-2",
        type: "technique",
        prompt:
          "Pattern 2 — D-D-UDU at 65 BPM. Count: '1-2-(3) and-4-and'. This gives a driving, forward momentum. 3 minutes open strings.",
        xpValue: 60,
        durationSeconds: 180,
        bpm: 65,
        selfAssessment: true,
        focusPoints: ["Beats 1 and 2 are solid downstrokes", "The UDU at the end feels like a spin-out", "Don't just play — groove"],
      },
      {
        id: "ex-u-sp-3",
        type: "performance",
        prompt:
          "Alternate Pattern 1 and Pattern 2 every 4 measures at 70 BPM for 4 minutes over any open chord you know (Em, Am, or just open strings).",
        xpValue: 60,
        durationSeconds: 240,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["Clean switch at the bar line", "No tempo drop on the switch", "Patterns feel distinctly different"],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 4 — Convergence Nodes
  // ════════════════════════════════════════

  {
    id: "u-riff-mech",
    label: "Riff Mechanics",
    archetype: "universal",
    tier: 4,
    branch: "technique",
    xpReward: 200,
    prerequisites: ["u-finger-coord", "u-fretboard-basics"],
    position: { x: -6, y: 2.5 },
    content: {
      description:
        "A riff is a short, repeated musical phrase that drives a song. Playing riffs requires clean two-hand coordination, note knowledge, and accurate positioning on the neck.",
      objectives: [
        "Play a 4-note riff cleanly at 70 BPM",
        "Switch string smoothly without gap in timing",
        "The Smoke on the Water riff: G-Bb-C | G-Bb-Db-C",
      ],
    },
    exercises: [
      {
        id: "ex-u-rm-1",
        type: "technique",
        prompt:
          "Learn the riff position: 6th string frets 3-6-8, 5th string 3-6-7-8 (power-chord groupings). Practice just the left-hand shapes slowly without picking.",
        xpValue: 65,
        selfAssessment: true,
        focusPoints: ["Fingers land in position before the pick", "No tension in the forearm", "Each shape is prepared ahead of time"],
      },
      {
        id: "ex-u-rm-2",
        type: "technique",
        prompt:
          "Add picking: play 6th string frets 3-6-8 with alternate picking at 55 BPM. Every note must ring clearly. 5 passes up and back.",
        xpValue: 70,
        bpm: 55,
        selfAssessment: true,
        focusPoints: ["Clean articulation on every fret", "Pick direction consistent", "No buzzing"],
      },
      {
        id: "ex-u-rm-3",
        type: "performance",
        prompt:
          "Play the two string groups back to back: 6th string (3-6-8) then 5th string (3-6-7-8) at 60 BPM. This is the skeleton of the full Smoke on the Water riff.",
        xpValue: 65,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["String change is clean and on time", "No stopping between the two groups", "Sounds like a riff, not exercises"],
      },
    ],
  },

  {
    id: "u-open-chords",
    label: "Open Chord Shapes",
    archetype: "universal",
    tier: 4,
    branch: "harmony-chords",
    xpReward: 180,
    prerequisites: ["u-strum-1"],
    position: { x: 0, y: 2.5 },
    content: {
      description:
        "Open chords use open strings combined with fretted notes. E, Em, A, Am, D, G, and C are the core vocabulary that powers thousands of songs.",
      objectives: [
        "Play Em, Am, E, A, D, G cleanly with no buzzing",
        "Transition between any two chords in 2 beats at 70 BPM",
        "Strum a chord and let every string ring",
      ],
    },
    exercises: [
      {
        id: "ex-u-oc-1",
        type: "technique",
        prompt:
          "Form Em (fingers on strings 5 and 4 at fret 2). Pick each string individually — fix any buzzing. Then strum 8 times at 60 BPM.",
        xpValue: 55,
        bpm: 60,
        selfAssessment: true,
        focusPoints: ["Every string rings", "Fingertips arch clear of adjacent strings", "Minimum pressure needed"],
      },
      {
        id: "ex-u-oc-2",
        type: "technique",
        prompt:
          "Transition drill: G → C → D → G at 65 BPM, 4 strums each. 4 minutes. These 3 chords power hundreds of songs.",
        xpValue: 65,
        durationSeconds: 240,
        bpm: 65,
        selfAssessment: true,
        focusPoints: ["Fingers land simultaneously", "No gap or muted beat on chord 1", "Look ahead — form next chord while strumming current"],
      },
      {
        id: "ex-u-oc-3",
        type: "performance",
        prompt:
          "Em → Am → D → Em at 70 BPM (the 'Axis' progression), 4 strums each, using Pattern 1 strum, 3 minutes. This is your first real song-like playing.",
        xpValue: 60,
        durationSeconds: 180,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["Chord switches on beat 1", "Strum pattern stays consistent", "Sounds musical — not mechanical"],
      },
    ],
  },

  {
    id: "u-chord-harmony",
    label: "Chord Harmony",
    archetype: "universal",
    tier: 4,
    branch: "harmony-chords",
    xpReward: 180,
    prerequisites: ["u-strum-1"],
    position: { x: 6, y: 2.5 },
    content: {
      description:
        "Harmony is what happens when chords move from one to another with intention. Understanding why certain progressions feel satisfying gives you a toolkit to understand any song.",
      objectives: [
        "Play the I-IV-V (G-C-D) progression",
        "Play the I-V-vi-IV (G-D-Em-C) progression",
        "Understand major vs. minor chord by sound",
      ],
    },
    exercises: [
      {
        id: "ex-u-ch-1",
        type: "technique",
        prompt:
          "I-IV-V in G: G(4 strums)→C(4)→D(4)→G(4) at 70 BPM. Run 8 times without stopping. This powers blues, country, and rock.",
        xpValue: 60,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["No hesitation between any pair", "Feels like it 'wants' to resolve to G", "Groove it"],
      },
      {
        id: "ex-u-ch-2",
        type: "technique",
        prompt:
          "I-V-vi-IV in G: G→D→Em→C at 75 BPM, 4 strums each. This progression (or rotations) is in 'Let It Be', 'Someone Like You', 'Africa'. 8 times.",
        xpValue: 60,
        bpm: 75,
        selfAssessment: true,
        focusPoints: ["Em to C transition clean", "Progression has emotional arc", "Maintain strum feel throughout"],
      },
      {
        id: "ex-u-ch-3",
        type: "ear-training",
        prompt:
          "Listen to someone play Em or E major while you look away. Say 'major' (bright) or 'minor' (dark). 10 rounds. Trust your ear — it already knows.",
        xpValue: 60,
        selfAssessment: true,
        focusPoints: ["Bright/happy = major", "Dark/moody = minor", "Guess before confirming"],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 5 — The Song Test
  // ════════════════════════════════════════

  {
    id: "u-smoke",
    label: "Smoke on the Water",
    archetype: "universal",
    tier: 5,
    branch: "technique",
    xpReward: 400,
    prerequisites: ["u-riff-mech", "u-open-chords", "u-chord-harmony"],
    position: { x: 0, y: 5 },
    content: {
      description:
        "The most iconic riff in rock history. Smoke on the Water by Deep Purple requires everything you have learned: right-hand mechanics, left-hand accuracy, rhythm feel, fretboard knowledge, and sustained focus. This is your first performance milestone.",
      objectives: [
        "Play the full Smoke on the Water riff: G-Bb-C | G-Bb-Db-C | G-Bb-C | Bb-G",
        "Maintain tempo at 112 BPM (the original speed)",
        "Perform the riff cleanly for 30 seconds straight",
      ],
    },
    exercises: [
      {
        id: "ex-u-smoke-1",
        type: "technique",
        prompt:
          "Slow practice at 70 BPM: 6th string (3-6-8), pause, 5th string (3-6-7-8), pause. Full pattern: 3-6-8 | 3-6-8 | 3-6-8 | 6-3. These are the note positions for the riff.",
        xpValue: 130,
        bpm: 70,
        selfAssessment: true,
        focusPoints: ["Note positions memorized", "Each note rings clean", "Pause between groups is rhythmically placed"],
      },
      {
        id: "ex-u-smoke-2",
        type: "technique",
        prompt:
          "Speed up to 90 BPM. Add the rhythm: the riff has a 'rest' between phrases. Pattern: (play group 1) REST (play group 2) REST. The rests are what make it iconic.",
        xpValue: 130,
        bpm: 90,
        selfAssessment: true,
        focusPoints: ["Rests are clean — hand mutes the strings", "Both groups ring fully", "Rhythm feel is locked in"],
      },
      {
        id: "ex-u-smoke-3",
        type: "performance",
        prompt:
          "Full performance: play the complete Smoke on the Water riff at 112 BPM for 30 seconds straight — no stopping, no hesitating. You've earned this.",
        xpValue: 140,
        bpm: 112,
        durationSeconds: 30,
        selfAssessment: true,
        focusPoints: ["Full riff, start to finish, clean", "Tempo matches the original (112 BPM)", "Performance energy — play it like you mean it"],
      },
    ],
  },
];
