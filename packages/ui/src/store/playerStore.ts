import { createContext, useContext, useReducer, createElement, type ReactNode } from 'react';

export interface NodeProgress {
  [nodeId: string]: 'locked' | 'available' | 'in-progress' | 'complete';
}

export interface Player {
  name: string;
  level: number;
  xp: number;
  nodeProgress: NodeProgress;
}

type Action =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'COMPLETE_NODE'; payload: { nodeId: string } }
  | { type: 'ADD_XP'; payload: { amount: number } };

const DEFAULT_PLAYER: Player = {
  name: 'Player 1',
  level: 1,
  xp: 0,
  nodeProgress: {},
};

function playerReducer(state: Player, action: Action): Player {
  switch (action.type) {
    case 'SET_PLAYER':
      return action.payload;
    case 'COMPLETE_NODE':
      return {
        ...state,
        nodeProgress: { ...state.nodeProgress, [action.payload.nodeId]: 'complete' },
      };
    case 'ADD_XP': {
      const newXp = state.xp + action.payload.amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      return { ...state, xp: newXp, level: newLevel };
    }
    default:
      return state;
  }
}

interface PlayerContextValue {
  player: Player;
  dispatch: React.Dispatch<Action>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [player, dispatch] = useReducer(playerReducer, DEFAULT_PLAYER);
  return createElement(PlayerContext.Provider, { value: { player, dispatch } }, children);
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
