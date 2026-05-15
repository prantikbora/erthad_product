"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import InteractiveCard from "@/components/3d/InteractiveCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  return (
    <section className="relative overflow-hidden bg-transparent w-full min-h-screen flex items-center pt-24 lg:pt-32 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(157,78,221,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Edge-to-Edge Container */}
      <motion.div 
        className="relative mx-auto flex w-full max-w-[1600px] flex-col lg:flex-row items-center justify-between px-6 lg:px-12 xl:px-20 gap-16 lg:gap-24 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-start text-left w-full lg:max-w-2xl">
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-bold tracking-widest uppercase mb-8">
            NFC Technology
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[1.1]"
          >
            The Ultimate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-orange pb-2 block">
              Networking
            </span> Tool.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl"
          >
            Upgrade your connection with Erthad custom NFC business cards. See it in 3D, customize your details below, and tap to share instantly.
          </motion.p>

          {/* Real-time Customizer - Borderless Inputs */}
          <motion.div variants={itemVariants} className="mt-12 w-full space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-gray-500 mb-2 uppercase tracking-widest font-black">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="e.g. ALEX CARTER"
                  className="w-full bg-white/5 border border-transparent rounded-2xl px-5 py-4 text-base text-white focus:outline-none focus:ring-1 focus:ring-neon-purple focus:bg-white/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-2 uppercase tracking-widest font-black">Your Role</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value.toUpperCase())}
                  placeholder="e.g. CEO"
                  className="w-full bg-white/5 border border-transparent rounded-2xl px-5 py-4 text-base text-white focus:outline-none focus:ring-1 focus:ring-neon-magenta focus:bg-white/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-2 uppercase tracking-widest font-black">Company Name</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value.toUpperCase())}
                  placeholder="e.g. ERTHAD"
                  className="w-full bg-white/5 border border-transparent rounded-2xl px-5 py-4 text-base text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] text-neon-cyan mb-4 uppercase tracking-widest font-black opacity-80">Social Handles</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <input 
                    type="text" 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="IG: @username"
                    className="w-full bg-white/5 border border-transparent rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="IN: /in/username"
                    className="w-full bg-white/5 border border-transparent rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-purple focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <input 
                    type="text" 
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="FB: /username"
                    className="w-full bg-white/5 border border-transparent rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-magenta focus:bg-white/10 transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <Link
              href="/checkout"
              className="w-full sm:w-auto flex h-16 items-center justify-center rounded-2xl bg-neon-purple px-10 text-base font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(157,78,221,0.4)] transition-all hover:bg-[#8536c4] hover:shadow-[0_0_40px_rgba(157,78,221,0.6)] hover:scale-[1.02] active:scale-95"
            >
              Order Now
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto flex h-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-10 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
        
        {/* Right Column: Added overflow-visible to prevent clipping */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 w-full lg:w-1/2 h-[500px] sm:h-[600px] lg:h-[800px] mt-12 lg:mt-0 relative overflow-visible"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-neon-magenta/20 to-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />
          
          <InteractiveCard 
            name={name} 
            role={role} 
            company={company} 
            instagram={instagram}
            facebook={facebook}
            linkedin={linkedin}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}