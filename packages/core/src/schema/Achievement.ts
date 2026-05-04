export type AchievementConditionType =
  | 'nodes-completed'
  | 'level-reached'
  | 'tier-test-passed'
  | 'xp-total'
  | 'tree-completed'
  | 'rank-achieved'
  | 'rank-test-passed'
  | 'archetypes-at-rank'
  | 'bpm-goal-hit';

export interface AchievementCondition {
  type: AchievementConditionType;
  value: number;
  archetypeId?: string;
  /** For rank-achieved / archetypes-at-rank conditions */
  rankValue?: string;
}

export interface Achievement {
  id: string;
  label: string;
  description: string;
  icon: string;
  xpBonus: number;
  condition: AchievementCondition;
}
