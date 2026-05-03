import { SkillNode } from "../../schema/SkillNode";

export const BLUES_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "blues-001",
    label: "12-Bar Blues Structure",
    archetype: "blues",
    tier: 1,
    branch: "harmony-chords",
    xpReward: 100,
    prerequisites: [],
    position: { x: 250, y: 200 },
    unlockCondition: undefined,
    content: {
      description:
        "The 12-bar blues is the foundational song form of American music—a three-chord, twelve-bar cycle that has powered rock, jazz, country, and R&B for over a century. Internalizing this form at a physical level, so that your ears know exactly where you are at all times, is the first essential skill for any blues guitarist.",
      objectives: [
        "Play a 12-bar blues in A using dominant seventh chords (A7, D7, E7) without losing your place in the form",
        "Count and internalize each bar of the form: I-I-I-I-IV-IV-I-I-V-IV-I-I",
        "Perform the form at slow, medium, and fast tempos while maintaining steady time",
        "Identify the I, IV, and V chords by ear in a recorded blues track",
      ],
      tips: [
        "Feel the form in four-bar phrases: four bars of I, two of IV, two of I, then the V–IV–I turnaround",
        "Sing the chord changes as you play them—even humming the root of each chord builds form awareness faster than counting",
        "Listen to Muddy Waters and B.B. King to internalize how the 12-bar form breathes and moves before worrying about embellishment",
      ],
    },
    exercises: [
      {
        id: "ex-blues-001-1",
        type: "technique",
        prompt:
          "Play a 12-bar blues in A using basic dominant seventh chords (A7, D7, E7), strumming four beats per bar. Count aloud as you play. Repeat for four full choruses without stopping.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-001-2",
        type: "ear-training",
        prompt:
          "Listen to a recorded 12-bar blues and tap your foot on every downbeat. Call out 'ONE' whenever the I chord returns. Do this for five choruses until the turnaround feels inevitable before it arrives.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-blues-001-3",
        type: "performance",
        prompt:
          "Perform a 12-bar blues in E at a medium tempo. On the last two bars (bars 11–12), play a simple turnaround lick (E down to B and back) to close the form. Repeat for three choruses.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "dominant 7th" },
      { type: "rhythm-pattern", value: "12-bar form" },
    ],
  },

  {
    id: "blues-002",
    label: "Blues Scale",
    archetype: "blues",
    tier: 1,
    branch: "fretboard-theory",
    xpReward: 100,
    prerequisites: [],
    position: { x: 600, y: 200 },
    unlockCondition: undefined,
    content: {
      description:
        "The blues scale is the minor pentatonic scale with one crucial addition—the 'blue note,' a flatted fifth that adds dissonance, grit, and emotional tension. This six-note scale is the primary melodic tool of blues guitar and forms the foundation for rock, country, and jazz improvisation.",
      objectives: [
        "Play the blues scale in A (A C D Eb E G A) ascending and descending in the box position at the 5th fret",
        "Identify and emphasize the blue note (Eb in A blues) as a passing or target tone",
        "Improvise an 8-bar melody over an A7 chord using only blues scale tones",
        "Play the blues scale in two connected positions across the neck",
      ],
      tips: [
        "The blue note (b5) sounds best as a passing tone—slide or bend through it to your target, don't sit on it too long",
        "Learn the box shape in A minor at the 5th fret first: it's the most common starting point and sits right in the middle of the neck",
        "Listen to Buddy Guy and Albert King to hear how different players approach the blue note differently—from a quick flash to a sustained wail",
      ],
    },
    exercises: [
      {
        id: "ex-blues-002-1",
        type: "technique",
        prompt:
          "Play the A blues scale (A C D Eb E G) in the box position ascending and descending four times in a row. On every repetition, slightly emphasize the Eb (blue note) by playing it a touch louder.",
        bpm: 65,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-blues-002-2",
        type: "ear-training",
        prompt:
          "Play the minor pentatonic scale over an A7 drone, then add the blue note (Eb). Hear how the Eb adds tension. Now improvise freely, using the Eb as a passing tone that resolves up to the E natural or down to the D.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-002-3",
        type: "performance",
        prompt:
          "Improvise for two minutes over a static A7 chord using only the blues scale. Focus on short, rhythmic phrases with space between them. Use the blue note at least once per phrase.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "scale", value: "blues scale" },
      { type: "scale", value: "minor pentatonic" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "blues-003",
    label: "String Bends",
    archetype: "blues",
    tier: 2,
    branch: "technique",
    xpReward: 120,
    prerequisites: ["blues-001", "blues-002"],
    position: { x: 100, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "String bending is the most expressive and immediately identifiable technique in blues guitar—it stretches a note to a higher pitch, mimicking the human voice and making the guitar 'cry.' Precise half-step and whole-step bends are the vocabulary of blues, requiring strength, control, and a keen ear for pitch.",
      objectives: [
        "Execute a controlled whole-step bend on the G string at the 7th fret, hitting the pitch of the 9th fret in tune",
        "Perform a half-step bend on the B string at the 8th fret accurately and repeatedly",
        "Play a pre-bend (bend before picking) and release it smoothly without re-picking",
        "Incorporate bends into a 4-bar blues lick with musical intention",
      ],
      tips: [
        "Use your ring finger as the primary bending finger and stack your middle and index fingers behind it for support—three-finger strength is essential",
        "Always reference the target pitch first: fret the note two frets higher, hear it, then bend up to match it",
        "Bend upward toward the ceiling (toward the low strings) on the lower strings, and downward toward the floor on the high strings—this gives you leverage",
      ],
    },
    exercises: [
      {
        id: "ex-blues-003-1",
        type: "technique",
        prompt:
          "On the G string at the 7th fret, execute ten whole-step bends in a row. After each bend, play the 9th fret note to check your pitch accuracy. Adjust until every bend lands exactly on target.",
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-blues-003-2",
        type: "ear-training",
        prompt:
          "Without looking at the fretboard, play the A blues scale and bend the 3rd (C) up a half step to C# by ear. Verify against the fretted C# afterward. Repeat for the 5th (E) bent up a whole step to F#.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-003-3",
        type: "performance",
        prompt:
          "Build a four-bar blues lick that includes at least one whole-step bend, one half-step bend, and one pre-bend and release. Play it over an A7 backing until it feels musical and not mechanical.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "technique", value: "whole-step bend" },
      { type: "technique", value: "pre-bend and release" },
    ],
  },

  {
    id: "blues-004",
    label: "Shuffle Rhythm",
    archetype: "blues",
    tier: 2,
    branch: "rhythm-timing",
    xpReward: 120,
    prerequisites: ["blues-001"],
    position: { x: 350, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The shuffle is the heartbeat of blues music—a swinging, triplet-based rhythmic feel where eighth notes are played with a long-short-long-short lilt rather than evenly. Mastering the shuffle groove transforms your playing from mechanical to soulful and locks you in with any blues rhythm section.",
      objectives: [
        "Strum a shuffle pattern over a 12-bar blues in A with consistent swing feel",
        "Play a moving bass-note shuffle pattern (alternating root and fifth) with your fretting hand",
        "Maintain the shuffle feel at tempos from 70 to 130 bpm without rushing or dragging",
        "Differentiate by ear between a straight eighth-note feel and a shuffle feel",
      ],
      tips: [
        "Think of the shuffle as 'dun-duh dun-duh'—the long note is twice as long as the short note, fitting a triplet subdivision",
        "A simple way to feel it: say 'trip-let trip-let' while tapping your foot, then play the first and third subdivisions only",
        "Record yourself shuffling and compare it to a recording—small timing inconsistencies become obvious in playback",
      ],
    },
    exercises: [
      {
        id: "ex-blues-004-1",
        type: "technique",
        prompt:
          "Strum a shuffle pattern on an A7 chord (long-short eighth-note triplet feel) for four bars. Then move to D7 for two bars, back to A7 for two bars, E7–D7–A7–A7 to complete the 12-bar form. Repeat four times.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-004-2",
        type: "ear-training",
        prompt:
          "Listen to three blues recordings: one straight feel, one shuffle, one slow blues with heavy swing. Identify the rhythmic feel of each by tapping your foot and describing the subdivisions you hear.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-blues-004-3",
        type: "performance",
        prompt:
          "Play a full 12-bar blues rhythm part in E using a moving bass-note shuffle: alternate between the root and fifth on beats 1 and 2 of each bar. Keep the groove locked for three choruses.",
        bpm: 95,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "shuffle" },
      { type: "technique", value: "swing feel" },
    ],
  },

  {
    id: "blues-005",
    label: "Blues Vibrato",
    archetype: "blues",
    tier: 2,
    branch: "technique",
    xpReward: 120,
    prerequisites: ["blues-002"],
    position: { x: 600, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Blues vibrato is the singer's tremolo translated to guitar—a rhythmic oscillation of pitch that makes a sustained note breathe and cry. Unlike classical vibrato, blues vibrato is typically wide and slow, driven by lateral string movement or the wrist, and is the most personal and recognizable element of any blues guitarist's voice.",
      objectives: [
        "Apply a steady, controlled vibrato to a sustained note on the B string, maintaining pitch consistency",
        "Vary vibrato speed: perform a slow, wide vibrato and a faster, narrow vibrato on the same note",
        "Add vibrato to the top note of a bend, holding the bend in pitch while oscillating",
        "Perform a 4-bar phrase where every sustained phrase-ending note has intentional vibrato",
      ],
      tips: [
        "Drive vibrato from wrist rotation and forearm movement, not just the finger—finger-only vibrato fatigues quickly and sounds thin",
        "Listen to B.B. King for a fast, narrow vibrato and Albert King for a wide, wailing vibrato—both are valid and serve different emotional moments",
        "Practice vibrato on long tones before adding it to licks: ten seconds of sustained vibrato on a single note is a worthwhile daily exercise",
      ],
    },
    exercises: [
      {
        id: "ex-blues-005-1",
        type: "technique",
        prompt:
          "Fret the B note on the 7th fret of the high E string. Play it and immediately apply a slow, wide vibrato for four full beats. Repeat for ten reps, focusing on keeping the pitch centered (not bending sharp).",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-005-2",
        type: "ear-training",
        prompt:
          "Listen to two guitar players with contrasting vibratos (e.g., B.B. King and Eric Clapton). Describe the differences: width, speed, and emotional character. Then try to imitate each on a sustained note.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-blues-005-3",
        type: "performance",
        prompt:
          "Play a 4-bar blues lick that ends each phrase on a long, sustained note with vibrato. Use at least two different vibrato speeds or widths across the four bars to show expressive control.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "technique", value: "vibrato" },
      { type: "articulation", value: "sustain" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "blues-006",
    label: "Call and Response",
    archetype: "blues",
    tier: 3,
    branch: "lead-improvisation",
    xpReward: 150,
    prerequisites: ["blues-003", "blues-004"],
    position: { x: 50, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Call and response is the conversational backbone of blues—a melodic 'question' followed by a melodic 'answer' that mirrors the tradition of field hollers and gospel music. It gives blues solos a natural, speech-like quality and structures improvisation around musical dialogue rather than continuous streams of notes.",
      objectives: [
        "Play a two-bar 'call' phrase and a distinct two-bar 'response' phrase that completes the musical idea",
        "Vary the rhythmic density between call and response: make the call busier, the response simpler (or vice versa)",
        "Create call-and-response phrases that outline the chord changes of the 12-bar form",
        "Improvise a full 12-bar solo structured entirely around call-and-response pairs",
      ],
      tips: [
        "Think of it as a conversation: the call asks a question (ends on tension), the response answers it (ends on resolution)",
        "Space is crucial—the silence between the call and response is part of the dialogue, not dead air",
        "Listen to Muddy Waters' vocals and then copy the melodic shape of his vocal phrases on guitar: blues guitar was born from imitating the voice",
      ],
    },
    exercises: [
      {
        id: "ex-blues-006-1",
        type: "technique",
        prompt:
          "Play a two-bar call phrase using the blues scale over A7. Leave two bars of space (or light strumming). Then play a two-bar response phrase that 'answers' the call—use a different rhythm or end on a different scale degree. Repeat four times.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-blues-006-2",
        type: "ear-training",
        prompt:
          "Listen to three blues tracks and identify at least two instances of melodic call-and-response in each. Note whether the response is exact repetition, rhythmic variation, or a contrasting idea.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-006-3",
        type: "performance",
        prompt:
          "Improvise a full 12-bar blues solo where every phrase is structured as a call and response. Record yourself, then listen back and mark the moments where the call and response feel most musically satisfying.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "call and response" },
      { type: "dynamic", value: "phrase shaping" },
    ],
  },

  {
    id: "blues-007",
    label: "Turnarounds",
    archetype: "blues",
    tier: 3,
    branch: "lead-improvisation",
    xpReward: 150,
    prerequisites: ["blues-004"],
    position: { x: 300, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "A turnaround is a short lick or chord figure that fills bars 11 and 12 of the 12-bar blues, creating harmonic tension that pulls the listener back into bar 1 for the next chorus. Turnarounds are among the most memorable and repeated elements in blues and are a key part of defining a player's personal style.",
      objectives: [
        "Play a classic single-note turnaround lick in A (descending chromatic line from the 6th to the V chord)",
        "Play a chord-based turnaround using a I–VI–II–V or I–V/VII–IV/VI–V movement in A",
        "Perform the turnaround smoothly within the context of a full 12-bar form without disrupting the groove",
        "Create and play two personal turnaround variations that fit different tempos (slow and fast)",
      ],
      tips: [
        "The classic descending single-note turnaround (A–F#–F–E over bars 11–12) is the first one to learn—it appears in hundreds of songs",
        "The turnaround should increase tension, not resolve it—save the resolution for beat 1 of the new chorus",
        "Mix single-note licks with double stops or chord hits for a more rhythmically varied turnaround",
      ],
    },
    exercises: [
      {
        id: "ex-blues-007-1",
        type: "technique",
        prompt:
          "Learn the classic descending turnaround in A: play the notes A–F#–F–E on the B string (descending from the 10th fret) as a triplet-feel lick in two beats. Practice until it flows smoothly at slow and medium tempos.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-007-2",
        type: "performance",
        prompt:
          "Play a full 12-bar blues in A and use your turnaround lick in bars 11–12 of every chorus. Perform three full choruses and ensure the turnaround sets up bar 1 without rushing the tempo.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-blues-007-3",
        type: "ear-training",
        prompt:
          "Listen to five blues recordings and identify the turnaround in each. Is it a single-note lick, a chord-based movement, or a rhythmic fill? Transcribe one turnaround by ear and add it to your vocabulary.",
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "technique", value: "turnaround" },
      { type: "chord-type", value: "I-VI-II-V movement" },
    ],
  },

  {
    id: "blues-008",
    label: "Double Stops",
    archetype: "blues",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["blues-003", "blues-005"],
    position: { x: 550, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Double stops—playing two strings simultaneously—add harmonic thickness and a vocal quality to blues lines that single notes alone cannot provide. Used in riffs, turnarounds, and fills, double stops are a signature sound of players like Chuck Berry, Duane Allman, and Freddie King.",
      objectives: [
        "Play a double-stop riff using 3rds on the B and G strings in the A blues position",
        "Bend a double stop (both strings simultaneously) a half step cleanly",
        "Create a repeating two-bar riff that alternates single-note lines with double-stop accents",
        "Apply vibrato to a double stop and maintain even pitch oscillation on both strings",
      ],
      tips: [
        "The most common blues double stop is two notes a third apart on adjacent strings—they harmonize naturally with the blues scale",
        "Bending double stops requires equal pressure on both strings; practice slowly to get both strings bending at the same rate",
        "Use your middle and ring fingers for double stops (one per string) and save your index for position or barre—it gives you more fingering flexibility",
      ],
    },
    exercises: [
      {
        id: "ex-blues-008-1",
        type: "technique",
        prompt:
          "On the B and G strings at the 7th and 8th frets, play a double stop (two notes a 3rd apart). Bend both strings a half step simultaneously. Repeat ten times, ensuring both notes bend evenly.",
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-blues-008-2",
        type: "performance",
        prompt:
          "Create a two-bar blues riff in A that uses at least two double stops. Play the riff over a 12-bar backing for two full choruses. The double stops should add texture without overwhelming the single-note lines.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "double stops" },
      { type: "technique", value: "interval bends" },
    ],
  },

  {
    id: "blues-009",
    label: "Slow Blues",
    archetype: "blues",
    tier: 3,
    branch: "lead-improvisation",
    xpReward: 150,
    prerequisites: ["blues-005"],
    position: { x: 750, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Slow blues is the most emotionally naked form of blues playing—with fewer notes per bar, every choice is exposed, and technique substitutes for feel nowhere. Playing well at slow tempos demands mastery of dynamics, space, vibrato, and bending, and separates guitarists who feel the music from those who outrun it.",
      objectives: [
        "Perform a full 12-bar slow blues at 50–60 bpm with at least one intentional dynamic change (soft to loud)",
        "Use space deliberately: play a phrase, leave four beats of silence, then respond",
        "Apply wide, expressive vibrato to every sustained note lasting more than two beats",
        "Control pick attack and volume to create a dynamic arc across the entire 12-bar form",
      ],
      tips: [
        "When in doubt, play fewer notes and make each one mean more—slow blues rewards restraint",
        "Vary your pick attack between feather-light and full-force to create dramatic contrast within a single phrase",
        "Listen to Freddie King's 'Have You Ever Loved a Woman' or Stevie Ray Vaughan's 'Tin Pan Alley' for masterclasses in slow blues phrasing",
      ],
    },
    exercises: [
      {
        id: "ex-blues-009-1",
        type: "technique",
        prompt:
          "Play a single-note blues phrase of four notes, letting each note sustain fully before moving to the next. Apply vibrato to the final note. The goal is not speed—each note should last at least one beat at a slow tempo.",
        bpm: 55,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-009-2",
        type: "ear-training",
        prompt:
          "Listen to Freddie King's 'Have You Ever Loved a Woman' or a similar slow blues track. Focus on the phrasing: how long does he hold notes? Where are the silences? How does the volume change across a single phrase?",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-blues-009-3",
        type: "performance",
        prompt:
          "Perform a full 12-bar slow blues solo at 55 bpm. Make a conscious decision before each phrase: will it be loud or quiet? Will you bend, vibrato, or let the note sustain plain? Record and listen for emotional honesty.",
        bpm: 55,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "dynamic", value: "expressive dynamics" },
      { type: "technique", value: "phrasing and space" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "blues-010",
    label: "Hybrid Picking",
    archetype: "blues",
    tier: 4,
    branch: "technique",
    xpReward: 200,
    prerequisites: ["blues-006", "blues-007"],
    position: { x: 150, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Hybrid picking combines the attack and control of a plectrum with the independence and warmth of fingerstyle technique, using the pick for low strings and the middle and ring fingers for higher strings simultaneously. It opens up richer, multi-voice textures that pure flatpicking or pure fingerstyle cannot achieve and is a staple of country blues, Texas blues, and roots playing.",
      objectives: [
        "Play a bass note with the pick and a treble note with the middle finger simultaneously, producing clean separation between the two voices",
        "Execute a hybrid-picking blues lick that walks a bass line while playing a melody on top",
        "Perform a 4-bar double-stop riff using hybrid picking for consistent tone on both voices",
        "Sustain hybrid picking cleanly for a full 12-bar blues at medium tempo without the technique breaking down",
      ],
      tips: [
        "Keep the pick close to the strings even when your fingers are reaching for higher strings—a large pick stroke wastes motion",
        "The snap of the middle finger against the string adds a distinctive pop—adjust pressure to control how prominent that snap is",
        "Practice the bass-note and treble-note parts separately, then combine them slowly: hybrid picking falls apart when you try to add it too quickly",
      ],
    },
    exercises: [
      {
        id: "ex-blues-010-1",
        type: "technique",
        prompt:
          "Hold an A chord shape. With the pick, pluck the open A string (bass note) while your middle finger plucks the 2nd fret of the G string (C#). Alternate between the bass note alone and the simultaneous bass-plus-treble combination. Repeat for 60 reps.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-blues-010-2",
        type: "performance",
        prompt:
          "Play a two-bar hybrid-picking blues riff: pick the bass line on the low strings while your finger plays the melody on the high strings. Use it over a 12-bar blues for two full choruses.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "hybrid picking" },
      { type: "technique", value: "fingerstyle" },
    ],
  },

  {
    id: "blues-011",
    label: "Texas Shuffle",
    archetype: "blues",
    tier: 4,
    branch: "rhythm-timing",
    xpReward: 200,
    prerequisites: ["blues-007", "blues-008"],
    position: { x: 450, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The Texas shuffle is a heavy, full-band groove most associated with Stevie Ray Vaughan—a driving, syncopated rhythm built on boogie-style bass lines, double stops, and thick, percussive chords that demand both rhythmic authority and physical stamina. It transforms the standard blues shuffle into a chest-rattling statement.",
      objectives: [
        "Play an SRV-style Texas shuffle pattern in E: alternating root-and-fifth bass notes with upper-register double stops",
        "Maintain the groove at a hard-driving tempo (130–140 bpm) for a full 12-bar form",
        "Incorporate syncopated accents on the 'and' of beat 4 without losing the underlying shuffle pulse",
        "Layer in muted string hits between the melodic double stops for a percussive, rhythmic effect",
      ],
      tips: [
        "Tune down a half step (like SRV) to get the wide string bends and thick low-end without fighting string tension",
        "The Texas shuffle is about commitment—play every note with authority. Tentative strumming kills the groove immediately",
        "Practice the bass-note alternation alone (no double stops) first, then add the upper voices once the foundation is solid",
      ],
    },
    exercises: [
      {
        id: "ex-blues-011-1",
        type: "technique",
        prompt:
          "In the key of E, play the boogie bass pattern: alternate between E (open low string) and B (2nd fret A string) in a shuffle rhythm. Hold for two bars, then move to A (open A string) and E (2nd fret D string) for one bar. Build to four full bars.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-blues-011-2",
        type: "performance",
        prompt:
          "Perform a full 12-bar Texas shuffle in E at 130 bpm. Include the bass-note alternation, double-stop accents, and at least two syncopated rhythmic hits on off-beats. Record yourself and compare the groove to an SRV recording.",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-blues-011-3",
        type: "ear-training",
        prompt:
          "Listen to 'Pride and Joy' by Stevie Ray Vaughan for two minutes, focusing exclusively on the rhythm guitar part. Identify: bass note alternation, double stop positions, syncopated hits, and how the groove changes over IV and V chords.",
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "Texas shuffle" },
      { type: "technique", value: "boogie bass line" },
    ],
  },

  {
    id: "blues-012",
    label: "Blues Expressiveness",
    archetype: "blues",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["blues-009"],
    position: { x: 700, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Blues expressiveness is the culmination of all technical skills—the ability to use dynamics, tone control, pick attack, and emotional phrasing to tell a story with every note. The truly expressive blues player uses silence as much as sound, varies tone from clean to overdriven within a single solo, and makes the guitar speak with a recognizable, personal voice.",
      objectives: [
        "Perform a 12-bar solo with a clear three-act arc: quiet and exploratory, building intensity, and a climactic peak followed by resolution",
        "Demonstrate three distinct tone colors within a single solo: clean, edge-of-breakup, and fully overdriven",
        "Use at least three different pick attack strengths within a single 12-bar solo",
        "Play the same four-bar phrase twice—once with maximum expression, once robotically—and identify exactly what makes the difference",
      ],
      tips: [
        "The greatest blues players say more with two notes played with feeling than with twenty notes played fast—always ask: 'is this note necessary?'",
        "Work backward from emotion: decide what you feel first, then choose the technique that expresses it—not the other way around",
        "Record yourself often and listen with critical ears: the difference between expressive and mechanical playing is almost always more obvious on playback than it feels in the moment",
      ],
    },
    exercises: [
      {
        id: "ex-blues-012-1",
        type: "ear-training",
        prompt:
          "Listen to a solo blues performance (e.g., Gary Moore's 'Still Got the Blues'). Focus on dynamics: where is the softest moment? The loudest? How does the player transition between them? Write down your observations.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-blues-012-2",
        type: "performance",
        prompt:
          "Record a 12-bar solo blues performance. Listen back and rate your expressiveness on three dimensions: dynamic range (1–5), tonal variety (1–5), and emotional phrasing (1–5). Re-record with attention to whichever dimension scored lowest.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-blues-012-3",
        type: "technique",
        prompt:
          "Play the same four-bar blues phrase at three different dynamic levels: pianissimo (almost whispered), mezzo-forte (conversational), and fortissimo (at the peak of intensity). Control the volume through pick attack and guitar volume knob, not amp.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "dynamic", value: "expressive dynamics" },
      { type: "technique", value: "tonal control" },
    ],
  },
];
