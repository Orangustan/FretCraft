import { useState, useMemo } from 'react';
import { GLOSSARY } from './wikiData';
import type { GlossaryEntry } from './wikiData';

const CATEGORIES: { id: GlossaryEntry['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'technique', label: 'Technique' },
  { id: 'theory', label: 'Theory' },
  { id: 'gear', label: 'Gear' },
  { id: 'rhythm', label: 'Rhythm' },
  { id: 'style', label: 'Style' },
];

export function GlossarySection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlossaryEntry['category'] | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return GLOSSARY.filter((e) => {
      if (category !== 'all' && e.category !== category) return false;
      if (!q) return true;
      return e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q);
    });
  }, [query, category]);

  return (
    <div className="wiki-glossary">
      <div className="wiki-glossary__controls">
        <input
          className="wiki-glossary__search"
          type="search"
          placeholder="Search terms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="wiki-glossary__cats">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={['wiki-glossary__cat', category === c.id ? 'wiki-glossary__cat--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="wiki-glossary__empty">No matching terms.</p>
      ) : (
        <dl className="wiki-glossary__list">
          {filtered.map((entry) => (
            <div key={entry.term} className="wiki-glossary__entry">
              <dt className="wiki-glossary__term">
                {entry.term}
                <span className="wiki-glossary__cat-tag">{entry.category}</span>
              </dt>
              <dd className="wiki-glossary__def">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
