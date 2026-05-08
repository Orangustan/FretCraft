import { useEffect, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { allNodes } from '../../data/index';
import { useUIStore } from '../../store/uiStore';
import './SearchBar.css';

const fuse = new Fuse(allNodes, {
  keys: ['title', 'description', 'practice'],
  threshold: 0.35,
  includeScore: true,
});

export function SearchBar() {
  const { searchQuery, setSearchQuery, setSearchResults } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const results = fuse.search(searchQuery);
    setSearchResults(new Set(results.map(r => r.item.id)));
  }, [searchQuery, setSearchResults]);

  return (
    <div className="search-bar">
      <svg className="search-bar__icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6.5" cy="6.5" r="4.5" />
        <line x1="10" y1="10" x2="14" y2="14" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        className="search-bar__input"
        type="text"
        placeholder="Search skills…"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="search-bar__clear" onClick={() => setSearchQuery('')} aria-label="Clear">
          ×
        </button>
      )}
    </div>
  );
}
