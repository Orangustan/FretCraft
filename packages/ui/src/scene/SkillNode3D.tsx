import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { NodeStatus } from '../data/types';
import { BRANCH_HEX } from '../data/types';
import { useUIStore } from '../store/uiStore';
import { getPrereqPath } from '../graph/pathfinding';
import type { NodePosition3D } from '../graph/layout';
import type { ConstellationNode } from '../features/constellation/coreAdapter';

interface Props {
  node: ConstellationNode;
  position: NodePosition3D;
  effectiveStatus: NodeStatus;
  onSelect: () => void;
}

function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

// Anchor (root) nodes are larger; nodes shrink slightly as tier increases.
const TIER_RADIUS: Record<number, number> = { 1: 0.42, 2: 0.28, 3: 0.24, 4: 0.22, 5: 0.38 };
const BASE_RADIUS = 0.28;
const ANCHOR_SCALE = 1.35;

export function SkillNode3D({ node, position, effectiveStatus, onSelect }: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null!);

  const { selectedNodeId, hoveredNodeId, highlightPath, revealedNodes, loadSequenceDone } = useUIStore();
  const { selectNode, hoverNode, setCameraTarget } = useUIStore();

  const branchColors = BRANCH_HEX[node.branch];
  const primaryColor = hexToColor(branchColors.primary);
  const glowColor    = hexToColor(branchColors.glow);

  const isSelected    = selectedNodeId === node.id;
  const isHovered     = hoveredNodeId === node.id;
  const isHighlighted = highlightPath.includes(node.id);
  const isRevealed    = loadSequenceDone || revealedNodes.has(node.id);

  const radius = TIER_RADIUS[node.tier] ?? BASE_RADIUS;
  const geometry = useMemo(() => {
    if (node.isAnchor) return new THREE.OctahedronGeometry(radius * ANCHOR_SCALE);
    return new THREE.SphereGeometry(radius, 16, 12);
  }, [node.isAnchor, radius]);

  const baseEmissive = useMemo(() => {
    switch (effectiveStatus) {
      case 'locked':      return 0.05;
      case 'available':   return 0.5;
      case 'in_progress': return 0.85;
      case 'learned':     return 1.3;
      case 'mastered':    return 2.0;
    }
  }, [effectiveStatus]);

  const baseOpacity = effectiveStatus === 'locked' ? 0.22 : 1.0;
  const baseColor   = effectiveStatus === 'locked'
    ? new THREE.Color(0.3, 0.3, 0.35)
    : primaryColor;

  useFrame((_, delta) => {
    if (!matRef.current || !meshRef.current) return;

    if (effectiveStatus === 'available') {
      const pulse = Math.sin(Date.now() * 0.0015) * 0.3 + 0.5;
      matRef.current.emissiveIntensity = pulse + 0.2;
    }

    const targetScale = isRevealed ? (isHovered || isSelected ? 1.12 : 1.0) : 0.0;
    const currentScale = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, 12 * delta)
    );

    if (glowRef.current) {
      glowRef.current.visible = effectiveStatus === 'mastered' && isRevealed;
      if (glowRef.current.visible) {
        const glowPulse = Math.sin(Date.now() * 0.0008) * 0.15 + 0.85;
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowPulse * 0.18;
      }
    }
  });

  const emissiveColor = (isHighlighted || isSelected) ? glowColor : primaryColor;
  const emissiveIntensity = isSelected
    ? baseEmissive * 1.6
    : isHovered
      ? baseEmissive * 1.3
      : isHighlighted
        ? baseEmissive * 1.2
        : baseEmissive;

  return (
    <group
      position={[position.x, position.y, position.z]}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
        setCameraTarget({ x: position.x, y: position.y, z: 7 });
        onSelect();
      }}
      onPointerEnter={(e) => { e.stopPropagation(); hoverNode(node.id); }}
      onPointerLeave={() => hoverNode(null)}
    >
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          ref={matRef}
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent={effectiveStatus === 'locked'}
          opacity={baseOpacity}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {isSelected && (
        <mesh>
          <torusGeometry args={[radius * (node.isAnchor ? ANCHOR_SCALE : 1) + 0.12, 0.025, 8, 32]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.9} />
        </mesh>
      )}

      <mesh ref={glowRef}>
        <sphereGeometry args={[radius * 1.9, 12, 8]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function Nodes({
  nodes,
  positions,
  nodeStatuses,
  nodeMap,
}: {
  nodes: ConstellationNode[];
  positions: Record<string, NodePosition3D>;
  nodeStatuses: Record<string, NodeStatus>;
  nodeMap: Map<string, ConstellationNode>;
}) {
  const { setHighlightPath } = useUIStore();

  return (
    <>
      {nodes.map(node => {
        const pos = positions[node.id];
        if (!pos) return null;
        return (
          <SkillNode3D
            key={node.id}
            node={node}
            position={pos}
            effectiveStatus={nodeStatuses[node.id] ?? 'locked'}
            onSelect={() => setHighlightPath(getPrereqPath(nodeMap, nodeStatuses, node.id))}
          />
        );
      })}
    </>
  );
}
