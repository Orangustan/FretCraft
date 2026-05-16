import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NodeTimestamps {
  firstTouched?: string;
  lastPracticed?: string;
}

interface ProgressState {
  notes: Record<string, string>;
  timestamps: Record<string, NodeTimestamps>;

  setNote: (nodeId: string, note: string) => void;
  touchNode: (nodeId: string) => void;
  reset: () => void;
}

const now = () => new Date().toISOString();

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      notes: {},
      timestamps: {},

      setNote(nodeId, note) {
        set(state => ({ notes: { ...state.notes, [nodeId]: note } }));
      },

      touchNode(nodeId) {
        const ts = { ...(get().timestamps[nodeId] ?? {}) };
        const t = now();
        if (!ts.firstTouched) ts.firstTouched = t;
        ts.lastPracticed = t;
        set(state => ({ timestamps: { ...state.timestamps, [nodeId]: ts } }));
      },

      reset() {
        set({ notes: {}, timestamps: {} });
      },
    }),
    { name: 'fretcraft-constellation-progress' }
  )
);
