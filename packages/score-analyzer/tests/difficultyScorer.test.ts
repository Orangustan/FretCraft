import { describe, it, expect } from "vitest";
import {
  scoreElements,
  groupByCluster,
} from "../src/analyzer/difficultyScorer";
import type { MusicElement } from "../src/analyzer/aiAnalyzer";

describe("scoreElements — weights", () => {
  it("assigns weight 1.5 to technique elements", () => {
    const el: MusicElement = { type: "technique", value: "hammer-on" };
    const [scored] = scoreElements([el]);
    expect(scored.weight).toBe(1.5);
  });

  it("assigns weight 1.2 to scale elements", () => {
    const [scored] = scoreElements([{ type: "scale", value: "pentatonic" }]);
    expect(scored.weight).toBe(1.2);
  });

  it("assigns weight 1.2 to chord-type elements", () => {
    const [scored] = scoreElements([{ type: "chord-type", value: "maj7" }]);
    expect(scored.weight).toBe(1.2);
  });

  it("assigns weight 1.0 to rhythm-pattern elements", () => {
    const [scored] = scoreElements([{ type: "rhythm-pattern", value: "8th notes" }]);
    expect(scored.weight).toBe(1.0);
  });

  it("assigns weight 0.8 to key elements", () => {
    const [scored] = scoreElements([{ type: "key", value: "G major" }]);
    expect(scored.weight).toBe(0.8);
  });

  it("assigns weight 0.8 to time-signature elements", () => {
    const [scored] = scoreElements([{ type: "time-signature", value: "4/4" }]);
    expect(scored.weight).toBe(0.8);
  });

  it("assigns weight 0.6 to dynamic elements", () => {
    const [scored] = scoreElements([{ type: "dynamic", value: "forte" }]);
    expect(scored.weight).toBe(0.6);
  });

  it("assigns weight 0.6 to articulation elements", () => {
    const [scored] = scoreElements([{ type: "articulation", value: "staccato" }]);
    expect(scored.weight).toBe(0.6);
  });
});

describe("scoreElements — cluster assignment", () => {
  it("assigns 'foundations' to key", () => {
    const [scored] = scoreElements([{ type: "key", value: "E minor" }]);
    expect(scored.skillCluster).toBe("foundations");
  });

  it("assigns 'foundations' to time-signature", () => {
    const [scored] = scoreElements([{ type: "time-signature", value: "3/4" }]);
    expect(scored.skillCluster).toBe("foundations");
  });

  it("assigns 'foundations' to dynamic", () => {
    const [scored] = scoreElements([{ type: "dynamic", value: "piano" }]);
    expect(scored.skillCluster).toBe("foundations");
  });

  it("assigns 'foundations' to articulation", () => {
    const [scored] = scoreElements([{ type: "articulation", value: "legato" }]);
    expect(scored.skillCluster).toBe("foundations");
  });

  it("assigns 'chords' to chord-type", () => {
    const [scored] = scoreElements([{ type: "chord-type", value: "min7" }]);
    expect(scored.skillCluster).toBe("chords");
  });

  it("assigns 'melody' to scale", () => {
    const [scored] = scoreElements([{ type: "scale", value: "major" }]);
    expect(scored.skillCluster).toBe("melody");
  });

  it("assigns 'rhythm' to rhythm-pattern", () => {
    const [scored] = scoreElements([{ type: "rhythm-pattern", value: "syncopated 16ths" }]);
    expect(scored.skillCluster).toBe("rhythm");
  });

  it("assigns 'melody' to technique containing 'bend'", () => {
    const [scored] = scoreElements([{ type: "technique", value: "string bend", difficulty: 2 }]);
    expect(scored.skillCluster).toBe("melody");
  });

  it("assigns 'melody' to technique containing 'vibrato'", () => {
    const [scored] = scoreElements([{ type: "technique", value: "vibrato", difficulty: 3 }]);
    expect(scored.skillCluster).toBe("melody");
  });

  it("assigns 'melody' to technique containing 'slide'", () => {
    const [scored] = scoreElements([{ type: "technique", value: "slide", difficulty: 1 }]);
    expect(scored.skillCluster).toBe("melody");
  });

  it("assigns 'rhythm' to technique containing 'strumming'", () => {
    const [scored] = scoreElements([{ type: "technique", value: "strumming pattern", difficulty: 2 }]);
    expect(scored.skillCluster).toBe("rhythm");
  });

  it("assigns 'rhythm' to technique containing 'picking'", () => {
    const [scored] = scoreElements([{ type: "technique", value: "alternate picking", difficulty: 3 }]);
    expect(scored.skillCluster).toBe("rhythm");
  });

  it("assigns 'advanced' to technique with difficulty >= 4", () => {
    const [scored] = scoreElements([{ type: "technique", value: "tapping", difficulty: 4 }]);
    expect(scored.skillCluster).toBe("advanced");
  });

  it("'advanced' takes priority over melody keywords when difficulty >= 4", () => {
    const [scored] = scoreElements([{ type: "technique", value: "whammy bar vibrato", difficulty: 5 }]);
    expect(scored.skillCluster).toBe("advanced");
  });
});

describe("groupByCluster", () => {
  it("groups elements under the correct cluster keys", () => {
    const elements: MusicElement[] = [
      { type: "key", value: "A major" },
      { type: "chord-type", value: "dom7" },
      { type: "scale", value: "blues" },
      { type: "rhythm-pattern", value: "swing" },
      { type: "technique", value: "tapping", difficulty: 4 },
    ];
    const groups = groupByCluster(scoreElements(elements));

    expect(Object.keys(groups).sort()).toEqual(
      ["advanced", "chords", "foundations", "melody", "rhythm"].sort()
    );
    expect(groups.foundations).toHaveLength(1);
    expect(groups.chords).toHaveLength(1);
    expect(groups.melody).toHaveLength(1);
    expect(groups.rhythm).toHaveLength(1);
    expect(groups.advanced).toHaveLength(1);
  });

  it("returns an empty object for an empty input", () => {
    expect(groupByCluster([])).toEqual({});
  });

  it("groups multiple elements into the same cluster", () => {
    const elements: MusicElement[] = [
      { type: "key", value: "C" },
      { type: "dynamic", value: "mf" },
      { type: "articulation", value: "staccato" },
      { type: "time-signature", value: "6/8" },
    ];
    const groups = groupByCluster(scoreElements(elements));
    expect(groups.foundations).toHaveLength(4);
    expect(Object.keys(groups)).toEqual(["foundations"]);
  });
});
