import { SkillNode } from "../../schema/SkillNode";

export const COUNTRY_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "country-001",
    label: "Open Country Chords",
    archetype: "country",
    tier: 1,
    branch: "harmony-chords",
    xpReward: 100,
    prerequisites: [],
    position: { x: 250, y: 200 },
    unlockCondition: undefined,
    content: {
      description:
        "Country guitar is built on ringing, open-position chords—G, C, D, A, and E—played with clarity, separation, and a bright, twangy tone. Unlike strummed rock chords, country rhythm playing emphasizes individual string articulation and thumb-driven bass notes that lock in with fiddle, steel guitar, and upright bass.",
      objectives: [
        "Play open G, C, D, A, and E major chords cleanly with all strings ringing",
        "Transition between G–C–D and A–D–E without hesitation at 80 bpm",
        "Alternate bass notes with treble chord strums (bass on beats 1 and 3, strum on 2 and 4)",
        "Play a 16-bar progression in G using open chords with a consistent country strum feel",
      ],
      tips: [
        "Keep your thumb planted on the low E or A string to anchor bass notes independently from your chord fingers",
        "Let the high strings ring open when possible—the shimmer of open strings is part of the country sound",
        "Listen to Merle Haggard's rhythm guitar for a masterclass in open-chord country feel",
      ],
    },
    exercises: [
      {
        id: "ex-country-001-1",
        type: "technique",
        prompt:
          "Play an alternating bass-strum pattern on an open G chord: thumb picks the low G string on beat 1, strum strings 2–4 on beat 2, thumb picks the D string on beat 3, strum strings 2–4 on beat 4. Hold for four bars, then repeat on C and D. Keep it steady.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-001-2",
        type: "technique",
        prompt:
          "Cycle through G–C–D–G with two beats per chord. Strum only on the beat with a clean downstroke. Focus on muting unused strings and getting every fretted string to ring cleanly before increasing speed.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-country-001-3",
        type: "performance",
        prompt:
          "Play a full 16-bar country progression in the key of G (two bars each of G, C, G, D, G, C, D, G) using alternating bass-and-strum technique. Record yourself and check for consistent time and clean string separation.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "open major chords" },
      { type: "technique", value: "alternating bass-strum" },
    ],
  },

  {
    id: "country-002",
    label: "Hybrid Picking Basics",
    archetype: "country",
    tier: 1,
    branch: "technique",
    xpReward: 100,
    prerequisites: [],
    position: { x: 600, y: 200 },
    unlockCondition: undefined,
    content: {
      description:
        "Hybrid picking—using the flatpick for downstrokes and the middle and ring fingers for simultaneous or alternating treble-string snaps—is the signature technique of country guitar. It allows a guitarist to play bass lines and melody simultaneously, producing the 'snap' and 'pop' that defines the genre's rhythmic vocabulary.",
      objectives: [
        "Play a bass note with the pick and snap a treble string with the middle finger in one smooth motion",
        "Execute a four-note arpeggio (pick low E, finger G, B, high E) cleanly and evenly",
        "Play a two-bar country riff using alternating pick-and-finger strokes on adjacent strings",
        "Maintain hybrid picking technique cleanly for 30 seconds at 80 bpm",
      ],
      tips: [
        "Keep the pick close to the strings at all times—the snap of the fingernail or fingertip does the work on the treble strings",
        "Think of the middle finger as a second pick, not a different tool—the motion should be a firm, consistent flick",
        "Practice slowly with a metronome first, then gradually increase speed—sloppy hybrid picking is worse than choosing one technique",
      ],
    },
    exercises: [
      {
        id: "ex-country-002-1",
        type: "technique",
        prompt:
          "On an open A chord: pick the A string with the pick (downstroke), then immediately snap the G string with your middle finger. Alternate: pick A, snap G, pick A, snap G. Do this for 60 repetitions, focusing on consistent tone on both strings.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-country-002-2",
        type: "technique",
        prompt:
          "Play a four-note ascending arpeggio using hybrid picking: pick the low A string, then use your middle finger on D, ring finger on G, and middle finger on B. Repeat in a triplet pattern—three repetitions per bar—for two bars.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-country-002-3",
        type: "performance",
        prompt:
          "Play a two-bar country riff using hybrid picking: create an alternating bass line on the lower strings (pick) while adding melody hits on the upper strings (fingers). Make the riff groove—it should sound musical, not mechanical.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "technique", value: "hybrid picking" },
      { type: "technique", value: "fingerstyle" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "country-003",
    label: "Chicken Pickin'",
    archetype: "country",
    tier: 2,
    branch: "technique",
    xpReward: 120,
    prerequisites: ["country-001", "country-002"],
    position: { x: 100, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Chicken pickin' is a percussive country guitar technique combining hybrid picking with deliberate string muting—the fingernail catches the string and releases it with a sharp, staccato pop that mimics the clucking of a hen. It's the defining sound of players like Albert Lee, Brent Mason, and Brad Paisley.",
      objectives: [
        "Execute a clean chicken-pickin' 'pop' on the G string by catching it with the middle fingernail and releasing sharply",
        "Play a four-bar chicken-pickin' lick in the key of A that alternates popped notes with fretted notes",
        "Incorporate muted string hits between notes for a percussive groove effect",
        "Perform a full 8-bar chicken-pickin' phrase over an A7 chord at 110 bpm",
      ],
      tips: [
        "The pop comes from your middle finger slightly catching and releasing the string—the fingernail creates the snap, not raw force",
        "Partial muting with the fretting hand between notes adds to the percussive feel and is part of the style",
        "Start with just one or two popped notes per bar, then gradually add more as you build finger independence",
      ],
    },
    exercises: [
      {
        id: "ex-country-003-1",
        type: "technique",
        prompt:
          "Hold an open A chord. Pick the A string with your flatpick (downstroke), then pop the G string with your middle fingernail for a sharp staccato snap. Alternate these two notes in a straight eighth-note pattern for two bars. The popped G should sound percussive and bright.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-003-2",
        type: "technique",
        prompt:
          "Play a simple A pentatonic lick: fret the 7th fret on the G string and pop it with your middle finger, then hammer onto the 9th fret with your ring finger. Repeat this two-note cell in a continuous loop for 30 seconds, keeping the pop consistent.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-003-3",
        type: "performance",
        prompt:
          "Build an 8-bar chicken-pickin' phrase in A that includes: at least four popped notes, two muted string hits for percussion, and one held bend. Play it over an A7 backing at 110 bpm. It should groove like a Telecaster through a clean amp.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "technique", value: "chicken pickin'" },
      { type: "technique", value: "string muting" },
    ],
  },

  {
    id: "country-004",
    label: "Pedal Steel Bends",
    archetype: "country",
    tier: 2,
    branch: "technique",
    xpReward: 120,
    prerequisites: ["country-001"],
    position: { x: 350, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Pedal steel bends imitate the smooth, multi-note pitch shifts of the pedal steel guitar—a sound integral to country music. By bending one or more strings while holding adjacent strings stationary, a guitarist creates the weeping, sliding harmonics that define country ballads and slow shuffles.",
      objectives: [
        "Execute a G-to-A bend on the B string (2nd fret to unison with the open A note on the G string) while holding the G string stationary",
        "Perform a pre-bent note that releases down from the bent position, mimicking a steel guitar descending phrase",
        "Play a four-bar country phrase that includes two distinct pedal steel-style double-note bends",
        "Combine a unison bend with vibrato, sustaining the bent note for at least two beats",
      ],
      tips: [
        "The key is the stationary note: hold one string firmly in pitch while the adjacent string bends up to meet it—the contrast creates the pedal steel sound",
        "Use light gauge strings (10s or 9s) for easier bends—country pedal steel licks require frequent full-step bends that are brutal on heavier strings",
        "Listen to Vince Gill or Don Rich playing Telecaster-style country leads to hear this technique in context",
      ],
    },
    exercises: [
      {
        id: "ex-country-004-1",
        type: "technique",
        prompt:
          "On the B string at the 2nd fret (C note), bend up a whole step to D while keeping your finger on the open G string stationary. Both notes should sound simultaneously and land in unison on D. Repeat ten times cleanly.",
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-004-2",
        type: "technique",
        prompt:
          "Pre-bend the G string at the 9th fret up a whole step (without sounding), then pick it and release the bend slowly to its normal pitch. This descending bend mimics a steel guitar slide. Repeat for ten reps, making the release smooth and controlled.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-004-3",
        type: "performance",
        prompt:
          "Play a four-bar slow country phrase in G major that features two pedal steel-style bends and ends on a long, bent note with vibrato. Think 'Sunday mornin' country'—every note should feel warm and unhurried.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "technique", value: "pedal steel bends" },
      { type: "technique", value: "unison bends" },
    ],
  },

  {
    id: "country-005",
    label: "Country Shuffle",
    archetype: "country",
    tier: 2,
    branch: "rhythm-timing",
    xpReward: 120,
    prerequisites: ["country-001"],
    position: { x: 600, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The country shuffle—a swinging, syncopated rhythm feel derived from Western swing and honky-tonk—is the rhythmic backbone of classic country music. With a slightly different lilt than the blues shuffle, it's tighter and more propulsive, driving dancers forward and locking in with fiddle and pedal steel.",
      objectives: [
        "Strum a country shuffle pattern in G at 100 bpm, emphasizing the bass note on beats 1 and 3 and the chord snap on 2 and 4",
        "Play a moving bass-line shuffle, alternating the root and fifth of each chord",
        "Maintain the shuffle groove through a I–IV–V chord progression in G without losing the swing feel",
        "Differentiate the country shuffle feel from a straight rock rhythm by demonstrating both back-to-back",
      ],
      tips: [
        "Country shuffle is slightly straighter than blues shuffle—less 'laid back,' more driving. Think honky-tonk dance floor, not smoky bar",
        "Anchor your thumb on the bass strings and let your strumming fingers handle the chord snap—this physical separation helps lock in the groove",
        "Listen to Buck Owens' recordings with Don Rich to hear the archetypal Bakersfield-style country shuffle",
      ],
    },
    exercises: [
      {
        id: "ex-country-005-1",
        type: "technique",
        prompt:
          "On an open G chord, play a shuffle rhythm: bass note (low G) on beat 1, chord snap (strings 3–1) on beat 2 off-beat, bass note (D string) on beat 3, chord snap on beat 4 off-beat. Four beats per bar, swing the eighth notes. Repeat for four bars.",
        bpm: 95,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-005-2",
        type: "technique",
        prompt:
          "Play a moving bass-line shuffle in G: alternate G root (low E, 3rd fret) and fifth (A string, 2nd fret) on beats 1 and 3 while adding the chord snap on the off-beats. Progress to C (A string, 3rd fret / D string, 2nd fret) and D (D string, open / A string, 5th fret).",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-005-3",
        type: "performance",
        prompt:
          "Play a 12-bar country shuffle in G using full chord changes (G–C–G–G–C–C–G–G–D–C–G–G). Maintain the alternating bass-note groove throughout all chord changes. At 100 bpm, it should feel like something you could two-step to.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "country shuffle" },
      { type: "technique", value: "bass-note alternation" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "country-006",
    label: "Banjo Rolls",
    archetype: "country",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["country-002", "country-003"],
    position: { x: 50, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Banjo rolls are arpeggiated picking patterns borrowed from bluegrass banjo—forward, backward, and alternating rolls that create a continuous, cascading sound across multiple strings. On guitar, these patterns (using hybrid picking) produce the fast, shimmering textures heard in country and bluegrass leads.",
      objectives: [
        "Execute a forward roll: pick strings 5–3–1 in rapid succession using pick-middle-ring in a triplet feel",
        "Execute a backward roll: pick strings 1–3–5 using ring-middle-pick",
        "Combine forward and backward rolls over an open G chord for four bars without pausing",
        "Apply a roll pattern over a chord progression (G–C–D), adjusting the chord shape while maintaining the roll",
      ],
      tips: [
        "Keep the wrist loose and low—banjo rolls require almost no arm movement, just wrist and finger action",
        "The pattern should be even in volume and timing across all three fingers. Record yourself and listen for any string that sounds louder or quieter",
        "Bela Fleck and Earl Scruggs (on banjo) are the masters—listening to their roll patterns will teach you the feel even before your fingers learn it",
      ],
    },
    exercises: [
      {
        id: "ex-country-006-1",
        type: "technique",
        prompt:
          "On an open G chord, play a forward roll: downstroke the low G string with the pick, immediately follow with the middle finger on the B string, then the ring finger on the high E string. This is one roll (three notes). Play continuously for two bars in a triplet feel.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-006-2",
        type: "technique",
        prompt:
          "Play an alternating roll over an open G chord: pick low G, middle finger B, pick D string, ring finger high E. Four notes per roll, repeat continuously in 16th notes for two bars. Keep all notes even in volume.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-006-3",
        type: "performance",
        prompt:
          "Play a roll pattern through a G–C–D progression, spending two beats on each chord. Keep the roll pattern running continuously through the chord changes—the roll should never stop, even as you shift hand positions.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "banjo rolls" },
      { type: "technique", value: "arpeggio picking" },
    ],
  },

  {
    id: "country-007",
    label: "Nashville Tuning",
    archetype: "country",
    tier: 3,
    branch: "fretboard-theory",
    xpReward: 150,
    prerequisites: ["country-004"],
    position: { x: 300, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Nashville tuning—replacing the four lower strings of a guitar with the octave-higher strings from a 12-string set—creates the shimmering, high, jangly tone heard on countless country and pop recordings when layered over a standard-tuned guitar. It's a key studio texture and a distinctive solo sound.",
      objectives: [
        "Understand the string gauges and tuning setup for Nashville tuning (strings 6–3 tuned an octave higher than standard)",
        "Play a chord progression in Nashville tuning, hearing how the octave shift changes the register and feel",
        "Play a lead melody in the upper register on a Nashville-tuned guitar and note how it cuts through a mix",
        "Record yourself playing the same chord progression on standard and Nashville tuning and compare the sonic character",
      ],
      tips: [
        "Nashville tuning requires lighter string gauges—typically an octave 12-string set. Never try to tune standard strings up an octave; they'll snap",
        "Nashville tuning is most powerful as a layering tool—it reinforces the top-end sparkle of another guitar playing the same part in standard tuning",
        "The Beatles used Nashville tuning on 'Rubber Soul' recordings; listen to 'In My Life' for a famous example of its jangly shimmer",
      ],
    },
    exercises: [
      {
        id: "ex-country-007-1",
        type: "ear-training",
        prompt:
          "Listen to two recordings of the same song or chord progression—one on a standard-tuned guitar and one on a Nashville-tuned guitar (or a 12-string). Write down three sonic differences you notice: brightness, register, resonance.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-007-2",
        type: "technique",
        prompt:
          "On a Nashville-tuned guitar (or a capo at the 12th fret to simulate the octave shift), play a simple I–IV–V progression in G. Notice how chord voicings that felt low and warm on standard tuning now shimmer and cut. Play the progression four times.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-007-3",
        type: "performance",
        prompt:
          "Play a 16-bar melody line using the Nashville-tuned guitar's upper register. Focus on the two or three highest strings, where the octave shift is most dramatic. The line should feel airy, bell-like, and bright.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "Nashville tuning" },
      { type: "technique", value: "register control" },
    ],
  },

  {
    id: "country-008",
    label: "Country Lead Phrasing",
    archetype: "country",
    tier: 3,
    branch: "lead-improvisation",
    xpReward: 150,
    prerequisites: ["country-003", "country-005"],
    position: { x: 550, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Country lead phrasing is melody-first—lines that sing, punctuated by the sharp attack of chicken pickin', the slide of pedal steel bends, and the rhythmic ghost notes between beats. Unlike blues phrasing's vocal cry, country lead playing often references the fiddle and steel guitar traditions, with clean, precise melodic statements.",
      objectives: [
        "Play an 8-bar country lead in the key of G that outlines the chord tones of G, C, and D",
        "Use at least one chicken-pickin' snap, one pedal steel bend, and one double stop within the phrase",
        "Start and end phrases on strong beats (1 or 3) while filling space with rhythmic ghost notes",
        "Demonstrate contrasting phrase lengths: one long phrase spanning four bars, one short rhythmic burst of two beats",
      ],
      tips: [
        "Country lead lines often outline the melody of the song—if you know the vocal line, play it, then embellish from there",
        "Ghost notes (barely audible muted string hits) keep the rhythm going between melodic ideas and are part of the country groove",
        "Brad Paisley's technique is the gold standard for modern country lead—his playing combines all these elements at high speed with musical intent",
      ],
    },
    exercises: [
      {
        id: "ex-country-008-1",
        type: "technique",
        prompt:
          "Play a two-bar country lead phrase in G major: start on the G note (3rd fret B string), bend up a half step, release, then walk down through the G major scale to the D note with at least one ghost note between notes.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-008-2",
        type: "ear-training",
        prompt:
          "Listen to a Brad Paisley or Albert Lee guitar solo. Identify: (1) where chicken-pickin' snaps occur, (2) where bends mimic pedal steel, (3) where ghost notes or muted hits fill rhythmic space. Count how many examples of each you hear in two minutes.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-008-3",
        type: "performance",
        prompt:
          "Improvise an 8-bar country lead solo over a G–C–D progression. Include all three techniques: at least two chicken-pickin' snaps, one pedal steel bend, and one moment of rhythmic ghost-note fills. Keep the melody singin'.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "country lead phrasing" },
      { type: "technique", value: "ghost notes" },
    ],
  },

  {
    id: "country-009",
    label: "Open-G Dobro Style",
    archetype: "country",
    tier: 3,
    branch: "technique",
    xpReward: 150,
    prerequisites: ["country-004"],
    position: { x: 750, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Open-G tuning (D G D G B D, low to high) puts a full G major chord across all six open strings, enabling lap-steel style slides, banjo-style drones, and resonator guitar vocabulary. Even on a standard guitar, open-G unlocks rich, uniquely country textures heard in classic slide work and Appalachian folk.",
      objectives: [
        "Re-tune the guitar to open-G (lower the 6th string to D, lower the 5th string to G, lower the 1st string to D)",
        "Play the open strings and confirm a full G major chord rings clearly",
        "Use a slide or bottleneck on the 12th fret to play a G major chord, then slide down to the 5th fret for a C chord",
        "Play a simple blues-country melody in open-G using slide at the 12th, 10th, and 5th frets",
      ],
      tips: [
        "Open-G slide playing requires muting the strings behind the slide with your fretting-hand fingers—unwanted string resonance muddles the sound",
        "The slide should rest lightly on the strings directly above the fret wire (not behind it like fretting)—pressing down creates buzzing and poor intonation",
        "Keith Richards (on guitar) and Jerry Douglas (on dobro) are key references for open-G vocabulary in different contexts",
      ],
    },
    exercises: [
      {
        id: "ex-country-009-1",
        type: "technique",
        prompt:
          "Re-tune to open-G: lower the low E string to D, the A string to G, and the high E string to D. Strum all six open strings—they should ring as a G major chord. Tune slowly, checking each string against a reference.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-country-009-2",
        type: "technique",
        prompt:
          "Using a slide on your ring or pinky finger, place it lightly across all strings at the 12th fret and pick each string one by one. Each note should ring clean and in tune. Then slide slowly to the 5th fret (C chord) and back to the 12th (G chord). Repeat ten times.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-009-3",
        type: "performance",
        prompt:
          "Play a simple 8-bar country-blues melody in open-G using slide technique. Move between the 12th fret (G), 10th fret (E minor feel), and 5th fret (C). The melody should feel vocal and lyrical—no rushing between positions.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "open-G tuning" },
      { type: "technique", value: "slide guitar" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "country-010",
    label: "Telecaster Twang",
    archetype: "country",
    tier: 4,
    branch: "technique",
    xpReward: 200,
    prerequisites: ["country-006", "country-007"],
    position: { x: 150, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The Telecaster's bright, biting bridge pickup tone is the most iconic sound in country guitar. Mastering Telecaster twang means controlling the attack, sustain, and 'spank' of the bridge pickup through pick angle, pick attack, and strategic use of the guitar's volume and tone controls to serve the arrangement.",
      objectives: [
        "Play a country lead line with exaggerated Telecaster spank—use a firm pick attack at a slight angle for maximum bite",
        "Demonstrate how rolling off the tone knob changes the character from crisp to warm without losing definition",
        "Play the same four-bar lick with both the bridge pickup and the neck pickup and describe the sonic difference",
        "Use right-hand palm muting and accent releases to control the snap and bloom of each note",
      ],
      tips: [
        "The Telecaster bridge pickup is brighter and thinner than other pickup positions—play into that, don't fight it. A little bit of bite is the point",
        "Pick angle matters: angling the pick slightly (not parallel to the strings) adds click and attack. Experiment to find your preferred 'spank'",
        "James Burton's work with Elvis Presley defines the classic Tele twang sound—everything from 'Suspicious Minds' to 'Mystery Train' is worth studying",
      ],
    },
    exercises: [
      {
        id: "ex-country-010-1",
        type: "technique",
        prompt:
          "Using the bridge pickup on a Telecaster (or its equivalent tone), play a two-bar lead lick in A. Attack each note with a firm, slightly angled downstroke to get maximum pick snap. Vary the attack between harder and softer strikes and listen to how the spank changes.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-010-2",
        type: "ear-training",
        prompt:
          "Play the same four-bar progression with the bridge pickup at full tone, then roll the tone knob to 5, then to 2. Listen to how the brightness shifts. Note: at what point does the tone get warm enough to lose the Tele character? Document your findings.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-country-010-3",
        type: "performance",
        prompt:
          "Play a full 12-bar country lead in A using bridge pickup Telecaster tone. Your goal: every note should have clear definition and attack. Use palm muting selectively to control sustain on rhythm sections, and let notes ring fully during melodic peaks.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "Telecaster bridge tone" },
      { type: "technique", value: "pick attack control" },
    ],
  },

  {
    id: "country-011",
    label: "Fast Country Runs",
    archetype: "country",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["country-007", "country-008"],
    position: { x: 450, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Fast country runs—scalar passages, chromatic passages, and position-shifting licks played at 130+ bpm—define the virtuosic side of modern country guitar. Players like Brent Mason, Redd Volkaert, and Brad Paisley play these lines with absolute precision at speeds that require efficient picking mechanics and years of muscle-memory development.",
      objectives: [
        "Play a G major scale run (one octave, ascending and descending) cleanly at 120 bpm using alternate picking",
        "Execute a chromatic run from the 5th fret to the 9th fret on the high E string at 130 bpm",
        "Play a two-bar country lead run that includes both a scalar passage and a chicken-pickin' burst",
        "Perform a position-shifting lick that covers two full octaves on the neck without interrupting the tempo",
      ],
      tips: [
        "Fast country runs require economy of motion—your pick should barely leave the string plane. Large pick strokes kill speed",
        "Practice with a metronome: start at 70% of your target tempo and increase by 5 bpm only when you can play cleanly for ten consecutive repetitions",
        "Many country runs include chromatic passing tones (notes outside the key) that add tension and release—they're not mistakes, they're the flavor",
      ],
    },
    exercises: [
      {
        id: "ex-country-011-1",
        type: "technique",
        prompt:
          "Play the G major scale (G A B C D E F# G) ascending and descending in eighth notes, one note per beat. Start at 90 bpm. When comfortable, increase to 110 bpm. Focus on alternate picking (down-up) and keep every note even in volume.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-011-2",
        type: "technique",
        prompt:
          "Play a chromatic run on the high E string: start at the 5th fret (A) and ascend one fret at a time to the 12th fret (E) using alternate picking in 16th notes. Then descend back. Focus on absolute clarity—every note must sound, no buzzes.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-011-3",
        type: "performance",
        prompt:
          "Improvise a two-bar blazing country run over a G chord that covers at least 12 notes. Include one scalar passage and one burst of chicken-pickin' in the same run. At 130 bpm, it should feel like a freight train.",
        bpm: 130,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "scalar runs" },
      { type: "technique", value: "chromatic passing tones" },
    ],
  },

  {
    id: "country-012",
    label: "Western Swing Chords",
    archetype: "country",
    tier: 4,
    branch: "harmony-chords",
    xpReward: 200,
    prerequisites: ["country-009"],
    position: { x: 700, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Western swing blends country rhythm with jazz harmony—dominant 7ths, 9ths, diminished passing chords, and chromatic chord substitutions played with a country groove. Bob Wills and His Texas Playboys established the genre, and the electric lead guitar vocabulary it spawned influenced everything from Merle Haggard to modern Americana.",
      objectives: [
        "Play a dominant 7th chord in four positions on the neck using movable shapes",
        "Execute a chromatic chord movement: walk from a I7 chord to a IV7 chord using two passing diminished chords",
        "Comp (accompany) a simple Western swing melody using shell voicings (root, 3rd, 7th) on the upper three strings",
        "Play a 12-bar Western swing progression incorporating 7th, 9th, and 6th chord colors",
      ],
      tips: [
        "Western swing rhythm guitar uses short, percussive chord stabs rather than full strums—mute after each hit to keep the groove tight",
        "Shell voicings (root, 3rd, 7th) are more useful than full barre chords in a Western swing context—they leave space for the steel guitar and fiddle",
        "Bob Wills' lead guitarist Eldon Shamblin defined the Western swing rhythm style—his recordings are essential listening",
      ],
    },
    exercises: [
      {
        id: "ex-country-012-1",
        type: "technique",
        prompt:
          "Play an A7 chord using four different positions on the neck (open position, 5th fret barre position, 7th fret position, and 12th fret position). Strum each with a short, staccato attack and mute immediately. Four bars, one position per bar.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-012-2",
        type: "technique",
        prompt:
          "Walk from an A7 chord to a D7 chord using chromatic passing diminished chords: A7 → A#dim → Bdim → D7. Play each chord as a two-beat stab and mute between hits. The chromatic walk should sound smooth, not jagged.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-country-012-3",
        type: "performance",
        prompt:
          "Play a 12-bar Western swing progression in A: A7–A7–A7–A7–D7–D7–A7–A7–E7–D7–A7–A7. Use shell voicings (root, 3rd, 7th) on beats 2 and 4 only. The feel should swing and groove—loose, but in the pocket.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "dominant 7th" },
      { type: "technique", value: "shell voicings" },
    ],
  },
];
