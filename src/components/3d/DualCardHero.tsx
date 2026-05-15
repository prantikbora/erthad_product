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

function AnimatedCard({ isFront, color, isDark, onClick, name, role }: any) {
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
    
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, (state.mouse.y * Math.PI) / 15, t, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (state.mouse.x * Math.PI) / 15, t, delta);
  });

  return (
    <group ref={group} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Shaved down depth to 0.02 to match realistic card */}
        <RoundedBox args={[3.37, 2.12, 0.02]} radius={0.1} smoothness={4}>
          <meshStandardMaterial 
            color={color} 
            metalness={isDark ? 0.9 : 0.2} 
            roughness={isDark ? 0.1 : 0.3}
            emissive={isDark ? "#000000" : "#4a0033"}
            emissiveIntensity={0.2}
          />
        </RoundedBox>

        {/* Thinner Chip */}
        <RoundedBox args={[0.42, 0.32, 0.021]} position={[-1.1, 0.4, 0]} radius={0.05}>
          <meshStandardMaterial color="#eab308" metalness={1} roughness={0.2} />
        </RoundedBox>

        {/* Flush Data Overlays (Z: 0.011) */}
        <group position={[0, 0, 0.011]}>
          <Text position={[-1.4, -0.2, 0]} fontSize={0.18} color={isDark ? "#ffffff" : "#ffffff"} anchorX="left" fontWeight="bold">
            {name}
          </Text>
          <Text position={[-1.4, -0.45, 0]} fontSize={0.1} color={isDark ? "#4cc9f0" : "#ffb3c6"} anchorX="left">
            {role}
          </Text>
          <Text position={[1.4, -0.75, 0]} fontSize={0.15} color={isDark ? "#ffffff" : "#ffffff"} anchorX="right" fontWeight="bold">
            ERTHAD.
          </Text>
        </group>
      </Float>
    </group>
  );
}

export default function DualCardHero() {
  const [frontCard, setFrontCard] = useState<"magenta" | "obsidian">("magenta");

  return (
    <div className="w-full h-[60vh] min-h-[500px] relative overflow-hidden">
      {/* Moved comment inside the parent div to fix JSX error */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(157,78,221,0.1),transparent_50%)] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#9d4edd" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4cc9f0" />
          <Environment preset="night" />
          
          <AnimatedCard 
            isFront={frontCard === "obsidian"} 
            color="#06040d" 
            isDark={true}
            name="ALEX CARTER"
            role="CHIEF EXECUTIVE OFFICER"
            onClick={() => setFrontCard("obsidian")} 
          />
          
          <AnimatedCard 
            isFront={frontCard === "magenta"} 
            color="#f72585" 
            isDark={false}
            name="JANE DOE"
            role="CREATIVE DIRECTOR"
            onClick={() => setFrontCard("magenta")} 
          />

          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={20} blur={3} color="#9d4edd" />
        </Suspense>
      </Canvas>
    </div>
  );
}