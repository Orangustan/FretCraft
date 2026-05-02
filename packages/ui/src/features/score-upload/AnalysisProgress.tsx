import type { ProgressStep } from './useScoreAnalysis';
import './AnalysisProgress.css';

const STEPS: Array<{ label: string }> = [
  { label: 'Extracting PDF...' },
  { label: 'Identifying musical elements...' },
  { label: 'Scoring difficulty...' },
  { label: 'Building your skill tree...' },
];

function CheckIcon() {
  return (
    <svg className="analysis-progress__check" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,7 5.5,10.5 12,3" />
    </svg>
  );
}

function stepState(index: number, progressStep: ProgressStep): 'pending' | 'active' | 'done' {
  const step = (index + 1) as ProgressStep;
  if (step < progressStep) return 'done';
  if (step === progressStep) return 'active';
  return 'pending';
}

interface AnalysisProgressProps {
  progressStep: ProgressStep;
}

export function AnalysisProgress({ progressStep }: AnalysisProgressProps) {
  return (
    <div className="analysis-progress">
      <h2 className="analysis-progress__title">Analyzing Score</h2>

      <div className="analysis-progress__steps">
        {STEPS.map((s, i) => {
          const state = stepState(i, progressStep);
          const isLast = i === STEPS.length - 1;

          return (
            <div key={i}>
              <div className={`analysis-progress__step analysis-progress__step--${state}`}>
                <div className="analysis-progress__indicator">
                  {state === 'done' ? (
                    <CheckIcon />
                  ) : (
                    <div className="analysis-progress__dot" />
                  )}
                </div>
                <span className="analysis-progress__step-label">{s.label}</span>
              </div>
              {!isLast && (
                <div className={`analysis-progress__connector analysis-progress__connector--${state === 'done' ? 'done' : 'pending'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
