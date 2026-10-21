import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, MapPin } from 'lucide-react';
import { WebThreads } from './reactbits/WebThreads';
import { BRAND_CONFIG } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full bg-[#060608]">
      {/* React Bits WebThreads background spanning edge-to-edge */}
      <WebThreads
        threadsCount={6}
        amplitude={0.95}
        speed={0.34}
        glowIntensity={1.15}
        color="#d4af37"
      />

      {/* Moving Ambient Cinematic Spotlight behind the headline */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 15, -15, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] lg:w-[1000px] h-[400px] sm:h-[550px] pointer-events-none rounded-full blur-[90px] z-[5]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(229, 169, 60, 0.22) 0%, rgba(212, 149, 43, 0.09) 45%, rgba(6, 6, 8, 0) 75%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary soft amber ambient rim light */}
      <div
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          background: 'radial-gradient(circle at 50% 35%, transparent 35%, rgba(6, 6, 8, 0.6) 80%, rgba(6, 6, 8, 0.88) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative film frame corners inside container */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#e5a93c]/30 pointer-events-none hidden md:block z-20" />
      <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#e5a93c]/30 pointer-events-none hidden md:block z-20" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[#e5a93c]/30 pointer-events-none hidden md:block z-20" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#e5a93c]/30 pointer-events-none hidden md:block z-20" />

      {/* Hero content container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* Top small label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-mono text-[#f3c766] mb-6 px-4 py-1.5 rounded-full bg-black/40 border border-[#e5a93c]/30 backdrop-blur-md shadow-[0_0_15px_rgba(229,169,60,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e5a93c]" />
          <span>{BRAND_CONFIG.tagline}</span>
        </motion.div>

        {/* Hero headline from PDF */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase leading-[1.05] max-w-4xl text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          YOUR VISION. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbe29a] via-[#e5a93c] to-[#d4952b]">
            MY CREATION.
          </span>
        </motion.h1>

        {/* Supporting line from PDF */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base font-mono tracking-[0.2em] text-[#d4d4d8] uppercase mb-6 font-medium drop-shadow-sm"
        >
          {BRAND_CONFIG.supportingLine}
        </motion.p>

        {/* Narrative paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-[#d4d4d8] max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light drop-shadow"
        >
          Freelance video editor and videographer based in Chennai. I craft engaging short-form reels, story-driven video edits, and cinematic event coverage that connect with your audience.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(229,169,60,0.6)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-[#060608] bg-[#e5a93c] hover:bg-[#f3c766] rounded-full transition-colors shadow-[0_0_25px_rgba(229,169,60,0.4)] cursor-pointer"
          >
            START A PROJECT
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: 'rgba(229,169,60,0.6)', backgroundColor: 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={scrollToWork}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-white bg-black/40 border border-white/20 rounded-full transition-colors backdrop-blur-md cursor-pointer"
          >
            EXPLORE MY WORK
          </motion.button>
        </motion.div>

        {/* Location & Year meta badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 flex items-center gap-6 text-xs text-[#a1a1aa] font-mono tracking-wider"
        >
          <span className="flex items-center gap-1.5 text-white/90">
            <MapPin className="w-3.5 h-3.5 text-[#e5a93c]" />
            {BRAND_CONFIG.location}
          </span>
          <span className="text-white/20">|</span>
          <span>PORTFOLIO / {BRAND_CONFIG.year}</span>
        </motion.div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollToWork}
          className="mt-10 text-[#a1a1aa] hover:text-[#e5a93c] transition-colors p-2 animate-bounce cursor-pointer"
          aria-label="Scroll down to work"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
