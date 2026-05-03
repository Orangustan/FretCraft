import { useState, useEffect, useRef } from 'react';
import { AudioInputManager } from '@guitar-st/audio-lab';
import type { AudioDevice } from '@guitar-st/audio-lab';
import './AudioInputSelector.css';

interface AudioInputSelectorProps {
  onDeviceConnected?: (ctx: AudioContext, manager: AudioInputManager) => void;
  onDisconnect?: () => void;
}

export function AudioInputSelector({ onDeviceConnected, onDisconnect }: AudioInputSelectorProps) {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const managerRef = useRef(new AudioInputManager());
  const animFrameRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const mgr = managerRef.current;
    mgr.listDevices().then((list) => {
      setDevices(list);
      const saved = mgr.getSavedDeviceId();
      if (saved && list.find((d) => d.deviceId === saved)) {
        setSelectedId(saved);
      } else if (list.length > 0) {
        setSelectedId(list[0].deviceId);
      }
    });
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      mgr.disconnect();
    };
  }, []);

  function pollLevel(analyser: AnalyserNode) {
    const buf = new Float32Array(analyser.fftSize);
    const tick = () => {
      analyser.getFloatTimeDomainData(buf);
      const rms = Math.sqrt(buf.reduce((s, v) => s + v * v, 0) / buf.length);
      setLevel(Math.min(1, rms * 10));
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }

  const handleConnect = async () => {
    setError(null);
    try {
      const mgr = managerRef.current;
      const ctx = await mgr.connect(selectedId || undefined);
      mgr.saveDeviceId(selectedId);

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      mgr.getSourceNode()!.connect(analyser);
      analyserRef.current = analyser;

      setConnected(true);
      pollLevel(analyser);
      onDeviceConnected?.(ctx, mgr);
    } catch (e) {
      setError('Could not access audio device. Check permissions.');
    }
  };

  const handleDisconnect = async () => {
    cancelAnimationFrame(animFrameRef.current);
    setLevel(0);
    await managerRef.current.disconnect();
    setConnected(false);
    onDisconnect?.();
  };

  return (
    <div className="audio-input-selector">
      <div className="audio-input-selector__header">
        <span className="audio-input-selector__title">Audio Input</span>
        <div className={['audio-input-selector__status', connected ? 'audio-input-selector__status--on' : ''].filter(Boolean).join(' ')}>
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {!connected && (
        <select
          className="audio-input-selector__select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {devices.length === 0 && <option value="">No devices found</option>}
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
          ))}
        </select>
      )}

      {connected && (
        <div className="audio-input-selector__vu">
          <div className="audio-input-selector__vu-bar" style={{ width: `${level * 100}%` }} />
        </div>
      )}

      {error && <p className="audio-input-selector__error">{error}</p>}

      <button
        className={['audio-input-selector__btn', connected ? 'audio-input-selector__btn--disconnect' : ''].filter(Boolean).join(' ')}
        onClick={connected ? handleDisconnect : handleConnect}
        disabled={!connected && devices.length === 0}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
