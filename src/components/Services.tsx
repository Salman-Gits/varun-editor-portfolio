import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import Particles from './reactbits/Particles';
import { SERVICES_DATA, ServiceItem } from '../data/portfolioData';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#07070b] w-full max-w-full overflow-hidden">
      {/* Moderately bright gold particles behind the service cards */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b", "#ffffff"]}
          particleCount={175}
          particleSpread={11}
          speed={0.075}
          particleBaseSize={85}
          glow={0.8}
          twinkle={0.3}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          sizeRandomness={1}
          shape="circle"
          depthOfField={0}
          connections={false}
          particleHoverFactor={0.8}
          hoverRadius={140}
          cameraDistance={22}
          variation={4}
          opacity={0.75}
          clickBurst={true}
          intro={true}
          lightMode={false}
        />
      </div>

      {/* Subtle animated amber light gradient and radial glows */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
          x: [0, 20, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(229, 169, 60, 0.22) 0%, rgba(212, 149, 43, 0.05) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(243, 199, 102, 0.16) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle geometric grid texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
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
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#e5a93c] uppercase mb-4">
              <span>02 / SERVICES</span>
              <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow">
              How I can help you.
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] font-light max-w-xl">
              Practical video editing, on-location shooting, and visual design tailored to your specific project.
            </p>
          </div>

          <div className="text-xs font-mono text-[#a1a1aa] max-w-xs md:text-right bg-white/[0.02] border border-white/[0.06] p-3 rounded-lg backdrop-blur-sm">
            Every project is priced clearly with transparent scope, realistic timelines, and no surprises.
          </div>
        </motion.div>

        {/* 6 Services editorial layout from PDF with refined gold hover effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service: ServiceItem, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(229,169,60,0.6)',
                backgroundColor: 'rgba(18,18,28,0.85)',
                boxShadow: '0 15px 40px -10px rgba(229,169,60,0.2)',
              }}
              className="relative p-8 rounded-2xl bg-[#0c0c14]/85 backdrop-blur-sm border border-white/[0.09] transition-all flex flex-col justify-between group shadow-xl"
            >
              {/* Subtle top golden accent shimmer */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#e5a93c]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Number & Quick Inquire trigger */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-xs font-bold text-[#f3c766] tracking-widest px-2.5 py-1 rounded bg-[#e5a93c]/10 border border-[#e5a93c]/20">
                    {service.number}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="text-xs font-mono text-[#a1a1aa] group-hover:text-[#e5a93c] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                {/* Service title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#fbe29a] transition-colors">
                  {service.title}
                </h3>

                {/* Exact short description from PDF */}
                <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed mb-6 font-light">
                  {service.shortDesc}
                </p>

                {/* Scope deliverables */}
                <div className="space-y-2 mb-6">
                  {service.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-[#a1a1aa]">
                      <Check className="w-3.5 h-3.5 text-[#e5a93c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal audience */}
              <div className="pt-4 border-t border-white/[0.06] text-[11px] text-[#71717a] font-mono">
                <span className="text-[#a1a1aa]/80">IDEAL FOR: </span>
                <span>{service.idealFor}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
