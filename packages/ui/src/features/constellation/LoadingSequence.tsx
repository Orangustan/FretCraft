import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import type { ConstellationNode } from './coreAdapter';
import './LoadingSequence.css';

const TIER_ORDER: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
const NODE_STAGGER_MS = 35;
const PHASE_DELAYS = {
  overlayFadeStart: 400,
  nebulaFade: 900,
  nodesStart: 1400,
  titleIn: 2800,
  titleOut: 3600,
  uiIn: 3900,
};

export function LoadingSequence({ nodes, onDone }: { nodes: ConstellationNode[]; onDone: () => void }) {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const { revealNode, setLoadSequenceDone } = useUIStore();
  const skipped = useRef(false);

  const skip = () => {
    if (skipped.current) return;
    skipped.current = true;
    // Reveal everything immediately
    for (const node of nodes) revealNode(node.id);
    setLoadSequenceDone();
    onDone();
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setOverlayVisible(false), PHASE_DELAYS.overlayFadeStart));

    // Reveal nodes tier-by-tier
    let delay = PHASE_DELAYS.nodesStart;
    for (const tier of TIER_ORDER) {
      const tierNodes = nodes.filter(n => n.tier === tier);
      for (const node of tierNodes) {
        const t = delay;
        timers.push(
          setTimeout(() => {
            if (!skipped.current) revealNode(node.id);
          }, t)
        );
        delay += NODE_STAGGER_MS;
      }
      delay += 120;
    }

    timers.push(setTimeout(() => { if (!skipped.current) setShowTitle(true); }, PHASE_DELAYS.titleIn));
    timers.push(setTimeout(() => { if (!skipped.current) setShowTitle(false); }, PHASE_DELAYS.titleOut));
    timers.push(setTimeout(() => {
      if (!skipped.current) {
        setLoadSequenceDone();
        onDone();
      }
    }, PHASE_DELAYS.uiIn));

    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="loading-sequence" onClick={skip}>
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            className="loading-sequence__overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTitle && (
          <motion.div
            className="loading-sequence__title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.5 } }}
          >
            <span className="loading-sequence__title-text">The Constellation</span>
            <span className="loading-sequence__title-sub">Your Guitar Skill Map</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="loading-sequence__skip">click anywhere to skip</div>
    </div>
  );
}
