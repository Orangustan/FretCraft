import type { Player, PlayerRank } from '../schema/Player';
import type { SkillTree } from '../schema/SkillTree';
import type { RankTest, RankTestResult } from '../schema/RankTest';
import { RANK_ORDER } from '../schema/Player';

const TIER_TO_RANK: Record<number, PlayerRank> = {
  1: 'novice',
  2: 'intermediate',
  3: 'expert',
  4: 'pro',
};

export function getCurrentRank(player: Player, archetypeId: string): PlayerRank {
  return player.archetypeRanks?.[archetypeId] ?? 'beginner';
}

export function getRankIndex(rank: PlayerRank): number {
  return RANK_ORDER.indexOf(rank);
}

export function getNextRank(rank: PlayerRank): PlayerRank | null {
  const idx = getRankIndex(rank);
  return idx < RANK_ORDER.length - 1 ? RANK_ORDER[idx + 1] : null;
}

/** Tier that becomes unlocked when a player has this rank */
export function rankToMinTier(rank: PlayerRank): number {
  switch (rank) {
    case 'beginner': return 1;
    case 'novice': return 2;
    case 'intermediate': return 3;
    case 'expert': return 4;
    case 'pro': return 4;
  }
}

/** Whether a node's tier is accessible at the player's current rank */
export function isTierAccessible(tier: number, rank: PlayerRank): boolean {
  return tier <= rankToMinTier(rank);
}

/** Check if player has completed all nodes in a given tier for an archetype */
export function hasCompletedTier(
  tier: number,
  tree: SkillTree,
  player: Player
): boolean {
  const tierNodes = tree.nodes.filter((n) => n.tier === tier);
  return tierNodes.length > 0 && tierNodes.every(
    (n) => player.nodeProgress[n.id]?.status === 'completed'
  );
}

/** Check if rank can advance — either all current-tier nodes done OR gate test passed */
export function canAdvanceRank(
  player: Player,
  tree: SkillTree,
  rankTests: RankTest[]
): boolean {
  const currentRank = getCurrentRank(player, tree.archetypeId);
  const nextRank = getNextRank(currentRank);
  if (!nextRank) return false;

  const currentTier = rankToMinTier(currentRank);
  if (hasCompletedTier(currentTier, tree, player)) return true;

  const gateTest = rankTests.find(
    (t) => t.archetypeId === tree.archetypeId && t.fromRank === currentRank && t.toRank === nextRank
  );
  if (gateTest && player.passedRankTests.includes(gateTest.id)) return true;

  return false;
}

/** Advance rank for an archetype, returning updated player */
export function advanceRank(player: Player, archetypeId: string): Player {
  const current = getCurrentRank(player, archetypeId);
  const next = getNextRank(current);
  if (!next) return player;
  return {
    ...player,
    archetypeRanks: { ...player.archetypeRanks, [archetypeId]: next },
  };
}

/** Score a completed rank gate test */
export function evaluateRankTest(
  scores: number[],
  test: RankTest,
  reachedBpmGoal: boolean
): RankTestResult {
  const overallScore = scores.length > 0
    ? scores.reduce((s, x) => s + x, 0) / scores.length
    : 0;
  return {
    passed: overallScore >= test.passingScore,
    scores,
    overallScore,
    reachedBpmGoal,
  };
}

/** Record that a rank gate test was passed, advance the rank */
export function applyRankTestPass(
  player: Player,
  test: RankTest
): Player {
  const withTest = player.passedRankTests.includes(test.id)
    ? player
    : { ...player, passedRankTests: [...player.passedRankTests, test.id] };
  return advanceRank(withTest, test.archetypeId);
}

/** Map archetype tier to the rank it unlocks */
export function tierToUnlockRank(tier: number): PlayerRank {
  return TIER_TO_RANK[tier] ?? 'pro';
}
