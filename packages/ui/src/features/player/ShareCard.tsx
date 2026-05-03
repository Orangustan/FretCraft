import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { ACHIEVEMENTS, calculateLevel, xpProgressInLevel } from '@guitar-st/core';
import './ShareCard.css';

interface ShareCardProps {
  playerName: string;
  xp: number;
  unlockedAchievements: string[];
  treeProgress: Array<{ name: string; pct: number }>;
}

export function ShareCard({ playerName, xp, unlockedAchievements, treeProgress }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const level = calculateLevel(xp);
  const progress = xpProgressInLevel(xp);
  const xpPct = Math.round(progress.percent * 100);
  const unlockedSet = new Set(unlockedAchievements);
  const topBadges = ACHIEVEMENTS.filter((a) => unlockedSet.has(a.id)).slice(0, 6);

  const handleExport = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#11111b',
        scale: 2,
        useCORS: true,
      });
      const url = canvas.toDataURL('image/png');

      if (navigator.share) {
        const blob = await (await fetch(url)).blob();
        const file = new File([blob], 'fretcraft-profile.png', { type: 'image/png' });
        await navigator.share({ files: [file], title: `${playerName} — FretCraft Profile` });
      } else {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fretcraft-profile.png';
        a.click();
      }
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="share-card-wrapper">
      {/* The rendered card (hidden off-screen visually but fully painted for html2canvas) */}
      <div ref={cardRef} className="share-card" aria-hidden="true">
        <div className="share-card__header">
          <div className="share-card__avatar">{playerName.charAt(0).toUpperCase()}</div>
          <div className="share-card__identity">
            <p className="share-card__name">{playerName}</p>
            <p className="share-card__level">Level {level}</p>
          </div>
          <div className="share-card__xp-total">
            <span className="share-card__xp-value">{xp.toLocaleString()}</span>
            <span className="share-card__xp-label">Total XP</span>
          </div>
        </div>

        <div className="share-card__xp-bar-wrap">
          <div className="share-card__xp-bar" style={{ width: `${xpPct}%` }} />
        </div>

        {treeProgress.length > 0 && (
          <div className="share-card__trees">
            {treeProgress.slice(0, 3).map((t) => (
              <div key={t.name} className="share-card__tree-row">
                <span className="share-card__tree-name">{t.name}</span>
                <div className="share-card__tree-bar-track">
                  <div className="share-card__tree-bar" style={{ width: `${t.pct}%` }} />
                </div>
                <span className="share-card__tree-pct">{t.pct}%</span>
              </div>
            ))}
          </div>
        )}

        {topBadges.length > 0 && (
          <div className="share-card__badges">
            {topBadges.map((a) => (
              <div key={a.id} className="share-card__badge">
                <span>{a.icon}</span>
                <span className="share-card__badge-label">{a.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="share-card__footer">fretcraft.app</div>
      </div>

      <button
        className="share-card__btn"
        onClick={handleExport}
        disabled={exporting}
      >
        {exporting ? 'Exporting...' : 'Share Profile Card'}
      </button>
    </div>
  );
}
