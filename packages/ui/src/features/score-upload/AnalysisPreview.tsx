import type { MusicElementType } from './analyzerBridge';
import type { AnalysisResult } from './analyzerBridge';
import { Button } from '../../shared/components/Button';
import './AnalysisPreview.css';

const TYPE_LABELS: Record<MusicElementType, string> = {
  key: 'Key',
  'time-signature': 'Time Signature',
  technique: 'Technique',
  scale: 'Scale',
  'chord-type': 'Chord Type',
  'rhythm-pattern': 'Rhythm Pattern',
  dynamic: 'Dynamic',
  articulation: 'Articulation',
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`analysis-preview__star analysis-preview__star--${filled ? 'filled' : 'empty'}`}
      viewBox="0 0 18 18"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polygon points="9,2 11.5,7 17,7.5 13,11.5 14.5,17 9,14 3.5,17 5,11.5 1,7.5 6.5,7" />
    </svg>
  );
}

interface AnalysisPreviewProps {
  result: AnalysisResult;
  onRegenerate: () => void;
  onBuildTree: () => void;
}

export function AnalysisPreview({ result, onRegenerate, onBuildTree }: AnalysisPreviewProps) {
  // Group elements by type
  const grouped = new Map<MusicElementType, typeof result.elements>();
  for (const el of result.elements) {
    if (!grouped.has(el.type)) grouped.set(el.type, []);
    grouped.get(el.type)!.push(el);
  }

  return (
    <div className="analysis-preview">
      <div className="analysis-preview__header">
        <h2 className="analysis-preview__title">Analysis Complete</h2>
        <div className="analysis-preview__difficulty">
          <span className="analysis-preview__difficulty-label">Difficulty</span>
          <div className="analysis-preview__stars">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} filled={i < result.estimatedOverallDifficulty} />
            ))}
          </div>
        </div>
      </div>

      {result.summary && (
        <p className="analysis-preview__summary">{result.summary}</p>
      )}

      <div>
        <p className="analysis-preview__elements-heading">
          Detected Elements ({result.elements.length})
        </p>
        <div className="analysis-preview__groups">
          {[...grouped.entries()].map(([type, els]) => (
            <div key={type} className="analysis-preview__group">
              <span className="analysis-preview__group-label">{TYPE_LABELS[type]}</span>
              <div className="analysis-preview__tags">
                {els.map((el, i) => (
                  <span key={i} className="analysis-preview__tag">
                    {el.value}
                    {el.difficulty && (
                      <span className="analysis-preview__tag-difficulty">
                        d{el.difficulty}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="analysis-preview__actions">
        <Button variant="ghost" size="md" onClick={onRegenerate}>
          Regenerate
        </Button>
        <Button variant="primary" size="md" onClick={onBuildTree}>
          Build My Skill Tree →
        </Button>
      </div>
    </div>
  );
}
