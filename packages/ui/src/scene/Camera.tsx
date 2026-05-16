import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../store/uiStore';

const ZOOM_MIN = 4;
const ZOOM_MAX = 32;
const PAN_SPEED = 0.018;
const MOMENTUM_DECAY = 0.92;
const LERP_FACTOR = 5;

export function Camera() {
  const { camera, gl } = useThree();
  const target = useUIStore(s => s.cameraTarget);

  const velocity = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const targetRef = useRef(target);
  targetRef.current = target;

  // Apply initial camera position
  useEffect(() => {
    camera.position.set(0, -4, 16);
    (camera as THREE.PerspectiveCamera).fov = 60;
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    const el = gl.domElement.parentElement ?? gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      const zoom = camera.position.z;
      const scale = (zoom / ZOOM_MAX) * PAN_SPEED * 2;
      velocity.current.x = -dx * scale;
      velocity.current.y =  dy * scale;
      camera.position.x += velocity.current.x;
      camera.position.y += velocity.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.01;
      camera.position.z = THREE.MathUtils.clamp(
        camera.position.z + delta,
        ZOOM_MIN,
        ZOOM_MAX
      );
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('wheel', onWheel);
    };
  }, [camera, gl]);

  useFrame((_, delta) => {
    const t = targetRef.current;
    if (t && !isDragging.current) {
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, t.x, LERP_FACTOR * delta);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, t.y, LERP_FACTOR * delta);
      if (t.z) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, t.z, LERP_FACTOR * delta);
      }
    } else if (!isDragging.current) {
      camera.position.x += velocity.current.x;
      camera.position.y += velocity.current.y;
      velocity.current.x *= MOMENTUM_DECAY;
      velocity.current.y *= MOMENTUM_DECAY;
    }
  });

  return null;
}
