import type { PlayerRank } from './Player';
import type { BranchType } from './SkillNode';
import type { Exercise } from './SkillNode';

export interface TechniqueTag {
  name: string;
  branch: BranchType;
  nodeId?: string;
}

export interface RankTest {
  id: string;
  archetypeId: string;
  fromRank: PlayerRank;
  toRank: PlayerRank;
  label: string;
  songTitle?: string;
  description: string;
  techniques: TechniqueTag[];
  exercises: Exercise[];
  passingScore: number;
  nodeIds: string[];
}

export interface RankTestResult {
  passed: boolean;
  scores: number[];
  overallScore: number;
  reachedBpmGoal: boolean;
}
