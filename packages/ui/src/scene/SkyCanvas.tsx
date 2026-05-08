import { type ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Starfield } from './Starfield';
import { Nebulae } from './Nebulae';
import { Camera } from './Camera';
import { PostFX } from './PostFX';

interface Props {
  children?: ReactNode;
}

export function SkyCanvas({ children }: Props) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [2, 0, 12], fov: 60, near: 0.1, far: 500 }}
      style={{ width: '100%', height: '100%' }}
      onPointerMissed={() => {
        // Deselect node when clicking empty canvas
        import('../store/uiStore').then(m => m.useUIStore.getState().closePanel());
      }}
    >
      <color attach="background" args={['#0A0E1A']} />
      <ambientLight intensity={0.05} />

      <Suspense fallback={null}>
        <Starfield />
        <Nebulae />
        {children}
        <PostFX />
      </Suspense>

      <Camera />
    </Canvas>
  );
}
