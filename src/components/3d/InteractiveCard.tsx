"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  RoundedBox, 
  Environment, 
  ContactShadows, 
  Float, 
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
}

function CardMesh({ name, role, company, instagram, facebook, linkedin }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (glowMaterialRef.current) {
      glowMaterialRef.current.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Main Card Body */}
        <RoundedBox args={[3.37, 2.12, 0.08]} radius={0.12} smoothness={4}>
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.8} 
            roughness={0.2} 
          />
        </RoundedBox>

        {/* Glowing Edge/Border effect */}
        <RoundedBox args={[3.4, 2.15, 0.04]} radius={0.13} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial 
            ref={glowMaterialRef}
            color="#00ffcc" 
            emissive="#00ffcc"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
            side={THREE.BackSide}
          />
        </RoundedBox>

        {/* Chip Front */}
        <RoundedBox args={[0.42, 0.32, 0.082]} position={[-1.1, 0.4, 0]} radius={0.05}>
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
        </RoundedBox>

        {/* Front Data - Authentic Layout */}
        <group position={[0, 0, 0.045]}>
          {/* Company Name Top Right */}
          <Text position={[1.4, 0.7, 0]} fontSize={0.18} color="#ffffff" anchorX="right" fontWeight="bold" letterSpacing={0.1}>
            {company || "ERTHAD"}
          </Text>
          <Text position={[1.4, 0.52, 0]} fontSize={0.08} color="#00ffcc" anchorX="right" letterSpacing={0.2}>
            SMART NFC CARD
          </Text>

          {/* Name & Role Bottom Left */}
          <Text position={[-1.4, -0.5, 0]} fontSize={0.22} color="#ffffff" anchorX="left" fontWeight="bold">
            {name || "YOUR NAME"}
          </Text>
          <Text position={[-1.4, -0.75, 0]} fontSize={0.12} color="#00ffcc" anchorX="left" letterSpacing={0.1}>
            {role || "YOUR ROLE"}
          </Text>
        </group>

        {/* Back Data (rotated 180 degrees) */}
        <group position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
          <Text position={[0, 0.7, 0]} fontSize={0.14} color="#ffffff" anchorX="center" fontWeight="bold" letterSpacing={0.1}>
            TAP OR SCAN TO CONNECT
          </Text>
          
          {/* Social Media Handles */}
          <group position={[-1.2, 0.2, 0]}>
            <Text position={[0, 0, 0]} fontSize={0.12} color="#00ffcc" anchorX="left" fontWeight="bold">IG:</Text>
            <Text position={[0.3, 0, 0]} fontSize={0.12} color="#ffffff" anchorX="left">{instagram || "@username"}</Text>
            
            <Text position={[0, -0.3, 0]} fontSize={0.12} color="#00ffcc" anchorX="left" fontWeight="bold">FB:</Text>
            <Text position={[0.3, -0.3, 0]} fontSize={0.12} color="#ffffff" anchorX="left">{facebook || "/username"}</Text>
            
            <Text position={[0, -0.6, 0]} fontSize={0.12} color="#00ffcc" anchorX="left" fontWeight="bold">IN:</Text>
            <Text position={[0.3, -0.6, 0]} fontSize={0.12} color="#ffffff" anchorX="left">{linkedin || "/in/username"}</Text>
          </group>

        </group>

      </Float>
    </group>
  );
}

export default function InteractiveCard({ name, role, company, instagram, facebook, linkedin }: CardProps) {
  return (
    <div className="w-full h-full relative group cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ffcc" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00cc" />
          <Environment preset="night" />
          
          <CardMesh 
            name={name} 
            role={role} 
            company={company} 
            instagram={instagram}
            facebook={facebook}
            linkedin={linkedin}
          />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
          />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={15} blur={2.5} color="#00ffcc" />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1">
        <span className="text-xs text-[#00ffcc] tracking-widest uppercase font-bold">Drag to Rotate</span>
      </div>
    </div>
  );
}
