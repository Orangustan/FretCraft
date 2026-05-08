import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { SkillNode, SongNode, NodeStatus } from '../data/types';
import { BRANCH_HEX } from '../data/types';
import { useUIStore } from '../store/uiStore';
import { useProgressStore } from '../store/progressStore';
import type { NodePosition3D } from '../graph/layout';

interface EdgeProps {
  sourceId: string;
  targetId: string;
  sourceBranch: string;
  targetBranch: string;
  sourceStatus: NodeStatus;
  targetStatus: NodeStatus;
  sourcePos: NodePosition3D;
  targetPos: NodePosition3D;
}

function interpolateHex(a: string, b: string, t: number): THREE.Color {
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  return new THREE.Color().lerpColors(ca, cb, t);
}

function SkillEdge({ sourceId, targetId, sourceBranch, targetBranch, sourceStatus, targetStatus, sourcePos, targetPos }: EdgeProps) {
  const { highlightPath } = useUIStore();
  const pulseRef = useRef<THREE.Mesh>(null!);

  const isOnPath = highlightPath.includes(sourceId) && highlightPath.includes(targetId);
  const isSourceDone = sourceStatus === 'learned' || sourceStatus === 'mastered';
  const isTargetDone = targetStatus === 'learned' || targetStatus === 'mastered';
  const bothDone = isSourceDone && isTargetDone;
  const eitherDone = isSourceDone || isTargetDone;

  const sourceColor = BRANCH_HEX[sourceBranch as keyof typeof BRANCH_HEX]?.primary ?? '#6FB5D8';
  const targetColor = BRANCH_HEX[targetBranch as keyof typeof BRANCH_HEX]?.primary ?? '#6FB5D8';
  const midColor = interpolateHex(sourceColor, targetColor, 0.5);

  const opacity = isOnPath
    ? 0.85
    : bothDone ? 0.65
    : eitherDone ? 0.35
    : 0.12;

  const lineColor = isOnPath
    ? new THREE.Color(BRANCH_HEX[targetBranch as keyof typeof BRANCH_HEX]?.glow ?? '#A8DAF2')
    : midColor;

  const points = useMemo(() => [
    new THREE.Vector3(sourcePos.x, sourcePos.y, sourcePos.z),
    new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z),
  ], [sourcePos, targetPos]);

  // Traveling pulse along learned/mastered edges
  useFrame(() => {
    if (!pulseRef.current || !isSourceDone) return;
    const t = ((Date.now() * 0.0004) % 1);
    const px = sourcePos.x + (targetPos.x - sourcePos.x) * t;
    const py = sourcePos.y + (targetPos.y - sourcePos.y) * t;
    const pz = sourcePos.z + (targetPos.z - sourcePos.z) * t;
    pulseRef.current.position.set(px, py, pz);
    pulseRef.current.visible = true;
  });

  return (
    <>
      <Line
        points={points}
        color={lineColor}
        lineWidth={isOnPath ? 2.5 : 1.2}
        transparent
        opacity={opacity}
        dashed={!eitherDone && !isOnPath}
        dashSize={0.15}
        gapSize={0.1}
      />
      {/* Traveling pulse — only for edges where source is done */}
      {isSourceDone && (
        <mesh ref={pulseRef} visible={false}>
          <sphereGeometry args={[0.045, 6, 4]} />
          <meshBasicMaterial
            color={BRANCH_HEX[sourceBranch as keyof typeof BRANCH_HEX]?.glow ?? '#A8DAF2'}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </>
  );
}

export function Edges({
  nodes,
  positions,
}: {
  nodes: (SkillNode | SongNode)[];
  positions: Record<string, NodePosition3D>;
}) {
  const nodeStatuses = useProgressStore(s => s.nodeStatuses);

  const nodeMap = useMemo(
    () => new Map(nodes.map(n => [n.id, n])),
    [nodes]
  );

  const edges = useMemo(() => {
    const result: {
      key: string;
      sourceId: string;
      targetId: string;
      sourceBranch: string;
      targetBranch: string;
    }[] = [];

    for (const node of nodes) {
      for (const prereqId of node.prerequisites) {
        const prereq = nodeMap.get(prereqId);
        if (!prereq) continue;
        if (!positions[prereqId] || !positions[node.id]) continue;
        result.push({
          key: `${prereqId}→${node.id}`,
          sourceId: prereqId,
          targetId: node.id,
          sourceBranch: prereq.branch,
          targetBranch: node.branch,
        });
      }
    }
    return result;
  }, [nodes, nodeMap, positions]);

  return (
    <>
      {edges.map(edge => (
        <SkillEdge
          key={edge.key}
          sourceId={edge.sourceId}
          targetId={edge.targetId}
          sourceBranch={edge.sourceBranch}
          targetBranch={edge.targetBranch}
          sourceStatus={nodeStatuses[edge.sourceId] ?? 'locked'}
          targetStatus={nodeStatuses[edge.targetId] ?? 'locked'}
          sourcePos={positions[edge.sourceId]!}
          targetPos={positions[edge.targetId]!}
        />
      ))}
    </>
  );
}
