// Dynamically imported for code splitting — contains the heavy Anthropic API call
// Avoids bundling into the main chunk; imports NO Node.js-only deps.
import type { SkillTree, SkillNode, MusicElement, MusicElementType } from '@guitar-st/core';

export type { MusicElement, MusicElementType };

export interface AnalysisResult {
  elements: MusicElement[];
  summary: string;
  estimatedOverallDifficulty: 1 | 2 | 3 | 4 | 5;
}

export interface BridgeResult {
  analysisResult: AnalysisResult;
  generatedTree: SkillTree;
}

// ── PDF text extraction (browser-native) ──────────────────────────────────────

async function extractText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const raw = new TextDecoder('latin1').decode(new Uint8Array(buffer));
  // Grab runs of printable ASCII (length ≥3) — good enough for AI analysis
  const words = (raw.match(/[\x20-\x7E]{3,}/g) ?? []).join(' ');
  return words.slice(0, 6000);
}

// ── Anthropic API call (raw fetch with direct-browser header) ─────────────────

const SYSTEM_PROMPT =
  'You are a professional music theory and guitar pedagogy expert. Analyze the provided sheet music text and identify all musical elements relevant to a guitar student. Respond ONLY with valid JSON — no markdown, no preamble.';

const VALID_TYPES = new Set<string>([
  'key', 'time-signature', 'technique', 'scale',
  'chord-type', 'rhythm-pattern', 'dynamic', 'articulation',
]);

async function callAnalysisAPI(text: string, filename: string, apiKey: string): Promise<AnalysisResult> {
  const prompt = `Analyze this sheet music content and return JSON in exactly this shape:
{
  "elements": [
    { "type": "<MusicElementType>", "value": "<string>", "measure": <number|null>, "difficulty": <1-5> }
  ],
  "summary": "<2-3 sentences describing the piece and what a guitarist would learn>",
  "estimatedOverallDifficulty": <1-5>
}

MusicElementType must be one of: "key","time-signature","technique","scale","chord-type","rhythm-pattern","dynamic","articulation".

Sheet music content:
${text || `(No readable text extracted — infer from filename: ${filename})`}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message ?? `Anthropic API error ${res.status}`);
  }

  const data = await res.json() as { content: Array<{ type: string; text: string }> };
  const raw = data.content.find(b => b.type === 'text')?.text ?? '';

  let parsed: { elements: unknown[]; summary: string; estimatedOverallDifficulty: number };
  try {
    parsed = JSON.parse(raw) as typeof parsed;
  } catch {
    throw new Error('Failed to parse analysis response — AI returned non-JSON output.');
  }

  const elements: MusicElement[] = (parsed.elements ?? [])
    .filter((el): el is Record<string, unknown> => typeof el === 'object' && el !== null)
    .filter(el => VALID_TYPES.has(el.type as string))
    .map(el => ({
      type: el.type as MusicElementType,
      value: String(el.value ?? ''),
      measure: typeof el.measure === 'number' ? el.measure : undefined,
      difficulty: [1, 2, 3, 4, 5].includes(el.difficulty as number)
        ? (el.difficulty as 1 | 2 | 3 | 4 | 5)
        : undefined,
    }));

  const diff = parsed.estimatedOverallDifficulty;
  return {
    elements,
    summary: parsed.summary ?? '',
    estimatedOverallDifficulty: ([1, 2, 3, 4, 5].includes(diff) ? diff : 3) as 1 | 2 | 3 | 4 | 5,
  };
}

// ── Skill tree generation ─────────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function tierOf(el: MusicElement): number {
  if (el.difficulty) {
    if (el.difficulty <= 2) return 1;
    if (el.difficulty === 3) return 2;
    if (el.difficulty === 4) return 3;
    return 4;
  }
  const defaults: Record<string, number> = {
    key: 1, 'time-signature': 1, 'chord-type': 1,
    'rhythm-pattern': 2, scale: 2, dynamic: 2, articulation: 2,
    technique: 3,
  };
  return defaults[el.type] ?? 2;
}

function generateTree(result: AnalysisResult, filename: string): SkillTree {
  const seen = new Set<string>();
  const unique = result.elements.filter(el => {
    const key = `${el.type}:${el.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) {
    return {
      id: `custom-${Date.now()}`,
      archetypeId: 'custom',
      name: filename.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '),
      description: result.summary || 'Custom skill tree',
      nodes: [],
      rootNodeId: '',
      createdAt: new Date().toISOString(),
    };
  }

  const tagged = unique.map((el, i) => ({ el, id: `custom-${i}`, tier: tierOf(el) }));
  tagged.sort((a, b) => a.tier - b.tier);

  const byTier = new Map<number, typeof tagged>();
  for (const n of tagged) {
    if (!byTier.has(n.tier)) byTier.set(n.tier, []);
    byTier.get(n.tier)!.push(n);
  }

  const MIN_TIER = Math.min(...tagged.map(n => n.tier));
  const CANVAS_W = 900;
  const COL_W = 200;
  const ROW_H = 200;

  function prereqsForTier(tier: number): string[] {
    if (tier <= MIN_TIER) return [];
    for (let t = tier - 1; t >= MIN_TIER; t--) {
      const prev = byTier.get(t);
      if (prev && prev.length > 0) return [prev[0].id];
    }
    return [];
  }

  const nodes: SkillNode[] = tagged.map(node => {
    const siblings = byTier.get(node.tier)!;
    const sibIdx = siblings.indexOf(node);
    const totalW = siblings.length * COL_W;
    const x = Math.round((CANVAS_W - totalW) / 2 + sibIdx * COL_W);
    const y = (node.tier - MIN_TIER) * ROW_H + 80;

    const label = node.el.value.split(/[\s\-_]/).map(capitalize).join(' ');
    const prereqs = node.tier === MIN_TIER ? [] : prereqsForTier(node.tier);

    return {
      id: node.id,
      label,
      archetype: 'custom',
      tier: node.tier,
      xpReward: node.tier * 75,
      prerequisites: prereqs,
      position: { x, y },
      musicElements: [node.el],
      content: {
        description: `Develop proficiency with ${node.el.value} in the context of this piece.`,
        objectives: [
          `Identify ${node.el.value} in the score`,
          `Execute ${node.el.type} elements accurately`,
          `Apply ${node.el.value} musically in the piece`,
        ],
      },
    };
  });

  const rootId = tagged.find(n => n.tier === MIN_TIER)?.id ?? nodes[0]?.id ?? '';

  return {
    id: `custom-${Date.now()}`,
    archetypeId: 'custom',
    name: filename.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '),
    description: result.summary,
    nodes,
    rootNodeId: rootId,
    createdAt: new Date().toISOString(),
  };
}

// ── Public entry point ────────────────────────────────────────────────────────

export async function runAnalysis(file: File, apiKey: string): Promise<BridgeResult> {
  const text = await extractText(file);
  const analysisResult = await callAnalysisAPI(text, file.name, apiKey);
  const generatedTree = generateTree(analysisResult, file.name);
  return { analysisResult, generatedTree };
}
