import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SkillNode, SongNode, NodeStatus } from '../data/types';
import { BRANCH_HEX, isSongNode } from '../data/types';
import { useUIStore } from '../store/uiStore';
import { useProgressStore } from '../store/progressStore';
import { nodeMap } from '../data/index';
import { getPrereqPath } from '../graph/pathfinding';
import type { NodePosition3D } from '../graph/layout';

interface Props {
  node: SkillNode | SongNode;
  position: NodePosition3D;
  effectiveStatus: NodeStatus;
}

function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

const BASE_RADIUS = 0.28;
const ANCHOR_SCALE = 1.35;
const SONG_RADIUS  = 0.3;

export function SkillNode3D({ node, position, effectiveStatus }: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null!);

  const { selectedNodeId, hoveredNodeId, highlightPath, revealedNodes, loadSequenceDone } = useUIStore();
  const { selectNode, hoverNode, setCameraTarget, setHighlightPath } = useUIStore();

  const branchColors = BRANCH_HEX[node.branch];
  const primaryColor = hexToColor(branchColors.primary);
  const glowColor    = hexToColor(branchColors.glow);

  const isSelected   = selectedNodeId === node.id;
  const isHovered    = hoveredNodeId === node.id;
  const isHighlighted = highlightPath.includes(node.id);
  const isRevealed   = loadSequenceDone || revealedNodes.has(node.id);

  const song = isSongNode(node);
  const anchor = node.isAnchor;

  // Geometry: octahedron for anchor skill nodes, flat disc for songs, sphere otherwise
  const geometry = useMemo(() => {
    if (song) return new THREE.CylinderGeometry(SONG_RADIUS, SONG_RADIUS, 0.06, 8);
    if (anchor) return new THREE.OctahedronGeometry(BASE_RADIUS * ANCHOR_SCALE);
    return new THREE.SphereGeometry(BASE_RADIUS, 16, 12);
  }, [song, anchor]);

  // Status-driven emissive intensity
  const baseEmissive = useMemo(() => {
    switch (effectiveStatus) {
      case 'locked':    return 0.05;
      case 'available': return 0.5;
      case 'in_progress': return 0.85;
      case 'learned':   return 1.3;
      case 'mastered':  return 2.0;
    }
  }, [effectiveStatus]);

  const baseOpacity = effectiveStatus === 'locked' ? 0.22 : 1.0;
  const baseColor   = effectiveStatus === 'locked'
    ? new THREE.Color(0.3, 0.3, 0.35)
    : primaryColor;

  useFrame((_, delta) => {
    if (!matRef.current || !meshRef.current) return;

    // Pulse available nodes
    if (effectiveStatus === 'available') {
      const pulse = Math.sin(Date.now() * 0.0015) * 0.3 + 0.5;
      matRef.current.emissiveIntensity = pulse + 0.2;
    }

    // Scale reveal animation
    const targetScale = isRevealed ? (isHovered || isSelected ? 1.12 : 1.0) : 0.0;
    const currentScale = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(currentScale, targetScale, 12 * delta)
    );

    // Glow sphere for mastered
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
        const statuses = useProgressStore.getState().nodeStatuses;
        setHighlightPath(getPrereqPath(nodeMap, statuses, node.id));
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
          metalness={song ? 0.8 : 0.2}
        />
      </mesh>

      {/* Selection ring */}
      {isSelected && (
        <mesh>
          <torusGeometry args={[BASE_RADIUS * (anchor ? ANCHOR_SCALE : 1) + 0.12, 0.025, 8, 32]} />
          <meshBasicMaterial color={glowColor} transparent opacity={0.9} />
        </mesh>
      )}

      {/* Mastered outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[BASE_RADIUS * 1.9, 12, 8]} />
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

// Top-level component that renders all nodes
export function Nodes({
  nodes,
  positions,
}: {
  nodes: (SkillNode | SongNode)[];
  positions: Record<string, NodePosition3D>;
}) {
  const nodeStatuses = useProgressStore(s => s.nodeStatuses);

  // Compute effective statuses: a node is 'available' if all prerequisites are learned/mastered
  const effectiveStatuses = useMemo(() => {
    const result: Record<string, NodeStatus> = {};
    for (const node of nodes) {
      const explicit = nodeStatuses[node.id];
      if (explicit && explicit !== 'locked') {
        result[node.id] = explicit;
        continue;
      }
      const allPrereqsMet = node.prerequisites.every(pid => {
        const s = nodeStatuses[pid] ?? 'locked';
        return s === 'learned' || s === 'mastered';
      });
      result[node.id] = allPrereqsMet ? (explicit ?? 'available') : 'locked';
    }
    return result;
  }, [nodes, nodeStatuses]);

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
            effectiveStatus={effectiveStatuses[node.id] ?? 'locked'}
          />
        );
      })}
    </>
  );
}
