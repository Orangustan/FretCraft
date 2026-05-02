import Anthropic from "@anthropic-ai/sdk";
import type { ExtractedScore } from "../parser/pdfExtractor.js";

// Mirror of @guitar-st/core types — structurally compatible for when core has a built dist
export type MusicElementType =
  | "key"
  | "time-signature"
  | "technique"
  | "scale"
  | "chord-type"
  | "rhythm-pattern"
  | "dynamic"
  | "articulation";

export interface MusicElement {
  type: MusicElementType;
  value: string;
  measure?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

export interface AnalyzerConfig {
  apiKey: string;
  model?: string;
}

export interface AnalysisResult {
  elements: MusicElement[];
  summary: string;
  estimatedOverallDifficulty: 1 | 2 | 3 | 4 | 5;
  rawResponse: string;
}

export class AnalysisError extends Error {
  rawResponse: string;
  constructor(message: string, rawResponse: string) {
    super(message);
    this.name = "AnalysisError";
    this.rawResponse = rawResponse;
  }
}

const SYSTEM_PROMPT =
  "You are a professional music theory and guitar pedagogy expert. Analyze the provided sheet music text and identify all musical elements relevant to a guitar student. Respond ONLY with valid JSON — no markdown, no preamble.";

const VALID_ELEMENT_TYPES = new Set<MusicElementType>([
  "key",
  "time-signature",
  "technique",
  "scale",
  "chord-type",
  "rhythm-pattern",
  "dynamic",
  "articulation",
]);

function isValidDifficulty(n: unknown): n is 1 | 2 | 3 | 4 | 5 {
  return n === 1 || n === 2 || n === 3 || n === 4 || n === 5;
}

function parseAnalysis(raw: string): AnalysisResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new AnalysisError("Failed to parse JSON response", raw);
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as Record<string, unknown>).elements) ||
    typeof (parsed as Record<string, unknown>).summary !== "string" ||
    !isValidDifficulty((parsed as Record<string, unknown>).estimatedOverallDifficulty)
  ) {
    throw new AnalysisError("Response JSON missing required fields", raw);
  }

  const data = parsed as {
    elements: unknown[];
    summary: string;
    estimatedOverallDifficulty: 1 | 2 | 3 | 4 | 5;
  };

  const elements: MusicElement[] = data.elements
    .filter(
      (el): el is Record<string, unknown> =>
        typeof el === "object" && el !== null
    )
    .filter((el) => VALID_ELEMENT_TYPES.has(el.type as MusicElementType))
    .map((el) => ({
      type: el.type as MusicElementType,
      value: String(el.value ?? ""),
      measure: typeof el.measure === "number" ? el.measure : undefined,
      difficulty: isValidDifficulty(el.difficulty) ? el.difficulty : undefined,
    }));

  return {
    elements,
    summary: data.summary,
    estimatedOverallDifficulty: data.estimatedOverallDifficulty,
    rawResponse: raw,
  };
}

export async function analyzeScore(
  extracted: ExtractedScore,
  config: AnalyzerConfig
): Promise<AnalysisResult> {
  const client = new Anthropic({ apiKey: config.apiKey });
  const model = config.model ?? "claude-sonnet-4-20250514";

  const userPrompt = `Analyze this sheet music text and return JSON in this exact shape:
{
  "elements": [ { "type": <MusicElementType>, "value": <string>, "measure": <number|null>, "difficulty": <1-5> } ],
  "summary": "<2-3 sentence description of the piece>",
  "estimatedOverallDifficulty": <1-5>
}

MusicElementType must be one of: "key", "time-signature", "technique", "scale", "chord-type", "rhythm-pattern", "dynamic", "articulation".

Sheet music text:
${extracted.rawText}`;

  const makeRequest = () =>
    client.messages.create({
      model,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

  let response: Awaited<ReturnType<typeof makeRequest>>;
  try {
    response = await makeRequest();
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      response = await makeRequest();
    } else {
      throw err;
    }
  }

  const block = response.content.find((b) => b.type === "text");
  const raw = block && block.type === "text" ? block.text : "";

  return parseAnalysis(raw);
}
