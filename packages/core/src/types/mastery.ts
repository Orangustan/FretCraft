import type { TestType } from "./node";

/**
 * The outcome of a single mastery test attempt.
 * Stored alongside the practice log for audit purposes.
 */
export interface MasteryTestResult {
  nodeId: string;
  /** ISO date string YYYY-MM-DD of the attempt. */
  date: string;
  testType: TestType;
  /**
   * Score on the knowledge/academic component as a fraction (0–1).
   * null when testType is "performance" only.
   */
  academicScore: number | null;
  /** IDs of RubricCriteria that the evaluator marked as passed. */
  rubricCriteriaMet: string[];
  passed: boolean;
  /** 1-based count of how many times this node has been attempted. */
  attemptNumber: number;
}
