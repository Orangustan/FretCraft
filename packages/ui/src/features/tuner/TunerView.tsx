import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioInputManager, PitchDetector } from '@guitar-st/audio-lab';
import type { PitchResult } from '@guitar-st/audio-lab';
import './TunerView.css';

const STANDARD_TUNING = [
  { string: 6, note: 'E2', label: 'E' },
  { string: 5, note: 'A2', label: 'A' },
  { string: 4, note: 'D3', label: 'D' },
  { string: 3, note: 'G3', label: 'G' },
  { string: 2, note: 'B3', label: 'B' },
  { string: 1, note: 'E4', label: 'e' },
];

function accentColor(cents: number): string {
  const abs = Math.abs(cents);
  if (abs <= 5) return '#50c878';
  if (abs <= 15) return '#50c878';
  if (abs <= 30) return '#f5a623';
  return '#e05c5c';
}

function noteLabel(note: string): { name: string; octave: string } {
  const match = note.match(/^([A-G]#?)(-?\d+)$/);
  if (!match) return { name: note, octave: '' };
  return { name: match[1], octave: match[2] };
}

export default function TunerView() {
  const [connected, setConnected] = useState(false);
  const [pitch, setPitch] = useState<PitchResult | null>(null);
  const audioMgrRef = useRef(new AudioInputManager());
  const pitchDetRef = useRef<PitchDetector | null>(null);

  const stop = useCallback(() => {
    pitchDetRef.current?.stop();
    pitchDetRef.current = null;
    audioMgrRef.current.disconnect();
    setConnected(false);
    setPitch(null);
  }, []);

  useEffect(() => () => stop(), [stop]);

  const handleConnect = async () => {
    try {
      const saved = audioMgrRef.current.getSavedDeviceId();
      const ctx = await audioMgrRef.current.connect(saved ?? undefined);
      const src = audioMgrRef.current.getSourceNode()!;
      pitchDetRef.current = new PitchDetector(src, ctx, (r) => setPitch(r));
      pitchDetRef.current.start();
      setConnected(true);
    } catch {
      // Permission denied or no device
    }
  };

  const accent = pitch ? accentColor(pitch.cents) : 'var(--color-text-muted)';
  const needlePos = pitch ? 50 + Math.max(-50, Math.min(50, pitch.cents)) : 50;
  const parsed = pitch ? noteLabel(pitch.note) : null;

  return (
    <div className="tuner-view">
      <div className="tuner-view__card">
        <p className="tuner-view__kicker">Chromatic Tuner</p>

        <div className="tuner-view__display">
          {pitch ? (
            <>
              <div className="tuner-view__note" style={{ color: accent }}>
                <span className="tuner-view__note-name">{parsed?.name}</span>
                <span className="tuner-view__note-octave">{parsed?.octave}</span>
              </div>
              <div className="tuner-view__cents" style={{ color: accent }}>
                {pitch.cents > 0 ? `+${pitch.cents}` : pitch.cents}¢
              </div>
            </>
          ) : (
            <div className="tuner-view__note tuner-view__note--idle">
              <span className="tuner-view__note-name">—</span>
            </div>
          )}
        </div>

        <div className="tuner-view__needle-track">
          <div className="tuner-view__needle-center" />
          {pitch && (
            <div
              className="tuner-view__needle"
              style={{ left: `${needlePos}%`, background: accent }}
            />
          )}
          <div className="tuner-view__needle-labels">
            <span>-50¢</span>
            <span>in tune</span>
            <span>+50¢</span>
          </div>
        </div>

        {!connected ? (
          <button className="tuner-view__connect-btn" onClick={handleConnect}>
            Connect Microphone
          </button>
        ) : (
          <button className="tuner-view__stop-btn" onClick={stop}>
            Disconnect
          </button>
        )}

        {connected && !pitch && (
          <p className="tuner-view__listening">Listening for a note...</p>
        )}

        <div className="tuner-view__reference">
          <p className="tuner-view__reference-label">Standard Tuning Reference</p>
          <div className="tuner-view__strings">
            {STANDARD_TUNING.map((s) => (
              <div key={s.string} className="tuner-view__string-row">
                <span className="tuner-view__string-num">{s.string}</span>
                <span className="tuner-view__string-note">{s.label}</span>
                <span className="tuner-view__string-full">{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
