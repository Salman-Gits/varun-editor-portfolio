import React, { useEffect } from 'react';
import { X, CheckCircle2, Film, Layers, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#0c0c12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media view */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono text-[#e5a93c] tracking-widest uppercase mb-2 block">
              {project.categoryTag}
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h4 className="text-xs font-mono tracking-widest text-[#a1a1aa] uppercase mb-2">
              OVERVIEW & APPROACH
            </h4>
            <p className="text-sm sm:text-base text-[#d4d4d8] leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Tools & Deliverables columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#e5a93c] mb-3">
                <Film className="w-4 h-4" />
                <span>TOOLKIT & WORKFLOW</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#e5a93c] mb-3">
                <Layers className="w-4 h-4" />
                <span>CORE DELIVERABLES</span>
              </div>
              <ul className="space-y-2">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e5a93c] shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Footer inside modal */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#71717a] font-mono">
              Interested in a similar edit or shoot for your project?
            </span>
            <button
              type="button"
              onClick={() => {
                onInquire(project.category);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold tracking-wider text-[#060608] bg-[#e5a93c] hover:bg-[#f3c766] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LET'S DISCUSS THIS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
