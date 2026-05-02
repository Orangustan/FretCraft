import { useState, useRef } from 'react';
import { ROCKER_TREE, xpProgressInLevel, calculateLevel } from '@guitar-st/core';
import { usePlayer } from '../../store/playerStore';
import { ProgressBar, Card, Button } from '../../shared/components';
import './PlayerView.css';

export default function PlayerView() {
  const { player, customTrees, setActiveTree, dispatch } = usePlayer();
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(player.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const level = calculateLevel(player.xp);
  const xpProgress = xpProgressInLevel(player.xp);
  const xpPct = Math.round(xpProgress.percent * 100);

  const allTrees = [ROCKER_TREE, ...customTrees];
  const progressTrees = allTrees.filter((tree) =>
    tree.nodes.some((n) => n.id in player.nodeProgress),
  );

  function commitName() {
    setEditingName(false);
    const trimmed = nameValue.trim();
    if (trimmed && trimmed !== player.name) {
      dispatch({ type: 'SET_PLAYER', payload: { ...player, name: trimmed } });
    }
  }

  return (
    <div className="player-view">
      {/* Section 1: Profile Header */}
      <section className="player-header">
        {editingName ? (
          <input
            ref={inputRef}
            className="player-name-input"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.blur()}
            autoFocus
          />
        ) : (
          <h1 className="player-name" onClick={() => setEditingName(true)}>
            {player.name}
          </h1>
        )}
        <div className="player-level">{level}</div>
        <ProgressBar value={xpPct} label="XP to Next Level" />
        <p className="player-xp-total">Total XP: {player.xp}</p>
      </section>

      {/* Section 2: Tree Progress Cards */}
      {progressTrees.length > 0 && (
        <section className="tree-progress">
          <h2 className="section-label">Tree Progress</h2>
          <div className="tree-cards">
            {progressTrees.map((tree) => {
              const completed = tree.nodes.filter(
                (n) => player.nodeProgress[n.id] === 'complete',
              ).length;
              const total = tree.nodes.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <Card key={tree.id} title={tree.name}>
                  <div className="tree-card-stats">
                    <span className="tree-card-count">{completed} / {total} nodes</span>
                    <span className="tree-card-pct">{pct}% complete</span>
                  </div>
                  <ProgressBar value={pct} showPercent={false} />
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Section 3: My Custom Trees */}
      <section className="my-custom-trees">
        <h2 className="section-label">My Custom Trees</h2>
        {customTrees.length === 0 ? (
          <p className="empty-state">
            Upload sheet music to generate your first custom skill tree
          </p>
        ) : (
          <ul className="custom-tree-list">
            {customTrees.map((tree) => (
              <li key={tree.id} className="custom-tree-item">
                <div className="custom-tree-info">
                  <span className="custom-tree-name">{tree.name}</span>
                  <span className="custom-tree-meta">
                    {tree.sourceScoreId && (
                      <span className="custom-tree-source">{tree.sourceScoreId}</span>
                    )}
                    <span className="custom-tree-nodes">{tree.nodes.length} nodes</span>
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setActiveTree(tree.id)}>
                  Open Tree
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
