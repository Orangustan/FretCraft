interface Phase {
  phase: number;
  name: string;
  description: string;
}

/**
 * The eight curriculum phases, indexed 0–7.
 * Phase 0 is orientation/setup; Phase 7 is the Vaideology pinnacle.
 * Nodes carry a `phase` number that maps to one of these entries.
 */
export const PHASES: Phase[] = [
  {
    phase: 0,
    name: "Orientation",
    description:
      "Establish correct setup, posture, and practice habits before touching technique or theory.",
  },
  {
    phase: 1,
    name: "Foundations",
    description:
      "Core physical mechanics: pick grip, fretting-hand position, open chords, and steady quarter-note rhythm.",
  },
  {
    phase: 2,
    name: "First Position",
    description:
      "Master the first four frets across all strings, open-position scales, and beginner strum patterns.",
  },
  {
    phase: 3,
    name: "Intermediate Technique",
    description:
      "Barre chords, pentatonic scales, alternate picking, and an introduction to basic music theory.",
  },
  {
    phase: 4,
    name: "Fretboard Fluency",
    description:
      "Full-neck navigation, CAGED system, modes, and chord inversions — the neck as a unified map.",
  },
  {
    phase: 5,
    name: "Advanced Technique",
    description:
      "Legato, tapping, sweep picking, hybrid picking, and extended techniques that demand refined control.",
  },
  {
    phase: 6,
    name: "Musicianship & Composition",
    description:
      "Improvisation, ear training at depth, composition, arrangement, and performing with full expression.",
  },
  {
    phase: 7,
    name: "Vaideology",
    description:
      "The pinnacle curriculum inspired by Steve Vai's Vaideology — synthesizing everything into mastery-level artistry.",
  },
];
