import { SkillNode } from "../../schema/SkillNode";

export const VAIDEOLOGY_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "vai-001",
    label: "Notes on the Neck: Academic Study",
    archetype: "vaideology",
    tier: 1,
    branch: "fretboard-theory",
    xpReward: 90,
    prerequisites: [],
    position: { x: 250, y: 200 },
    unlockCondition: undefined,
    content: {
      description:
        "The 12-note chromatic system is the foundation of all Western music. Vai maps every note on the guitar neck methodically: natural notes (A through G), accidentals (sharp ♯, flat ♭, natural ♮, double-sharp 𝄪, double-flat 𝄫), enharmonic equivalents (F♯ = G♭), and a complete, position-independent mental map of the fretboard. Knowing music academically means knowing the names — this node makes those names second nature.",
      objectives: [
        "Name every natural note on all 6 strings from open to the 12th fret without hesitation",
        "Identify at least four enharmonic pairs (e.g., F♯/G♭, C♯/D♭) and locate both spellings on the neck for each",
        "Navigate to any named note on any string within three seconds",
        "Write the ascending chromatic scale from any starting pitch using both sharp and flat spellings, correctly identifying every enharmonic pair",
      ],
      tips: [
        "The fretboard repeats after the 12th fret — master one octave first and the second comes free",
        "Work on one string at a time: name every note aloud as you play fret by fret, then test yourself in reverse",
        "Double-sharps (𝄪) and double-flats (𝄫) appear in advanced notation; understanding them now prevents confusion when you encounter them later",
      ],
    },
    exercises: [
      {
        id: "ex-vai-001-1",
        type: "theory",
        prompt:
          "Write the ascending chromatic scale from C to C using sharps (C, C♯, D, D♯…), then from C to C using flats (C, D♭, D, E♭…). Circle every enharmonic pair. Then play both versions on a single string, saying each note name aloud.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-vai-001-2",
        type: "technique",
        prompt:
          "Fretboard Landmark Drill: starting on the low E string, name every note aloud as you play each fret from open to the 12th. Move to the A string, then the D string. Do not proceed to the next string until you can name all notes on the current string without hesitation.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-001-3",
        type: "ear-training",
        prompt:
          "Have a partner or app sound any single note on the guitar. Before looking at the fret position, say the note name aloud. Check your answer. Repeat 12 times across different strings and positions. Track your accuracy.",
        durationSeconds: 90,
        xpValue: 20,
      },
    ],
    musicElements: [
      { type: "scale", value: "chromatic" },
      { type: "technique", value: "fretboard navigation" },
    ],
  },

  {
    id: "vai-002",
    label: "Guitar Tablature & Articulation",
    archetype: "vaideology",
    tier: 1,
    branch: "music-theory",
    xpReward: 80,
    prerequisites: [],
    position: { x: 600, y: 200 },
    unlockCondition: undefined,
    content: {
      description:
        "Guitar tablature uses six lines (one per string, low E at bottom) with fret numbers to communicate pitch without requiring standard notation. As Vai notes, pure tab carries no rhythmic information — it must be paired with either standard notation or prior knowledge of the melody. This node covers tab reading, its full vocabulary of articulation symbols, and their relationship to standard notation on the treble clef staff, including the guitar-specific transposing clef (treble clef with small 8 below, indicating sounds one octave lower than written).",
      objectives: [
        "Read a simple melody correctly from tab, executing each articulation symbol accurately",
        "Execute all eight core tab articulation symbols: h (hammer-on), p (pull-off), b (bend), r (release), / (slide up), \\ (slide down), ~ (vibrato), t (tap)",
        "Locate any note from middle C to high E on the treble clef staff and find its equivalent position on the guitar",
        "Explain why guitar written pitch sounds one octave lower than concert pitch and identify the clef symbol that communicates this",
      ],
      tips: [
        "Tab is fast to read but rhythmically incomplete — always listen to the source audio when learning tab for an unknown piece",
        "Nail bend targets: a bend marked 'b' should reach the pitch of the note in parentheses above it — test by fretting that note and matching pitch by ear",
        "Palm mute (P.M.) and pinch harmonic (P.H.) are technique markings above the tab staff, not between the lines — learn to scan both the tab and the annotations above it",
      ],
    },
    exercises: [
      {
        id: "ex-vai-002-1",
        type: "technique",
        prompt:
          "Tab Symbol Drill: write out a 4-bar phrase using at least 5 different articulation symbols (bend, hammer-on, pull-off, slide, vibrato). Then play the phrase exactly as notated, verifying that each articulation matches its symbol.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-002-2",
        type: "theory",
        prompt:
          "Staff Note Recognition: identify 20 randomly ordered notes on the treble clef staff (include ledger lines from low E to high A). Aim for correct identification in under three seconds per note. Repeat until you hit 18/20 or better.",
        durationSeconds: 90,
        xpValue: 20,
      },
      {
        id: "ex-vai-002-3",
        type: "performance",
        prompt:
          "Find a short melody written in both tab and standard notation. Read one full bar ahead while playing (sight-reading technique). Repeat the passage at a moderate tempo until you can play through without stopping to decode.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 25,
      },
    ],
    musicElements: [
      { type: "technique", value: "sight-reading" },
      { type: "technique", value: "tab articulation" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "vai-003",
    label: "Scales & Intervals: Academic Study",
    archetype: "vaideology",
    tier: 2,
    branch: "music-theory",
    xpReward: 110,
    prerequisites: ["vai-001"],
    position: { x: 100, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Using the G major scale as his central example throughout Vaideology, Vai maps every interval quality with precision. Perfect intervals (P1, P4, P5, P8) are stable and symmetrical. Major intervals (M2, M3, M6, M7) are the natural distances within the major scale. Lowering a major interval by a half step produces a minor interval; lowering a perfect or minor by a half step produces diminished; raising a major or perfect by a half step produces augmented. Compound intervals — 9ths, 11ths, 13ths — extend these relationships beyond the octave and are the building blocks of extended harmony.",
      objectives: [
        "Name the interval quality and number between any two notes in the G major scale",
        "Construct any interval (P4, m3, A4/d5, M6, m7) above a given root note on the guitar",
        "Explain the enharmonic equivalence of the tritone (A4 = d5) and demonstrate both spellings on the guitar",
        "Write out a complete interval table from any root, labeling all 12 chromatic pitches by their interval quality and number",
      ],
      tips: [
        "The tritone (A4/d5) is the interval that divides the octave exactly in half — it has no perfect inversion, which is why it sounds so unstable and is so useful in harmony",
        "Symbols: lowercase 'º' for diminished, '+' for augmented — you will see these constantly in chord symbols (Cº7, C+)",
        "Compound intervals: a 9th is always a 2nd plus an octave, an 11th is a 4th plus an octave, a 13th is a 6th plus an octave — the numbering extends the same logic",
      ],
    },
    exercises: [
      {
        id: "ex-vai-003-1",
        type: "theory",
        prompt:
          "Starting from G, spell and name every interval above it: m2 (G-A♭), M2 (G-A), m3 (G-B♭), M3 (G-B), P4 (G-C), A4/d5 (G-C♯/G-D♭), P5 (G-D), m6 (G-E♭), M6 (G-E), m7 (G-F), M7 (G-F♯), P8 (G-G). Play each on the guitar and listen to its character.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-003-2",
        type: "technique",
        prompt:
          "Interval Shapes on Guitar: learn the two-string shapes for P4 (same fret, adjacent string), P5 (two frets higher, adjacent string), M3 (four frets higher, same string OR specific two-string shape depending on string pair). Play each interval type ascending from every note in the open position.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-003-3",
        type: "ear-training",
        prompt:
          "Interval Recognition Drill: play 15 intervals spanning all 12 chromatic types. Before checking, name the quality (perfect, major, minor, diminished, augmented) and number. Focus on getting the quality right — the exact number will follow with experience. Target 10/15 correct.",
        durationSeconds: 120,
        xpValue: 25,
      },
    ],
    musicElements: [
      { type: "scale", value: "major" },
      { type: "technique", value: "interval theory" },
    ],
  },

  {
    id: "vai-004",
    label: "Notes on the Neck: Experiential Study",
    archetype: "vaideology",
    tier: 2,
    branch: "ear-training",
    xpReward: 100,
    prerequisites: ["vai-001"],
    position: { x: 350, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Vai's 'Listen Intensely' discipline transforms the academic fretboard map into sonic recognition. The academic player finds a note by counting; the experienced player hears the note and knows it. These are different relationships to the same knowledge. This node develops the ear-to-hand connection through focused listening meditation and pitch recognition training — the experiential counterpart to every theoretical fact learned in the Academic Study node.",
      objectives: [
        "Sustain a single note for at least 20 seconds while focusing exclusively on its tone, resonance, and decay without thinking about its name or position",
        "Identify a randomly played open string or harmonic note by ear (without looking) with at least 60% accuracy",
        "Sing the pitch of a note before playing it on the guitar, matching pitch 7 out of 10 times",
        "Recognize the same pitch in two different octave positions as 'the same note' and locate a third occurrence without looking up the fret position",
      ],
      tips: [
        "The 'Listen Intensely' practice is not passive — it requires active, focused attention on the sound itself, not the technique producing it",
        "Singing a pitch before playing it builds the ear-to-hand connection that eventually allows you to hear an idea and immediately find it on the instrument",
        "Don't rush this node: spending extra time here pays compounding dividends in every other branch of the skill tree",
      ],
    },
    exercises: [
      {
        id: "ex-vai-004-1",
        type: "ear-training",
        prompt:
          "Listen Intensely Meditation: pick any single note on the guitar and let it ring fully. Close your eyes and focus solely on the sound — the attack, sustain, and decay — for at least 20 seconds. Resist the urge to name it or move on. Repeat with five different notes, one per string.",
        durationSeconds: 180,
        xpValue: 25,
      },
      {
        id: "ex-vai-004-2",
        type: "ear-training",
        prompt:
          "Blind Note ID: ask a partner or use an app to play any note on the guitar while you look away. Before looking, name the note. Aim for 7 correct out of 10 rounds. Vary the register — low, mid, and high strings.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-004-3",
        type: "technique",
        prompt:
          "Octave Unison Drill: play any note on the guitar. Without reference material, find the same pitch in two other positions on the neck. Verify by playing both simultaneously and listening for a clean unison (no wavering). Repeat for 8 different starting notes.",
        durationSeconds: 120,
        xpValue: 25,
      },
    ],
    musicElements: [
      { type: "technique", value: "ear training" },
      { type: "technique", value: "pitch recognition" },
    ],
  },

  {
    id: "vai-005",
    label: "Scales & Intervals: Experiential Study",
    archetype: "vaideology",
    tier: 2,
    branch: "ear-training",
    xpReward: 110,
    prerequisites: ["vai-003", "vai-004"],
    position: { x: 580, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "After building the theoretical framework for intervals, this node trains the ear to recognize each interval as a distinct sonic and emotional color — the urgency of a minor second, the openness of a perfect fourth, the yearning of a major sixth. Vai's approach: intellectual understanding and experiential knowing are not interchangeable. You can know the major sixth is 9 half steps and still not hear it in a melody. The G major chord acts as the harmonic anchor that puts the G major scale in tonal context for the first time.",
      objectives: [
        "Sing any major scale interval above a given pitch with at least 70% accuracy without a reference",
        "Distinguish perfect, major, and minor intervals by ear alone without referring to a fret chart",
        "Recognize compound intervals (9th, 11th, 13th) as extended versions of their simple counterparts — hear the 9th as 'wide like a 2nd but an octave higher'",
        "Play a G major chord, then improvise a 4-bar melody over it using only G major scale tones — noticing which tones feel stable and which create tension",
      ],
      tips: [
        "Assign each interval a reference song to anchor it in memory: P4 = 'Here Comes the Bride', P5 = 'Star Wars', m3 = 'Smoke on the Water' opening riff",
        "The characteristic interval is what gives a scale or mode its flavor — for major, that's the M3; for blues, it's the ♭5 blue note",
        "The G major chord exercise is Vai's specific technique: the chord gives the scale a home, and you can't truly hear scale degree function without harmonic context",
      ],
    },
    exercises: [
      {
        id: "ex-vai-005-1",
        type: "ear-training",
        prompt:
          "Interval Color Study: play each diatonic interval (m2, M2, m3, M3, P4, A4, P5, m6, M6, m7, M7, P8) and immediately free-associate one emotional quality: tense, bright, dark, open, longing, resolute. Write your associations down. Repeat the exercise after two days and compare — are the associations consistent?",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-vai-005-2",
        type: "ear-training",
        prompt:
          "Advanced Interval Identification: random interval quiz — play or have a partner play 15 intervals spanning all 12 chromatic types (including compound 9ths and 11ths). Identify each before checking. Target 80% accuracy. Spend extra time on the intervals you miss most.",
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-vai-005-3",
        type: "performance",
        prompt:
          "G Major Tonal Gravity: strum a G major chord and let it ring. Improvise freely over it using only G major scale tones for two minutes. Without stopping, pay attention: which pitches feel like home (G, B, D) and which create tension or momentum toward another note? Do not analyze — just listen and feel.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "scale", value: "major" },
      { type: "technique", value: "ear training" },
      { type: "chord-type", value: "major" },
    ],
  },

  {
    id: "vai-006",
    label: "Key Signatures & Circle of Fifths",
    archetype: "vaideology",
    tier: 2,
    branch: "music-theory",
    xpReward: 110,
    prerequisites: ["vai-003"],
    position: { x: 780, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Key signatures collect all the sharps or flats that define a key so they don't have to be marked on every individual note. The order of sharps — F C G D A E B — and flats — B E A D G C F — follow a precise pattern explained by the circle of fifths: moving clockwise (each key is a perfect fifth above the previous) adds one sharp; moving counterclockwise adds one flat. Every major key has a relative minor that shares its key signature, built on the 6th scale degree of the major. This single diagram encodes almost all of tonal Western music.",
      objectives: [
        "Write the key signature (correct sharps or flats) for all 12 major keys from memory in under three minutes",
        "Navigate the circle of fifths in both directions, naming each key and its accidental count at any starting point",
        "Identify the relative minor of any major key and the relative major of any minor key instantly",
        "Look at a key signature on a staff and name the key within two seconds",
      ],
      tips: [
        "Mnemonic for sharps: Father Charles Goes Down And Ends Battle (F C G D A E B) — the key of one sharp (G major) has one F♯",
        "Mnemonic for flats: Battle Ends And Down Goes Charles' Father (B E A D G C F) — the flat keys are the sharps in reverse",
        "The relative minor always starts a minor third (3 half steps) below the major tonic — G major's relative minor is E minor",
      ],
    },
    exercises: [
      {
        id: "ex-vai-006-1",
        type: "theory",
        prompt:
          "Draw the complete circle of fifths from memory: 12 major keys clockwise (C at top, then G, D, A, E, B, F♯/G♭…), relative minors labeled inside the circle, number of accidentals labeled per key. Check against a reference and note every error.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-006-2",
        type: "theory",
        prompt:
          "Key Signature Speed Drill: 20 flashcard rounds. Given a key, name its sharps or flats (both the count and the specific notes). Given a set of accidentals, name the key. Target under four seconds per card. Use the circle of fifths as a check.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-vai-006-3",
        type: "technique",
        prompt:
          "Relative Key Pair Playing: for each key starting with C major, play the major scale then immediately play its relative natural minor (same notes, different starting pitch). Continue through G, D, A, E, B/C♭, F♯/G♭, D♭, A♭, E♭, B♭, F — all 12 pairs around the circle.",
        bpm: 72,
        durationSeconds: 180,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "key", value: "all major keys" },
      { type: "technique", value: "music theory" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "vai-007",
    label: "Chords, Chord Spelling & Voicings",
    archetype: "vaideology",
    tier: 3,
    branch: "harmony-chords",
    xpReward: 140,
    prerequisites: ["vai-003", "vai-005", "vai-006"],
    position: { x: 80, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "A chord is three or more pitches sounded together (or in close arpeggiation), and its quality is determined by the intervals between them. Triads are built by stacking two thirds: major (M3 + m3), minor (m3 + M3), diminished (m3 + m3), augmented (M3 + M3). Seventh chords add another third above: major 7th, minor 7th, dominant 7th, minor 7th♭5 (half-diminished), and diminished 7th. Extensions (9th, 11th, 13th) continue the stack. On guitar, close voicings pack chord tones within an octave; open voicings spread them wider — guitar's geometry naturally favors open voicings. Inversions place a non-root tone in the bass, written as slash chords (C/E, G/B).",
      objectives: [
        "Spell any triad or seventh chord from memory — name all constituent notes for any root and quality",
        "Construct and play major, minor, diminished, and augmented triads on any given root across all three-string sets",
        "Demonstrate a close voicing and an open voicing of the same Cmaj7 chord and explain the sonic difference",
        "Identify 1st and 2nd inversions of a C major triad by their slash chord notation and explain what they mean",
      ],
      tips: [
        "Chord spelling is interval theory in action: a major triad is always M3 + P5 from the root, a minor is m3 + P5, a diminished is m3 + d5 — no memorization required if you know your intervals",
        "Close vs. open voicing is particularly important on guitar because the standard E-A-D-G-B-E tuning means most 'open chords' you learned as a beginner are already open voicings",
        "When you see 'C/E' or 'G/B', the note after the slash is the bass note — first inversion puts the 3rd in the bass, second inversion puts the 5th",
      ],
    },
    exercises: [
      {
        id: "ex-vai-007-1",
        type: "theory",
        prompt:
          "Chord Spelling Marathon: for each root (C, D, E, F, G, A, B), spell from scratch using interval theory — do not use shortcut patterns. Spell: major triad, minor triad, diminished triad, augmented triad, dominant 7th, major 7th, minor 7th. Write all notes, then verify each against your interval table.",
        durationSeconds: 180,
        xpValue: 40,
      },
      {
        id: "ex-vai-007-2",
        type: "technique",
        prompt:
          "Triad Inversions on Guitar: play a C major triad in root position, 1st inversion (E in bass), and 2nd inversion (G in bass) on strings 1-2-3, then strings 2-3-4, then strings 3-4-5. Say the bass note name aloud for each inversion. Repeat for A minor triads.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-vai-007-3",
        type: "ear-training",
        prompt:
          "Triad Quality by Ear: play (or have a partner play) chords of all four triad qualities in random order. Identify major, minor, diminished, or augmented before looking. Focus on the emotional signature of each quality. Target 10/12 correct over two rounds.",
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "triad" },
      { type: "chord-type", value: "seventh chord" },
      { type: "chord-type", value: "chord inversion" },
    ],
  },

  {
    id: "vai-008",
    label: "Minor, Pentatonic & Blues Scales",
    archetype: "vaideology",
    tier: 3,
    branch: "fretboard-theory",
    xpReward: 130,
    prerequisites: ["vai-005", "vai-006"],
    position: { x: 310, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Building from the G major scale foundation, Vai maps three essential scale families. The natural minor scale is the major scale starting on its 6th degree (same notes, different tonal center). The pentatonic scales are 5-note subsets — G major pentatonic (1-2-3-5-6) and G minor pentatonic (1-♭3-4-5-♭7) — that remove the two most harmonically tense tones for maximum melodic fluency. The blues scale adds the ♭5 'blue note' to minor pentatonic for that characteristic tension and expressiveness. Whole-neck awareness is the synthesis: not one box, but all five positions connected into a continuous fretboard map.",
      objectives: [
        "Play G natural minor ascending and descending in three different positions, identifying the three notes that differ from G major (♭3, ♭6, ♭7)",
        "Play G major pentatonic and G minor pentatonic across the full neck, connecting at least three positions",
        "Identify and deliberately target the ♭5 blue note in G blues scale when soloing over a G chord",
        "Connect all five pentatonic positions into a single whole-neck blues scale map — solo across the full fretboard without stopping at a position boundary",
      ],
      tips: [
        "The minor pentatonic vs. natural minor: pentatonic removes the 2nd and ♭6 — those are the 'edgy' tones that can clash; removing them makes the pentatonic more forgiving over different chord qualities",
        "The blue note (♭5) creates maximum tension when held against the root — it is most effective as a passing tone or a bend target, not a resting point",
        "Whole-neck practice rule: if you can only solo in one position, you don't yet know the scale — you know one fingering pattern",
      ],
    },
    exercises: [
      {
        id: "ex-vai-008-1",
        type: "technique",
        prompt:
          "Major vs. Minor Ear Comparison: play G major scale slowly, then G natural minor. Identify the three differing notes (♭3, ♭6, ♭7) by name. Improvise a 4-bar melody in G major, then the same 4 bars starting in G minor. Notice the emotional shift.",
        bpm: 72,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-008-2",
        type: "technique",
        prompt:
          "Five-Position Pentatonic Map: learn all five CAGED positions of G minor pentatonic. Play each position ascending and descending, then link adjacent positions with a 2-note connector pattern. Work through all five positions continuously across the neck from low E to high E.",
        bpm: 80,
        durationSeconds: 180,
        xpValue: 40,
      },
      {
        id: "ex-vai-008-3",
        type: "performance",
        prompt:
          "Blues Scale Whole-Neck Solo: over a G blues vamp (or metronome), improvise for three minutes — you must change positions at least once every eight bars. The goal is experiencing the fretboard as a continuous map, not isolated boxes. Emphasize the blue note (D♭) at least twice per chorus.",
        bpm: 90,
        durationSeconds: 180,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "scale", value: "natural minor" },
      { type: "scale", value: "pentatonic" },
      { type: "scale", value: "blues scale" },
    ],
  },

  {
    id: "vai-009",
    label: "Rhythm, Note Values & Time Signatures",
    archetype: "vaideology",
    tier: 3,
    branch: "rhythm-timing",
    xpReward: 130,
    prerequisites: ["vai-002"],
    position: { x: 560, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Rhythm notation maps duration to symbols: whole (4 beats), half (2), quarter (1), eighth (½), sixteenth (¼), and thirty-second (⅛), each with equivalent rests. Dotted notes add half their original value; ties extend duration across barlines. Time signatures define beats per bar and the beat unit — from common time (4/4) through waltz (3/4) and compound meters (6/8, 9/8, 12/8, where each beat divides into three) to odd meters (5/4, 7/8, 11/8, felt as composite groupings like 2+2+3). Polyrhythms layer two different metric groupings simultaneously — the classic 3-against-2. Tuplets (triplets, quintuplets, septuplets) notate non-power-of-2 divisions within a beat. Poly-meter extends this to entire time signatures sounding simultaneously across different instruments.",
      objectives: [
        "Clap and count note values (whole through sixteenth) aloud against a metronome at 60 bpm without losing accuracy",
        "Identify whether a time signature creates simple or compound meter and describe how each beat subdivides",
        "Perform a 4-bar guitar riff in 7/8, internalizing a 2+2+3 or 2+3+2 grouping at 80 bpm",
        "Execute a 3-against-2 polyrhythm: one hand tapping steady quarter notes, the other tapping triplets simultaneously",
      ],
      tips: [
        "Compound meter (6/8, 9/8, 12/8): the beat divides into 3 — count '1 and a, 2 and a' rather than '1 and, 2 and'. The number on top tells you how many eighth notes fit, not how many beats",
        "Odd time signatures feel like asymmetric groupings of 2s and 3s — 7/8 most naturally feels like either 2+2+3 or 3+2+2; feel the 'long' group and the rest falls into place",
        "Polyrhythm practice: first master each rhythm independently, then layer them. Start slowly — 3-against-2 at 40 bpm before attempting 60",
      ],
    },
    exercises: [
      {
        id: "ex-vai-009-1",
        type: "technique",
        prompt:
          "Note Value Grid: clap four bars against a metronome at 60 bpm — bar 1: one clap per bar (whole note); bar 2: half notes; bar 3: quarter notes; bar 4: eighth notes. Count aloud throughout. Then add a bar of sixteenth notes at the same tempo.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-vai-009-2",
        type: "technique",
        prompt:
          "Odd Meter Internalization: set your metronome to 76 bpm. Improvise or play a repeating guitar riff in 7/8, feeling the meter as 2+2+3 (two short groups then a long). Loop for two minutes until the meter feels natural rather than counted. Then try 5/4 (3+2).",
        bpm: 76,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-vai-009-3",
        type: "ear-training",
        prompt:
          "Polyrhythm Drill: tap your left foot in steady quarter notes. Simultaneously tap your right hand in triplets over every beat (three taps per beat = 3-against-2). Record the result and verify that the two streams are accurate and independent. Once stable, reverse — left hand triplets, right foot quarters.",
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "note values" },
      { type: "rhythm-pattern", value: "polyrhythm" },
      { type: "rhythm-pattern", value: "odd meter" },
    ],
  },

  {
    id: "vai-010",
    label: "Composing Music & Score Reading",
    archetype: "vaideology",
    tier: 3,
    branch: "music-theory",
    xpReward: 120,
    prerequisites: ["vai-009", "vai-006"],
    position: { x: 790, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Composition requires communicating every musical parameter through standardized notation. Tempo markings span Italian terms from Largo (~40 bpm) through Andante, Moderato, Allegro, to Presto (~200+ bpm). Tempo alterations — accelerando (speeding up), ritardando (slowing down), rubato (free time), a tempo (return to strict time), fermata (hold) — shape the time field itself. Repetition signs (repeat barlines, 1st/2nd endings, D.C., D.S., coda, segno, fine) navigate complex forms efficiently. Articulations (staccato, legato, marcato, tenuto, accent, slurs) and dynamics (pp through ff, with crescendo < and decrescendo >) complete the score's expressive vocabulary. Octave signs (8va above staff, 8vb below) shift notation by an octave to avoid dense ledger lines.",
      objectives: [
        "Identify every common Italian tempo marking and its approximate BPM range without reference",
        "Execute a 4-bar guitar phrase with three different articulation markings applied to identical pitches — demonstrating how articulation changes musical character",
        "Follow a score with D.C. al Coda, locating the coda section and playing the correct form without stopping",
        "Apply a dynamic arc to an 8-bar phrase: begin pp, crescendo to ff by bar 5, and decrescendo back to p by bar 8",
      ],
      tips: [
        "Memorize the Italian tempo term sequence as a spectrum, not a list: Largo–Adagio–Andante–Moderato–Allegro–Vivace–Presto — each word implies a character, not just a speed",
        "D.C. (Da Capo) = go back to the beginning; D.S. (Dal Segno) = go back to the segno sign 𝄋; al Coda = then jump to the coda section when you see the coda symbol ⊕",
        "In ensemble contexts: transposing instruments (B♭ trumpet, E♭ alto sax) sound different pitches from what they read — guitar concert pitch is already accounted for in the treble-8 clef",
      ],
    },
    exercises: [
      {
        id: "ex-vai-010-1",
        type: "theory",
        prompt:
          "Score Notation Reference Sheet: from memory, write out symbols and definitions for: all Italian tempo terms (7 minimum), 4 tempo alterations, all repetition signs (D.C., D.S., coda, segno, fine, repeat barlines), 5 articulation markings, all dynamic levels (pp through ff), and 8va/8vb. Test by covering the text and identifying each symbol.",
        durationSeconds: 180,
        xpValue: 35,
      },
      {
        id: "ex-vai-010-2",
        type: "technique",
        prompt:
          "Articulation Palette: take a single 4-bar guitar melody. Play it four times with different articulations: (1) every note staccato, (2) every note legato with smooth slurs, (3) accented downbeats only, (4) marcato on every note. Record all four takes and listen to how drastically the character changes.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-vai-010-3",
        type: "performance",
        prompt:
          "Dynamic Arc Exercise: play any 8-bar phrase starting at pp, reaching ff at bar 5, and returning to p by bar 8. Record and review — does the dynamic shape clearly match the notation? Is the transition from p to ff gradual or sudden? Refine until the arc is smooth.",
        bpm: 72,
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "technique", value: "sight-reading" },
      { type: "technique", value: "dynamics" },
      { type: "technique", value: "articulation" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "vai-011",
    label: "Chord Scales, Modes & Modal Progressions",
    archetype: "vaideology",
    tier: 4,
    branch: "music-theory",
    xpReward: 190,
    prerequisites: ["vai-007", "vai-008"],
    position: { x: 250, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "A chord scale is the scale that belongs to a given chord — the complete available-note set above that harmony, labeled by scale degree (root, 3rd, 5th, 7th, 9th, 11th, 13th, plus altered tones). Diatonic chord scales map directly to the seven modes: I = Ionian (major), ii = Dorian, iii = Phrygian, IV = Lydian, V = Mixolydian, vi = Aeolian (natural minor), vii° = Locrian. Each mode has a characteristic interval that gives it its flavor and a set of modal progressions that put it in tonal context. Chord substitutions — tritone subs (dominant chord replaced by one a tritone away), relative minor subs, and diatonic 3rd-related subs — expand the harmonic vocabulary built throughout this tree. Note: Vai's modal exposition in Vaideology is idiosyncratic in places; cross-referencing with Berklee-style sources may reveal terminology differences but the underlying theory is consistent.",
      objectives: [
        "Name all seven modes, their parent-scale degree, characteristic intervals, and associated chord quality from memory",
        "Play each of the seven modes on guitar in at least one position, identifying the characteristic tone by ear",
        "Improvise a 4-bar phrase in Lydian over an Fmaj7(♯11) chord, deliberately targeting the raised 4th as a color tone",
        "Identify a tritone substitution, relative minor substitution, and secondary dominant in a written chord progression",
      ],
      tips: [
        "The characteristic interval is the note that distinguishes each mode from its nearest relative — Lydian's ♯4 vs. major, Dorian's ♮6 vs. natural minor, Phrygian's ♭2 vs. natural minor",
        "Vai's approach: modes are the major scale played from a different starting degree — D Dorian is exactly the same notes as C major, but with D as the tonal center and the ♮6 as the defining color",
        "Modal chord progressions are progressions that stay within a single mode rather than moving through the circle of fifths — a Dorian vamp on ii–I (Dm–C in C major) establishes Dorian without pulling back to C Ionian",
      ],
    },
    exercises: [
      {
        id: "ex-vai-011-1",
        type: "technique",
        prompt:
          "Seven-Mode Marathon: starting from G major, play each diatonic mode in order on the neck — G Ionian (1st position), A Dorian (2nd position), B Phrygian (4th position), C Lydian (open/8th), D Mixolydian (1st/10th), E Aeolian (open/7th), F♯ Locrian (2nd). As you play each mode, speak its characteristic interval aloud: Dorian = raised 6th, Phrygian = flat 2nd, Lydian = raised 4th, Mixolydian = flat 7th, Locrian = flat 2nd and flat 5th.",
        bpm: 72,
        durationSeconds: 300,
        xpValue: 60,
      },
      {
        id: "ex-vai-011-2",
        type: "ear-training",
        prompt:
          "Mode Color Identification: listen to a short melodic fragment (8 bars). Identify whether it is Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, or Locrian based on its emotional quality and interval relationships. Then play the fragment and identify the characteristic tone. Repeat for 6 different examples.",
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-vai-011-3",
        type: "performance",
        prompt:
          "Modal Vamp Improvisation: (1) Set up a Dm–C–Dm–C vamp and improvise in D Dorian for two minutes, deliberately landing on the raised 6th (B natural) on strong beats. (2) Switch to an Fmaj7–Fmaj7 static vamp and improvise in F Lydian for two minutes, targeting the raised 4th (B natural) as a signature color tone. Record both and compare the modal flavor.",
        bpm: 88,
        durationSeconds: 240,
        xpValue: 55,
      },
    ],
    musicElements: [
      { type: "scale", value: "modal" },
      { type: "chord-type", value: "chord scale" },
      { type: "technique", value: "chord substitution" },
    ],
  },

  {
    id: "vai-012",
    label: "Guitar Harmonics, The Groove & Advanced Harmony",
    archetype: "vaideology",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["vai-011", "vai-010"],
    position: { x: 600, y: 800 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "This synthesis node draws together the two threads Vai weaves throughout Vaideology. The Groove is the convergence of the rhythm branch: pocket, swing, push/pull, playing behind or ahead of the beat — the place where academic rhythmic precision and experiential intuition finally meet. Guitar harmonics expand the sonic vocabulary beyond conventional pitch: natural harmonics (bell-like tones produced by lightly touching nodal points at the 12th, 7th, 5th, and 4th frets, derived from the overtone series) and Vai's signature artificial harmonics (pinch harmonics with the thumb edge, tap harmonics, fretted-note harmonics 12 frets above). Extended chord tones (9ths, 11ths, 13ths and altered extensions) layer onto modal harmony. The Chord Symbol Dictionary consolidates the entire harmony branch: triads, 7ths, 6ths, sus chords, add chords, altered chords, slash chords, and polychords.",
      objectives: [
        "Produce clean natural harmonics at frets 12, 7, 5, and 4 on at least four strings, identifying each harmonic pitch by name",
        "Execute a pinch harmonic (thumb edge + pick attack) on a sustained bent note with 8/10 reliability",
        "Demonstrate and describe the feel difference between playing 'in the pocket,' 'pushing the beat,' and 'laying back' over the same groove",
        "Voice a Gmaj13 and an Em11 chord on guitar, naming every tone and its function (root, 3rd, 5th, 7th, 9th, 11th, 13th)",
      ],
      tips: [
        "Natural harmonics: the nodal point at fret 12 divides the string in half (one octave up); fret 7 divides it in thirds (an octave + a 5th up); fret 5 divides it in quarters (two octaves up) — the overtone series determines which harmonics are available and where",
        "Pinch harmonics: position the thumb edge of the picking hand so it grazes the string immediately after the pick attack — the contact point determines which harmonic node is excited; different pick positions over the same fret produce different harmonic pitches",
        "The Groove is not about playing behind the beat — it is about intentional micro-timing. A consistent 10–15ms behind the beat creates 'laid back'; a consistent 10–15ms ahead creates 'push'. Inconsistency is just sloppiness",
      ],
    },
    exercises: [
      {
        id: "ex-vai-012-1",
        type: "technique",
        prompt:
          "Harmonic Topology: on the G string, produce natural harmonics at frets 12, 7, 5, and 4. Identify each harmonic pitch by name (G, D, G, B). Record them and compare their timbre to fretted versions of the same pitches. Then repeat on the B string and E string. Finally, try combining harmonics with fretted notes in a single melodic phrase.",
        durationSeconds: 180,
        xpValue: 50,
      },
      {
        id: "ex-vai-012-2",
        type: "technique",
        prompt:
          "Pinch Harmonic Control: over a power chord riff (E5–A5–D5), apply a pinch harmonic to the highest note of each chord. Vary the pick angle and contact point until you can trigger the harmonic reliably. Target consistent production on 8 of 10 attempts before moving to the performance context.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-vai-012-3",
        type: "performance",
        prompt:
          "Groove Mastery: with a steady drum loop or metronome, play the same 4-bar guitar part three times — (1) locked precisely to the beat, (2) consistently slightly ahead of the beat (push), (3) consistently slightly behind the beat (lay back). Record all three. Listen back and compare the feel. This is The Groove: not accidentally early or late, but intentionally placed.",
        bpm: 95,
        durationSeconds: 180,
        xpValue: 50,
      },
    ],
    musicElements: [
      { type: "technique", value: "harmonics" },
      { type: "technique", value: "groove" },
      { type: "chord-type", value: "extended chord" },
    ],
  },
];
