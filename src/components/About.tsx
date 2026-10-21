import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PaperCrumple } from './reactbits/PaperCrumple';
import Particles from './reactbits/Particles';
import { Film, Sparkles, Video, Palette, ArrowRight, Eye } from 'lucide-react';
import { BRAND_CONFIG } from '../data/portfolioData';

export const About: React.FC = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const pillars = [
    {
      icon: Film,
      title: 'VIDEO EDITING',
      desc: 'Pacing, clean cuts, dialogue cleanup, sound design, and a balanced final grade.',
    },
    {
      icon: Sparkles,
      title: 'REELS & SOCIAL CONTENT',
      desc: 'Quick, punchy vertical edits built for Instagram and Shorts with good hooks and subtitles.',
    },
    {
      icon: Video,
      title: 'VIDEO SHOOTS',
      desc: 'On-location filming for birthdays, creative portraits, and intimate functions in Chennai.',
    },
    {
      icon: Palette,
      title: 'DESIGN & COLOUR',
      desc: 'Movie-style release posters, YouTube thumbnails, and natural, consistent colour grading.',
    },
  ];

  const approachSteps = [
    'Understand your brief',
    'Plan the edit or shoot',
    'Craft the first cut',
    'Fine-tune together',
    'Deliver ready-to-share files',
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07070b] w-full max-w-full overflow-hidden">
      {/* React Bits Particles animation background styled for black-and-gold theme */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b", "#ffffff"]}
          particleCount={200}
          particleSpread={12}
          speed={0.09}
          particleBaseSize={95}
          glow={0.85}
          twinkle={0.35}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          sizeRandomness={1.1}
          shape="circle"
          depthOfField={0}
          connections={false}
          connectionDistance={110}
          particleHoverFactor={1}
          hoverRadius={150}
          drift="none"
          driftSpeed={1}
          alphaParticles={false}
          disableRotation={false}
          cameraDistance={20}
          variation={1}
          opacity={0.8}
          clickBurst={true}
          intro={true}
          lightMode={false}
        />
      </div>

      {/* Cinematic ambient gold radial glows in the background */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(229, 169, 60, 0.2) 0%, rgba(212, 149, 43, 0.05) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none z-0 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(243, 199, 102, 0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle diagonal ambient light beam */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(229, 169, 60, 0.08) 0%, transparent 40%, rgba(243, 199, 102, 0.04) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section kicker */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#e5a93c] uppercase mb-4"
        >
          <span>01 / ABOUT</span>
          <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
        </motion.div>

        {/* Section Grid: Content Left, Interactive Portrait Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-balance"
            >
              {BRAND_CONFIG.quote}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#d4d4d8] leading-relaxed mb-10 font-light max-w-2xl"
            >
              I'm <strong className="text-white font-medium">Varun</strong>, a freelance video editor and videographer based in Chennai. Whether it's cutting fast-paced reels, shaping longer story-driven edits, or filming private events, my goal is always the same: understanding your vision and delivering videos that feel authentic, polished, and compelling to watch.
            </motion.p>

            {/* 4 Feature Pillars from PDF with staggered entry and golden glow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, borderColor: 'rgba(229,169,60,0.5)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                    className="p-6 rounded-xl bg-[#0c0c12]/80 backdrop-blur-sm border border-white/[0.08] transition-colors group cursor-default shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#e5a93c]/10 flex items-center justify-center text-[#e5a93c] mb-4 group-hover:scale-110 group-hover:bg-[#e5a93c]/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold tracking-wider text-white mb-2 uppercase group-hover:text-[#fbe29a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Approach Progression from PDF */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 border-t border-white/[0.08]"
            >
              <div className="text-xs font-mono tracking-widest text-[#f3c766] uppercase mb-4">
                APPROACH
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#e4e4e7] font-medium">
                {approachSteps.map((step, idx) => (
                  <React.Fragment key={step}>
                    <motion.span
                      whileHover={{ scale: 1.05, borderColor: 'rgba(229,169,60,0.6)' }}
                      className="px-3.5 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] text-white/90 backdrop-blur-sm shadow-sm transition-colors cursor-default"
                    >
                      {step}
                    </motion.span>
                    {idx < approachSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive PaperCrumple Portrait with cinematic reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center w-full"
          >
            <div className="w-full max-w-[420px] relative">
              {/* Soft gold halo behind portrait */}
              <div
                className="absolute inset-0 -m-6 rounded-3xl blur-[50px] bg-[#e5a93c]/15 pointer-events-none z-0"
                aria-hidden="true"
              />

              {/* Photo header */}
              <div className="relative z-10 flex items-center justify-between mb-4 px-1 text-xs font-mono text-[#a1a1aa]">
                <span className="flex items-center gap-1.5 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-[#e5a93c]" />
                  PORTRAIT • CHENNAI
                </span>
                <span className="text-[11px] text-[#71717a]">
                  CLICK & DRAG TO CRUMPLE
                </span>
              </div>

              {/* Three.js PaperCrumple interactive component with golden frame border */}
              <div className="relative z-10 group rounded-2xl p-[1px] bg-gradient-to-b from-[#e5a93c]/40 via-white/10 to-transparent shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <PaperCrumple
                  imageSrc="/images/varun-portrait.jpg"
                  altText="Varun - Video Editor & Videographer"
                  maxCrumpleAmount={0.85}
                  restoreDuration={600}
                  dragTilt={20}
                />

                {/* Quick full-res view button */}
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                  title="View full resolution"
                  aria-label="View photo in modal"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Caption and bio footnote */}
              <div className="relative z-10 mt-4 flex items-center justify-between text-xs text-[#71717a] font-mono">
                <span>VARUN • VIDEO EDITOR & VIDEOGRAPHER</span>
                <span>BASED IN CHENNAI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-res Photo Modal */}
      {showPreviewModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#0d0d12] border border-white/10 rounded-2xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/varun-portrait.jpg"
              alt="Varun Editor"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-4 flex items-center justify-between text-xs text-[#a1a1aa] font-mono">
              <span>VARUN EDITOR • CHENNAI</span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="text-white hover:text-[#e5a93c] transition-colors font-sans font-semibold cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
