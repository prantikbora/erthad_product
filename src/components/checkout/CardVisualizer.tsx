"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox, Environment, ContactShadows, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

const POPPINS_FONT_URL = "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff";

interface CardData {
  name: string;
  role: string;
  company: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  color: "lime" | "silver";
}

function ProfileCard({ name, role, company, instagram, facebook, linkedin, color }: CardData) {
  const meshRef = useRef<THREE.Group>(null);
  const isSilver = color === "silver";
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetRotX = (state.mouse.y * Math.PI) / 10;
    const targetRotY = (state.mouse.x * Math.PI) / 10;
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 4, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 4, delta);
  });

  const hexColor = isSilver ? "#f8fafc" : "#ccff00";
  const textColor = isSilver ? "#0f172a" : "#020617";
  const secondaryTextColor = isSilver ? "#64748b" : "#3f4d00"; 

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox args={[3.37, 2.12, 0.08]} radius={0.12} smoothness={4}>
          <meshStandardMaterial 
            color={hexColor} 
            metalness={isSilver ? 0.9 : 0.1} 
            roughness={isSilver ? 0.05 : 0.4} 
            envMapIntensity={2}
          />
        </RoundedBox>

        {/* EMV Chip */}
        <RoundedBox args={[0.42, 0.32, 0.082]} position={[-1.1, 0.4, 0]} radius={0.05}>
          <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
        </RoundedBox>

        {/* Front Data - Authentic Layout */}
        <group position={[0, 0, 0.045]}>
          <Text position={[1.4, 0.7, 0]} fontSize={0.18} font={POPPINS_FONT_URL} color={textColor} anchorX="right" fontWeight={800} letterSpacing={0.1}>
            {company.toUpperCase() || "ERTHAD"}
          </Text>
          <Text position={[1.4, 0.52, 0]} fontSize={0.08} font={POPPINS_FONT_URL} color={secondaryTextColor} anchorX="right" letterSpacing={0.2}>
            SMART NFC CARD
          </Text>

          <Text position={[-1.4, -0.5, 0]} fontSize={0.2} font={POPPINS_FONT_URL} color={textColor} anchorX="left" fontWeight={700}>
            {name.toUpperCase() || "YOUR NAME"}
          </Text>
          <Text position={[-1.4, -0.75, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={secondaryTextColor} anchorX="left" letterSpacing={0.1}>
            {role.toUpperCase() || "YOUR ROLE"}
          </Text>
        </group>

        {/* Back Data (rotated 180 degrees) */}
        <group position={[0, 0, -0.045]} rotation={[0, Math.PI, 0]}>
          <Text position={[0, 0.7, 0]} fontSize={0.14} font={POPPINS_FONT_URL} color={textColor} anchorX="center" fontWeight={700} letterSpacing={0.1}>
            TAP OR SCAN TO CONNECT
          </Text>
          
          <group position={[-1.2, 0.2, 0]}>
            <Text position={[0, 0, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={secondaryTextColor} anchorX="left" fontWeight={700}>IG:</Text>
            <Text position={[0.3, 0, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={textColor} anchorX="left">{instagram || "@username"}</Text>
            
            <Text position={[0, -0.3, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={secondaryTextColor} anchorX="left" fontWeight={700}>FB:</Text>
            <Text position={[0.3, -0.3, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={textColor} anchorX="left">{facebook || "/username"}</Text>
            
            <Text position={[0, -0.6, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={secondaryTextColor} anchorX="left" fontWeight={700}>IN:</Text>
            <Text position={[0.3, -0.6, 0]} fontSize={0.12} font={POPPINS_FONT_URL} color={textColor} anchorX="left">{linkedin || "/in/username"}</Text>
          </group>

        </group>

      </Float>
    </group>
  );
}

export default function CardVisualizer() {
  const [data, setData] = useState<CardData>({
    name: "Jane Doe",
    role: "Founder at TechFlow",
    company: "TechFlow",
    instagram: "@jane.doe",
    facebook: "/jane.doe",
    linkedin: "/in/janedoe",
    color: "lime",
  });

  const [checkoutState, setCheckoutState] = useState<"idle" | "processing" | "success">("idle");

  const handleCheckout = () => {
    setCheckoutState("processing");
    // Simulate API request delay
    setTimeout(() => {
      setCheckoutState("success");
    }, 2000);
  };

  if (checkoutState === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center w-full min-h-[500px] bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 p-12 text-center"
      >
        <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-8">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-4xl font-black text-white mb-4 uppercase">Order Confirmed!</h2>
        <p className="text-slate-400 text-lg max-w-md">
          Your custom {data.color} Erthad NFC card is now being precision-crafted. We'll email you the shipping details shortly.
        </p>
        <button 
          onClick={() => setCheckoutState("idle")}
          className="mt-10 px-8 py-4 rounded-xl border border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors"
        >
          Configure Another Card
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row w-full min-h-[650px] bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
    >
      {/* LEFT: 3D Scene */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-900 overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1),transparent_70%)]" />
        
        <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={data.color === 'lime' ? '#ccff00' : '#fff'} />
          <Environment preset="night" />
          
          <ProfileCard {...data} />

          <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2.5} color="#000" />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/2.5} maxPolarAngle={Math.PI/1.8} />
        </Canvas>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
          <motion.span 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-slate-300 font-bold"
          >
            Drag to Rotate
          </motion.span>
        </div>
      </div>

      {/* RIGHT: Animated Form */}
      <div className="w-full lg:w-[500px] p-8 lg:p-10 bg-white dark:bg-slate-950 flex flex-col overflow-y-auto max-h-[800px]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Customize</h2>
          <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
        </motion.div>

        <div className="mt-8 space-y-6 flex-1">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Select Finish</label>
            <div className="flex gap-3">
              {(["lime", "silver"] as const).map((c) => (
                <motion.button
                  key={c}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setData({ ...data, color: c })}
                  className={`flex-1 group relative p-4 rounded-2xl border-2 transition-all ${
                    data.color === c 
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-500/10" 
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full mb-2 shadow-lg ${c === 'lime' ? 'bg-[#ccff00]' : 'bg-slate-200'}`} />
                  <span className="text-xs font-bold capitalize dark:text-white">{c} Edition</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "name", placeholder: "ALEX CARTER", colSpan: 2 },
              { label: "Role/Title", name: "role", placeholder: "Design Lead", colSpan: 1 },
              { label: "Company", name: "company", placeholder: "Erthad", colSpan: 1 },
              { label: "Instagram", name: "instagram", placeholder: "@alex_erthad", colSpan: 1 },
              { label: "Facebook", name: "facebook", placeholder: "/alex", colSpan: 1 },
              { label: "LinkedIn", name: "linkedin", placeholder: "/in/alexcarter", colSpan: 2 }
            ].map((field, i) => (
              <motion.div 
                key={field.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className={field.colSpan === 2 ? "sm:col-span-2" : ""}
              >
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={(data as any)[field.name]}
                  onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none dark:text-white font-medium transition-all text-sm"
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button 
          onClick={handleCheckout}
          disabled={checkoutState === "processing"}
          whileHover={checkoutState === "idle" ? { scale: 1.02, boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.4)" } : {}}
          whileTap={checkoutState === "idle" ? { scale: 0.98 } : {}}
          className={`mt-8 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
            checkoutState === "processing" ? "bg-slate-800 text-slate-400 cursor-not-allowed" : "bg-[#00ffcc] text-black shadow-[0_0_20px_rgba(0,255,204,0.4)]"
          }`}
        >
          {checkoutState === "processing" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing...
            </span>
          ) : (
            <>
              Order Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}