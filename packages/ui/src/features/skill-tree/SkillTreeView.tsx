import { ROCKER_TREE } from '@guitar-st/core';
import { usePlayer } from '../../store/playerStore';
import { useSkillTree } from './useSkillTree';
import { SkillTreeCanvas } from './SkillTreeCanvas';
import { NodeDetailPanel } from './NodeDetailPanel';
import './SkillTreeView.css';

export default function SkillTreeView() {
  const { activeTree, customTrees, setActiveTree } = usePlayer();
  const { nodeStatuses, handleNodeClick, selectedNodeId, resetSelection } = useSkillTree(activeTree);

  const selectedNode = selectedNodeId
    ? activeTree.nodes.find((n) => n.id === selectedNodeId) ?? null
    : null;

  const handleTreeChange = (treeId: string) => {
    setActiveTree(treeId);
    resetSelection();
  };

  const hasMultipleTrees = customTrees.length > 0;

  return (
    <div className="skill-tree-view">
      {hasMultipleTrees && (
        <div className="archetype-selector">
          <label htmlFor="archetype-select">Archetype</label>
          <select
            id="archetype-select"
            value={activeTree.id}
            onChange={(e) => handleTreeChange(e.target.value)}
          >
            <option value={ROCKER_TREE.id}>{ROCKER_TREE.name}</option>
            {customTrees.map((tree) => (
              <option key={tree.id} value={tree.id}>
                {tree.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <SkillTreeCanvas
        tree={activeTree}
        nodeStatuses={nodeStatuses}
        selectedNodeId={selectedNodeId}
        onNodeClick={handleNodeClick}
      />
      {selectedNode && (
        <NodeDetailPanel
          key={selectedNode.id}
          node={selectedNode}
          status={nodeStatuses[selectedNode.id] ?? 'locked'}
          tree={activeTree}
        />
      )}
    </div>
  );
}
