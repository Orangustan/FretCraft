import { SkillNode } from "../../schema/SkillNode";

export const ROCKER_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "rocker-001",
    label: "Open Chords",
    archetype: "rocker",
    tier: 1,
    branch: "harmony-chords",
    xpReward: 100,
    prerequisites: [],
    position: { x: 250, y: 800 },
    content: {
      description:
        "Master the essential open chord shapes—E, A, D, G, C, and Am—that form the backbone of rock guitar. Clean fretting and smooth transitions between these chords unlock virtually every beginner rock song.",
      objectives: [
        "Play E, A, D, G, C, and Am cleanly with no muted strings",
        "Transition between any two chords within two beats at 60 bpm",
        "Strum a simple four-bar progression using at least three chords",
      ],
      tips: [
        "Press fingertips close to the fret wire to minimize buzzing",
        "Practice chord changes slowly before adding strumming",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-001-1",
        type: "technique",
        prompt:
          "Cycle through E → A → D → G → C → Am, holding each chord for four beats at a steady tempo.",
        bpm: 60,
        xpValue: 40,
      },
      {
        id: "ex-rocker-001-2",
        type: "performance",
        prompt:
          "Play a 12-bar blues-style progression using open chords A, D, and E for one full minute.",
        bpm: 70,
        xpValue: 60,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "open major" },
      { type: "chord-type", value: "open minor" },
    ],
  },

  {
    id: "rocker-002",
    label: "Pick Technique",
    archetype: "rocker",
    tier: 1,
    branch: "technique",
    xpReward: 0,
    prerequisites: [],
    position: { x: 600, y: 800 },
    childNodeIds: [
      "rocker-002-1",
      "rocker-002-2",
      "rocker-002-3",
      "rocker-002-4",
      "rocker-002-5",
      "rocker-002-6",
    ],
    content: {
      description:
        "Develop a controlled, consistent picking hand using alternate picking and strong downstrokes—the twin foundations of rock rhythm and lead playing. Good pick technique dramatically improves speed, tone, and endurance.",
      objectives: [
        "Complete all 6 sub-nodes to unlock Pick Technique",
      ],
      mediaRefs: [
        {
          type: "pdf-excerpt",
          url: "#placeholder",
          label: "Pick Technique — Notation Sheet",
        },
        {
          type: "video",
          url: "https://youtu.be/WmQWTOimz4k?si=vs3PHEf0p2-oQY00",
          label: "Alternate Picking Fundamentals",
          hand: "right",
        },
      ],
    },
    musicElements: [
      { type: "technique", value: "alternate picking" },
      { type: "technique", value: "downstroke" },
    ],
  },

  // ── Pick Technique cluster (rocker-002 children) ─────────────────────────
  {
    id: "rocker-002-1",
    label: "Pick Grip & Setup",
    archetype: "rocker",
    tier: 1,
    branch: "technique",
    xpReward: 20,
    prerequisites: [],
    parentNodeId: "rocker-002",
    position: { x: 600, y: 1000 },
    content: {
      description:
        "Every aspect of pick technique—downstrokes, upstrokes, tone—depends on holding the pick correctly before anything else. Three variables define the grip: how much pick to expose (3–4mm past the fingertip is the standard starting point), grip firmness (enough tension to keep the pick from spinning, loose enough that the hand stays relaxed), and the angle at which the pick face meets the string. The index-and-thumb standard grip is the most widely taught starting point; variations exist but introduce extra variables before the fundamentals are in place.",
      objectives: [
        "Demonstrate the standard pick grip — pick doesn't spin or slip during strumming, hand is visibly relaxed",
        "Name the three grip variables (pick exposure, firmness, string contact angle) and describe what changing each one does",
      ],
      tips: [
        "Expose only 3–4mm of pick past the fingertip — more pick means more flex and less control at the tip",
        "If your pick spins during strumming, the grip is too loose; if your hand aches after 30 seconds, it's too tight",
        "The angle of the pick face (flat vs. angled ~45°) is separate from grip — you'll explore its effect on tone in rocker-002-4",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-002-1-1",
        type: "technique",
        prompt:
          "Intentionally hold the pick incorrectly three times: (1) grip it at the very tip with no exposed edge, (2) let it hang loosely so it wobbles, (3) squeeze as hard as you can. Notice what each feels and sounds like. Then form the standard grip and contrast it against all three. Strum the open low-E 10 times and confirm the pick stays stable and your hand stays relaxed.",
        durationSeconds: 60,
        xpValue: 10,
      },
      {
        id: "ex-rocker-002-1-2",
        type: "technique",
        prompt:
          "Pick the open low-E string 20 times at a comfortable pace, deliberately varying grip pressure from very light to very firm across the 20 strokes. Identify the pressure level where the pick is stable and the hand is not fatigued. That is your baseline grip.",
        durationSeconds: 45,
        xpValue: 10,
      },
    ],
    musicElements: [
      { type: "technique", value: "pick grip" },
    ],
  },

  {
    id: "rocker-002-2",
    label: "Downstroke Mechanics",
    archetype: "rocker",
    tier: 1,
    branch: "technique",
    xpReward: 30,
    prerequisites: ["rocker-002-1"],
    parentNodeId: "rocker-002",
    position: { x: 420, y: 1150 },
    content: {
      description:
        "The downstroke is rock's primary motion — the driver behind power chord chugging, punk eighth-note assaults, and any rhythm that needs to feel heavy and locked in. Proper downstroke motion comes from wrist rotation, not elbow swing: the forearm stays relatively still while the wrist pivots down through the string. The pick should return naturally above the string path after contact, ready to fall again. This recovery motion — getting the pick back up without consciously lifting — is what separates an economical stroke from an effortful one.",
      objectives: [
        "Execute 8 consecutive downstrokes at 100 bpm on a single string with consistent attack volume across all 8 strokes",
        "Demonstrate that the motion comes from wrist rotation, not arm movement — elbow stays still during the exercise",
      ],
      tips: [
        "Let the wrist relax between each stroke — a tense wrist tightens the motion and kills endurance",
        "Watch your elbow: if it rises and falls with each stroke, the motion is in the wrong place",
        "Practice slow enough to feel every stroke clearly before building speed",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-002-2-1",
        type: "technique",
        prompt:
          "Set a metronome to 80 bpm. Play strict downstroke eighth notes on the open low-E string for 30 seconds — two strokes per beat. Focus entirely on wrist origin and consistent volume. When clean at 80, increase to 100 bpm and repeat.",
        bpm: 80,
        bpmGoal: 100,
        durationSeconds: 60,
        xpValue: 15,
      },
      {
        id: "ex-rocker-002-2-2",
        type: "technique",
        prompt:
          "Six-string downstroke sweep: one downstroke per string, from low E to high E, at a slow and deliberate pace. Each string should sound clearly and at equal volume. Pause between strings to reset if needed. When clean string-by-string, attempt the sweep in one continuous motion without pausing.",
        durationSeconds: 60,
        xpValue: 15,
      },
    ],
    musicElements: [
      { type: "technique", value: "downstroke" },
    ],
  },

  {
    id: "rocker-002-3",
    label: "Upstroke Control",
    archetype: "rocker",
    tier: 1,
    branch: "technique",
    xpReward: 25,
    prerequisites: ["rocker-002-1"],
    parentNodeId: "rocker-002",
    position: { x: 600, y: 1150 },
    content: {
      description:
        "The upstroke is the downstroke's neglected partner. Most beginners practice downstrokes instinctively but never isolate the upstroke — the result is a 'flick' motion that produces a quieter, thinner sound that breaks the evenness of alternate picking. The upstroke is the same wrist rotation reversed: from below the string, the wrist rotates upward through the contact point. Equal volume and attack on both directions is the benchmark. Until the upstroke sounds indistinguishable from the downstroke in a recording, alternate picking will always be uneven.",
      objectives: [
        "Play 8 consecutive upstrokes at 80 bpm on a single string with volume matching your downstrokes",
        "Describe in one sentence what the wrist does differently on an upstroke versus a downstroke",
      ],
      tips: [
        "The upstroke catches less string surface than a downstroke — don't compensate by slowing down; instead, angle the pick slightly more aggressively through the string",
        "Record yourself: volume mismatches are much easier to hear on playback than in the moment",
        "The upstroke is not a backswing — it is its own articulated stroke",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-002-3-1",
        type: "technique",
        prompt:
          "Set a metronome to 70 bpm. Play strictly upstrokes on the open low-E string — one upstroke per beat — for 30 seconds. Do not allow any downstrokes. Focus on a deliberate, controlled upward motion through the string.",
        bpm: 70,
        durationSeconds: 30,
        xpValue: 12,
      },
      {
        id: "ex-rocker-002-3-2",
        type: "technique",
        prompt:
          "Play one deliberate downstroke on the open low-E, then one deliberate upstroke. Alternate slowly — one per beat at 60 bpm — and compare the sound of each stroke. Adjust the upstroke until both strokes produce the same volume. Repeat until 10 consecutive pairs are even.",
        bpm: 60,
        durationSeconds: 60,
        xpValue: 13,
      },
    ],
    musicElements: [
      { type: "technique", value: "upstroke" },
    ],
  },

  {
    id: "rocker-002-4",
    label: "Pick Angle & Tone",
    archetype: "rocker",
    tier: 1,
    branch: "ear-training",
    xpReward: 25,
    prerequisites: ["rocker-002-1"],
    parentNodeId: "rocker-002",
    position: { x: 780, y: 1150 },
    content: {
      description:
        "How the pick face contacts the string determines tone as much as amp settings do. A flat pick angle (face perpendicular to the string) produces a darker, rounder attack with a softer transient. An angled pick (30–45° tilt so the edge leads) produces a brighter, more articulate attack with a sharper transient — the sound most associated with classic rock clarity. A second variable is pick position over the body: playing near the bridge produces a tighter, brighter sound; near the neck pickup produces warmth and fullness. Knowing these relationships by ear — not just in theory — means reaching for them consciously when the song calls for it.",
      objectives: [
        "Identify flat-pick vs. angled-pick tone correctly in 5 of 5 blind A/B comparisons",
        "Describe in one sentence which pick position over the body you would use for a palm-muted power chord chug versus a clean arpeggiated lead line, and why",
      ],
      tips: [
        "The flat vs. angled difference is more dramatic on a clean tone — use a clean amp setting for this exercise so the distinction is unmistakable",
        "Bridge position sounds almost thin without distortion; add gain and the tightness becomes punch — context matters",
        "Most players settle on a default angle (usually slightly angled) and only shift intentionally for specific sonic goals",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-002-4-1",
        type: "ear-training",
        prompt:
          "On a clean amp setting, pick the open B string 5 times with the pick face completely flat (perpendicular to the string), then 5 times with the pick angled 45°. Record both sets if possible. Listen for the difference in attack sharpness and brightness. Repeat and confirm you can hear the distinction consistently.",
        durationSeconds: 60,
        xpValue: 12,
      },
      {
        id: "ex-rocker-002-4-2",
        type: "ear-training",
        prompt:
          "Play a repeating single-note pattern (four notes, any fret) three times over: once with the pick positioned directly over the bridge pickup, once in the middle of the body, once near the neck pickup. Record all three passes. Listen back and describe what changes — attack, warmth, body. Then decide: for a palm-muted rhythm part, where would you position the pick?",
        durationSeconds: 90,
        xpValue: 13,
      },
    ],
    musicElements: [
      { type: "technique", value: "pick angle" },
      { type: "technique", value: "pick position" },
    ],
  },

  {
    id: "rocker-002-5",
    label: "Alternate Picking Coordination",
    archetype: "rocker",
    tier: 1,
    branch: "technique",
    xpReward: 35,
    prerequisites: ["rocker-002-2", "rocker-002-3"],
    parentNodeId: "rocker-002",
    position: { x: 510, y: 1300 },
    content: {
      description:
        "Alternate picking means every note receives a downstroke followed by an upstroke, strictly cycling, regardless of which string you're on or where the note falls in the beat. The key discipline: the pick always continues its down-up-down-up cycle even when a stroke doesn't hit a string. This 'ghost stroke' motion keeps the hand locked to the pulse. The failure mode is 'convenience picking' — taking extra downstrokes on beat one because it feels natural — which breaks the cycle and causes timing hesitations at faster tempos. Evenness in both volume and timing across both directions is the benchmark.",
      objectives: [
        "Alternate-pick a single string for 2 minutes at 80 bpm with even attack on every note — no ghost downstrokes",
        "Play a 6-note ascending pattern (e.g., three notes per string across two strings) using strict alternate picking without losing the down-up cycle at a string change",
      ],
      tips: [
        "If you lose the cycle, stop and restart rather than scrambling to recover — rebuilding after a scramble reinforces the wrong habit",
        "Down on beats, up on the 'and': at 80 bpm, downstrokes fall on 1, 2, 3, 4; upstrokes fall between. Use this as a checkpoint",
        "The string change is the hardest moment — keep the hand moving even as it adjusts for the next string",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-002-5-1",
        type: "technique",
        prompt:
          "Set a metronome to 80 bpm. Alternate-pick the open low-E string for 2 minutes: down on every beat, up on every 'and.' Count aloud (1-and-2-and-3-and-4-and) for at least the first 30 seconds. Every note should be equal in volume and every stroke should be intentional, not reflexive.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 17,
      },
      {
        id: "ex-rocker-002-5-2",
        type: "technique",
        prompt:
          "Play three notes on the low-E string (open, 2nd fret, 4th fret) followed by three notes on the A string (open, 2nd fret, 4th fret) using strict alternate picking — the stroke that crosses strings should be whichever comes next in the cycle, not always a downstroke. Start at 60 bpm. When the cycle holds cleanly through the string change, increase to 75 bpm.",
        bpm: 60,
        bpmGoal: 75,
        durationSeconds: 90,
        xpValue: 18,
      },
    ],
    musicElements: [
      { type: "technique", value: "alternate picking" },
    ],
  },

  {
    id: "rocker-002-6",
    label: "Wrist Economy & String Crossing",
    archetype: "rocker",
    tier: 1,
    branch: "technique",
    xpReward: 40,
    prerequisites: ["rocker-002-4", "rocker-002-5"],
    parentNodeId: "rocker-002",
    position: { x: 645, y: 1450 },
    content: {
      description:
        "The synthesis test for pick technique: can the pick travel between strings without tension, extra motion, or muted intermediary strings? Wrist economy means the pick traces the shortest path between contact points — no large arm arcs, no shoulder involvement. The moment the shoulder or elbow begins compensating for string changes, accuracy and endurance both drop. This node also introduces the outside vs. inside picking distinction: outside picking (moving from a lower string to a higher one using a downstroke, or vice versa) is mechanically easier; inside picking (crossing between strings with the pick trapped between them) is harder and requires deliberate practice. Knowing this distinction explains why certain licks feel natural and others feel awkward.",
      objectives: [
        "Cross between non-adjacent strings (e.g., low E to B string) cleanly at 70 bpm using alternate picking — no muted intermediate strings",
        "Sustain an alternately-picked two-string pattern for 90 seconds at 70 bpm without pick position drift or fatigue in the wrist",
      ],
      tips: [
        "If an intermediate string rings when you don't want it to, the pick arc is too large — reduce the motion until only the target string sounds",
        "Inside picking (pick trapped between two strings at the moment of crossing) is the hardest position: practice it in slow motion, watching the hand, before adding tempo",
        "Fatigue during this exercise almost always signals too much tension — relax the wrist completely between strokes",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-002-6-1",
        type: "technique",
        prompt:
          "Set a metronome to 60 bpm. Play two notes on the low-E string followed by two notes on the D string (skipping the A string entirely) using strict alternate picking. The A string must remain silent. Start slowly enough to watch the pick path, then increase to 70 bpm when clean.",
        bpm: 60,
        bpmGoal: 70,
        durationSeconds: 90,
        xpValue: 18,
      },
      {
        id: "ex-rocker-002-6-2",
        type: "technique",
        prompt:
          "Play a repeating two-bar pattern: bar 1 is a power chord on the low E (root + 5th on A string), bar 2 is a single-note lick on the G string using alternate picking. The string jump from A to G requires the pick to cross two strings in one motion. At 70 bpm, the crossing must happen cleanly without the D string sounding. Sustain for 90 seconds.",
        bpm: 70,
        durationSeconds: 90,
        xpValue: 22,
      },
    ],
    musicElements: [
      { type: "technique", value: "string crossing" },
      { type: "technique", value: "wrist economy" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "rocker-003",
    label: "Power Chords",
    archetype: "rocker",
    tier: 2,
    branch: "harmony-chords",
    xpReward: 120,
    prerequisites: ["rocker-001"],
    position: { x: 100, y: 600 },
    content: {
      description:
        "Power chords—root plus fifth, with no third—are the defining sound of rock and punk guitar. Their distortion-friendly two-note structure lets you move effortlessly up and down the neck while maintaining a thick, aggressive tone.",
      objectives: [
        "Play movable two-string power chords on the low E and A strings in tune",
        "Shift power chords up and down the neck without losing the root position",
        "Perform a four-bar riff using power chords at 90 bpm with consistent attack",
      ],
      tips: [
        "Keep your index finger slightly barred across both strings for a solid grip",
        "Let distortion or overdrive reveal any intonation issues—fix them clean first",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-003-1",
        type: "technique",
        prompt:
          "Play power chords on the 5th, 7th, and 9th frets of the low-E string, moving between them in a repeating two-bar pattern.",
        bpm: 90,
        xpValue: 50,
      },
      {
        id: "ex-rocker-003-2",
        type: "performance",
        prompt:
          "Perform a four-bar power chord riff of your own design using at least three different root positions.",
        bpm: 100,
        xpValue: 70,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "power chord" },
      { type: "technique", value: "movable chord shapes" },
    ],
  },

  {
    id: "rocker-004",
    label: "Palm Muting",
    archetype: "rocker",
    tier: 2,
    branch: "technique",
    xpReward: 100,
    prerequisites: ["rocker-002"],
    position: { x: 600, y: 600 },
    content: {
      description:
        "Palm muting—resting the picking-hand edge lightly on the strings near the bridge—creates the chunky, percussive chug central to rock and metal rhythm guitar. Controlling mute pressure lets you blend muted and open tones for dynamic riffs.",
      objectives: [
        "Produce a consistently muted tone on the low strings with no pitch loss",
        "Alternate between palm-muted and open strokes within a single riff",
        "Sustain palm-muted eighth notes at 110 bpm for 30 seconds without fatigue",
      ],
      tips: [
        "Rest only the fleshy heel of your palm on the strings—too much pressure kills sustain",
        "Experiment with bridge placement: closer to the bridge gives a brighter chug",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-004-1",
        type: "technique",
        prompt:
          "Palm-mute eighth notes on the open low-E string for 30 seconds, keeping every note even.",
        bpm: 110,
        xpValue: 40,
      },
      {
        id: "ex-rocker-004-2",
        type: "performance",
        prompt:
          "Play a two-bar riff that alternates one bar of palm-muted notes with one bar of open strumming.",
        bpm: 100,
        xpValue: 60,
      },
    ],
    musicElements: [
      { type: "technique", value: "palm muting" },
      { type: "articulation", value: "muted" },
    ],
  },

  {
    id: "rocker-005",
    label: "Pentatonic Scale",
    archetype: "rocker",
    tier: 2,
    branch: "fretboard-theory",
    xpReward: 150,
    prerequisites: ["rocker-001"],
    position: { x: 350, y: 600 },
    content: {
      description:
        "The minor pentatonic scale is the single most important scale in rock guitar, underpinning solos from the blues to heavy metal. Learning its five positions across the neck gives you a melodic vocabulary you can use immediately.",
      objectives: [
        "Play the minor pentatonic scale in Position 1 (box shape) ascending and descending cleanly",
        "Connect at least two positions of the scale across the neck",
        "Improvise a four-bar melody over a static chord using only pentatonic notes",
      ],
      tips: [
        "Learn Position 1 in A minor first—it sits conveniently at the 5th fret",
        "Listen for the 'blue note' (b5) when you occasionally add it between the 4th and 5th scale degrees",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-005-1",
        type: "technique",
        prompt:
          "Play the A minor pentatonic scale, Position 1, ascending and descending four times without stopping.",
        bpm: 70,
        xpValue: 60,
      },
      {
        id: "ex-rocker-005-2",
        type: "ear-training",
        prompt:
          "Sing or hum each note of the pentatonic scale as you play it—match the pitch with your voice.",
        xpValue: 90,
      },
    ],
    musicElements: [
      { type: "scale", value: "minor pentatonic" },
      { type: "key", value: "A minor" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "rocker-006",
    label: "Barre Chords",
    archetype: "rocker",
    tier: 3,
    branch: "harmony-chords",
    xpReward: 200,
    prerequisites: ["rocker-003"],
    position: { x: 50, y: 400 },
    content: {
      description:
        "Barre chords—where the index finger frets all six strings across one fret—unlock every major and minor chord shape across the entire neck. They demand more left-hand strength than open chords but give you complete harmonic freedom.",
      objectives: [
        "Play an E-shape barre chord on the 5th fret (A major) with all strings ringing clearly",
        "Play an A-shape barre chord on the 3rd fret (C major) cleanly",
        "Move between two barre chords a whole step apart without pausing",
      ],
      tips: [
        "Roll your index finger slightly toward the nut side—the bony edge barres more cleanly than the flat pad",
        "Squeeze from the thumb behind the neck rather than cramping the hand",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-006-1",
        type: "technique",
        prompt:
          "Hold an E-shape barre chord on the 5th fret. Pluck each string individually to confirm it rings clean.",
        xpValue: 80,
      },
      {
        id: "ex-rocker-006-2",
        type: "performance",
        prompt:
          "Strum a four-chord progression using barre chords only: A – D – E – D, two beats each.",
        bpm: 80,
        xpValue: 120,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "barre major" },
      { type: "chord-type", value: "barre minor" },
      { type: "technique", value: "index finger barre" },
    ],
  },

  {
    id: "rocker-007",
    label: "Rock Rhythm Patterns",
    archetype: "rocker",
    tier: 3,
    branch: "rhythm-timing",
    xpReward: 175,
    prerequisites: ["rocker-003", "rocker-004"],
    position: { x: 300, y: 400 },
    content: {
      description:
        "Rock rhythm guitar is built on repeating patterns that lock in with the drummer and drive the song forward. Combining power chords and palm muting into structured rhythmic figures is what separates 'playing chords' from 'playing rock.",
      objectives: [
        "Execute a 16th-note power chord pattern with alternating palm mute and open strokes",
        "Perform a syncopated rhythm figure with rests on beats 2 and 4",
        "Maintain a consistent groove for a full 60-second backing track",
      ],
      tips: [
        "Lock your strumming hand to a steady eighth-note motion even when you're not hitting the strings",
        "Practice with a metronome before adding palm muting—timing suffers when technique gets harder",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-007-1",
        type: "technique",
        prompt:
          "Play a repeated two-bar power chord figure: eight palm-muted eighth notes followed by two open quarter-note strums.",
        bpm: 100,
        xpValue: 75,
      },
      {
        id: "ex-rocker-007-2",
        type: "performance",
        prompt:
          "Perform a 60-second rhythm part over a drone using at least two distinct rhythmic patterns.",
        bpm: 110,
        xpValue: 100,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "eighth-note chug" },
      { type: "rhythm-pattern", value: "syncopated accent" },
      { type: "time-signature", value: "4/4" },
    ],
  },

  {
    id: "rocker-008",
    label: "Pentatonic Lead",
    archetype: "rocker",
    tier: 3,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["rocker-005"],
    position: { x: 530, y: 400 },
    content: {
      description:
        "Pentatonic lead playing turns scale knowledge into expressive melodies by adding phrasing, rhythm, and dynamics to raw note choices. Learning to 'speak' the pentatonic scale—not just run it—is the core skill of classic rock soloing.",
      objectives: [
        "Play a six-note pentatonic phrase that starts and ends on the root",
        "Use quarter-note and eighth-note rhythms to shape a four-bar melodic idea",
        "Respond call-and-response style: play a phrase, leave space, answer it",
      ],
      tips: [
        "Less is more—a three-note phrase with good rhythm beats a 16-note flurry with none",
        "Target the root or fifth of the chord to make phrases sound resolved",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-008-1",
        type: "theory",
        prompt:
          "Write out (or describe) a four-note pentatonic lick that resolves to the root. Play it three times in a row.",
        bpm: 80,
        xpValue: 80,
      },
      {
        id: "ex-rocker-008-2",
        type: "performance",
        prompt:
          "Improvise for 60 seconds over an A minor backing track using only the pentatonic box position. Focus on rhythm and space.",
        bpm: 90,
        xpValue: 120,
      },
    ],
    musicElements: [
      { type: "scale", value: "minor pentatonic" },
      { type: "technique", value: "melodic phrasing" },
      { type: "dynamic", value: "call and response" },
    ],
  },

  {
    id: "rocker-009",
    label: "String Bending",
    archetype: "rocker",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["rocker-005"],
    position: { x: 700, y: 400 },
    content: {
      description:
        "String bending—pushing or pulling a fretted string sideways to raise its pitch—is the most emotionally expressive technique in rock guitar. A well-executed whole-step bend sounds vocal and human; a sloppy one sounds out of tune.",
      objectives: [
        "Bend the B string at the 7th fret a whole step in tune (targeting the pitch of the 9th fret)",
        "Perform a pre-bend and release without picking twice",
        "Execute three consecutive bends in a phrase without losing pitch accuracy",
      ],
      tips: [
        "Use multiple fingers stacked behind the bending finger to add strength and control",
        "Reference pitch: fret the target note first so your ear knows exactly where to land",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-009-1",
        type: "technique",
        prompt:
          "Bend the G string at the 7th fret a whole step, checking pitch against the open B string. Repeat 10 times.",
        xpValue: 70,
      },
      {
        id: "ex-rocker-009-2",
        type: "ear-training",
        prompt:
          "Listen to a reference pitch, then bend to match it by ear without looking at another fret.",
        xpValue: 80,
      },
    ],
    musicElements: [
      { type: "technique", value: "whole-step bend" },
      { type: "technique", value: "pre-bend and release" },
      { type: "articulation", value: "bent note" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "rocker-010",
    label: "Vibrato & Sustain",
    archetype: "rocker",
    tier: 4,
    branch: "technique",
    xpReward: 225,
    prerequisites: ["rocker-009"],
    position: { x: 700, y: 200 },
    content: {
      description:
        "Vibrato—rhythmic pitch oscillation applied to a sustained note—is the signature of a mature rock guitarist and is as personal as a fingerprint. Combined with maximizing sustain, it transforms single notes into singing, emotive statements.",
      objectives: [
        "Apply a controlled, even vibrato to a sustained note for four beats without the pitch wandering flat",
        "Vary vibrato width (narrow vs. wide) and speed within a single phrase",
        "Hold a note with natural guitar sustain for two full beats before applying vibrato",
      ],
      tips: [
        "Drive vibrato from the wrist and forearm rotation, not finger wiggling alone",
        "Listen to B.B. King or David Gilmour to hear how vibrato width conveys emotion",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-010-1",
        type: "technique",
        prompt:
          "Fret any note on the B string, let it sustain one beat, then apply a slow and even vibrato for three beats. Repeat four times.",
        bpm: 60,
        xpValue: 90,
      },
      {
        id: "ex-rocker-010-2",
        type: "performance",
        prompt:
          "Play a slow four-bar melody where every phrase ends with a bent note held with vibrato for at least two beats.",
        bpm: 70,
        xpValue: 135,
      },
    ],
    musicElements: [
      { type: "technique", value: "vibrato" },
      { type: "articulation", value: "sustain" },
      { type: "dynamic", value: "expressive" },
    ],
  },

  {
    id: "rocker-011",
    label: "Sweep Picking",
    archetype: "rocker",
    tier: 4,
    branch: "technique",
    xpReward: 300,
    prerequisites: ["rocker-008", "rocker-004"],
    position: { x: 400, y: 200 },
    content: {
      description:
        "Sweep picking—dragging the pick across multiple strings in one fluid motion while fretting an arpeggio shape—produces the fast, cascading runs associated with neo-classical and progressive rock. It requires both hands to synchronize precisely.",
      objectives: [
        "Execute a three-string minor arpeggio sweep ascending and descending cleanly",
        "Gradually increase speed from 60 to 100 bpm while maintaining note clarity",
        "Incorporate a sweep into a short lead phrase that begins and ends with single-note lines",
      ],
      tips: [
        "Roll the fretting finger across the strings of the arpeggio to avoid accidentally ringing notes together",
        "Start painfully slow—sweep picking learned sloppily is very hard to unlearn",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-011-1",
        type: "technique",
        prompt:
          "Sweep a three-string Am arpeggio (e.g., 5th-fret shape) up and down at 60 bpm. Each string should sound individually, not as a strum.",
        bpm: 60,
        xpValue: 120,
      },
      {
        id: "ex-rocker-011-2",
        type: "performance",
        prompt:
          "Build a four-bar lead section that uses one sweep arpeggio as its climax surrounded by pentatonic single-note lines.",
        bpm: 90,
        xpValue: 180,
      },
    ],
    musicElements: [
      { type: "technique", value: "sweep picking" },
      { type: "chord-type", value: "arpeggio" },
      { type: "scale", value: "minor arpeggio" },
    ],
  },

  {
    id: "rocker-012",
    label: "Improvisation",
    archetype: "rocker",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 350,
    prerequisites: ["rocker-008", "rocker-007"],
    position: { x: 570, y: 200 },
    content: {
      description:
        "Improvisation is the ability to compose melodic and rhythmic ideas in real time over a chord progression, drawing on all your technical and theoretical knowledge at once. A fluent improviser listens as much as they play, shaping phrases around what the band is doing.",
      objectives: [
        "Improvise a 12-bar solo over a standard rock blues progression using pentatonic and chromatic passing tones",
        "Intentionally vary dynamics—play at least one very quiet phrase and one that peaks in intensity",
        "Trade four-bar phrases with a backing track or bandmate, responding to what you hear",
      ],
      tips: [
        "Sing your intended phrase before you play it—your fingers will follow your ear more reliably",
        "Target chord tones on beat 1 of each new chord to keep solos sounding intentional",
      ],
    },
    exercises: [
      {
        id: "ex-rocker-012-1",
        type: "ear-training",
        prompt:
          "Listen to eight bars of a backing track, then improvise eight bars in response. Focus on reacting to the music, not executing patterns.",
        bpm: 100,
        xpValue: 140,
      },
      {
        id: "ex-rocker-012-2",
        type: "performance",
        prompt:
          "Perform a full 12-bar improvised solo from start to finish. Record yourself, then listen back and identify one phrase you want to improve.",
        bpm: 90,
        xpValue: 210,
      },
    ],
    musicElements: [
      { type: "scale", value: "minor pentatonic" },
      { type: "technique", value: "improvisation" },
      { type: "dynamic", value: "expressive phrasing" },
      { type: "rhythm-pattern", value: "varied rhythmic density" },
    ],
  },
];
