import { type ReactNode, Suspense, Component, type ErrorInfo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Starfield } from './Starfield';
import { Nebulae } from './Nebulae';
import { Camera } from './Camera';
import { PostFX } from './PostFX';

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[SkyCanvas] 3D render error:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          width: '100%', height: '100%', background: '#0A0E1A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#E87088', fontFamily: 'Fragment Mono, monospace', fontSize: '0.8rem',
        }}>
          3D scene error: {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

interface Props {
  children?: ReactNode;
}

export function SkyCanvas({ children }: Props) {
  return (
    <CanvasErrorBoundary>
      <Canvas
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, -4, 16], fov: 60, near: 0.1, far: 500 }}
        style={{ width: '100%', height: '100%' }}
        onPointerMissed={() => {
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
    </CanvasErrorBoundary>
  );
}
