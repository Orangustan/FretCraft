import { usePlayer } from '../../store/playerStore';
import './PlayerView.css';

export default function PlayerView() {
  const { player, customTrees, activeTree, setActiveTree } = usePlayer();

  return (
    <div className="player-view">
      <section className="player-summary">
        <h2>{player.name}</h2>
        <p>Level {player.level} &mdash; {player.xp} XP</p>
        <p>Active tree: <strong>{activeTree.name}</strong></p>
      </section>

      {customTrees.length > 0 && (
        <section className="my-trees">
          <h3>My Trees</h3>
          <ul className="tree-list">
            {customTrees.map((tree) => (
              <li key={tree.id} className="tree-item">
                <div className="tree-item-info">
                  <span className="tree-item-name">{tree.name}</span>
                  <span className="tree-item-count">{tree.nodes.length} nodes</span>
                </div>
                <button
                  className="tree-item-activate"
                  onClick={() => setActiveTree(tree.id)}
                  disabled={activeTree.id === tree.id}
                >
                  {activeTree.id === tree.id ? 'Active' : 'Switch'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
