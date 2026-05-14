"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 inset-x-0 z-50 mx-auto w-[95%] max-w-7xl rounded-full border border-white/10 bg-black/60 px-6 py-3 shadow-2xl backdrop-blur-xl shadow-black/50"
    >
      <div className="flex items-center justify-between px-2">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-white uppercase italic"
        >
          Erthad.
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link 
            href="#features" 
            className="hidden sm:block text-sm font-bold text-gray-400 transition-colors hover:text-white"
          >
            Features
          </Link>
          
          {/* Animated Call to Action */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/checkout" 
              className="flex items-center justify-center rounded-full bg-[#00ffcc] px-6 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all hover:bg-teal-300"
            >
              Order Now
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}