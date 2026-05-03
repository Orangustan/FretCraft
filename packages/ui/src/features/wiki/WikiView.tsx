import { useState } from 'react';
import { GlossarySection } from './GlossarySection';
import { LoreSection } from './LoreSection';
import './WikiView.css';

type WikiTab = 'glossary' | 'lore';

export default function WikiView() {
  const [tab, setTab] = useState<WikiTab>('glossary');

  return (
    <div className="wiki-view">
      <div className="wiki-view__header">
        <p className="wiki-view__kicker">Knowledge Base</p>
        <div className="wiki-view__tabs">
          <button
            className={['wiki-view__tab', tab === 'glossary' ? 'wiki-view__tab--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setTab('glossary')}
          >
            Glossary
          </button>
          <button
            className={['wiki-view__tab', tab === 'lore' ? 'wiki-view__tab--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setTab('lore')}
          >
            Archetype Lore
          </button>
        </div>
      </div>

      <div className="wiki-view__content">
        {tab === 'glossary' ? <GlossarySection /> : <LoreSection />}
      </div>
    </div>
  );
}
