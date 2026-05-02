import { describe, it, expect, vi, beforeEach } from "vitest";
import { extractPdf, ScoreExtractionError } from "../src/parser/pdfExtractor";

vi.mock("pdf-parse", () => ({
  default: vi.fn(),
}));

import pdfParse from "pdf-parse";
const mockPdfParse = vi.mocked(pdfParse);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("extractPdf", () => {
  it("returns correct ExtractedScore shape on success", async () => {
    mockPdfParse.mockResolvedValueOnce({
      text: "Some extracted text",
      numpages: 3,
      numrender: 3,
      info: {},
      metadata: null,
      version: "1.10.100",
    });

    const buffer = Buffer.from("fake-pdf");
    const result = await extractPdf(buffer, "song.pdf");

    expect(result.rawText).toBe("Some extracted text");
    expect(result.pageCount).toBe(3);
    expect(result.filename).toBe("song.pdf");
    expect(typeof result.extractedAt).toBe("string");
    expect(() => new Date(result.extractedAt)).not.toThrow();
  });

  it("throws ScoreExtractionError when pdf-parse rejects", async () => {
    mockPdfParse.mockRejectedValue(new Error("corrupted file"));

    const buffer = Buffer.from("bad-pdf");
    await expect(extractPdf(buffer, "bad.pdf")).rejects.toThrow(
      ScoreExtractionError
    );
    await expect(extractPdf(buffer, "bad.pdf")).rejects.toThrow(
      "PDF extraction failed: corrupted file"
    );
  });
});
