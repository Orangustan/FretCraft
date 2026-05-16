import { ROCKER_TREE, JAZZ_TREE, BLUES_TREE, CLASSICAL_TREE, METAL_TREE, VAIDEOLOGY_TREE, COUNTRY_TREE } from '@guitar-st/core';
import { usePlayer } from '../../store/playerStore';
import './ArchetypeSelector.css';

const BUILT_IN_TREES = [
  ROCKER_TREE, JAZZ_TREE, BLUES_TREE, CLASSICAL_TREE,
  METAL_TREE, VAIDEOLOGY_TREE, COUNTRY_TREE,
];

export function ArchetypeSelector() {
  const { activeTree, customTrees, setActiveTree } = usePlayer();

  return (
    <div className="archetype-selector">
      <select
        className="archetype-selector__select"
        value={activeTree.id}
        onChange={e => setActiveTree(e.target.value)}
      >
        {BUILT_IN_TREES.map(tree => (
          <option key={tree.id} value={tree.id}>{tree.name}</option>
        ))}
        {customTrees.length > 0 && (
          <optgroup label="Custom">
            {customTrees.map(tree => (
              <option key={tree.id} value={tree.id}>{tree.name}</option>
            ))}
          </optgroup>
        )}
      </select>
    </div>
  );
}
