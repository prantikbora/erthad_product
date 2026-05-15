"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Design Your Hardware",
    description: "Start by configuring your premium Erthad NFC card. Choose your edition, add your basic details, and we will precision-craft and ship your physical card.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    color: "from-neon-cyan to-blue-500",
    shadow: "shadow-[0_0_30px_rgba(76,201,240,0.3)]",
    textColor: "text-neon-cyan"
  },
  {
    number: "02",
    title: "Build Your Digital Hub",
    description: "Unlock the Erthad App. Build a comprehensive digital profile by adding your email, social media links, business address, and even a meeting scheduler.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    color: "from-neon-purple to-neon-magenta",
    shadow: "shadow-[0_0_30px_rgba(157,78,221,0.3)]",
    textColor: "text-neon-purple"
  },
  {
    number: "03",
    title: "The Magic Tap",
    description: "Tap your Erthad card on any smartphone. No app is required for the receiver—your entire interactive profile instantly appears on their screen.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
    color: "from-neon-magenta to-neon-orange",
    shadow: "shadow-[0_0_30px_rgba(247,37,133,0.3)]",
    textColor: "text-neon-magenta"
  }
];

export default function HowItWorks() {
  return (
    // The ID here matches the href="#how-it-works" in your Header and Hero components
    <section id="how-it-works" className="relative w-full py-24 lg:py-32 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-20 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
          >
            The Ecosystem
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight"
          >
            One Tap.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              Infinite Possibilities.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-400 font-light leading-relaxed"
          >
            Bridge the physical and digital world. Combine our premium NFC hardware with a powerful app to completely revolutionize how you share who you are.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
              className="relative group"
            >
              {/* Glassmorphic Card */}
              <div className="h-full bg-[#040308]/60 backdrop-blur-2xl border border-[var(--glass-border)] rounded-[2rem] p-8 lg:p-10 transition-all duration-500 hover:bg-white/5 hover:border-white/20">
                
                {/* Glowing Icon Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} ${step.shadow} flex items-center justify-center text-white`}>
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base text-gray-400 font-light leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Accent Line */}
                <div className={`absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-full`} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}