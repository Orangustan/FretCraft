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
    xpReward: 80,
    prerequisites: [],
    position: { x: 600, y: 800 },
    content: {
      description:
        "Develop a controlled, consistent picking hand using alternate picking and strong downstrokes—the twin foundations of rock rhythm and lead playing. Good pick technique dramatically improves speed, tone, and endurance.",
      objectives: [
        "Alternate-pick a single string at 80 bpm with even attack on every note",
        "Execute eight consecutive downstrokes per measure cleanly at 100 bpm",
        "Maintain relaxed grip and wrist motion throughout a two-minute exercise",
      ],
      tips: [
        "Hold the pick at roughly a 45-degree angle to the string for a brighter attack",
        "Keep wrist motion small and economical—big arm swings waste energy",
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
    exercises: [
      {
        id: "ex-rocker-002-1",
        type: "technique",
        prompt:
          "Alternate-pick the open low-E string for two minutes, keeping every note even in volume and timing.",
        bpm: 80,
        xpValue: 40,
      },
      {
        id: "ex-rocker-002-2",
        type: "technique",
        prompt:
          "Perform strict downstroke eighth notes across all six open strings, one string per measure.",
        bpm: 100,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "alternate picking" },
      { type: "technique", value: "downstroke" },
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
