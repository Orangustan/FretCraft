import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  createElement,
  type ReactNode,
} from 'react';
import { ARCHETYPE_REGISTRY, ROCKER_TREE } from '@guitar-st/core';
import type { SkillTree } from '@guitar-st/core';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';

export interface NodeProgress {
  [nodeId: string]: 'locked' | 'available' | 'in-progress' | 'complete';
}

export interface PracticeSessionRecord {
  date: string;
  durationSeconds: number;
  xpEarned: number;
  nodesWorked: string[];
  accuracyAvg: number;
}

export interface Player {
  name: string;
  level: number;
  xp: number;
  nodeProgress: NodeProgress;
  passedTierTests: string[];
  unlockedAchievements: string[];
  practiceSessions: PracticeSessionRecord[];
}

interface PlayerStoreState {
  player: Player;
  customTrees: SkillTree[];
  activeTreeId: string;
}

type Action =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'COMPLETE_NODE'; payload: { nodeId: string } }
  | { type: 'ADD_XP'; payload: { amount: number } }
  | { type: 'SAVE_CUSTOM_TREE'; payload: SkillTree }
  | { type: 'SET_ACTIVE_TREE'; payload: { treeId: string } }
  | { type: 'PASS_TIER_TEST'; payload: { testId: string } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: { achievementId: string } }
  | { type: 'LOG_PRACTICE_SESSION'; payload: PracticeSessionRecord };

const DEFAULT_STORE: PlayerStoreState = {
  player: { name: 'Player 1', level: 1, xp: 0, nodeProgress: {}, passedTierTests: [], unlockedAchievements: [], practiceSessions: [] },
  customTrees: [],
  activeTreeId: 'rocker',
};

function storeReducer(state: PlayerStoreState, action: Action): PlayerStoreState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'COMPLETE_NODE':
      return {
        ...state,
        player: {
          ...state.player,
          nodeProgress: { ...state.player.nodeProgress, [action.payload.nodeId]: 'complete' },
        },
      };
    case 'ADD_XP': {
      const newXp = state.player.xp + action.payload.amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      return { ...state, player: { ...state.player, xp: newXp, level: newLevel } };
    }
    case 'SAVE_CUSTOM_TREE': {
      const tree = action.payload;
      const idx = state.customTrees.findIndex((t) => t.id === tree.id);
      const customTrees =
        idx >= 0
          ? state.customTrees.map((t) => (t.id === tree.id ? tree : t))
          : [...state.customTrees, tree];
      return { ...state, customTrees, activeTreeId: tree.id };
    }
    case 'SET_ACTIVE_TREE':
      return { ...state, activeTreeId: action.payload.treeId };
    case 'PASS_TIER_TEST': {
      const { testId } = action.payload;
      if (state.player.passedTierTests.includes(testId)) return state;
      return { ...state, player: { ...state.player, passedTierTests: [...state.player.passedTierTests, testId] } };
    }
    case 'UNLOCK_ACHIEVEMENT': {
      const { achievementId } = action.payload;
      if (state.player.unlockedAchievements.includes(achievementId)) return state;
      return { ...state, player: { ...state.player, unlockedAchievements: [...state.player.unlockedAchievements, achievementId] } };
    }
    case 'LOG_PRACTICE_SESSION': {
      const sessions = [...state.player.practiceSessions, action.payload].slice(-90);
      return { ...state, player: { ...state.player, practiceSessions: sessions } };
    }
    default:
      return state;
  }
}

interface PlayerContextValue {
  player: Player;
  customTrees: SkillTree[];
  activeTree: SkillTree;
  dispatch: React.Dispatch<Action>;
  setActiveTree: (treeId: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [storedState, setStoredState] = useLocalStorage<PlayerStoreState>(
    'guitar-st-player',
    DEFAULT_STORE,
  );
  const [state, dispatch] = useReducer(storeReducer, storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state]);

  const activeTree =
    ARCHETYPE_REGISTRY[state.activeTreeId]
    ?? state.customTrees.find((t) => t.id === state.activeTreeId)
    ?? ROCKER_TREE;

  const setActiveTree = (treeId: string) =>
    dispatch({ type: 'SET_ACTIVE_TREE', payload: { treeId } });

  const value: PlayerContextValue = {
    player: state.player,
    customTrees: state.customTrees,
    activeTree,
    dispatch,
    setActiveTree,
  };

  return createElement(PlayerContext.Provider, { value }, children);
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
