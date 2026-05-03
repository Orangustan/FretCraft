export interface GlossaryEntry {
  term: string;
  definition: string;
  category: 'technique' | 'theory' | 'gear' | 'rhythm' | 'style';
}

export interface ArchetypeLore {
  id: string;
  name: string;
  era: string;
  summary: string;
  keyArtists: string[];
  gearSignature: string;
  paragraphs: string[];
}

export const GLOSSARY: GlossaryEntry[] = [
  // Technique
  { term: 'Alternate picking', category: 'technique', definition: 'A picking technique using strict down-up-down-up strokes, ensuring every note is picked with equal effort regardless of string or position. The foundation of fast, clean single-note playing.' },
  { term: 'Arpeggio', category: 'technique', definition: 'Playing the notes of a chord one at a time in sequence rather than all at once. Can be ascending, descending, or in any pattern across strings.' },
  { term: 'Banjo roll', category: 'technique', definition: 'An arpeggiated picking pattern borrowed from bluegrass banjo using the flatpick and fingers in a repeating sequence across strings, creating a continuous cascading texture.' },
  { term: 'Barre chord', category: 'technique', definition: 'A chord where the index finger presses all or most strings across a fret, acting as a movable capo. Allows any chord shape to be played in any key.' },
  { term: 'Bend (string bend)', category: 'technique', definition: 'Pushing or pulling a string sideways across the fret to raise its pitch. Bends are measured in semitones: a half-step bend raises pitch by 1 semitone, a whole-step bend by 2.' },
  { term: 'Chicken pickin\'', category: 'technique', definition: 'A percussive country technique where the middle fingernail snaps a string sharply for a staccato "pop" sound between fretted notes, creating the characteristic clucking texture.' },
  { term: 'Double stop', category: 'technique', definition: 'Playing two strings simultaneously. Common in blues and country, double stops add harmonic thickness and can be bent for expressive effect.' },
  { term: 'Economy picking', category: 'technique', definition: 'A hybrid of alternate picking and sweep picking that changes pick direction when crossing strings to minimize wasted motion — always sweeping across string changes.' },
  { term: 'Ghost note', category: 'technique', definition: 'A muted, barely audible string hit used to fill rhythmic space between melodic notes. Ghost notes are felt more than heard and add percussive groove.' },
  { term: 'Hammer-on', category: 'technique', definition: 'Sounding a note by forcefully pressing a finger onto the fretboard without picking. Creates a smooth, legato connection between notes.' },
  { term: 'Hybrid picking', category: 'technique', definition: 'Using a flatpick for downstrokes on lower strings while the middle and ring fingers pluck higher strings, enabling simultaneous bass-and-melody playing.' },
  { term: 'Legato', category: 'technique', definition: 'Playing notes smoothly and connected, typically through hammer-ons and pull-offs rather than picking each note individually.' },
  { term: 'Palm muting', category: 'technique', definition: 'Resting the picking-hand palm lightly on the strings near the bridge to dampen sustain without fully muting the notes, creating a percussive, chunky sound.' },
  { term: 'Pedal steel bend', category: 'technique', definition: 'Bending one string up to meet an adjacent string held at a fixed pitch, mimicking the smooth pitch shifts of a pedal steel guitar.' },
  { term: 'Pick scrape', category: 'technique', definition: 'Dragging the edge of the pick along the wound strings to produce a harsh, metallic scratching sound used as a dramatic effect.' },
  { term: 'Pre-bend', category: 'technique', definition: 'Bending a string to a higher pitch before picking it, then releasing the bend. Creates a descending phrase from an already-bent note.' },
  { term: 'Pull-off', category: 'technique', definition: 'Sounding a lower note by pulling the fretting finger off the string while a lower finger (or open string) is already in position. The pulling motion plucks the string.' },
  { term: 'Sweep picking', category: 'technique', definition: 'Using a single continuous pick stroke across multiple strings in one direction to play an arpeggio cleanly and efficiently.' },
  { term: 'Tapping', category: 'technique', definition: 'Using a picking-hand finger to hammer onto the fretboard, enabling rapid note sequences and wide position jumps that would be impossible with normal fretting.' },
  { term: 'Tremolo picking', category: 'technique', definition: 'Extremely rapid alternate picking on a single note, creating a sustained, wavering tone associated with flamenco, surf rock, and metal.' },
  { term: 'Vibrato', category: 'technique', definition: 'A rhythmic oscillation of pitch created by repeatedly bending a string slightly sharp and releasing. Speed and width determine the emotional character.' },
  // Theory
  { term: '12-bar blues', category: 'theory', definition: 'A three-chord, 12-bar song form (I–I–I–I–IV–IV–I–I–V–IV–I–I) that underlies rock, blues, jazz, and country. Mastering this form is foundational for most genres.' },
  { term: 'CAGED system', category: 'theory', definition: 'A method of visualizing the fretboard by mapping five open chord shapes (C, A, G, E, D) as movable templates across the neck, linking scales, chords, and arpeggios.' },
  { term: 'Chord tone', category: 'theory', definition: 'A note that belongs to a chord (root, 3rd, 5th, and 7th for 7th chords). Targeting chord tones when improvising makes melodies sound "inside" and harmonically connected.' },
  { term: 'Chromatic scale', category: 'theory', definition: 'A scale containing all 12 equally-spaced pitches within an octave (all the frets in one position on one string). Chromatic passing tones add tension and color to diatonic lines.' },
  { term: 'Dominant 7th', category: 'theory', definition: 'A chord built from the root, major 3rd, perfect 5th, and minor 7th. Its tension naturally wants to resolve to the tonic chord a perfect fifth below.' },
  { term: 'Interval', category: 'theory', definition: 'The distance in pitch between two notes, measured in semitones. Examples: a minor 3rd = 3 semitones, a perfect 5th = 7 semitones.' },
  { term: 'Mode', category: 'theory', definition: 'A scale derived from a major scale by starting on a different degree. The seven modes (Ionian, Dorian, Phrygian, etc.) each have a distinct sound and emotional character.' },
  { term: 'Pentatonic scale', category: 'theory', definition: 'A five-note scale (root, minor 3rd, 4th, 5th, minor 7th for the minor version) that avoids problematic semitone clashes, making it the most versatile scale for improvisation.' },
  { term: 'Shell voicing', category: 'theory', definition: 'A chord voiced with only the essential notes (root, 3rd, 7th), omitting the 5th. Used in jazz and Western swing to create lighter, more open-sounding chords.' },
  { term: 'Tritone', category: 'theory', definition: 'An interval of six semitones (three whole tones), splitting the octave exactly in half. Considered dissonant and unstable — its tension is key to dominant-7th chord resolution.' },
  // Gear
  { term: 'Action', category: 'gear', definition: 'The height of the strings above the fretboard. Low action makes playing easier but can cause fret buzz; high action makes bends harder but improves sustain and tone.' },
  { term: 'Humbucker', category: 'gear', definition: 'A pickup with two coils wired out of phase to cancel hum. Produces a thicker, warmer, less bright tone than single-coil pickups.' },
  { term: 'Nashville tuning', category: 'gear', definition: 'Replacing the four lower strings with the higher-octave strings from a 12-string set, producing a shimmering, high-register tone used for studio layering.' },
  { term: 'Open-G tuning', category: 'gear', definition: 'Tuning the guitar to D G D G B D (low to high) so all open strings ring as a G major chord. Used for slide guitar and resonator playing.' },
  { term: 'Single-coil pickup', category: 'gear', definition: 'A pickup with one magnet coil that produces a bright, clear, and slightly thin tone. Susceptible to 60-cycle hum. The Telecaster and Stratocaster use single coils.' },
  { term: 'Telecaster', category: 'gear', definition: 'Fender\'s original solid-body electric guitar, first produced in 1950. Its bright, biting bridge pickup tone defines country, roots rock, and Americana guitar.' },
  { term: 'Whammy bar', category: 'gear', definition: 'A lever attached to the guitar\'s bridge that, when pressed or pulled, changes string tension and therefore pitch. Also called a tremolo arm or vibrato bar.' },
  // Rhythm
  { term: 'Backbeat', category: 'rhythm', definition: 'Emphasis on beats 2 and 4 in 4/4 time, where the snare drum typically falls. Virtually all rock and country music is built around the backbeat.' },
  { term: 'BPM', category: 'rhythm', definition: 'Beats Per Minute — the standard unit of tempo. 60 BPM = one beat per second. Country shuffle typically ranges from 90–130 BPM; slow blues from 50–70 BPM.' },
  { term: 'Dotted note', category: 'rhythm', definition: 'A note with a dot adds half its value to its duration. A dotted quarter note = 1.5 beats; a dotted eighth note = 0.75 beats.' },
  { term: 'Shuffle', category: 'rhythm', definition: 'A rhythm where straight eighth notes are swung into a long-short triplet pattern (the first note is twice as long as the second). Creates the characteristic groove of blues and country.' },
  { term: 'Syncopation', category: 'rhythm', definition: 'Placing rhythmic emphasis on normally weak beats or off-beats. Syncopation creates forward motion, surprise, and groove.' },
  { term: 'Triplet', category: 'rhythm', definition: 'Three notes played in the time of two, creating a rolling, rounded subdivision. Eighth-note triplets divide each beat into three equal parts.' },
  // Style
  { term: 'Americana', category: 'style', definition: 'A genre blending country, folk, blues, and rock with an emphasis on roots, storytelling, and acoustic-forward production. Artists include Gillian Welch, Jason Isbell, and Chris Stapleton.' },
  { term: 'Bakersfield Sound', category: 'style', definition: 'A subgenre of country originating in Bakersfield, CA in the 1950s–60s, characterized by Telecaster twang, driving rhythms, and a harder edge than Nashville pop country.' },
  { term: 'Blues rock', category: 'style', definition: 'A genre fusing blues structure and vocabulary with rock amplification and energy. Key artists: Cream, Stevie Ray Vaughan, Gary Moore, and Joe Bonamassa.' },
  { term: 'Fingerstyle', category: 'style', definition: 'Playing guitar without a pick, using the thumb and fingers directly on the strings. Enables independent bass lines and melodies on the same instrument simultaneously.' },
  { term: 'Flamenco', category: 'style', definition: 'Spanish guitar tradition combining Moorish, Romani, and Andalusian influences. Defined by rasgueados (fan strokes), picado (single-note runs), and intricate rhythmic compás patterns.' },
  { term: 'Western swing', category: 'style', definition: 'A genre blending country with jazz harmony and big-band swing, originating in Texas and Oklahoma in the 1930s. Pioneered by Bob Wills and His Texas Playboys.' },
];

export const ARCHETYPE_LORE: ArchetypeLore[] = [
  {
    id: 'rocker',
    name: 'Rock Guitar',
    era: '1950s – present',
    summary: 'The electric guitar as weapon of mass expression — power chords, pentatonic solos, and distortion-driven energy.',
    keyArtists: ['Chuck Berry', 'Jimi Hendrix', 'Jimmy Page', 'Eddie Van Halen', 'Kurt Cobain'],
    gearSignature: 'Gibson Les Paul or SG through a Marshall stack; power chords, humbucker warmth.',
    paragraphs: [
      'Rock guitar was born the moment Chuck Berry walked a bass line with his guitar and duck-walked across the stage. The electric guitar stopped being an acoustic replacement and became the engine of a new culture — loud, expressive, and impossible to ignore.',
      'The golden age of rock guitar (1965–1985) produced an explosion of technique and vocabulary. Jimi Hendrix redefined what the guitar could be as an orchestral, feedback-soaked instrument. Jimmy Page layered acoustic and electric textures with studio sophistication. Eddie Van Halen introduced two-handed tapping to mainstream rock and proved that speed and melody could coexist.',
      'At its core, rock guitar is about power and economy. The power chord — just root and fifth, no third — cuts through a loud band mix without muddying the harmony. The minor pentatonic scale provides an instantly recognizable, emotive vocabulary for soloing that spans genres from blues-rock to heavy metal.',
      'Modern rock guitar continues to evolve. Players like John Mayer blend blues vocabulary with studio pop; Jack White strips it back to raw, dirty minimalism. The through-line is the guitar as the voice of personal expression — there is no "wrong" way to rock, only authentic versus imitative.',
    ],
  },
  {
    id: 'blues',
    name: 'Blues Guitar',
    era: '1900s – present',
    summary: 'The mother tongue of American music — three chords, the truth, and an unbroken emotional lineage from the Delta to the present.',
    keyArtists: ['Robert Johnson', 'Muddy Waters', 'B.B. King', 'Stevie Ray Vaughan', 'Gary Moore'],
    gearSignature: 'Fender Stratocaster or Gibson ES-335 through a clean or lightly overdriven amp; single-coil clarity.',
    paragraphs: [
      'The blues is the root system from which most of American popular music grows. It emerged in the Mississippi Delta in the early 20th century from a convergence of African musical traditions, field hollers, gospel, and ragtime. Robert Johnson\'s Delta recordings of the 1930s — raw, haunted, and technically remarkable — remain the genre\'s most mythologized artifacts.',
      'The electric guitar transformed the blues when Muddy Waters brought his Delta slide playing to Chicago in the 1940s. Amplification gave the blues a new physicality — the guitar could now sustain, feedback, and distort. B.B. King took this further, developing a vibrato and phrasing so personal that his sound became instantly identifiable from a single note.',
      'The British Invasion brought the blues back to American audiences through Clapton, Beck, and Page — all openly citing Delta and Chicago blues players as their primary influences. Stevie Ray Vaughan did the same in the 1980s, reintroducing deep blues technique to mainstream rock audiences with unprecedented ferocity.',
      'Blues guitar\'s core vocabulary — the 12-bar form, the blue note, the bend and vibrato — has remained largely stable for a century because it works. The form is democratic enough to accommodate everything from W.C. Handy\'s parlor compositions to Gary Moore\'s stadium rock ballads.',
    ],
  },
  {
    id: 'jazz',
    name: 'Jazz Guitar',
    era: '1920s – present',
    summary: 'Harmony, space, and conversation — jazz guitar demands theory fluency, melodic invention, and the discipline to listen as much as you play.',
    keyArtists: ['Django Reinhardt', 'Charlie Christian', 'Wes Montgomery', 'Pat Metheny', 'John Scofield'],
    gearSignature: 'Hollow or semi-hollow archtop (Gibson ES-175, L-5) through a clean amp; warm, sustained tone with volume rolled back.',
    paragraphs: [
      'Jazz guitar\'s origin story begins with Django Reinhardt and Charlie Christian arriving simultaneously but separately at a definition of the electric guitar as a front-line solo instrument. Django, working in 1930s Paris with only two functional left-hand fingers, developed a style of extraordinary speed and harmonic invention. Christian, in Benny Goodman\'s band, demonstrated that the amplified guitar could hold its own with brass and piano.',
      'The bebop era of the 1940s–50s pushed jazz guitar into new harmonic territory. Chord substitutions, extended voicings (9ths, 11ths, 13ths), and ii–V–I progressions became the vocabulary every jazz guitarist had to master. The guitar became a self-contained harmonic unit — capable of comping, soloing, and playing bass-line all at once.',
      'Wes Montgomery\'s thumb-picking technique, his use of octaves, and his melodically accessible single-note lines opened jazz guitar to a wider audience in the 1960s. Pat Metheny brought orchestral textures and fusion influence in the 1970s; John Scofield introduced a rawer, more blues-inflected vocabulary to straight-ahead jazz.',
      'Modern jazz guitar is perhaps the most technically demanding path on this skill tree. The theoretical demands alone — understanding all 12 keys, all modes, altered scales, and tritone substitutions — take years. But the reward is fluency: the ability to play any melody in any key, to harmonize anything, and to have a genuine musical conversation.',
    ],
  },
  {
    id: 'classical',
    name: 'Classical Guitar',
    era: '16th century – present',
    summary: 'Five centuries of notated repertoire, precise right-hand technique, and the highest standard of tone production in the guitar world.',
    keyArtists: ['Andrés Segovia', 'John Williams', 'Julian Bream', 'David Russell', 'Ana Vidovic'],
    gearSignature: 'Nylon-string classical guitar with spruce or cedar top; fingerstyle only, no pick, no amplification.',
    paragraphs: [
      'The classical guitar tradition stretches back to the Renaissance lute, through the Baroque guitar, to the modern six-string instrument standardized in the early 19th century largely by the work of Francisco Tárrega. Unlike other guitar styles, classical guitar is primarily a notated tradition — players read music, not tablature, and the repertoire includes original compositions from the Renaissance to the present.',
      'Andrés Segovia transformed the classical guitar\'s cultural status in the 20th century, taking it from the salon into the concert hall and commissioning new works from major composers. He also codified much of the right-hand technique still taught today — specific finger assignments, nail preparation, and tone production methods.',
      'Classical guitar demands a level of technical precision not found in most other styles. The right hand produces three distinct tone colors from each string (ponticello, tasto, and normal); the left hand must maintain perfectly arched finger positions to allow adjacent open strings to ring freely. Posture, hand position, and nail shape are subjects of serious study.',
      'The repertoire is vast: Bach\'s lute suites (transcribed for guitar), Sor and Giuliani from the classical era, Tárrega\'s romantic miniatures, Villa-Lobos\'s etudes, and a rich body of 20th-century concert works. To play this music well is to speak a language that connects you to 500 years of Western musical thought.',
    ],
  },
  {
    id: 'metal',
    name: 'Metal Guitar',
    era: '1970s – present',
    summary: 'Technical precision pushed to extremes — from Black Sabbath\'s riff architecture to modern djent\'s polyrhythmic complexity.',
    keyArtists: ['Tony Iommi', 'Randy Rhoads', 'Kirk Hammett', 'Dimebag Darrell', 'Tosin Abasi'],
    gearSignature: 'High-output humbuckers (EMG, Seymour Duncan) through high-gain amplification; down-tuned strings, tight low end.',
    paragraphs: [
      'Metal guitar was born with Black Sabbath in 1969–70. Tony Iommi\'s down-tuned riffs, heavy on tritones and minor seconds, defined a new vocabulary of heaviness. Sabbath\'s influence was so pervasive that virtually every subsequent metal subgenre can be traced back to the Iommi blueprint: slow, heavy, and rooted in a detuned low end.',
      'The 1980s brought two divergent paths: the technical showmanship of glam and shred metal (Randy Rhoads, Yngwie Malmsteen, Eddie Van Halen\'s influence) and the stripped-back aggression of thrash (Metallica, Megadeth, Slayer). Both demanded speed and precision, but for different ends — one for virtuosic display, the other for rhythmic violence.',
      'Modern metal guitar is perhaps the most technically demanding popular genre. Extended-range guitars (7, 8, and 9 strings) have become standard in progressive and djent subgenres. Alternate picking speed, sweep-picked arpeggios, and polymeter rhythms require years of dedicated technical study — metal is, in many respects, the classical music of the distorted guitar.',
      'Despite its reputation for brutality, metal guitar contains enormous musical sophistication. Dimebag Darrell\'s melodic invention, Chuck Schuldiner\'s compositional depth, and Tosin Abasi\'s polyrhythmic fluency demonstrate that metal is as much an intellectual as a physical challenge.',
    ],
  },
  {
    id: 'vaideology',
    name: 'Vaideology: Music Theory for Guitar',
    era: 'Timeless',
    summary: 'Steve Vai\'s framework for deep musical understanding — theory not as rules, but as tools for hearing and expressing exactly what you intend.',
    keyArtists: ['Steve Vai', 'Joe Satriani', 'Frank Zappa', 'Robert Fripp', 'Guthrie Govan'],
    gearSignature: 'Ibanez JEM, Carvin Legacy amp, Eventide H3000 — layered, orchestral guitar as a self-contained sonic universe.',
    paragraphs: [
      '"Vaideology" references Steve Vai\'s 2018 instructional book of the same name, subtitled "Basic Music Theory for Guitar Players." Its philosophy is that music theory is not a cage but a map — knowing it allows you to navigate with intention rather than wandering by accident. This archetype treats theory as a primary skill, not an afterthought.',
      'Steve Vai spent three years as Frank Zappa\'s "impossible parts" transcriptionist before releasing his own albums. That experience — reading and playing music of extreme rhythmic and harmonic complexity — gave him a theoretical foundation that informs every aspect of his compositional and improvisational approach. He can write in any style, in any time signature, in any key, because he understands the underlying structure.',
      'This skill tree covers intervals, scales, modes, harmony, and rhythm from the ground up, but always through the guitar. Theory is never abstract here — every concept is immediately applied to the fretboard, to chord voicings, to melodic lines. The goal is to connect the ear, the mind, and the hands so that playing becomes thinking made audible.',
      'The vaideology path is not a stylistic genre but a meta-skill that enhances every other archetype. A blues player with strong theory hears chord substitutions. A metal player with strong theory composes better riffs. A jazz player without theory is simply lost. Music theory, taught through the guitar, is the force multiplier for every other skill you develop.',
    ],
  },
  {
    id: 'country',
    name: 'Country / Americana',
    era: '1920s – present',
    summary: 'The guitar of the American experience — from Appalachian folk and Western swing through honky-tonk Telecaster twang to modern Americana storytelling.',
    keyArtists: ['Merle Travis', 'Buck Owens', 'Chet Atkins', 'Albert Lee', 'Brad Paisley'],
    gearSignature: 'Fender Telecaster (bridge pickup, clean amp), fingerpicks, and a capo — bright, spanky, and unadorned.',
    paragraphs: [
      'Country guitar grew from the convergence of Appalachian folk traditions, Western cowboy songs, and the blues of the American South. In the 1920s and 30s, artists like Jimmie Rodgers blended these streams into a popular commercial form. By the 1940s, Merle Travis had developed the thumb-picking style that still bears his name — alternating bass with melody, all from one hand.',
      'The Fender Telecaster arrived in 1950 and immediately became country music\'s defining instrument. Its bright, cutting bridge pickup — designed by Leo Fender to project over a dance-hall band without amplification problems — produced the "twang" that country audiences loved. James Burton\'s work with Ricky Nelson (and later Elvis Presley) cemented the Telecaster\'s country identity through the 1950s and 60s.',
      'The Bakersfield Sound of the 1960s (Buck Owens, Merle Haggard) gave country guitar a harder edge — driving rhythms, prominent Telecaster leads, and a rejection of Nashville\'s increasingly orchestrated sound. Don Rich\'s guitar work with Buck Owens defined a lean, punchy aesthetic that influenced everyone from Dwight Yoakam to Green Day.',
      'Modern country guitar — as heard through Brad Paisley, Brent Mason, and Redd Volkaert — combines these historical threads with jazz-influenced harmony, extreme picking speeds, and deep technical vocabulary. The best country guitarists today are among the most technically proficient players in any genre, combining chicken pickin\', pedal steel bends, blazing scalar runs, and Western swing harmony into a seamlessly integrated style.',
    ],
  },
];
