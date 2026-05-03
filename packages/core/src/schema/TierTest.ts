import type { ArchetypeId } from './SkillTree';
import type { Exercise } from './SkillNode';

export interface KnowledgeQuestion {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface TierTest {
  id: string;
  tierId: number;
  archetypeId: ArchetypeId;
  label: string;
  questions: KnowledgeQuestion[];
  performanceExercise?: Exercise;
  passingScore: number;
}

export interface TierTestResult {
  passed: boolean;
  knowledgeScore: number;
  performanceScore: number;
  overallScore: number;
}
