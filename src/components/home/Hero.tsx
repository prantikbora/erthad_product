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
    <section className="relative overflow-hidden bg-black w-full min-h-screen flex items-center pt-20">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-gray-950 to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ffcc]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="relative mx-auto flex max-w-7xl flex-col lg:flex-row items-start justify-between px-4 py-12 lg:py-24 gap-12 z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Text & Customizer */}
        <div className="flex-1 flex flex-col items-start text-left w-full lg:w-1/2">
          <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-[#00ffcc]/30 bg-[#00ffcc]/10 text-[#00ffcc] text-sm font-semibold tracking-wide mb-6">
            NFC 3.0 TECHNOLOGY
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl leading-tight"
          >
            The Ultimate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-teal-400">Networking</span> Tool.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg text-gray-400"
          >
            Upgrade your connection with Erthad custom NFC business cards. See it in 3D, customize your details, and tap to share instantly.
          </motion.p>

          {/* Real-time Customizer Form */}
          <motion.div variants={itemVariants} className="mt-10 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">Preview Your Card</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="e.g. ALEX CARTER"
                  className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">Your Role</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value.toUpperCase())}
                  placeholder="e.g. CEO"
                  className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">Company Name</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value.toUpperCase())}
                  placeholder="e.g. ERTHAD"
                  className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-colors"
                />
              </div>
              
              {/* Socials */}
              <div className="sm:col-span-2 mt-2 border-t border-gray-800 pt-4">
                <h4 className="text-[10px] text-[#00ffcc] mb-3 uppercase tracking-wider font-bold">Social Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">Instagram</label>
                    <input 
                      type="text" 
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@username"
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">LinkedIn</label>
                    <input 
                      type="text" 
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="/in/username"
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-bold">Facebook</label>
                    <input 
                      type="text" 
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="/username"
                      className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00ffcc] focus:ring-1 focus:ring-[#00ffcc] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/checkout"
              className="w-full sm:w-auto flex h-14 items-center justify-center rounded-xl bg-[#00ffcc] px-8 text-base font-bold text-black shadow-[0_0_20px_rgba(0,255,204,0.4)] transition-all hover:bg-teal-300 hover:scale-105 active:scale-95"
            >
              Order Now
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto flex h-14 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
        
        {/* Right Column: 3D Visualizer Integration */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 w-full lg:w-1/2 h-[500px] lg:h-[700px] mt-12 lg:mt-0 relative lg:sticky lg:top-24"
        >
          {/* Subtle glow behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00ffcc]/20 blur-[100px] rounded-full pointer-events-none" />
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