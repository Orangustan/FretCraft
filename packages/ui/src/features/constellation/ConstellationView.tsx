import { useMemo, useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SkyCanvas } from '../../scene/SkyCanvas';
import { Nodes } from '../../scene/SkillNode3D';
import { Edges } from '../../scene/SkillEdge3D';
import { LoadingSequence } from './LoadingSequence';
import { DetailPanel } from './DetailPanel';
import { NextUpPanel } from './NextUpPanel';
import { SearchBar } from './SearchBar';
import { FilterChips } from './FilterChips';
import { allNodes, nodeMap } from '../../data/index';
import { computeLayout } from '../../graph/layout';
import { useUIStore } from '../../store/uiStore';
import './ConstellationView.css';

// Compute layout once at module level (pure, no side effects)
const positions = computeLayout(allNodes);

export default function ConstellationView() {
  const hasPlayedIntro = useRef(false);
  const [showIntro, setShowIntro] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);

  const { selectedNodeId, panelOpen, filterBranch, filterStatus, filterTier, searchResults } = useUIStore();

  // Play intro once per session
  useEffect(() => {
    if (!hasPlayedIntro.current) {
      hasPlayedIntro.current = true;
      setShowIntro(true);
    } else {
      setUiVisible(true);
    }
  }, []);

  const selectedNode = selectedNodeId ? nodeMap.get(selectedNodeId) : null;

  // Apply filters: nodes that don't match any active filter are dimmed in the 3D scene
  // We compute a set of "visible" node ids; nodes outside it render at low opacity
  const visibleNodeIds = useMemo(() => {
    const hasFilter = filterBranch || filterStatus || filterTier || searchResults;
    if (!hasFilter) return null; // null = all visible

    const ids = new Set<string>();
    for (const node of allNodes) {
      if (filterBranch && node.branch !== filterBranch) continue;
      if (filterTier && node.tier !== filterTier) continue;
      if (searchResults && !searchResults.has(node.id)) continue;
      ids.add(node.id);
    }
    return ids;
  }, [filterBranch, filterStatus, filterTier, searchResults]);

  return (
    <div className="constellation-view">
      <SkyCanvas>
        <Nodes nodes={allNodes} positions={positions} />
        <Edges nodes={allNodes} positions={positions} />
      </SkyCanvas>

      {/* HTML overlay layer — pointer-events: none on wrapper, auto on children */}
      <div className="constellation-overlay">
        {uiVisible && (
          <>
            <div className="constellation-overlay__top">
              <SearchBar />
              <FilterChips />
            </div>
            <div className="constellation-overlay__bottom-left">
              <NextUpPanel />
            </div>
          </>
        )}

        <AnimatePresence>
          {panelOpen && selectedNode && (
            <DetailPanel key={selectedNode.id} node={selectedNode} />
          )}
        </AnimatePresence>
      </div>

      {/* Loading / intro sequence */}
      <AnimatePresence>
        {showIntro && (
          <LoadingSequence
            onDone={() => {
              setShowIntro(false);
              setUiVisible(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
