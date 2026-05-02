import { ROCKER_TREE } from '@guitar-st/core';
import { useSkillTree } from './useSkillTree';
import { SkillTreeCanvas } from './SkillTreeCanvas';
import { NodeDetailPanel } from './NodeDetailPanel';
import './SkillTreeView.css';

export default function SkillTreeView() {
  const tree = ROCKER_TREE;
  const { nodeStatuses, handleNodeClick, selectedNodeId } = useSkillTree(tree);

  const selectedNode = selectedNodeId
    ? tree.nodes.find((n) => n.id === selectedNodeId) ?? null
    : null;

  return (
    <div className="skill-tree-view">
      <SkillTreeCanvas
        tree={tree}
        nodeStatuses={nodeStatuses}
        selectedNodeId={selectedNodeId}
        onNodeClick={handleNodeClick}
      />
      {selectedNode && (
        <NodeDetailPanel
          key={selectedNode.id}
          node={selectedNode}
          status={nodeStatuses[selectedNode.id] ?? 'locked'}
          tree={tree}
        />
      )}
    </div>
  );
}
