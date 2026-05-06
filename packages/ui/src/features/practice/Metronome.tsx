import { useState, useEffect, useRef, useCallback } from 'react';
import { Metronome as MetronomeEngine } from '@guitar-st/audio-lab';
import type { TimeSignature, SoundType } from '@guitar-st/audio-lab';
import './Metronome.css';

interface MetronomeProps {
  initialBpm?: number;
  initialTimeSig?: TimeSignature;
}

const TIME_SIGS: TimeSignature[] = ['4/4', '3/4', '6/8'];
const SOUND_TYPES: { id: SoundType; label: string }[] = [
  { id: 'click',    label: 'Click' },
  { id: 'woodblock',label: 'Wood' },
  { id: 'cowbell',  label: 'Bell' },
  { id: 'rimshot',  label: 'Rim' },
];

function beatsPerBar(sig: TimeSignature): number {
  if (sig === '3/4') return 3;
  if (sig === '6/8') return 6;
  return 4;
}

export function Metronome({ initialBpm = 120, initialTimeSig = '4/4' }: MetronomeProps) {
  const [bpm, setBpm] = useState(initialBpm);
  const [timeSig, setTimeSig] = useState<TimeSignature>(initialTimeSig);
  const [soundType, setSoundType] = useState<SoundType>('click');
  const [running, setRunning] = useState(false);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const engineRef = useRef<MetronomeEngine | null>(null);

  const totalBeats = beatsPerBar(timeSig);

  const handleBeat = useCallback((beat: number) => {
    setActiveBeat(beat);
    setTimeout(() => setActiveBeat(null), 80);
  }, []);

  useEffect(() => {
    if (running) {
      engineRef.current = new MetronomeEngine({ bpm, timeSignature: timeSig, onBeat: handleBeat, soundType });
      engineRef.current.start();
    } else {
      engineRef.current?.stop();
      engineRef.current = null;
      setActiveBeat(null);
    }
    return () => {
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    engineRef.current?.setBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    engineRef.current?.setTimeSignature(timeSig);
  }, [timeSig]);

  useEffect(() => {
    engineRef.current?.setSoundType(soundType);
  }, [soundType]);

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  return (
    <div className="metronome">
      <div className="metronome__beats">
        {Array.from({ length: totalBeats }).map((_, i) => (
          <div
            key={i}
            className={[
              'metronome__beat',
              i === 0 ? 'metronome__beat--downbeat' : '',
              activeBeat === i ? 'metronome__beat--active' : '',
            ].filter(Boolean).join(' ')}
          />
        ))}
      </div>

      <div className="metronome__controls">
        <div className="metronome__bpm-row">
          <span className="metronome__bpm-value">{bpm}</span>
          <span className="metronome__bpm-label">BPM</span>
        </div>
        <input
          type="range"
          className="metronome__slider"
          min={40}
          max={240}
          value={bpm}
          onChange={handleBpmChange}
        />

        <div className="metronome__timesig-row">
          {TIME_SIGS.map((sig) => (
            <button
              key={sig}
              className={['metronome__timesig-btn', timeSig === sig ? 'metronome__timesig-btn--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setTimeSig(sig)}
            >
              {sig}
            </button>
          ))}
        </div>

        <div className="metronome__sound-row">
          {SOUND_TYPES.map((s) => (
            <button
              key={s.id}
              className={['metronome__sound-btn', soundType === s.id ? 'metronome__sound-btn--active' : ''].filter(Boolean).join(' ')}
              onClick={() => setSoundType(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          className={['metronome__toggle', running ? 'metronome__toggle--stop' : ''].filter(Boolean).join(' ')}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}
