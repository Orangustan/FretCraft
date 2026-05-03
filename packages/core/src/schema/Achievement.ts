export type AchievementConditionType =
  | 'nodes-completed'
  | 'level-reached'
  | 'tier-test-passed'
  | 'xp-total'
  | 'tree-completed';

export interface AchievementCondition {
  type: AchievementConditionType;
  value: number;
  archetypeId?: string;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  icon: string;
  xpBonus: number;
  condition: AchievementCondition;
}
