import { useMemo } from 'react';
import * as THREE from 'three';
import { BRANCH_SECTORS, BRANCH_HEX, BRANCHES, SONG_BAND_Y, type Branch } from '../data/types';

function makeNebulaTexture(colorHex: string, size = 128): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size / 2;
  const gradient = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  gradient.addColorStop(0,   `${colorHex}28`); // ~16% center
  gradient.addColorStop(0.5, `${colorHex}10`); // ~6%
  gradient.addColorStop(1,   `${colorHex}00`); // transparent
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function BranchNebula({ branch, x }: { branch: Branch; x: number }) {
  const texture = useMemo(
    () => makeNebulaTexture(BRANCH_HEX[branch].glow),
    [branch]
  );
  return (
    <mesh position={[x, 2, -2]} renderOrder={-1}>
      <planeGeometry args={[9, 9]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function SongNebula() {
  const texture = useMemo(() => makeNebulaTexture('#D4AF37', 256), []);
  return (
    <mesh position={[2, SONG_BAND_Y, -2]} renderOrder={-1}>
      <planeGeometry args={[28, 4]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function Nebulae() {
  return (
    <>
      {BRANCHES.map(branch => (
        <BranchNebula
          key={branch}
          branch={branch}
          x={BRANCH_SECTORS[branch]}
        />
      ))}
      <SongNebula />
    </>
  );
}
