import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import Particles from './reactbits/Particles';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';

interface SelectedWorkProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(2000);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPrefersReducedMotion(reduced);

      if (!mobile && trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Exact travel distance to bring every project card and the finale card into full view
        const distance = Math.max(0, trackWidth - viewportWidth + 100);
        setScrollDistance(distance);
      }
    };

    checkViewport();

    // Use ResizeObserver on the track to recalculate when images/fonts load
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      resizeObserver = new ResizeObserver(() => {
        checkViewport();
      });
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener('resize', checkViewport);
    return () => {
      window.removeEventListener('resize', checkViewport);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic pixel transform function that responds instantly to scroll progress and measured distance
  const x = useTransform(scrollYProgress, (progress) => {
    return -progress * scrollDistance;
  });

  return (
    <section id="work" className="relative w-full max-w-full bg-[#060608] border-t border-white/[0.08]">
      {/* Mobile & Reduced Motion: Accessible touch horizontal swipe */}
      {isMobile || prefersReducedMotion ? (
        <div className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full overflow-hidden">
          {/* Subtle mobile particles layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <Particles
              particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b"]}
              particleCount={90}
              particleSpread={10}
              speed={0.06}
              particleBaseSize={75}
              glow={0.7}
              twinkle={0.3}
              moveParticlesOnHover={false}
              hoverEffect="parallax"
              sizeRandomness={1}
              shape="circle"
              depthOfField={0}
              connections={false}
              particleHoverFactor={0.5}
              cameraDistance={24}
              variation={2}
              opacity={0.65}
              clickBurst={false}
              intro={true}
              lightMode={false}
            />
          </div>

          {/* Subtle mobile ambient lighting */}
          <div
            className="absolute top-20 right-0 w-[350px] h-[350px] rounded-full blur-[80px] pointer-events-none opacity-30 z-0"
            style={{
              background: 'radial-gradient(circle, rgba(229, 169, 60, 0.22) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col mb-10"
          >
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#e5a93c] uppercase mb-3">
              <span>SELECTED WORK</span>
              <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Selected Projects & Edits.
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans">
              Swipe horizontally to explore edits and shoots. Tap any project for the full breakdown.
            </p>
          </motion.div>

          {/* Clean touch scroll container */}
          <div className="relative z-10 w-full overflow-x-auto pb-6 snap-x snap-mandatory flex gap-5 no-scrollbar">
            {PROJECTS_DATA.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectProject(project)}
                className="w-[280px] sm:w-[340px] shrink-0 snap-center rounded-2xl bg-[#0c0c12] border border-white/[0.08] overflow-hidden flex flex-col group cursor-pointer hover:border-[#e5a93c]/50 transition-colors shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111118]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-[#e5a93c] px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {project.categoryTag}
                  </div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#e5a93c] text-black flex items-center justify-center shadow-md">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mb-4 line-clamp-2">
                    {project.subtitle}
                  </p>
                  <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#71717a]">
                    <span>{project.category}</span>
                    <span className="text-[#e5a93c]">View Details →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop & Tablet: Sticky Pinned Horizontal Scroll Gallery with Cinematic Ambient Lighting */
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: `${scrollDistance + (typeof window !== 'undefined' ? window.innerHeight : 900)}px` }}
        >
          {/* Sticky wrapper that stays pinned to the viewport during the entire horizontal scroll */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
            {/* Subtle Particles field behind project gallery (strictly z-0 behind cards) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
              <Particles
                particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b", "#ffffff"]}
                particleCount={140}
                particleSpread={12}
                speed={0.06}
                particleBaseSize={80}
                glow={0.75}
                twinkle={0.25}
                moveParticlesOnHover={true}
                hoverEffect="parallax"
                sizeRandomness={1}
                shape="circle"
                depthOfField={0}
                connections={false}
                particleHoverFactor={0.6}
                hoverRadius={130}
                cameraDistance={22}
                variation={3}
                opacity={0.68}
                clickBurst={false}
                intro={true}
                lightMode={false}
              />
            </div>

            {/* Cinematic background lighting behind cards (pointer-events-none, strictly behind content) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] rounded-full blur-[130px] pointer-events-none z-0 opacity-40"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(229, 169, 60, 0.18) 0%, rgba(212, 149, 43, 0.06) 50%, transparent 75%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none z-0 opacity-25"
              style={{
                background: 'radial-gradient(circle, rgba(243, 199, 102, 0.15) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            {/* Header above the scrolling track */}
            <div className="relative z-10 max-w-7xl w-full mx-auto px-8 mb-8 pt-12 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#e5a93c] uppercase mb-2">
                  <span>SELECTED WORK</span>
                  <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
                  <span className="text-white/40">SCROLL TO EXPLORE</span>
                </div>
                <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-white drop-shadow">
                  Recent Edits & Visual Projects.
                </h2>
              </div>

              {/* Cinematic Scroll Progress Bar */}
              <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-[#a1a1aa] bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <span>01</span>
                <span className="w-24 h-[3px] bg-white/15 relative overflow-hidden rounded-full">
                  <motion.span
                    style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
                    className="absolute inset-0 bg-[#e5a93c] shadow-[0_0_8px_#e5a93c]"
                  />
                </span>
                <span>0{PROJECTS_DATA.length}</span>
              </div>
            </div>

            {/* Pinned translating track */}
            <motion.div
              ref={trackRef}
              id="horizontal-gallery-track"
              style={{ x }}
              className="relative z-10 flex items-center gap-8 pl-8 sm:pl-16 lg:pl-24 pr-16 will-change-transform"
            >
              {PROJECTS_DATA.map((project, index) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  onClick={() => onSelectProject(project)}
                  className="w-[450px] lg:w-[490px] shrink-0 rounded-2xl bg-[#0c0c12]/95 backdrop-blur-md border border-white/[0.09] hover:border-[#e5a93c]/60 hover:shadow-[0_15px_40px_rgba(229,169,60,0.15)] transition-all overflow-hidden group cursor-pointer shadow-2xl flex flex-col"
                >
                  {/* Media container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121218]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent opacity-80" />

                    {/* Category pill-free text badge */}
                    <div className="absolute top-4 left-4 text-[11px] font-mono tracking-widest text-[#fbe29a] bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-[#e5a93c]/30 shadow-sm">
                      {project.categoryTag}
                    </div>

                    <div className="absolute top-4 right-4 text-xs font-mono text-white/60 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
                      0{index + 1}
                    </div>

                    {/* Interactive overlay trigger */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#e5a93c] text-[#060608] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(229,169,60,0.6)]">
                      <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Details card content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] mb-2">
                      <span>{project.category}</span>
                      <span>•</span>
                      <span>{project.tools[0]}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#f3c766] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#71717a]">
                      <span className="flex items-center gap-1.5 text-white/70">
                        <Layers className="w-3.5 h-3.5 text-[#e5a93c]" />
                        {project.deliverables[0]}
                      </span>
                      <span className="text-[#e5a93c] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                        VIEW BRIEF →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* End of gallery callout card */}
              <div className="w-[340px] shrink-0 p-8 rounded-2xl bg-gradient-to-br from-[#151522] via-[#0f0f18] to-[#0c0c12] border border-[#e5a93c]/30 flex flex-col justify-center items-start text-left shadow-[0_0_35px_rgba(0,0,0,0.8)]">
                <span className="text-xs font-mono text-[#e5a93c] uppercase tracking-widest mb-3">
                  HAVE A PROJECT?
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Have a video project in mind?
                </h3>
                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-6 font-light">
                  Whether you need regular reels, a polished video edit, or event coverage in Chennai, I'd love to help bring your ideas to life.
                </p>
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(229,169,60,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="px-6 py-3 rounded-full text-xs font-bold tracking-wider text-[#060608] bg-[#e5a93c] hover:bg-[#f3c766] transition-colors"
                >
                  GET IN TOUCH
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
