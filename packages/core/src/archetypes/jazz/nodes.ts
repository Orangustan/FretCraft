import { SkillNode } from "../../schema/SkillNode";

export const JAZZ_NODES: SkillNode[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  {
    id: "jazz-001",
    label: "Shell Voicings",
    archetype: "jazz",
    tier: 1,
    branch: "harmony-chords",
    xpReward: 100,
    prerequisites: [],
    position: { x: 250, y: 800 },
    unlockCondition: undefined,
    content: {
      description:
        "Shell voicings are stripped-down three-note chord shapes built from the root, third, and seventh—the tones that define a chord's quality without the clutter of doubling. Mastering drop-2 shells gives you compact, movable voicings that sit cleanly in any ensemble texture and lay the harmonic groundwork for all jazz comping.",
      objectives: [
        "Play major 7, minor 7, and dominant 7 shell voicings on strings 6-4 and 5-3 in at least three keys",
        "Identify and play the root, third, and seventh of any shell voicing without hesitation",
        "Move a drop-2 shell voicing up the neck through a cycle-of-fourths progression",
        "Comp a 4-bar phrase using only shell voicings with smooth voice leading between chords",
      ],
      tips: [
        "Learn the 6-4 and 5-3 string sets first—they keep voicings out of the muddy low register",
        "Practice naming the intervals as you play: root, third, seventh—this builds harmonic fluency faster than muscle memory alone",
        "Record yourself comping over a jazz standard and listen for clutter; shells sound better than full chords in most mix situations",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-001-1",
        type: "technique",
        prompt:
          "Play major 7 shell voicings (root, 3rd, 7th) on the 6th and 4th strings for every root across the cycle of fourths: C, F, Bb, Eb, Ab, Db. Hold each voicing for two beats.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-jazz-001-2",
        type: "theory",
        prompt:
          "For each chord quality—major 7, minor 7, dominant 7, minor 7b5—write out the root, third, and seventh in the key of C. Then play each shell voicing on the guitar and compare how the quality of the third and seventh changes the sound.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-jazz-001-3",
        type: "ear-training",
        prompt:
          "Have a partner (or app) play a major 7, minor 7, or dominant 7 shell voicing. Identify by ear which quality you heard before checking. Repeat for 10 voicings.",
        durationSeconds: 120,
        xpValue: 20,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "shell voicing" },
      { type: "chord-type", value: "drop-2" },
    ],
  },

  {
    id: "jazz-002",
    label: "Jazz Rhythm Fundamentals",
    archetype: "jazz",
    tier: 1,
    branch: "rhythm-timing",
    xpReward: 100,
    prerequisites: [],
    position: { x: 600, y: 800 },
    unlockCondition: undefined,
    content: {
      description:
        "Jazz rhythm guitar is built on light, swinging chord stabs and the Freddie Green four-to-the-bar approach that drives big-band and small-group playing alike. Understanding how to comp—supporting the melody and soloist rather than dominating the texture—is the first social skill of jazz guitar.",
      objectives: [
        "Strum a steady four-to-the-bar Freddie Green pattern with light, percussive chord hits for 60 seconds",
        "Comp using shell voicings on beats 2 and 4 to imply a walking-bass feel",
        "Demonstrate basic chord-melody concept: play a melody note on top of a voiced chord without extra strings",
        "Maintain consistent swing feel at tempos from 80 to 140 bpm",
      ],
      tips: [
        "Keep your strumming hand light and close to the bridge—jazz comping is about suggestion, not volume",
        "Listen to Freddie Green recordings with Count Basie to internalize the four-to-the-bar pulse before you practice it",
        "In chord-melody playing, mute any string that isn't the melody or a chord tone—silence is part of the voicing",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-002-1",
        type: "technique",
        prompt:
          "Using shell voicings for a Cmaj7–Am7–Dm7–G7 progression, comp Freddie Green style with four light stabs per bar. Repeat the progression for two minutes without losing the swing feel.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-jazz-002-2",
        type: "performance",
        prompt:
          "Choose a simple melody (e.g., the first phrase of 'Autumn Leaves'). Play the melody note on the highest string of a shell voicing, adding the chord underneath. Perform four bars of chord-melody.",
        bpm: 80,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "rhythm-pattern", value: "four-to-the-bar" },
      { type: "technique", value: "comping" },
    ],
  },

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  {
    id: "jazz-003",
    label: "ii-V-I Progression",
    archetype: "jazz",
    tier: 2,
    branch: "harmony-chords",
    xpReward: 120,
    prerequisites: ["jazz-001"],
    position: { x: 100, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The ii-V-I is the fundamental harmonic engine of jazz—a minor seventh chord moving to a dominant seventh a fourth up, resolving to a major seventh tonic. Nearly every jazz standard contains dozens of ii-V-I progressions, and fluency with it unlocks the ability to navigate any jazz tune.",
      objectives: [
        "Play a ii-V-I in the keys of C, F, Bb, and G using shell voicings with smooth voice leading",
        "Identify ii-V-I progressions by ear in a recorded jazz standard",
        "Comp a 4-bar ii-V-I loop at medium swing tempo with intentional rhythmic variation",
        "Explain the function of each chord (pre-dominant, dominant, tonic) and how tension resolves",
      ],
      tips: [
        "Practice ii-V-I in all 12 keys around the cycle of fourths—jazz tunes modulate, and you need all of them",
        "Notice how the 3rd and 7th of each chord guide to the next chord: the 7th of the ii becomes the 3rd of the V, and the 7th of the V resolves down a half step to the 3rd of the I",
        "Lock in the feel before adding complexity—a rhythmically alive ii-V-I in four keys beats a robotically perfect one in twelve",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-003-1",
        type: "theory",
        prompt:
          "Write out the ii-V-I chord progression (with chord symbols) in the keys of C, F, Bb, Eb, and Ab. Then play each one on guitar using shell voicings, pausing to name the chords as you go.",
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-jazz-003-2",
        type: "technique",
        prompt:
          "Comp a repeating Dm7–G7–Cmaj7 loop using shell voicings. Focus on smooth voice leading—each chord's notes should move as little as possible to the next chord. Play for two minutes.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-003-3",
        type: "ear-training",
        prompt:
          "Listen to the first 32 bars of a jazz standard (e.g., 'Autumn Leaves' or 'All The Things You Are') and mark every ii-V-I you hear. Check your answers against the lead sheet.",
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "minor 7th" },
      { type: "chord-type", value: "dominant 7th" },
    ],
  },

  {
    id: "jazz-004",
    label: "Dorian Mode",
    archetype: "jazz",
    tier: 2,
    branch: "fretboard-theory",
    xpReward: 120,
    prerequisites: ["jazz-001"],
    position: { x: 350, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The Dorian mode—a natural minor scale with a raised sixth—is the go-to color for improvising over minor seventh chords in jazz. Its characteristic raised sixth gives it a brighter, more sophisticated sound than natural minor, and it forms the basis for lines over the ii chord in any ii-V-I.",
      objectives: [
        "Play the Dorian mode ascending and descending in the keys of D and A starting from the root",
        "Identify the raised sixth as the note that distinguishes Dorian from natural minor",
        "Improvise an 8-bar melody over a Dm7 vamp using only Dorian scale tones",
        "Locate two connected Dorian positions across the neck and practice transitioning between them",
      ],
      tips: [
        "Compare Dorian to natural minor by playing both over a minor chord—hear how the raised 6th adds lightness and sophistication",
        "Think of D Dorian as the same notes as C major starting on D: same key signature, different tonal center",
        "Target the raised 6th (the characteristic tone) on strong beats to emphasize the Dorian color in your solos",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-004-1",
        type: "technique",
        prompt:
          "Play D Dorian (D E F G A B C D) ascending and descending from the open D string to the 12th fret D. Repeat four times, then do the same in A Dorian starting on the open A string.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-jazz-004-2",
        type: "ear-training",
        prompt:
          "Play a D natural minor scale, then a D Dorian scale. Record the difference in your ears. Now improvise freely over a Dm7 drone, landing on the raised 6th (B natural) at least once per phrase.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-jazz-004-3",
        type: "performance",
        prompt:
          "Improvise over a Dm7–G7 vamp for two minutes using D Dorian. When the chord moves to G7, switch to G Mixolydian. Focus on making each note choice intentional and musical.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "scale", value: "Dorian mode" },
      { type: "chord-type", value: "minor 7th" },
    ],
  },

  {
    id: "jazz-005",
    label: "Mixolydian & Dominant 7th",
    archetype: "jazz",
    tier: 2,
    branch: "fretboard-theory",
    xpReward: 120,
    prerequisites: ["jazz-002"],
    position: { x: 600, y: 600 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The Mixolydian mode—a major scale with a flatted seventh—is the sound of the dominant seventh chord, the most harmonically tense and forward-driving chord in jazz. Understanding its bluesy, unresolved quality and how it connects to the blues tradition deepens both your jazz vocabulary and your feel.",
      objectives: [
        "Play G Mixolydian ascending and descending cleanly from the root in two positions",
        "Comp a G7 chord using a dominant shell voicing and understand the role of the flat seventh",
        "Improvise over a G7 vamp using Mixolydian, emphasizing the b7 as a target tone",
        "Explain the connection between Mixolydian and the blues scale and demonstrate it by playing both over a G7",
      ],
      tips: [
        "Think of G Mixolydian as an F major scale starting on G—the b7 is the F natural that defines the dominant sound",
        "The flat seventh is the note of tension: landing on it creates pull toward the tonic, which is what dominant chords are for",
        "Try mixing Mixolydian with blues scale tones over a G7—the b3 and b5 from the blues scale add grit that fits jazz-blues perfectly",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-005-1",
        type: "technique",
        prompt:
          "Play G Mixolydian (G A B C D E F G) ascending and descending in two positions: one starting at the 3rd fret of the low E string, one starting at the 10th fret of the A string. Practice until the transition between positions is smooth.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 25,
      },
      {
        id: "ex-jazz-005-2",
        type: "performance",
        prompt:
          "Improvise over a G7 vamp for two minutes. Start with pure Mixolydian lines, then gradually blend in blues scale tones (Bb and Db). Notice how the character of your lines shifts between jazzy and bluesy.",
        bpm: 90,
        durationSeconds: 120,
        xpValue: 35,
      },
    ],
    musicElements: [
      { type: "scale", value: "Mixolydian mode" },
      { type: "chord-type", value: "dominant 7th" },
    ],
  },

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  {
    id: "jazz-006",
    label: "Tritone Substitution",
    archetype: "jazz",
    tier: 3,
    branch: "music-theory",
    xpReward: 150,
    prerequisites: ["jazz-003"],
    position: { x: 50, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Tritone substitution replaces a dominant seventh chord with another dominant seventh chord whose root is a tritone (augmented fourth) away—a key harmonic sophistication technique in bebop and modern jazz. The substitution works because both chords share the same critical guide tones (3rd and 7th), which resolve identically to the tonic.",
      objectives: [
        "Identify the tritone substitute for any dominant seventh chord (e.g., G7 is substituted by Db7)",
        "Play a ii-V-I using a tritone sub on the V chord and describe how the bass movement changes",
        "Comp a standard ii-V-I and a tritone-sub ii-V-I back-to-back over the same tonic",
        "Explain why the 3rd and 7th of a dominant chord are enharmonically equivalent to the 7th and 3rd of its tritone substitute",
      ],
      tips: [
        "The tritone is exactly six half steps away—count to find the sub quickly: G7's tritone sub is always Db7",
        "Tritone subs create half-step bass motion to the tonic (Db to C), which is more chromatic and tension-filled than the usual perfect-fourth resolution",
        "Use tritone subs sparingly at first—drop one in where a plain V7 would be predictable and listen to how it freshens the harmony",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-006-1",
        type: "theory",
        prompt:
          "For each dominant seventh chord—G7, C7, F7, Bb7, Eb7, Ab7—write its tritone substitute. Then play both the original dominant and its sub on guitar and compare the sound. What do they share? What's different?",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-jazz-006-2",
        type: "performance",
        prompt:
          "Comp a Dm7–G7–Cmaj7 progression four times. On the third and fourth pass, replace G7 with Db7 (the tritone sub). Listen to how the half-step bass motion changes the tension and release.",
        bpm: 85,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-jazz-006-3",
        type: "ear-training",
        prompt:
          "Listen to a recording of a jazz standard and try to identify moments where a dominant chord sounds like it resolves by half step rather than by fourth. These are likely tritone substitutions. Confirm against the chord chart.",
        durationSeconds: 120,
        xpValue: 25,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "tritone substitution" },
      { type: "technique", value: "reharmonization" },
    ],
  },

  {
    id: "jazz-007",
    label: "Chord-Melody Playing",
    archetype: "jazz",
    tier: 3,
    branch: "harmony-chords",
    xpReward: 150,
    prerequisites: ["jazz-003", "jazz-004"],
    position: { x: 300, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Chord-melody playing—the art of sounding the melody and its harmonic accompaniment simultaneously—is the hallmark of solo jazz guitar and demands fluency in both melody and harmony at once. Every note of the melody sits on top of or within a voiced chord, creating a self-contained musical statement that requires no rhythm section.",
      objectives: [
        "Harmonize a four-bar melody by placing chord voicings beneath each melody note",
        "Use shell voicings and close-position chords to support melody without obscuring it",
        "Perform a complete 8-bar chord-melody arrangement of a simple jazz melody",
        "Maintain a singing, connected melody line while the chord accompaniment stays supportive and light",
      ],
      tips: [
        "Always privilege the melody—if a full chord voicing muddies the top note, strip it down to a shell or a dyad",
        "Harmonize in parallel thirds or sixths below the melody when full chord changes aren't practical",
        "Listen to Joe Pass and Johnny Smith to hear how chord-melody can range from lush orchestration to spare simplicity",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-007-1",
        type: "technique",
        prompt:
          "Take the first four bars of a simple melody (e.g., 'Summertime'). Under each melody note, find a chord voicing that includes that note on top. Play it slowly, ensuring every melody note rings clearly above the chord.",
        bpm: 60,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-007-2",
        type: "performance",
        prompt:
          "Perform an 8-bar chord-melody arrangement of any jazz melody you know. Record yourself, then listen back and identify any spots where the melody is buried under the chord. Revise those voicings.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "chord-melody" },
      { type: "chord-type", value: "close-position voicing" },
    ],
  },

  {
    id: "jazz-008",
    label: "Jazz Blues",
    archetype: "jazz",
    tier: 3,
    branch: "harmony-chords",
    xpReward: 150,
    prerequisites: ["jazz-005"],
    position: { x: 550, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "The jazz blues is a 12-bar form enriched with jazz chord substitutions—quick changes, tritone subs, and extended dominant harmony—that transform a simple blues into a sophisticated vehicle for improvisation. It bridges the raw expressiveness of the blues with the harmonic complexity of bebop.",
      objectives: [
        "Play the basic jazz blues chord changes in Bb (the most common jazz blues key)",
        "Identify and play the 'quick change' to the IV chord in bar 2 of the 12-bar form",
        "Improvise over a jazz blues using a combination of blues scale and Mixolydian vocabulary",
        "Incorporate at least one tritone substitution into a jazz blues chord comp",
      ],
      tips: [
        "Start with the basic jazz blues changes before layering on substitutions—know what you're departing from",
        "The quick change (I7 to IV7 in bar 2 and back) is what makes a blues sound 'jazzy' right from the top",
        "Mix blues vocabulary (bends, blue notes) with jazz vocabulary (arpeggios, chromatic approach tones) for the authentic jazz-blues blend",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-008-1",
        type: "technique",
        prompt:
          "Comp through a 12-bar jazz blues in Bb using shell voicings: Bb7–Eb7–Bb7–Bb7–Eb7–Eb7–Bb7–G7–Cm7–F7–Bb7–F7. Play through the form four times without stopping.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-008-2",
        type: "performance",
        prompt:
          "Improvise over a Bb jazz blues backing track for two minutes. Start with blues scale vocabulary in the first chorus, then blend in Mixolydian and arpeggio lines in subsequent choruses.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-jazz-008-3",
        type: "ear-training",
        prompt:
          "Listen to two recordings of '12-bar blues'—one straight blues, one jazz blues. Identify the harmonic differences: where do the extra chords appear? What do the substitutions add emotionally?",
        durationSeconds: 120,
        xpValue: 25,
      },
    ],
    musicElements: [
      { type: "chord-type", value: "dominant 7th" },
      { type: "scale", value: "blues scale" },
    ],
  },

  {
    id: "jazz-009",
    label: "Voice Leading",
    archetype: "jazz",
    tier: 3,
    branch: "music-theory",
    xpReward: 150,
    prerequisites: ["jazz-005"],
    position: { x: 750, y: 400 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Voice leading is the craft of moving individual chord tones smoothly between harmonies, minimizing large leaps and creating elegant inner motion that makes chord changes feel inevitable rather than abrupt. In jazz guitar, great voice leading transforms a chord progression into something closer to four-part vocal harmony.",
      objectives: [
        "Comp a ii-V-I where no individual voice moves by more than a whole step between chords",
        "Identify common tones between adjacent chords and keep them stationary as an anchor",
        "Apply contrary motion (one voice moving up while another moves down) in a chord progression",
        "Compare parallel and contrary voice leading: play both and describe the difference in sound",
      ],
      tips: [
        "The guide tones (3rd and 7th) are the most important voices to track—they carry the harmonic identity and resolve most elegantly",
        "Don't always jump to root position voicings; inversions and drop-2 voicings often produce far smoother voice leading",
        "Practice slowly enough to hear each individual voice as a melodic line—voice leading is horizontal thinking applied to vertical chords",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-009-1",
        type: "theory",
        prompt:
          "On paper, write out four voices for a Dm7–G7–Cmaj7 progression. Track how each voice moves from chord to chord, aiming for steps rather than leaps. Then realize this on guitar.",
        durationSeconds: 120,
        xpValue: 30,
      },
      {
        id: "ex-jazz-009-2",
        type: "technique",
        prompt:
          "Play a ii-V-I in C on the top four strings, using inversions and open voicings to ensure no voice moves by more than a major second. Repeat until the transition feels smooth and inevitable.",
        bpm: 70,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-009-3",
        type: "ear-training",
        prompt:
          "Listen to a piano trio recording and focus entirely on the pianist's left hand voicings during chord changes. Try to hear the individual voice leading lines—which notes move? Which stay still?",
        durationSeconds: 120,
        xpValue: 25,
      },
    ],
    musicElements: [
      { type: "technique", value: "voice leading" },
      { type: "chord-type", value: "chord inversion" },
    ],
  },

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  {
    id: "jazz-010",
    label: "Bebop Lines",
    archetype: "jazz",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["jazz-006", "jazz-007"],
    position: { x: 150, y: 200 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Bebop lines are flowing, eighth-note-dominated melodic phrases that navigate complex chord changes at fast tempos by using chromatic passing tones and the bebop scale—a major or dominant scale with an added chromatic passing note. These lines are the lingua franca of modern jazz improvisation.",
      objectives: [
        "Play the G bebop dominant scale (G A B C D E F F# G) ascending and descending cleanly at 120 bpm",
        "Construct and perform a 4-bar bebop line over a ii-V-I using chromatic approach tones",
        "Maintain continuous eighth-note flow for two bars without rhythmic gaps or hesitations",
        "Transcribe and play a four-bar bebop phrase from a Charlie Parker or Wes Montgomery recording",
      ],
      tips: [
        "The bebop scale adds a passing tone to keep chord tones landing on strong beats—it's a rhythmic device as much as a melodic one",
        "Chromatic approach tones work best from a half step below the target: approach the 3rd from a half step below, approach the root the same way",
        "Transcription is the fastest path to bebop fluency—one accurately learned Charlie Parker phrase is worth hours of scale practice",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-010-1",
        type: "technique",
        prompt:
          "Play the G bebop dominant scale (G A B C D E F F# G) ascending and descending in two positions on the neck. Loop it continuously for two minutes at 100 bpm, focusing on evenness and forward momentum.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-010-2",
        type: "performance",
        prompt:
          "Improvise over a Dm7–G7–Cmaj7 progression using bebop lines. Include at least one chromatic approach tone per chord change. Record a two-minute take and review it for fluency.",
        bpm: 120,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-jazz-010-3",
        type: "ear-training",
        prompt:
          "Transcribe by ear a four-bar phrase from a bebop recording (Charlie Parker's 'Billie's Bounce' or similar). Write it out in tab or notation, then play it verbatim until it feels natural.",
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "scale", value: "bebop scale" },
      { type: "technique", value: "chromatic approach tones" },
    ],
  },

  {
    id: "jazz-011",
    label: "Jazz Improvisation",
    archetype: "jazz",
    tier: 4,
    branch: "lead-improvisation",
    xpReward: 200,
    prerequisites: ["jazz-007", "jazz-008"],
    position: { x: 450, y: 200 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Jazz improvisation draws together every harmonic, melodic, and rhythmic concept into real-time musical conversation—motivic development, melodic sequencing, and the ability to tell a story across multiple choruses of a standard. The mature jazz improviser creates phrases that feel composed while remaining completely spontaneous.",
      objectives: [
        "Improvise two complete choruses of a jazz standard, maintaining the form without getting lost",
        "Develop a short motif (2-3 notes) and use it as a structural thread throughout an improvised solo",
        "Vary phrase length and rhythmic density: mix long lyrical lines with short, punchy ideas",
        "Respond dynamically to a backing track or bandmate, adjusting intensity and vocabulary to what you hear",
      ],
      tips: [
        "Think in phrases, not notes—ask yourself 'what am I saying?' before each phrase begins, not during it",
        "Silence is as important as sound: rests between phrases give both you and the listener space to breathe",
        "Record every improvisation session and listen back critically—you will hear things you cannot notice while playing",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-011-1",
        type: "ear-training",
        prompt:
          "Listen to an 8-bar jazz standard melody, then improvise an 8-bar response that references the melodic shape without quoting it directly. Focus on motivic connection over technical display.",
        bpm: 100,
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-011-2",
        type: "performance",
        prompt:
          "Perform two full choruses of improvisation over a jazz standard (e.g., 'Autumn Leaves'). In the first chorus, stick to simple Dorian and Mixolydian ideas. In the second chorus, introduce bebop lines and chromatic tones. Record and review.",
        bpm: 110,
        durationSeconds: 120,
        xpValue: 40,
      },
    ],
    musicElements: [
      { type: "technique", value: "motivic development" },
      { type: "scale", value: "jazz vocabulary" },
    ],
  },

  {
    id: "jazz-012",
    label: "Reharmonization",
    archetype: "jazz",
    tier: 4,
    branch: "music-theory",
    xpReward: 200,
    prerequisites: ["jazz-009"],
    position: { x: 700, y: 200 },
    unlockCondition: { type: "node-complete", value: 1 },
    content: {
      description:
        "Reharmonization is the art of replacing a tune's original chord changes with richer, more colorful harmonies while keeping the melody intact and the emotional arc coherent. From simple tritone substitutions to full Coltrane-style chord cycles, reharmonization is how jazz musicians personalize the standard repertoire.",
      objectives: [
        "Apply at least three different types of substitution (tritone sub, secondary dominant, modal interchange) to a 16-bar standard",
        "Reharmonize a simple melody so that each chord change implies a half-step bass movement",
        "Perform the original and reharmonized versions of an 8-bar phrase back-to-back",
        "Explain why a chosen reharmonization works: identify which melody notes are chord tones in the new harmony",
      ],
      tips: [
        "Always start from the melody—every reharmonization must treat the melody notes as consonant (chord tone, extension, or passing tone) in the new harmony",
        "Secondary dominants (V7 of the next chord) are the easiest reharmonization tool and sound immediately convincing",
        "Study Bill Evans, Red Garland, or Ahmad Jamal piano recordings to hear how pianists reharmonize standard changes in real time",
      ],
    },
    exercises: [
      {
        id: "ex-jazz-012-1",
        type: "theory",
        prompt:
          "Take the first 8 bars of a jazz standard (e.g., 'Blue Bossa'). Write out two alternative harmonizations: one using tritone subs on the dominant chords, one using secondary dominants before each chord. Play both versions.",
        durationSeconds: 120,
        xpValue: 35,
      },
      {
        id: "ex-jazz-012-2",
        type: "performance",
        prompt:
          "Comp a chord-melody arrangement of an 8-bar melody twice: once with the original changes, once with your reharmonization. The melody must remain the same note-for-note. Record both and compare.",
        bpm: 75,
        durationSeconds: 120,
        xpValue: 40,
      },
      {
        id: "ex-jazz-012-3",
        type: "ear-training",
        prompt:
          "Listen to two versions of the same jazz standard by different artists. Focus on the harmony: where do the chord choices diverge? Which reharmonizations sound most surprising, most logical, most beautiful?",
        durationSeconds: 120,
        xpValue: 30,
      },
    ],
    musicElements: [
      { type: "technique", value: "reharmonization" },
      { type: "chord-type", value: "modal interchange" },
    ],
  },
];
