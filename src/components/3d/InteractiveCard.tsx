"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  ContactShadows,
  Text,
  OrbitControls
} from "@react-three/drei";
import * as THREE from "three";

interface CardProps {
  name: string;
  role: string;
  company: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  scale?: number; // Added for geometric scaling
}

function CardMesh({ name, role, company, instagram, facebook, linkedin, scale = 1 }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (glowMaterialRef.current) {
      // High-end breathing effect for the edge
      glowMaterialRef.current.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Main Card Body - Obsidian Black with Clearcoat Finish */}
      <RoundedBox args={[3.37, 2.12, 0.02]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial
          color="#040308"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1}
        />
      </RoundedBox>

      {/* Micro-thin polished edge */}
      <RoundedBox args={[3.375, 2.125, 0.01]} radius={0.042} smoothness={4}>
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Realistic Thinner Chip */}
      <RoundedBox args={[0.45, 0.35, 0.022]} position={[-1.1, 0.4, 0]} radius={0.04} smoothness={4}>
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
      </RoundedBox>

      {/* Front Data Overlays */}
      <group position={[0, 0, 0.012]}>
        <Text position={[1.4, 0.75, 0]} fontSize={0.18} color="#ffffff" anchorX="right" fontWeight="bold" letterSpacing={0.1}>
          {company || "ERTHAD"}
        </Text>
        <Text position={[1.4, 0.55, 0]} fontSize={0.07} color="#4cc9f0" anchorX="right" letterSpacing={0.25}>
          SMART NFC
        </Text>
        <Text position={[-1.4, -0.55, 0]} fontSize={0.22} color="#ffffff" anchorX="left" fontWeight="bold" letterSpacing={0.02}>
          {name || "YOUR NAME"}
        </Text>
        <Text position={[-1.4, -0.8, 0]} fontSize={0.1} color="#f72585" anchorX="left" letterSpacing={0.15} fontWeight="bold">
          {role || "YOUR ROLE"}
        </Text>
        <Text position={[1.4, -0.8, 0]} fontSize={0.12} color="#ffffff" anchorX="right" fillOpacity={0.4} fontWeight="bold" rotation={[0, 0, Math.PI / 2]}>
          )))
        </Text>
      </group>

      {/* Back Data */}
      <group position={[0, 0, -0.012]} rotation={[0, Math.PI, 0]}>
        <Text position={[0, 0.65, 0]} fontSize={0.12} color="#ffffff" anchorX="center" fillOpacity={0.7} letterSpacing={0.2}>
          TAP OR SCAN TO CONNECT
        </Text>
        <group position={[-1.1, 0.1, 0]}>
          <Text position={[0, 0.15, 0]} fontSize={0.11} color="#4cc9f0" anchorX="left" fontWeight="bold">IG <Text position={[0.35, 0, 0]} fontSize={0.12} color="#ffffff" anchorX="left" fillOpacity={1}>{instagram || "@username"}</Text></Text>
          <Text position={[0, -0.2, 0]} fontSize={0.11} color="#f72585" anchorX="left" fontWeight="bold">FB <Text position={[0.35, 0, 0]} fontSize={0.12} color="#ffffff" anchorX="left" fillOpacity={1}>{facebook || "/username"}</Text></Text>
          <Text position={[0, -0.55, 0]} fontSize={0.11} color="#9d4edd" anchorX="left" fontWeight="bold">IN <Text position={[0.35, 0, 0]} fontSize={0.12} color="#ffffff" anchorX="left" fillOpacity={1}>{linkedin || "/in/username"}</Text></Text>
        </group>
      </group>
    </group>
  );
}

export default function InteractiveCard(props: CardProps) {
  const getResponsiveValues = () => {
    if (typeof window === "undefined") return { cameraZ: 8.5, cameraFOV: 30, geometricScale: 0.8, key: "desktop" };
    const width = window.innerWidth;
    if (width < 400) {
      return { cameraZ: 2.6, cameraFOV: 60, geometricScale: 1.4, key: "xs" };
    } else if (width < 640) {
      return { cameraZ: 2.8, cameraFOV: 60, geometricScale: 1.35, key: "sm" };
    } else if (width < 1024) {
      return { cameraZ: 4.5, cameraFOV: 45, geometricScale: 1.0, key: "md" };
    } else if (width < 1280) {
      return { cameraZ: 8.0, cameraFOV: 30, geometricScale: 0.85, key: "lg" };
    } else {
      return { cameraZ: 8.5, cameraFOV: 30, geometricScale: 0.8, key: "xl" };
    }
  };

  const [responsive, setResponsive] = useState(getResponsiveValues());

  useEffect(() => {
    const handleResize = () => setResponsive(getResponsiveValues());
    handleResize(); // ensure correct sizing on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { cameraZ, cameraFOV, geometricScale, key } = responsive;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        key={key} // Re-mounts canvas on resize for perfect math
        camera={{
          position: [0, 0, cameraZ],
          fov: cameraFOV
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <spotLight position={[5, 10, 5]} intensity={2} color="#ffffff" penumbra={1} />
          <pointLight position={[10, 0, 10]} intensity={1.5} color="#9d4edd" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#4cc9f0" />

          <CardMesh {...props} scale={geometricScale} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
          />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={12} blur={3} color="#9d4edd" />
        </Suspense>
      </Canvas>

      {/* 360 Rotation Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#040308]/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-neon-cyan animate-spin-slow">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">ROTATE 360°</span>
      </div>
    </div>
  );
}