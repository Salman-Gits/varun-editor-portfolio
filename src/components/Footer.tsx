import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Instagram, MessageSquare } from 'lucide-react';
import Particles from './reactbits/Particles';
import { BRAND_CONFIG } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'WORKFLOW', href: '#workflow' },
    { label: 'PACKAGES', href: '#packages' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#06060a] via-[#08080f] to-[#0c0c16] border-t border-[#e5a93c]/20 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full">
      {/* Sparse, gently drifting particles field fading into the dark background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#e5a93c", "#fbe29a", "#d4952b"]}
          particleCount={85}
          particleSpread={12}
          speed={0.05}
          particleBaseSize={75}
          glow={0.65}
          twinkle={0.25}
          moveParticlesOnHover={false}
          hoverEffect="parallax"
          sizeRandomness={0.9}
          shape="circle"
          depthOfField={0}
          connections={false}
          particleHoverFactor={0.4}
          cameraDistance={24}
          variation={8}
          opacity={0.55}
          clickBurst={false}
          intro={true}
          lightMode={false}
        />
      </div>

      {/* Upward gentle warm amber ambient light transition */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[120px] pointer-events-none z-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(229, 169, 60, 0.25) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between w-full">
        {/* Top sign-off from PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-16 border-b border-white/[0.08] flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#e5a93c] uppercase block mb-3">
              VARUN EDITOR PORTFOLIO / {BRAND_CONFIG.year}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase max-w-2xl leading-tight drop-shadow">
              {BRAND_CONFIG.signOff}
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.08, backgroundColor: '#e5a93c', color: '#060608', boxShadow: '0 0 25px rgba(229,169,60,0.5)' }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 text-white/70 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Middle navigation & brand details */}
        <div className="py-12 border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <span className="font-display text-xl font-bold text-white tracking-wider block">
              {BRAND_CONFIG.name}
            </span>
            <p className="text-xs font-mono text-[#f3c766] tracking-widest uppercase">
              VARUN EDITOR • CREATIVE MEDIA • CHENNAI
            </p>
            <p className="text-xs text-[#a1a1aa] max-w-sm font-light">
              Freelance video editor and videographer based in Chennai. Creating engaging reels, story-driven edits, and reliable event coverage.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center">
            <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase mb-3 block">
              EXPLORE
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#d4d4d8]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#e5a93c] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col md:items-end justify-center">
            <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase mb-3 block">
              CONNECT
            </span>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(229,169,60,0.2)', color: '#e5a93c' }}
                whileTap={{ scale: 0.95 }}
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}
                whileTap={{ scale: 0.95 }}
                href={BRAND_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#71717a] gap-4">
          <div>
            © {BRAND_CONFIG.year} {BRAND_CONFIG.name}. ALL RIGHTS RESERVED.
          </div>
          <div>
            CHENNAI, TAMIL NADU • CINEMATIC PORTFOLIO
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
