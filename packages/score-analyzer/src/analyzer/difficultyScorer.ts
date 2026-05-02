import type { MusicElement } from "./aiAnalyzer.js";

export interface ScoredElement extends MusicElement {
  weight: number;
  skillCluster: string;
}

const MELODY_TECHNIQUES = /bend|vibrato|slide/i;
const RHYTHM_TECHNIQUES = /strum|pick/i;

function assignCluster(el: MusicElement): string {
  if (el.type === "technique") {
    if ((el.difficulty ?? 0) >= 4) return "advanced";
    if (MELODY_TECHNIQUES.test(el.value)) return "melody";
    if (RHYTHM_TECHNIQUES.test(el.value)) return "rhythm";
    return "melody";
  }
  if (el.type === "scale") return "melody";
  if (el.type === "chord-type") return "chords";
  if (el.type === "rhythm-pattern") return "rhythm";
  return "foundations";
}

function assignWeight(el: MusicElement): number {
  switch (el.type) {
    case "technique":
      return 1.5;
    case "scale":
    case "chord-type":
      return 1.2;
    case "rhythm-pattern":
      return 1.0;
    case "key":
    case "time-signature":
      return 0.8;
    case "dynamic":
    case "articulation":
      return 0.6;
  }
}

export function scoreElements(elements: MusicElement[]): ScoredElement[] {
  return elements.map((el) => ({
    ...el,
    weight: assignWeight(el),
    skillCluster: assignCluster(el),
  }));
}

export function groupByCluster(
  scored: ScoredElement[]
): Record<string, ScoredElement[]> {
  const groups: Record<string, ScoredElement[]> = {};
  for (const el of scored) {
    (groups[el.skillCluster] ??= []).push(el);
  }
  return groups;
}
