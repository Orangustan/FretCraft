import type { TierTest, TierTestResult } from '../schema/TierTest';
import type { Player } from '../schema/Player';

export function evaluateKnowledgeTest(
  answers: number[],
  test: TierTest
): number {
  if (test.questions.length === 0) return 1;
  const correct = test.questions.filter((q, i) => q.correctIndex === answers[i]).length;
  return correct / test.questions.length;
}

export function evaluateTierTest(
  knowledgeAnswers: number[],
  performanceScore: number,
  test: TierTest
): TierTestResult {
  const knowledgeScore = evaluateKnowledgeTest(knowledgeAnswers, test);
  const hasPerformance = !!test.performanceExercise;
  const overallScore = hasPerformance
    ? (knowledgeScore + performanceScore) / 2
    : knowledgeScore;

  return {
    passed: overallScore >= test.passingScore,
    knowledgeScore,
    performanceScore,
    overallScore,
  };
}

export function applyTierTestPass(player: Player, testId: string): Player {
  if (player.passedTierTests.includes(testId)) return player;
  return { ...player, passedTierTests: [...player.passedTierTests, testId] };
}

export function hasTierTestPassed(player: Player, testId: string): boolean {
  return player.passedTierTests.includes(testId);
}
