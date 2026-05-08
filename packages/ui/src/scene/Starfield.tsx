import { useRef, useMemo } from 'react';
import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Slow-drifting near-field particles that provide parallax when the camera moves
function DriftParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 180;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      vel[i * 3]     = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3]     += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      // wrap around so particles never disappear
      if (pos[i * 3] > 15)  pos[i * 3] = -15;
      if (pos[i * 3] < -15) pos[i * 3] = 15;
      if (pos[i * 3 + 1] > 10)  pos[i * 3 + 1] = -10;
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#A8DAF2"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function Starfield() {
  return (
    <>
      {/* Distant star layer */}
      <Stars
        radius={80}
        depth={40}
        count={4500}
        factor={3.5}
        saturation={0.3}
        fade
        speed={0.3}
      />
      {/* Near drifting particles for parallax depth */}
      <DriftParticles />
    </>
  );
}
