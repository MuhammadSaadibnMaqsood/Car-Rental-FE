import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Ferrari({ scrollProgress }) {
  // Replace this URL with a high-quality Ferrari GLB model
  const { scene } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/ferrari.glb');
  const group = useRef();
  const carRef = useRef();

  // Optimized Paint Material
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material.name.includes('Body')) {
          obj.material.roughness = 0.1;
          obj.material.metalness = 1;
          obj.material.color = new THREE.Color('#ff2800');
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Idle "Breathing" Animation
    carRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    
    // Mouse Parallax Interaction
    const mouseX = state.mouse.x * 0.2;
    const mouseY = state.mouse.y * 0.2;
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouseX, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -mouseY, 0.05);

    // Entrance Animation Logic
    if (t < 2) {
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5, 0.02);
    }
  });

  return (
    <group ref={group}>
      <primitive 
        ref={carRef}
        object={scene} 
        scale={2} 
        position={[0, -0.8, 0]} 
        rotation={[0, -Math.PI / 4, 0]} 
      />
    </group>
  );
}