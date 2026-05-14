"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  RoundedBox, 
  Environment, 
  ContactShadows, 
  Float, 
  Text 
} from "@react-three/drei";
import * as THREE from "three";

function AnimatedCard({ isFront, color, isSilver, onClick, name, role }: any) {
  const group = useRef<THREE.Group>(null);
  const targetZ = isFront ? 0.8 : -1.5;
  const targetX = isFront ? 0 : 1.5;
  const targetScale = isFront ? 1 : 0.8;

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = 8 * delta;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, t, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, t, delta);
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, t, delta));
    
    // Smooth tilt
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, (state.mouse.y * Math.PI) / 15, t, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (state.mouse.x * Math.PI) / 15, t, delta);
  });

  return (
    <group ref={group} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[3.37, 2.12, 0.08]} radius={0.12} smoothness={4}>
          <meshStandardMaterial 
            color={color} 
            metalness={isSilver ? 0.9 : 0.1} 
            roughness={isSilver ? 0.1 : 0.4} 
          />
        </RoundedBox>

        {/* Chip */}
        <RoundedBox args={[0.42, 0.32, 0.082]} position={[-1.1, 0.4, 0]} radius={0.05}>
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
        </RoundedBox>

        {/* Dummy Data Overlays */}
        <group position={[0, 0, 0.05]}>
          <Text position={[-1.4, -0.2, 0]} fontSize={0.18} color={isSilver ? "#0f172a" : "#020617"} anchorX="left" fontWeight="bold">
            {name}
          </Text>
          <Text position={[-1.4, -0.45, 0]} fontSize={0.1} color={isSilver ? "#475569" : "#3f4d00"} anchorX="left">
            {role}
          </Text>
          <Text position={[1.4, -0.75, 0]} fontSize={0.15} color={isSilver ? "#0f172a" : "#020617"} anchorX="right" fontWeight="bold">
            ERTHAD.
          </Text>
        </group>
      </Float>
    </group>
  );
}

export default function DualCardHero() {
  const [frontCard, setFrontCard] = useState<"lime" | "silver">("lime");

  return (
    <div className="w-full h-[550px] sm:h-[650px] relative rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),transparent_80%)] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Environment preset="city" />
          
          <AnimatedCard 
            isFront={frontCard === "silver"} 
            color="#f8fafc" 
            isSilver={true}
            name="ALEX CARTER"
            role="CHIEF EXECUTIVE OFFICER"
            onClick={() => setFrontCard("silver")} 
          />
          
          <AnimatedCard 
            isFront={frontCard === "lime"} 
            color="#ccff00" 
            isSilver={false}
            name="JANE DOE"
            role="CREATIVE DIRECTOR"
            onClick={() => setFrontCard("lime")} 
          />

          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}