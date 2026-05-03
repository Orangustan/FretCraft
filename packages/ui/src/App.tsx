import { lazy, Suspense, useState } from 'react';
import { usePlayer } from './store/playerStore';
import './App.css';

const SkillTreeView = lazy(() => import('./features/skill-tree/SkillTreeView'));
const PracticeHubView = lazy(() => import('./features/practice/PracticeHubView'));
const TunerView = lazy(() => import('./features/tuner/TunerView'));
const ScoreUploadView = lazy(() => import('./features/score-upload/ScoreUploadView'));
const PlayerView = lazy(() => import('./features/player/PlayerView'));
const WikiView = lazy(() => import('./features/wiki/WikiView'));

type TabId = 'skill-tree' | 'practice' | 'tuner' | 'score-upload' | 'player' | 'wiki';

const TABS: { id: TabId; label: string; icon: JSX.Element }[] = [
  {
    id: 'skill-tree',
    label: 'Skill Tree',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="2" r="1.5" />
        <circle cx="3" cy="11" r="1.5" />
        <circle cx="13" cy="11" r="1.5" />
        <line x1="8" y1="3.5" x2="3" y2="9.5" />
        <line x1="8" y1="3.5" x2="13" y2="9.5" />
      </svg>
    ),
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6" />
        <polygon points="6.5,5.5 11,8 6.5,10.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 'tuner',
    label: 'Tuner',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="9" r="5" />
        <line x1="8" y1="4" x2="8" y2="2" strokeLinecap="round" />
        <line x1="8" y1="9" x2="10.5" y2="6.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'score-upload',
    label: 'Upload Score',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 10V3M5 6l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12h10" strokeLinecap="round" />
        <circle cx="12" cy="5" r="1.25" fill="currentColor" stroke="none" />
        <line x1="12" y1="5" x2="12" y2="8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'player',
    label: 'Player',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="2.5" />
        <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'wiki',
    label: 'Wiki',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="2" />
        <line x1="5" y1="6" x2="11" y2="6" strokeLinecap="round" />
        <line x1="5" y1="9" x2="11" y2="9" strokeLinecap="round" />
        <line x1="5" y1="12" x2="8" y2="12" strokeLinecap="round" />
      </svg>
    ),
  },
];

function LoadingFallback() {
  return (
    <div className="app-loading">
      <div className="app-loading__dot" />
      <div className="app-loading__dot" />
      <div className="app-loading__dot" />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('skill-tree');
  const { player } = usePlayer();

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-header__title">Guitar Skill Tree</span>
        <div className="app-header__level">Level {player.level}</div>
      </header>

      <nav className="app-nav">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`app-nav__tab${activeTab === tab.id ? ' app-nav__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-content">
        <Suspense fallback={<LoadingFallback />}>
          {activeTab === 'skill-tree' && <SkillTreeView />}
          {activeTab === 'practice' && <PracticeHubView />}
          {activeTab === 'tuner' && <TunerView />}
          {activeTab === 'score-upload' && <ScoreUploadView />}
          {activeTab === 'player' && <PlayerView />}
          {activeTab === 'wiki' && <WikiView />}
        </Suspense>
      </main>
    </div>
  );
}
