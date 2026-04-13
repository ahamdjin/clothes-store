"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const CLOTHES_MODELS = [
  "/models/Cap.glb",
  "/models/Glasses.glb",
  "/models/Jacket.glb",
  "/models/Sneakers.glb",
  "/models/T-shirt.glb",
  "/models/Top hat.glb",
];
export const CLOTHES_COUNT = CLOTHES_MODELS.length;

interface Props {
  index: number;
  teamColor?: string;
}

export default function ClothesPlaceholder({ index, teamColor = "#ffffff" }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const path = CLOTHES_MODELS[index];
  
  // Ensure paths with spaces are fetched correctly
  const { scene } = useGLTF(encodeURI(path));

  // Clone scene and normalize its scale so every object appears identically sized
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    
    // Measure the physical bounds of the specific model
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    
    // Force every arbitrary model to exactly 6 units in maximum length
    const targetSize = 6.5; 
    const scaleFactor = maxDimension > 0 ? targetSize / maxDimension : 1;
    clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    // Perfectly center the model mathematically
    const center = box.getCenter(new THREE.Vector3());
    clone.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);

    return clone;
  }, [scene]);

  // Target team color to lerp to
  const targetColor = useMemo(() => new THREE.Color(teamColor), [teamColor]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation only (no spinning)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }

    // Lerp glow light color smoothly
    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Massive dynamic rim glow wrapping behind the model tied to the Team Color */}
      <pointLight ref={lightRef} position={[0, 0, -3]} intensity={50} distance={20} decay={2} />
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload models for seamless switching
CLOTHES_MODELS.forEach((path) => {
  try {
    useGLTF.preload(encodeURI(path));
  } catch {
    console.error("Failed to preload:", path);
  }
});
