"use client";

import { Suspense, useRef } from "react";
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
      glowMaterialRef.current.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 1.5) * 0.4;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
        
        {/* Main Card Body - Razor Thin, Realistic Corner Radius (0.04) */}
        <RoundedBox args={[3.37, 2.12, 0.02]} radius={0.04} smoothness={4}>
          <meshPhysicalMaterial 
            color="#040308" 
            metalness={0.9} 
            roughness={0.3} 
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </RoundedBox>

        {/* Realistic Micro-Thin Black Edge instead of a thick bumper */}
        <RoundedBox args={[3.375, 2.125, 0.008]} radius={0.042} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#000000" 
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Premium Gold Chip - Flush with thin surface */}
        <RoundedBox args={[0.45, 0.35, 0.021]} position={[-1.1, 0.4, 0]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.25} />
        </RoundedBox>

        {/* Front Data - Adjusted Z position (0.011) to sit flush */}
        <group position={[0, 0, 0.011]}>
          <Text position={[1.4, 0.75, 0]} fontSize={0.2} color="#ffffff" anchorX="right" fontWeight="bold" letterSpacing={0.15}>
            {company || "ERTHAD"}
          </Text>
          <Text position={[1.4, 0.55, 0]} fontSize={0.07} color="#4cc9f0" anchorX="right" letterSpacing={0.3}>
            SMART NFC
          </Text>

          <Text position={[-1.4, -0.55, 0]} fontSize={0.22} color="#ffffff" anchorX="left" fontWeight="bold" letterSpacing={0.05}>
            {name || "YOUR NAME"}
          </Text>
          <Text position={[-1.4, -0.8, 0]} fontSize={0.1} color="#f72585" anchorX="left" letterSpacing={0.15} fontWeight="bold">
            {role || "YOUR ROLE"}
          </Text>
          
         
          <Text position={[1.4, -0.8, 0]} fontSize={0.12} color="#ffffff" anchorX="right" fillOpacity={0.5} letterSpacing={0.1} fontWeight="bold" rotation={[0, 0, Math.PI / 2]}>
            )))
          </Text>
        </group>

        {/* Back Data - Adjusted Z position (-0.011) */}
        <group position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]}>
          {/* FIX: Changed 'opacity' to 'fillOpacity' to resolve TypeScript error */}
          <Text position={[0, 0.65, 0]} fontSize={0.12} color="#ffffff" anchorX="center" fontWeight="bold" letterSpacing={0.2} fillOpacity={0.7}>
            TAP OR SCAN TO CONNECT
          </Text>
          
          <group position={[-1.1, 0.1, 0]}>
            <Text position={[0, 0.15, 0]} fontSize={0.11} color="#4cc9f0" anchorX="left" fontWeight="bold">IG</Text>
            <Text position={[0.35, 0.15, 0]} fontSize={0.12} color="#ffffff" anchorX="left" letterSpacing={0.05}>{instagram || "@username"}</Text>
            
            <Text position={[0, -0.2, 0]} fontSize={0.11} color="#f72585" anchorX="left" fontWeight="bold">FB</Text>
            <Text position={[0.35, -0.2, 0]} fontSize={0.12} color="#ffffff" anchorX="left" letterSpacing={0.05}>{facebook || "/username"}</Text>
            
            <Text position={[0, -0.55, 0]} fontSize={0.11} color="#9d4edd" anchorX="left" fontWeight="bold">IN</Text>
            <Text position={[0.35, -0.55, 0]} fontSize={0.12} color="#ffffff" anchorX="left" letterSpacing={0.05}>{linkedin || "/in/username"}</Text>
          </group>
        </group>

      </Float>
    </group>
  );
}

export default function InteractiveCard({ name, role, company, instagram, facebook, linkedin }: CardProps) {
  return (
    <div className="w-full h-full relative group cursor-grab active:cursor-grabbing overflow-visible">
      {/* Camera pulled back to position [0, 0, 6] to prevent rotation clipping */}
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 10, 5]} intensity={3} color="#ffffff" penumbra={1} angle={0.5} />
          <pointLight position={[10, 0, 10]} intensity={2.5} color="#9d4edd" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#4cc9f0" />
          
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
            autoRotateSpeed={1.2}
          />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.8} scale={15} blur={2.5} color="#9d4edd" />
        </Suspense>
      </Canvas>
      
      {/* UI Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4cc9f0]">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      </div>
    </div>
  );
}