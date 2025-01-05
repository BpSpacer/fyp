"use client";
import React, { useEffect, useRef, useState } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [rotationOffset, setRotationOffset] = useState({ y: 0 });

  useFrame((state, delta) => {
    // Apply color change based on the state
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);

    // Update rotation if dragging
    if (isDragging && meshRef.current) {
      const deltaX = state.pointer.x - initialMousePos.x;

      const sensitivity = 2; // Adjust sensitivity as needed

      // Update the rotation based on mouse movement
      const newRotationY = rotationOffset.y + deltaX * sensitivity;

      // Set the Y rotation
      meshRef.current.rotation.y = newRotationY;
    }
  });

  useEffect(() => {
    if (logoTexture) logoTexture.anisotropy = 16;
    if (fullTexture) fullTexture.anisotropy = 16;
  }, [logoTexture, fullTexture]);

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setInitialMousePos({ x: event.clientX, y: event.clientY });
    setRotationOffset({
      y: meshRef.current.rotation.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        ref={meshRef}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp} // Ensure dragging stops on pointer out
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
}

export default Shirt;
