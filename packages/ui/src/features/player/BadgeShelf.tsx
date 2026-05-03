import { ACHIEVEMENTS } from '@guitar-st/core';
import './BadgeShelf.css';

interface BadgeShelfProps {
  unlockedIds: string[];
}

export function BadgeShelf({ unlockedIds }: BadgeShelfProps) {
  const unlocked = new Set(unlockedIds);
  return (
    <div className="badge-shelf">
      {ACHIEVEMENTS.map((a) => {
        const isUnlocked = unlocked.has(a.id);
        return (
          <div
            key={a.id}
            className={['badge-shelf__badge', isUnlocked ? 'badge-shelf__badge--unlocked' : ''].filter(Boolean).join(' ')}
            title={`${a.label}: ${a.description}`}
          >
            <span className="badge-shelf__icon">{a.icon}</span>
            <span className="badge-shelf__label">{a.label}</span>
            {isUnlocked && a.xpBonus > 0 && (
              <span className="badge-shelf__xp">+{a.xpBonus}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
