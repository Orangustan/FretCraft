import type { Achievement } from '../schema/Achievement';
import type { Player } from '../schema/Player';
import type { SkillTree } from '../schema/SkillTree';
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
