"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      // Increased max-width and internal padding for a larger presence
      className="fixed top-8 inset-x-0 z-50 mx-auto w-[95%] max-w-7xl rounded-full border border-[var(--glass-border)] bg-[#040308]/70 px-8 py-4 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
    >
      <div className="flex items-center justify-between">
        
        {/* Logo - Increased text size and orb size */}
        <Link 
          href="/" 
          className="flex items-center gap-3 px-2 transition-opacity hover:opacity-80"
        >
          {/* Larger Subtle EternoCloud-style logo mark */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan shadow-[0_0_15px_rgba(157,78,221,0.6)]" />
          <span className="text-3xl font-bold tracking-tighter text-white">
            Erthad<span className="text-neon-cyan">.</span>
          </span>
        </Link>
        
        {/* Navigation - Increased font size and spacing */}
        <nav className="hidden md:flex items-center gap-12 text-base font-semibold text-gray-300">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <Link href="/#features" className="transition-colors hover:text-white">Features</Link>
          <Link href="/#how-it-works" className="transition-colors hover:text-white">How It Works</Link>
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/checkout" 
              // Increased button padding and font size
              className="flex items-center justify-center rounded-full bg-neon-purple px-10 py-3.5 text-base font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(157,78,221,0.5)] transition-all hover:bg-[#8536c4] hover:shadow-[0_0_35px_rgba(157,78,221,0.7)]"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
        
      </div>
    </motion.header>
  );
}