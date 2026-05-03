import { useState } from 'react';
import { ARCHETYPE_LORE } from './wikiData';

export function LoreSection() {
  const [activeId, setActiveId] = useState(ARCHETYPE_LORE[0].id);
  const active = ARCHETYPE_LORE.find((a) => a.id === activeId)!;

  return (
    <div className="wiki-lore">
      <nav className="wiki-lore__nav">
        {ARCHETYPE_LORE.map((a) => (
          <button
            key={a.id}
            className={['wiki-lore__nav-btn', activeId === a.id ? 'wiki-lore__nav-btn--active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActiveId(a.id)}
          >
            {a.name}
          </button>
        ))}
      </nav>

      <article className="wiki-lore__article">
        <header className="wiki-lore__header">
          <p className="wiki-lore__era">{active.era}</p>
          <h2 className="wiki-lore__title">{active.name}</h2>
          <p className="wiki-lore__summary">{active.summary}</p>
        </header>

        <div className="wiki-lore__meta">
          <div className="wiki-lore__meta-block">
            <span className="wiki-lore__meta-label">Key Artists</span>
            <span className="wiki-lore__meta-value">{active.keyArtists.join(', ')}</span>
          </div>
          <div className="wiki-lore__meta-block">
            <span className="wiki-lore__meta-label">Signature Gear</span>
            <span className="wiki-lore__meta-value">{active.gearSignature}</span>
          </div>
        </div>

        <div className="wiki-lore__body">
          {active.paragraphs.map((p, i) => (
            <p key={i} className="wiki-lore__para">{p}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
