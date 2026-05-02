import pdfParse from "pdf-parse";

export interface ExtractedScore {
  rawText: string;
  pageCount: number;
  filename: string;
  extractedAt: string;
}

export class ScoreExtractionError extends Error {
  constructor(reason: string) {
    super(`PDF extraction failed: ${reason}`);
    this.name = "ScoreExtractionError";
  }
}

export async function extractPdf(
  fileBuffer: Buffer,
  filename: string
): Promise<ExtractedScore> {
  try {
    const result = await pdfParse(fileBuffer);
    return {
      rawText: result.text,
      pageCount: result.numpages,
      filename,
      extractedAt: new Date().toISOString(),
    };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new ScoreExtractionError(reason);
  }
}
