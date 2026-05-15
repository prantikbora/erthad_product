"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change 
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
  ];

  const menuVariants: Variants = {
    closed: { opacity: 0, y: -20, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 md:top-8 inset-x-0 z-50 mx-auto w-[95%] max-w-7xl rounded-[2rem] md:rounded-full border border-[var(--glass-border)] bg-[#040308]/70 px-4 md:px-8 py-3 md:py-4 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.6)] backdrop-blur-3xl"
    >
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 md:gap-3 px-2 transition-opacity hover:opacity-80 z-50"
        >
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan shadow-[0_0_15px_rgba(157,78,221,0.6)]" />
          <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
            Erthad<span className="text-neon-cyan">.</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-base font-semibold text-gray-300">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="transition-colors hover:text-white">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <Link 
              href="/checkout" 
              className="flex items-center justify-center rounded-full bg-neon-purple px-6 md:px-10 py-2.5 md:py-3.5 text-xs md:text-base font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(157,78,221,0.5)] transition-all hover:bg-[#8536c4]"
            >
              Order Now
            </Link>
          </motion.div>

          {/* Hamburger Toggle - Only visible on mobile  */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden flex-col items-center justify-center w-10 h-10 gap-1.5 z-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full transition-transform"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay  */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="absolute top-full left-0 right-0 mt-4 mx-auto w-full bg-[#0a0a0a]/95 border border-[var(--glass-border)] rounded-[2rem] p-8 backdrop-blur-2xl shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-2xl font-bold text-gray-300 hover:text-neon-cyan transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 border-t border-white/10"
              >
                <Link 
                  href="/checkout"
                  className="inline-block w-full rounded-2xl bg-gradient-to-r from-neon-purple to-neon-magenta py-4 text-lg font-black uppercase tracking-widest text-white shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Order Now
                </Link>
              </motion.div>
            </div>
            
            {/* Ambient background glow inside menu [cite: 1101] */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-purple/20 blur-[80px] rounded-full -z-10" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-neon-cyan/10 blur-[80px] rounded-full -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}