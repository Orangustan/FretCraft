import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NodeStatus } from '../data/types';

interface NodeTimestamps {
  firstTouched?: string;
  lastPracticed?: string;
  learnedAt?: string;
  masteredAt?: string;
}

interface ProgressState {
  nodeStatuses: Record<string, NodeStatus>;
  notes: Record<string, string>;
  timestamps: Record<string, NodeTimestamps>;

  setStatus: (nodeId: string, status: NodeStatus) => void;
  setNote: (nodeId: string, note: string) => void;
  reset: () => void;
}

const now = () => new Date().toISOString();

// In development, seed a handful of nodes with non-default statuses so all
// visual states (locked, available, in_progress, learned, mastered) are visible
// immediately on first launch without any interaction.
const devSeedStatuses: Record<string, NodeStatus> =
  import.meta.env.DEV
    ? {
        'mt-001': 'mastered',
        'mt-002': 'mastered',
        'te-001': 'learned',
        'te-002': 'learned',
        'rt-001': 'learned',
        'ft-001': 'in_progress',
        'hc-001': 'in_progress',
      }
    : {};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      nodeStatuses: devSeedStatuses,
      notes: {},
      timestamps: {},

      setStatus(nodeId, status) {
        const current = get().nodeStatuses[nodeId];
        if (current === status) return;

        const ts = { ...(get().timestamps[nodeId] ?? {}) };
        const t = now();

        if (!ts.firstTouched) ts.firstTouched = t;
        ts.lastPracticed = t;
        if (status === 'learned' && !ts.learnedAt) ts.learnedAt = t;
        if (status === 'mastered' && !ts.masteredAt) ts.masteredAt = t;

        set(state => ({
          nodeStatuses: { ...state.nodeStatuses, [nodeId]: status },
          timestamps: { ...state.timestamps, [nodeId]: ts },
        }));
      },

      setNote(nodeId, note) {
        set(state => ({ notes: { ...state.notes, [nodeId]: note } }));
      },

      reset() {
        set({ nodeStatuses: {}, notes: {}, timestamps: {} });
      },
    }),
    { name: 'fretcraft-constellation-progress' }
  )
);
