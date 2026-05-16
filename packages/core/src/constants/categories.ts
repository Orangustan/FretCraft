import type { NodeCategory } from "../types/node";

interface CategoryMeta {
  label: string;
  /** CSS custom property name used to theme this category's UI elements. */
  colorToken: string;
  /** One sentence describing what skills this category covers. */
  description: string;
}

/** Metadata for every NodeCategory value. */
export const CATEGORIES: Record<NodeCategory, CategoryMeta> = {
  technique: {
    label: "Technique",
    colorToken: "--color-technique",
    description:
      "Physical mechanics of playing: posture, hand position, pick control, finger independence, and speed development.",
  },
  theory: {
    label: "Theory",
    colorToken: "--color-theory",
    description:
      "The language of music: scales, intervals, chord construction, modes, and the principles that explain why music works.",
  },
  "ear-training": {
    label: "Ear Training",
    colorToken: "--color-ear-training",
    description:
      "Developing the ability to recognize intervals, chords, rhythms, and melodies by sound alone without notation.",
  },
  rhythm: {
    label: "Rhythm",
    colorToken: "--color-rhythm",
    description:
      "Internalizing pulse, subdivision, note values, rests, meter, and the groove that makes music feel alive.",
  },
  musicianship: {
    label: "Musicianship",
    colorToken: "--color-musicianship",
    description:
      "Holistic musical skills: dynamics, phrasing, expression, sight-reading, and communicating with other musicians.",
  },
  repertoire: {
    label: "Repertoire",
    colorToken: "--color-repertoire",
    description:
      "Learning and performing complete songs, solos, and pieces that apply and reinforce all other skill areas.",
  },
  composition: {
    label: "Composition",
    colorToken: "--color-composition",
    description:
      "Creating original music: melody writing, chord progressions, arranging, and developing a personal voice.",
  },
};
