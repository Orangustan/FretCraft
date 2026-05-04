import type { Achievement } from '../schema/Achievement';
import type { Player } from '../schema/Player';
import type { SkillTree } from '../schema/SkillTree';
import { RANK_ORDER } from '../schema/Player';
import { ACHIEVEMENTS } from '../archetypes/achievements';

export function checkAchievements(
  player: Player,
  tree: SkillTree
): Achievement[] {
  const unlocked = new Set(player.unlockedAchievements);
  const completedNodes = Object.values(player.nodeProgress).filter(
    (p) => p.status === 'completed'
  ).length;
  const treeCompleted = tree.nodes.every(
    (n) => player.nodeProgress[n.id]?.status === 'completed'
  );
  const archetypeRanks = player.archetypeRanks ?? {};
  const rankValues = Object.values(archetypeRanks);

  return ACHIEVEMENTS.filter((a) => {
    if (unlocked.has(a.id)) return false;
    const { condition } = a;
    switch (condition.type) {
      case 'nodes-completed':
        return completedNodes >= condition.value;
      case 'level-reached':
        return player.level >= condition.value;
      case 'tier-test-passed':
        return player.passedTierTests.length >= condition.value;
      case 'xp-total':
        return player.xpTotal >= condition.value;
      case 'tree-completed':
        return treeCompleted;
      case 'rank-achieved': {
        const targetRankIdx = RANK_ORDER.indexOf(condition.rankValue as typeof RANK_ORDER[number]);
        return rankValues.some((r) => RANK_ORDER.indexOf(r) >= targetRankIdx);
      }
      case 'rank-test-passed':
        return (player.passedRankTests ?? []).length >= condition.value;
      case 'archetypes-at-rank': {
        const targetRankIdx = RANK_ORDER.indexOf(condition.rankValue as typeof RANK_ORDER[number]);
        const count = rankValues.filter((r) => RANK_ORDER.indexOf(r) >= targetRankIdx).length;
        return count >= condition.value;
      }
      default:
        return false;
    }
  });
}

export function applyAchievements(player: Player, newlyUnlocked: Achievement[]): Player {
  if (newlyUnlocked.length === 0) return player;
  const bonusXp = newlyUnlocked.reduce((s, a) => s + a.xpBonus, 0);
  return {
    ...player,
    xpTotal: player.xpTotal + bonusXp,
    unlockedAchievements: [
      ...player.unlockedAchievements,
      ...newlyUnlocked.map((a) => a.id),
    ],
  };
}
