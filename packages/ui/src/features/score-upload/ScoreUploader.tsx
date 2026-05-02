import { useRef, useState, useCallback } from 'react';
import { Button } from '../../shared/components/Button';
import './ScoreUploader.css';

function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 48V20l28-6v28" />
      <circle cx="16" cy="48" r="8" />
      <circle cx="44" cy="42" r="8" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 4h14l6 6v18H6z" />
      <path d="M20 4v6h6" />
      <line x1="10" y1="16" x2="22" y2="16" />
      <line x1="10" y1="21" x2="18" y2="21" />
    </svg>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface ScoreUploaderProps {
  file: File | null;
  error: string | null;
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
}

export function ScoreUploader({ file, error, onFileSelect, onAnalyze }: ScoreUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const acceptFile = useCallback((f: File) => {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Only PDF files are accepted. Please choose a .pdf sheet music file.');
      return;
    }
    setFileError(null);
    onFileSelect(f);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) acceptFile(f);
  }, [acceptFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) acceptFile(f);
    e.target.value = '';
  }, [acceptFile]);

  const dropZoneClass = [
    'score-uploader__drop-zone',
    isDragOver ? 'score-uploader__drop-zone--drag-over' : '',
    file ? 'score-uploader__drop-zone--has-file' : '',
  ].filter(Boolean).join(' ');

  const displayError = fileError ?? error;

  return (
    <div className="score-uploader">
      <h2 className="score-uploader__title">Upload Sheet Music</h2>
      <p className="score-uploader__subtitle">
        AI will analyze your score and generate a personalized skill tree
      </p>

      <div
        className={dropZoneClass}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
      >
        {file ? (
          <div className="score-uploader__file-info" onClick={(e) => e.stopPropagation()}>
            <FileIcon className="score-uploader__file-icon" />
            <div className="score-uploader__file-details">
              <div className="score-uploader__file-name">{file.name}</div>
              <div className="score-uploader__file-size">{formatBytes(file.size)}</div>
            </div>
            <button
              className="score-uploader__file-clear"
              onClick={(e) => { e.stopPropagation(); onFileSelect(undefined as unknown as File); setFileError(null); }}
              aria-label="Remove file"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="4" y1="4" x2="12" y2="12" />
                <line x1="12" y1="4" x2="4" y2="12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <MusicNoteIcon className="score-uploader__music-icon" />
            <span className="score-uploader__drop-label">Drop your sheet music here</span>
            <span className="score-uploader__drop-sublabel">or click to browse · PDF only</span>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="score-uploader__input"
        onChange={handleInputChange}
      />

      {displayError && (
        <div className="score-uploader__error">{displayError}</div>
      )}

      {file && (
        <div className="score-uploader__actions">
          <Button variant="primary" size="lg" onClick={onAnalyze}>
            Analyze Score
          </Button>
        </div>
      )}
    </div>
  );
}
