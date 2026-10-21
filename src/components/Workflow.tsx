import React from 'react';
import { motion } from 'motion/react';
import Particles from './reactbits/Particles';
import { WORKFLOW_STAGES } from '../data/portfolioData';

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#060609] w-full max-w-full overflow-hidden">
      {/* Clean, fewer gold particles behind the workflow steps */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b"]}
          particleCount={110}
          particleSpread={11}
          speed={0.06}
          particleBaseSize={78}
          glow={0.7}
          twinkle={0.25}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          sizeRandomness={0.9}
          shape="circle"
          depthOfField={0}
          connections={false}
          particleHoverFactor={0.6}
          hoverRadius={130}
          cameraDistance={23}
          variation={5}
          opacity={0.65}
          clickBurst={true}
          intro={true}
          lightMode={false}
        />
      </div>

      {/* Subtle warm ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full blur-[140px] pointer-events-none z-0 opacity-25"
        style={{
          background: 'radial-gradient(ellipse, rgba(229, 169, 60, 0.2) 0%, transparent 70%)',
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
            <span>03 / WORKFLOW</span>
            <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow">
            A Clear, Simple Workflow.
          </h2>
          <p className="text-sm sm:text-base text-[#d4d4d8] font-light">
            Working together is straightforward from start to finish, with regular updates and open communication.
          </p>
        </motion.div>

        {/* Workflow container with animated thin gold connecting line */}
        <div className="relative">
          {/* Desktop Animated Thin Gold Connecting Line */}
          <div className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-[2px] bg-white/[0.08] z-0 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0, transformOrigin: '0%' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full bg-gradient-to-r from-[#e5a93c]/30 via-[#f3c766] to-[#e5a93c]/30 shadow-[0_0_10px_#e5a93c]"
            />
          </div>

          {/* 4 Stages progression cards sequentially revealed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {WORKFLOW_STAGES.map((stage, idx) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, borderColor: 'rgba(229,169,60,0.6)', backgroundColor: 'rgba(18,18,26,0.9)' }}
                className="relative p-7 rounded-2xl bg-[#0c0c14]/90 backdrop-blur-sm border border-white/[0.09] transition-all flex flex-col justify-between group cursor-default shadow-xl"
              >
                {/* Stage number with glowing node */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e5a93c]/15 border border-[#e5a93c]/40 flex items-center justify-center text-xs font-mono font-bold text-[#f3c766] shadow-[0_0_12px_rgba(229,169,60,0.3)] group-hover:scale-110 group-hover:border-[#e5a93c] transition-all">
                        {stage.number}
                      </div>
                      <span className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f3c766] to-[#d4952b]">
                        0{idx + 1}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                      PHASE
                    </span>
                  </div>

                  {/* Stage title */}
                  <h3 className="font-display text-xl font-bold text-white mb-3 tracking-wide group-hover:text-[#fbe29a] transition-colors">
                    {stage.title}
                  </h3>

                  {/* Exact description from PDF */}
                  <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed mb-6 font-light">
                    {stage.description}
                  </p>
                </div>

                {/* Sub-steps */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  {stage.substeps.map((sub) => (
                    <div key={sub} className="text-xs text-[#a1a1aa] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] shadow-[0_0_6px_#e5a93c] shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
