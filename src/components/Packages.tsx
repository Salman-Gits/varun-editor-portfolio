import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import Particles from './reactbits/Particles';
import { PACKAGES_DATA, PackageItem } from '../data/portfolioData';

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  idx: number;
}> = ({ children, className = '', idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(y * 7), y: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Packages: React.FC<PackagesProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07070b] w-full max-w-full overflow-hidden">
      {/* Moderate gold particles background behind the package cards */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b", "#ffffff"]}
          particleCount={160}
          particleSpread={11}
          speed={0.07}
          particleBaseSize={82}
          glow={0.78}
          twinkle={0.28}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          sizeRandomness={1}
          shape="circle"
          depthOfField={0}
          connections={false}
          particleHoverFactor={0.7}
          hoverRadius={140}
          cameraDistance={22}
          variation={6}
          opacity={0.72}
          clickBurst={true}
          intro={true}
          lightMode={false}
        />
      </div>

      {/* Gentle gold ambient lighting behind package cards */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(229, 169, 60, 0.22) 0%, rgba(212, 149, 43, 0.06) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#e5a93c] uppercase mb-4">
            <span>PROJECT PACKAGES</span>
            <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow">
            Simple, Transparent Packages.
          </h2>
          <p className="text-sm sm:text-base text-[#d4d4d8] font-light leading-relaxed">
            Choose a starting package below, or get in touch for custom video editing and on-location shooting.
          </p>
        </motion.div>

        {/* 4 Packages cards with gentle ambient gold and cursor-responsive tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 [perspective:1000px]">
          {PACKAGES_DATA.map((pkg: PackageItem, idx) => (
            <TiltCard
              key={pkg.id}
              idx={idx}
              className={`relative p-8 rounded-2xl flex flex-col justify-between transition-colors shadow-2xl ${
                pkg.highlighted
                  ? 'bg-gradient-to-b from-[#181826] via-[#11111c] to-[#0c0c14] border-2 border-[#e5a93c] shadow-[0_0_50px_rgba(229,169,60,0.22)]'
                  : 'bg-[#0c0c14]/90 backdrop-blur-sm border border-white/[0.09] hover:border-[#e5a93c]/50'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#e5a93c] text-[#060608] text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-[0_0_15px_rgba(229,169,60,0.6)]">
                  <Sparkles className="w-3 h-3" />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                {/* Package name */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>

                {/* Subtitle / Tagline from PDF */}
                <p className="text-xs font-mono text-[#f3c766] mb-4">
                  {pkg.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-6 font-light">
                  {pkg.description}
                </p>

                {/* Features list */}
                <div className="space-y-2.5 mb-8">
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-[#d4d4d8]">
                      <Check className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5 shadow-sm" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-white/[0.08] mb-4 text-[11px] font-mono text-[#71717a]">
                  SCOPE: {pkg.scope}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(229,169,60,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onSelectPackage(pkg.name)}
                  className={`w-full py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    pkg.highlighted
                      ? 'bg-[#e5a93c] text-[#060608] hover:bg-[#f3c766] shadow-md'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-[#e5a93c]/50'
                  }`}
                >
                  <span>ASK FOR A QUOTE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Pricing note from PDF */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-md text-center max-w-3xl mx-auto shadow-lg"
        >
          <p className="text-xs sm:text-sm text-[#d4d4d8] font-mono leading-relaxed">
            ✦ Every project is unique. Reach out with your ideas and footage details, and I'll send an honest, transparent quote within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
