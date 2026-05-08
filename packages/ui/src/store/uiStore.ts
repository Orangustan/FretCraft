import { create } from 'zustand';
import type { Branch, NodeStatus } from '../data/types';

interface CameraTarget {
  x: number;
  y: number;
  z: number;
}

interface UIState {
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  highlightPath: string[];        // node ids in the currently highlighted prereq path
  revealedNodes: Set<string>;     // nodes that have completed their load-in animation
  loadSequenceDone: boolean;

  filterBranch: Branch | null;
  filterStatus: NodeStatus | null;
  filterTier: 1 | 2 | 3 | 4 | 5 | null;
  searchQuery: string;
  searchResults: Set<string> | null; // null = no active search

  cameraTarget: CameraTarget | null;
  panelOpen: boolean;
  nextUpPanelOpen: boolean;

  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  setHighlightPath: (path: string[]) => void;
  revealNode: (id: string) => void;
  revealAll: () => void;
  setLoadSequenceDone: () => void;

  setFilterBranch: (b: Branch | null) => void;
  setFilterStatus: (s: NodeStatus | null) => void;
  setFilterTier: (t: 1 | 2 | 3 | 4 | 5 | null) => void;
  setSearchQuery: (q: string) => void;
  setSearchResults: (ids: Set<string> | null) => void;
  clearFilters: () => void;

  setCameraTarget: (t: CameraTarget | null) => void;
  openPanel: () => void;
  closePanel: () => void;
  toggleNextUpPanel: () => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  selectedNodeId: null,
  hoveredNodeId: null,
  highlightPath: [],
  revealedNodes: new Set(),
  loadSequenceDone: false,

  filterBranch: null,
  filterStatus: null,
  filterTier: null,
  searchQuery: '',
  searchResults: null,

  cameraTarget: null,
  panelOpen: false,
  nextUpPanelOpen: false,

  selectNode(id) {
    set({ selectedNodeId: id, panelOpen: id !== null });
  },

  hoverNode(id) {
    set({ hoveredNodeId: id });
  },

  setHighlightPath(path) {
    set({ highlightPath: path });
  },

  revealNode(id) {
    const next = new Set(get().revealedNodes);
    next.add(id);
    set({ revealedNodes: next });
  },

  revealAll() {
    // Called when the user skips the loading sequence
    set(state => {
      // Import allNodes lazily to avoid circular dep at module level
      return { loadSequenceDone: true, revealedNodes: state.revealedNodes };
    });
  },

  setLoadSequenceDone() {
    set({ loadSequenceDone: true });
  },

  setFilterBranch(b) {
    set({ filterBranch: b });
  },

  setFilterStatus(s) {
    set({ filterStatus: s });
  },

  setFilterTier(t) {
    set({ filterTier: t });
  },

  setSearchQuery(q) {
    set({ searchQuery: q });
    if (!q.trim()) set({ searchResults: null });
  },

  setSearchResults(ids) {
    set({ searchResults: ids });
  },

  clearFilters() {
    set({
      filterBranch: null,
      filterStatus: null,
      filterTier: null,
      searchQuery: '',
      searchResults: null,
    });
  },

  setCameraTarget(t) {
    set({ cameraTarget: t });
  },

  openPanel() {
    set({ panelOpen: true });
  },

  closePanel() {
    set({ panelOpen: false, selectedNodeId: null, highlightPath: [] });
  },

  toggleNextUpPanel() {
    set(state => ({ nextUpPanelOpen: !state.nextUpPanelOpen }));
  },
}));
