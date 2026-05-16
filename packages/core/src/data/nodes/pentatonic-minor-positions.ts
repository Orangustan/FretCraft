import type { FretCraftNode } from "../../types/node";

/**
 * Example node: Minor Pentatonic — All 5 Positions.
 *
 * This node lives in Phase 3 (Intermediate Technique) and requires the learner
 * to have mastered first-position pentatonic playing and basic neck navigation
 * before unlocking the full CAGED-based 5-position system.
 *
 * Progress reflects a learner ~3 sessions in: positions 1 and 2 feel solid,
 * positions 3–5 need more work. Mastery gates not yet cleared.
 */
const pentatonicMinorPositions: FretCraftNode = {
  id: "pentatonic-minor-positions",
  name: "Minor Pentatonic — All 5 Positions",
  description:
    "Learn all five CAGED-derived shapes of the minor pentatonic scale across the full neck. Each position is a complete, usable pattern; together they unlock fluid soloing in any register of the instrument.",
  phase: 3,
  category: "technique",
  difficulty: 3,
  nodeType: "core",
  prerequisites: [
    "pentatonic-minor-box-1",
    "neck-navigation-fundamentals",
  ],

  mastery: {
    testType: "both",
    academicPrompt:
      "Identify which CAGED shape (C, A, G, E, or D form) each of the five pentatonic positions corresponds to, and explain how the root note is located within each shape.",
    performancePrompt:
      "Play all five pentatonic minor positions in A minor consecutively at 90 BPM (eighth notes), ascending then descending, without stopping. Transitions between positions must be smooth and in time.",
    rubric: [
      {
        id: "rubric-all-5-positions",
        description: "All five positions are played from memory without hesitation.",
        weight: 0.5,
        passed: null,
      },
      {
        id: "rubric-smooth-transitions",
        description:
          "Transitions between adjacent positions are seamless — no rhythmic gaps, no position confusion.",
        weight: 0.5,
        passed: null,
      },
    ],
    minUniqueSessionDays: 5,
    minTotalMinutes: 90,
    minRecentQualityAvg: 3.5,
    recentSessionCount: 3,
    retryAfterDays: 2,
  },

  media: [
    {
      id: "media-pmp-lesson-01",
      title: "Minor Pentatonic — All 5 Positions Explained",
      url: "https://example.com/lessons/pentatonic-minor-positions",
      type: "lesson",
    },
    {
      id: "media-pmp-backing-01",
      title: "A Minor Backing Track — 85 BPM",
      url: "https://example.com/tracks/a-minor-85bpm",
      type: "backing-track",
    },
  ],

  notation: {
    tablature: "https://example.com/notation/pentatonic-minor-5-positions.pdf",
    chordChart: null,
    standardNotation: null,
    diagramType: "fretboard",
  },

  practice: {
    estimatedHours: 8,
    drills: [
      {
        id: "drill-pmp-sequential",
        description:
          "Play each position in order (1 → 2 → 3 → 4 → 5) on a single root, ascending only, then descending back to position 1. Repeat 3 times.",
        tempoStart: 60,
        tempoTarget: 100,
        durationMinutes: 10,
      },
      {
        id: "drill-pmp-random",
        description:
          "Call out a random position number (or have a partner call it) and immediately find and play that shape from the nearest root note. 5 minutes of random-position drilling builds navigation reflexes.",
        durationMinutes: 5,
      },
    ],
    tempoRange: {
      start: 60,
      target: 100,
    },
    commonMistakes: [
      "Treating each position as an isolated pattern rather than a connected shape on the neck.",
      "Losing track of the root note when moving between positions.",
      "Staying exclusively in position 1 (box 1) when improvising instead of exploring the full neck.",
      "Practicing only ascending runs — neglect of descending lines leaves gaps in fluency.",
    ],
    relatedNodes: [
      "major-pentatonic-positions",
      "blues-scale-extensions",
      "caged-system-overview",
      "position-shifting-technique",
    ],
  },

  benchmarkSongs: [
    "Comfortably Numb — Pink Floyd (David Gilmour solo uses positions 1 and 2)",
    "Little Wing — Jimi Hendrix (weaves through positions across the neck)",
    "Since I've Been Loving You — Led Zeppelin (Jimmy Page shifts positions throughout)",
  ],

  progress: {
    status: "in-progress",
    totalMinutesLogged: 47,  // ~3 sessions averaging 15 min each
    totalXpEarned: 312,
    averageQuality: 3.3,
    uniqueDaysActive: 3,
    currentStreak: 2,
    masteryAttempts: 0,
    masteryUnlocked: false,
    masteryConfirmed: false,
    lastSessionDate: "2026-05-08",
    lastMasteryAttemptDate: null,
  },

  meta: {
    tags: ["scales", "pentatonic", "minor", "neck-navigation", "CAGED", "soloing"],
    vaideologyRef: "p. 42 — Pentatonic Scale Positions and Applications",
    lastUpdated: "2026-05-01",
    version: 1,
    instructorNotes:
      "Most students plateau at position 1. Encourage improvisation over a backing track that forces them to follow the chord changes up the neck rather than staying in one box.",
  },
};

export default pentatonicMinorPositions;
