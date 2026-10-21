import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/portfolioData';

interface NavbarProps {
  onSelectService?: (serviceName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'WORKFLOW', href: '#workflow' },
    { label: 'PACKAGES', href: '#packages' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060608]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="font-display text-lg sm:text-xl font-bold tracking-wider text-white hover:text-[#f3c766] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span>{BRAND_CONFIG.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] opacity-80 group-hover:scale-125 transition-transform" />
          </a>

          {/* Zone 2: 4-6 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-widest text-[#a1a1aa]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#e5a93c] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-[#060608] bg-[#e5a93c] hover:bg-[#f3c766] rounded-full transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(229,169,60,0.4)] whitespace-nowrap shrink-0 group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/80 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5a93c]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#060608]/95 backdrop-blur-xl md:hidden pt-24 px-8 pb-10 flex flex-col justify-between">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-2xl font-semibold tracking-wider text-white/90 hover:text-[#e5a93c] transition-colors py-2 border-b border-white/[0.06] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#a1a1aa] font-mono">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/[0.08] flex flex-col gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-3.5 text-xs font-bold tracking-wider text-[#060608] bg-[#e5a93c] rounded-full"
            >
              START A PROJECT
            </a>
            <div className="text-center text-xs text-[#71717a] font-mono">
              CHENNAI, TAMIL NADU • 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
