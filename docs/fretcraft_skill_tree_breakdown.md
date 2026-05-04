# FretCraft Skill Tree Breakdown

> Curriculum source: Steve Vai, *Vaideology: Basic Music Theory for Guitar Players* (Hal Leonard, 2019).
> The FretCraft skill tree is built around Vai's central thesis: **intellectual understanding and experiential knowing are complementary — not interchangeable.** You can name every interval without hearing them; you can feel music profoundly without knowing its name. The tree demands both.

---

## Skill Tree Branches

The tree organizes nodes into seven branches. Each branch represents a learning domain; nodes may draw on multiple branches simultaneously.

| Branch | Domain |
|--------|--------|
| `fretboard-theory` | Spatial and visual knowledge of the neck — note names, positions, patterns |
| `music-theory` | Notation, intervals, scales, keys, chords, modes, composition |
| `ear-training` | Internalized hearing — pitch recognition, interval sound, harmonic function by ear |
| `harmony-chords` | Chord construction, voicings, progressions, diatonic function |
| `rhythm-timing` | Note values, time signatures, strumming patterns, groove, polyrhythm |
| `technique` | Physical execution — fretting mechanics, switching, articulation |
| `lead-improvisation` | Phrasing, expression, micro-timing, advanced sonic vocabulary |

The **academic ↔ experiential** duality cuts *across* branches, not between them. A `harmony-chords` node can be academic (chord spelling from intervals) or experiential (hearing chord quality by feel). This distinction is called out explicitly in node descriptions and drives the prerequisite graph: you cannot complete the experiential study of scales without first completing the academic study, and vice versa.

---

## Node Breakdown — by Tier

### Tier 1 — Foundation

Two root nodes with no prerequisites. They represent the irreducible minimum: if you cannot name notes on the neck and cannot read tab, nothing else in the tree is accessible.

---

#### `vai-001` — Notes on the Neck: Academic Study
**Branch:** `fretboard-theory` · **XP:** 90 · **Prerequisites:** none

The 12-note chromatic system mapped to every string and fret. Natural notes, accidentals, enharmonic equivalents (F♯ = G♭), and double-accidentals. The goal is frictionless note-name recall — any fret, any string, within three seconds.

*Key objectives:* Name every natural note on all 6 strings from open to the 12th fret; identify four enharmonic pairs and locate both spellings; navigate to any named note within three seconds; write the chromatic scale from any starting pitch in both sharp and flat spellings.

---

#### `vai-002` — Guitar Tablature & Articulation
**Branch:** `music-theory` · **XP:** 80 · **Prerequisites:** none

Tab uses six lines (one per string, low E at bottom) with fret numbers. As Vai notes, pure tab carries no rhythmic information — it must be paired with notation or prior knowledge. Covers tab reading, all eight core articulation symbols (h, p, b, r, /, \\, ~, t), treble clef with the guitar's transposing-octave indicator, and the relationship between tab and standard notation.

*Key objectives:* Read a melody from tab with correct articulation; execute all eight symbols; locate any note from middle C to high E on the treble clef; explain why guitar sounds one octave lower than written.

---

### Tier 2 — Parallel Development

Four theory-and-ear nodes plus the Open Chords practical cluster. The academic and experiential tracks diverge here and must both be followed — prerequisites enforce this. The Open Chords cluster (a prototype of the sub-node architecture) runs parallel to the theory nodes, applying what vai-001 and vai-002 taught in a hands-on context.

---

#### `vai-003` — Scales & Intervals: Academic Study
**Branch:** `music-theory` · **XP:** 110 · **Prerequisites:** `vai-001`

G major as the central example throughout. Interval quality (perfect, major, minor, diminished, augmented), interval numbers (unison through octave), enharmonic equivalence of the tritone (A4 = d5), and compound intervals (9ths, 11ths, 13ths). Interval theory is chord theory's foundation — nothing in Tier 3 or 4 is accessible without it.

---

#### `vai-004` — Notes on the Neck: Experiential Study
**Branch:** `ear-training` · **XP:** 100 · **Prerequisites:** `vai-001`

Vai's "Listen Intensely" discipline: the ear-to-hand connection that transforms fret-number recall into sonic recognition. A student who completes vai-001 knows *where* notes are; completing vai-004 means they can *hear* a note and find it. Pitch recognition drills, unison-position identification, and sustained single-note listening meditation.

---

#### `vai-005` — Scales & Intervals: Experiential Study
**Branch:** `ear-training` · **XP:** 110 · **Prerequisites:** `vai-003`, `vai-004`

Requires *both* academic tracks before it unlocks — the convergence node of the first synthesis. Trains the ear to recognize each interval as a distinct emotional color: the urgency of a minor second, the openness of a perfect fourth, the yearning of a major sixth. G major chord as harmonic anchor; improvisation over it to feel scale degree tension and resolution.

---

#### `vai-006` — Key Signatures & Circle of Fifths
**Branch:** `music-theory` · **XP:** 110 · **Prerequisites:** `vai-003`

The circle of fifths encodes nearly all of tonal Western music in one diagram. Order of sharps and flats, all 12 major keys, relative minor relationships (built on the 6th degree of the major). Key signature speed drill target: 20 flashcards in under four seconds per card.

---

#### `vai-oc` — Open Chords ◆ (cluster node)
**Branch:** `harmony-chords` · **XP:** 0 (earned through children) · **Prerequisites:** `vai-001`, `vai-002`

A prototype of the sub-node architecture: the parent node unlocks after vai-001 and vai-002, then expands into **8 child nodes** that must all be completed before vai-oc itself completes. Total cluster XP: 230.

The cluster follows both the academic and experiential tracks within a single practical context — the five open chord shapes (G, C, D, Em, Am).

| Child Node | Branch | XP | Intra-cluster Prerequisites |
|---|---|---|---|
| `vai-oc-1` Reading Chord Diagrams | `fretboard-theory` | 20 | — (root) |
| `vai-oc-2` Forming the Five Shapes | `fretboard-theory` | 30 | `vai-oc-1` |
| `vai-oc-3` Pressing Cleanly | `fretboard-theory` | 25 | `vai-oc-2` |
| `vai-oc-4` Strumming the Right Strings | `rhythm-timing` | 20 | `vai-oc-2` |
| `vai-oc-5` Chord Switching Mechanics | `technique` | 40 | `vai-oc-3`, `vai-oc-4` |
| `vai-oc-6` Strumming in 4/4 | `rhythm-timing` | 30 | `vai-oc-4` |
| `vai-oc-7` Diatonic Open Chord Theory | `harmony-chords` | 35 | `vai-oc-1` |
| `vai-oc-8` Hearing Chord Quality by Ear | `ear-training` | 30 | `vai-oc-3`, `vai-oc-7` |

**Dependency graph within the cluster:**
```
vai-oc-1 ──► vai-oc-2 ──► vai-oc-3 ──► vai-oc-5
          │           └──► vai-oc-4 ──► vai-oc-5
          │                         └──► vai-oc-6
          └──► vai-oc-7 ──────────────► vai-oc-8
                               vai-oc-3 ──► vai-oc-8  (diamond)
```

vai-oc-8 (Hearing Chord Quality by Ear) is the experiential culmination: it requires both the physical clean-pressing of vai-oc-3 and the harmonic theory of vai-oc-7. This mirrors the academic ↔ experiential structure of the main tree at the sub-node level.

---

### Tier 3 — Intermediate Synthesis

Four nodes that combine what the two parallel tracks built in Tier 2. For the first time, the student is working with chords, scales, rhythm notation, and composition simultaneously.

---

#### `vai-007` — Chords, Chord Spelling & Voicings
**Branch:** `harmony-chords` · **XP:** 140 · **Prerequisites:** `vai-003`, `vai-005`, `vai-006`

Chord construction from interval theory: triads (major M3+m3, minor m3+M3, diminished m3+m3, augmented M3+M3), seventh chords, extensions (9th, 11th, 13th). Close vs. open voicings, inversions, slash chords (C/E, G/B). Guitar's geometry naturally favors open voicings — standard tuning is not an accident.

---

#### `vai-008` — Minor, Pentatonic & Blues Scales
**Branch:** `fretboard-theory` · **XP:** 130 · **Prerequisites:** `vai-005`, `vai-006`

Natural minor (major scale from the 6th degree), major and minor pentatonic (5-note subsets removing the two harmonically tense tones), blues scale (minor pentatonic + ♭5 blue note). Whole-neck awareness: not one box, but all five CAGED positions connected into a continuous fretboard map. Soloing limited to one position is not knowledge — it is one fingering.

---

#### `vai-009` — Rhythm, Note Values & Time Signatures
**Branch:** `rhythm-timing` · **XP:** 130 · **Prerequisites:** `vai-002`

Note values (whole through 32nd), rests, dotted notes, ties. Simple meter (4/4, 3/4), compound meter (6/8, 9/8, 12/8 — beat divides into three), odd meters (5/4, 7/8, 11/8 as asymmetric 2+3 groupings). Polyrhythms (3-against-2: one hand quarters, other hand triplets). Tuplets.

---

#### `vai-010` — Composing Music & Score Reading
**Branch:** `music-theory` · **XP:** 120 · **Prerequisites:** `vai-009`, `vai-006`

Italian tempo terms (Largo through Presto), tempo alterations (accelerando, ritardando, rubato, fermata, a tempo), repetition signs (D.C., D.S., coda, segno, fine, repeat barlines), articulation marks (staccato, legato, marcato, tenuto, accent, slur), dynamics (pp through ff, crescendo, decrescendo), octave signs (8va, 8vb).

---

### Tier 4 — Synthesis & Mastery

Two nodes. The first synthesizes the harmony branch; the second synthesizes everything — technique, rhythm, and harmony converging in Vai's two most signature concepts: The Groove and advanced harmonic color.

---

#### `vai-011` — Chord Scales, Modes & Modal Progressions
**Branch:** `music-theory` · **XP:** 190 · **Prerequisites:** `vai-007`, `vai-008`

The seven modes as chord scales: I=Ionian, ii=Dorian, iii=Phrygian, IV=Lydian, V=Mixolydian, vi=Aeolian, vii°=Locrian. Characteristic intervals (Lydian ♯4, Phrygian ♭2, Dorian ♮6, Mixolydian ♭7, Locrian ♭2+♭5). Modal progressions that establish a tonal center without moving through the circle of fifths. Chord substitutions: tritone, relative minor, diatonic 3rd-related.

---

#### `vai-012` — Guitar Harmonics, The Groove & Advanced Harmony
**Branch:** `lead-improvisation` · **XP:** 200 · **Prerequisites:** `vai-011`, `vai-010`

The synthesis node. **The Groove** is the convergence of the rhythm branch: pocket, push, lay-back — intentional micro-timing, not accidental sloppiness. A consistent 10–15ms behind the beat creates *laid back*; ahead creates *push*; inconsistency is just a mistake. Guitar harmonics expand the sonic palette: natural harmonics (frets 12, 7, 5, 4 from the overtone series), artificial/pinch harmonics, tap harmonics. Extended chord tones (9th, 11th, 13th, altered) and the Chord Symbol Dictionary complete the harmony branch.

The L5 description in the Benchmark Appendix applies here directly: *technique fused with expression* is not something you learn after technique — it is the recognition that technique was always in service of expression, and that The Groove is where the academic and experiential tracks finally and permanently merge.

---

## Suggested Skill Tree Topology

Two tracks run in parallel (Academic left, Experiential right) and converge at synthesis nodes. Benchmark gates mark the real-world verification points between tiers.

```
ACADEMIC TRACK                 ◄──────────────────► EXPERIENTIAL TRACK

╔═══════════════════════════════════════════════════════════════╗
║              [BENCHMARK: Lvl 1]  — entry gate                 ║
║     Smoke on the Water · Seven Nation Army · Knockin' on…     ║
╚═══════════════════════════════════════════════════════════════╝
              │
              ▼  TIER 1 — Foundation
  vai-001  Notes on the Neck (Academic)
  vai-002  Guitar Tablature & Articulation

╔═══════════════════════════════════════════════════════════════╗
║              [BENCHMARK: Lvl 2]                               ║
║     Iron Man · Wonderwall · Come As You Are · Hwy to Hell     ║
╚═══════════════════════════════════════════════════════════════╝
              │
              ▼  TIER 2 — Parallel Development
  Academic    vai-003  Scales & Intervals (Academic)
              vai-006  Key Signatures & Circle of Fifths
  Ear         vai-004  Notes on the Neck (Experiential)
              vai-005  Scales & Intervals (Experiential)
  Applied ◆   vai-oc   Open Chords  (8-node cluster)
              └─ vai-oc-1  Reading Chord Diagrams
              └─ vai-oc-2  Forming the Five Shapes
              └─ vai-oc-3  Pressing Cleanly
              └─ vai-oc-4  Strumming the Right Strings
              └─ vai-oc-5  Chord Switching Mechanics
              └─ vai-oc-6  Strumming in 4/4
              └─ vai-oc-7  Diatonic Open Chord Theory
              └─ vai-oc-8  Hearing Chord Quality by Ear

╔═══════════════════════════════════════════════════════════════╗
║              [BENCHMARK: Lvl 3]                               ║
║     Sweet Child O' Mine · Stairway to Heaven · Crazy Train    ║
╚═══════════════════════════════════════════════════════════════╝
              │
              ▼  TIER 3 — Intermediate Synthesis
  vai-007  Chords, Chord Spelling & Voicings
  vai-008  Minor, Pentatonic & Blues Scales
  vai-009  Rhythm, Note Values & Time Signatures
  vai-010  Composing Music & Score Reading

╔═══════════════════════════════════════════════════════════════╗
║              [BENCHMARK: Lvl 4]                               ║
║     Eruption · Master of Puppets · Cliffs of Dover            ║
╚═══════════════════════════════════════════════════════════════╝
              │
              ▼  TIER 4 — Synthesis & Mastery
  vai-011  Chord Scales, Modes & Modal Progressions
  vai-012  Guitar Harmonics, The Groove & Advanced Harmony

╔═══════════════════════════════════════════════════════════════╗
║              [BENCHMARK: Lvl 5]  — mastery gate               ║
║     For the Love of God · Scarified · Glasgow Kiss            ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Rank Gates

Rank gates are technique-focused checkpoints that control tier access. They are distinct from benchmark songs: rank gates test a specific physical technique; benchmarks test musical holism across a full song. Both are required — one without the other is incomplete.

| Gate | Label | Reference Piece | Passing Score |
|------|-------|-----------------|---------------|
| Beginner → Novice | Legato Foundation | *The Audience Is Listening* — Opening Legato Run | 70% |
| Novice → Intermediate | Interval Control | *For the Love of God* — Intro Sustained Intervals | 75% |
| Intermediate → Expert | Exotic Scales & Precision | *Passion and Warfare* — Middle Eastern Passage | 78% |
| Expert → Pro | The Vai Universe | *Tender Surrender* — Full Performance | 82% |

**Beginner → Novice:** Fretting-hand strength and independence sustain a smooth legato phrase with no re-articulation. Every note in the hammer-on/pull-off chain must equal the volume of the picked note.

**Novice → Intermediate:** Expressive control over wide intervals and sustained notes with whammy-bar vibrato. Leave space — Vai's power comes from what he doesn't play.

**Intermediate → Expert:** Phrygian Dominant and Lydian precision. Thematic development across 16 bars: a stated melodic idea, then transformation — inversion, extension, rhythmic variation. The listener must hear the theme return.

**Expert → Pro:** *Tender Surrender* full performance. The arc: intimacy → yearning → anguish → catharsis → peace. Silence carries as much weight as notes. Every technique in the tree is available; use only what serves the emotion.

---

## Caveats

**The two tracks are not optional.** Completing only the academic nodes produces a student who can spell any chord but cannot hear it resolve. Completing only the experiential nodes produces a student who plays fluently but cannot explain or transfer what they know. Vai's thesis is not a philosophical preference — it is a description of how musical skill actually develops. The prerequisite graph enforces this.

**The Open Chords cluster (vai-oc) is a prototype.** It demonstrates the sub-node architecture: a parent node unlocks, then expands into a mind-map cluster of smaller nodes. The parent completes automatically when all children are done. This pattern is intended to be applied to every node in the tree — vai-oc is the first instance.

**Benchmark songs are verification, not curriculum.** They test whether knowledge has *transferred* to real musical contexts — a different skill from performing exercises. The "2 of 4 advances, all 4 unlocks mastery" rule reflects this: partial transfer is still progress; complete transfer is a different category of achievement.

**Rank gates and benchmark gates measure different things.** Rank gates (from `rankTests.ts`) are technique-specific: can you execute this physical skill at this standard? Benchmark gates are holistic: can you make music out of everything you've learned so far? A student can pass a rank gate while failing the benchmark at the same tier, or vice versa. Both paths must be walked.

**Node names in the benchmark appendix use shorthand.** The "Tests branches:" lines in the appendix use abbreviated names (e.g., "Notes on the Neck (Academic)," "Scales Continued (pentatonic, blues)," "The Groove") that refer to full node labels in this document. They are cross-references, not exact IDs.

---

# Benchmark Songs — 5-Level Skill Progression

Each tier uses 4 canonical "rite of passage" songs as verification nodes. Treat them as boss fights at tier boundaries — completing 2 of 4 advances the player; all 4 unlocks mastery of the tier. Songs are chosen for stylistic spread, not just technical difficulty.

## Level 1 — Total Beginner → Novice
- Smoke on the Water — Deep Purple
- Seven Nation Army — The White Stripes
- A Horse With No Name — America
- Knockin' on Heaven's Door — Bob Dylan

Proves: timing, common open-chord transitions (G/C/D/Em/Am), single-string riff execution, sustained strumming.

Tests branches: Notes on the Neck (Academic), Note Values, basic Chord Spelling, Reading Guitar Rhythm (entry).

## Level 2 — Novice → Advanced Beginner
- Iron Man — Black Sabbath
- Wonderwall — Oasis
- Come As You Are — Nirvana
- Highway to Hell — AC/DC

Proves: barre chords, power chords, consistent palm muting, capo use, dynamic control across full song structure.

Tests branches: Chord Spelling (Academic) full coverage, Tab Articulation & Ornamentation, Time Signatures 4/4, Composing Music (dynamics, articulations).

## Level 3 — Advanced Beginner → Intermediate
- Sweet Child O' Mine — Guns N' Roses
- Stairway to Heaven — Led Zeppelin
- Crazy Train — Ozzy / Randy Rhoads
- Hotel California — Eagles

Proves: full song + solo, pentatonic/blues fluency across positions, controlled bending and vibrato, fingerpicking, moderate-tempo alternate picking.

Tests branches: Scales Continued (pentatonic, blues), Whole-Neck Awareness in G Blues, Chord Spelling (Advanced — voicings/inversions), Rhythm (Experiential), early Modal Progressions (Crazy Train's Aeolian/Phrygian flavor).

## Level 4 — Intermediate → Advanced
- Eruption — Van Halen
- Master of Puppets — Metallica
- Cliffs of Dover — Eric Johnson
- Little Wing — Jimi Hendrix

Proves: two-handed tapping, sustained downpicking at speed, hybrid picking, chord-melody playing, multi-section arrangement coherence. Phrasing emerges as a concern.

Tests branches: Modal Progressions (Cliffs — Mixolydian/pentatonic blending), Polyrhythms (Puppets gallops), Guitar Harmonics (natural + artificial), Composing Music (tempo modulations), Chord Scales + Additional Chord Tones (Little Wing voicings).

## Level 5 — Advanced → Virtuoso
- For the Love of God — Steve Vai
- Surfing with the Alien — Joe Satriani
- Scarified — Racer X / Paul Gilbert
- Glasgow Kiss — John Petrucci

Proves: technique fused with expression — phrasing, breath-like timing, sweep picking, advanced legato, multi-octave modal vocabulary, polyrhythmic feels, personal voice.

Tests branches: the synthesis nodes — **The Groove** and **Modal Progressions + Additional Chord Tones** — plus Time Signatures (Advanced: composite, poly-meter), Polyrhythms (Advanced), Chord Symbol Dictionary as working vocabulary.

Stretch-goal alternates for L5 (different stylistic flavors): Tornado of Souls (Friedman), Tender Surrender (Vai), Cult of Personality (Reid).
