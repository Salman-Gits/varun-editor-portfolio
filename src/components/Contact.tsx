import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Instagram, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import Particles from './reactbits/Particles';
import { BRAND_CONFIG } from '../data/portfolioData';

interface ContactProps {
  initialService?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialService = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || 'Reels & Short Videos');
  const [details, setDetails] = useState('');
  const [timeline, setTimeline] = useState('Within 2-3 weeks');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const serviceOptions = [
    'Reels & Short Videos',
    'Video Editing (Narrative / YouTube)',
    'Photo & Video Shoots (Events / Birthday)',
    'Poster & Social Design',
    'Colour Grading & Look Development',
    'Custom Creative Project',
    'Package: REELS EDIT',
    'Package: CONTENT BUNDLE',
    'Package: EVENT SHOOT',
    'Package: CUSTOM PROJECT',
  ];

  const whatsappUrl = BRAND_CONFIG.whatsappUrl;

  const handleChatOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!email.trim()) {
      setValidationError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!details.trim()) {
      setValidationError('Please enter your project details.');
      return;
    }

    setValidationError('');

    const messageText = `Hi Varun! I'd like to discuss a project with you.

Name: ${name.trim()}
Email: ${email.trim()}
Service Required: ${service}
Target Timeline: ${timeline}
Project Details: ${details.trim()}

Please let me know how we can proceed. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const targetUrl = `https://wa.me/916379384156?text=${encodedMessage}`;

    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#06060a] w-full max-w-full overflow-hidden">
      {/* Stronger cinematic particle field behind contact heading and CTA buttons */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#e5a93c", "#fbe29a", "#f3c766", "#d4952b", "#ffffff"]}
          particleCount={190}
          particleSpread={11}
          speed={0.085}
          particleBaseSize={88}
          glow={0.85}
          twinkle={0.32}
          moveParticlesOnHover={true}
          hoverEffect="parallax"
          sizeRandomness={1.1}
          shape="circle"
          depthOfField={0}
          connections={false}
          particleHoverFactor={0.9}
          hoverRadius={150}
          cameraDistance={21}
          variation={7}
          opacity={0.8}
          clickBurst={true}
          intro={true}
          lightMode={false}
        />
      </div>

      {/* Cinematic ambient gold glows and light sweep in background */}
      <div
        className="absolute top-10 left-1/4 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(229, 169, 60, 0.22) 0%, rgba(212, 149, 43, 0.05) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-0 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(243, 199, 102, 0.16) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header with cinematic gold light sweep banner */}
        <div className="relative max-w-3xl mb-16 overflow-hidden">
          {/* Animated Gold Light Sweep */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 3,
            }}
            className="absolute -top-10 -bottom-10 w-48 bg-gradient-to-r from-transparent via-[#e5a93c]/25 to-transparent blur-md -skew-x-25 pointer-events-none z-0"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#e5a93c] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#e5a93c]" />
              <span>04 / LET'S CONNECT</span>
              <span className="w-8 h-[1px] bg-[#e5a93c]/40" />
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow">
              Let's talk about <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbe29a] via-[#e5a93c] to-[#d4952b]">
                your project.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#d4d4d8] font-light leading-relaxed">
              Whether you have raw footage ready to edit, an upcoming event in Chennai, or just an initial idea, drop me a message and let's discuss.
            </p>
          </motion.div>
        </div>

        {/* 2-Column Split: Brand Specs Left, Contact Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand specs from PDF */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col space-y-6 w-full"
          >
            <div className="p-8 rounded-2xl bg-[#0c0c14]/90 backdrop-blur-md border border-white/[0.09] space-y-6 shadow-2xl">
              <div className="pb-6 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase block mb-1">
                  BRAND
                </span>
                <span className="font-display text-xl font-bold text-white tracking-wide">
                  {BRAND_CONFIG.name}
                </span>
              </div>

              <div className="pb-6 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase block mb-1">
                  LOCATION
                </span>
                <span className="text-sm text-[#e4e4e7] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#e5a93c]" />
                  {BRAND_CONFIG.location}
                </span>
              </div>

              <div className="pb-6 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase block mb-1">
                  SERVICES
                </span>
                <span className="text-sm text-[#e4e4e7]">
                  Editing • Reels • Video Shoots • Design
                </span>
              </div>

              <div className="pb-6 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase block mb-1">
                  INSTAGRAM
                </span>
                <a
                  href={BRAND_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#e5a93c] hover:underline flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{BRAND_CONFIG.instagramHandle}</span>
                </a>
                <span className="text-[10px] text-[#71717a] font-mono block mt-1">
                  DM anytime for collabs & edits
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase block mb-1">
                  PHONE / WHATSAPP
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#e4e4e7] hover:text-[#e5a93c] flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{BRAND_CONFIG.whatsappNumber}</span>
                </a>
                <span className="text-[10px] text-[#71717a] font-mono block mt-1">
                  Available for quick questions & project quotes
                </span>
              </div>
            </div>

            {/* Quick WhatsApp direct chat card */}
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 backdrop-blur-md flex items-center justify-between shadow-xl">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Need a quick reply?
                </h4>
                <p className="text-xs text-emerald-300/90 font-light">
                  Message me directly on WhatsApp to check availability or ask questions.
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(52, 211, 153, 0.4)' }}
                whileTap={{ scale: 0.96 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                MESSAGE ON WHATSAPP
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form with soft glow */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full relative"
          >
            {/* Soft background glow behind main form */}
            <div
              className="absolute inset-0 -m-4 rounded-3xl blur-[60px] bg-[#e5a93c]/10 pointer-events-none z-0"
              aria-hidden="true"
            />

            <form
              onSubmit={handleChatOnWhatsApp}
              className="relative z-10 p-8 sm:p-10 rounded-2xl bg-[#0c0c14]/95 backdrop-blur-md border border-white/[0.09] shadow-2xl space-y-6 w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#e5a93c] focus:ring-1 focus:ring-[#e5a93c] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#e5a93c] focus:ring-1 focus:ring-[#e5a93c] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2"
                  >
                    Service Required
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#e5a93c] focus:ring-1 focus:ring-[#e5a93c] transition-all cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="timeline"
                    className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2"
                  >
                    Target Timeline
                  </label>
                  <select
                    id="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#14141c] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#e5a93c] focus:ring-1 focus:ring-[#e5a93c] transition-all cursor-pointer"
                  >
                    <option value="Urgent (Within 48-72 hours)">Urgent (Within 48-72 hours)</option>
                    <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                    <option value="Within 2-3 weeks">Within 2-3 weeks</option>
                    <option value="Next month or flexible">Next month or flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="block text-xs font-mono uppercase tracking-wider text-[#a1a1aa] mb-2"
                >
                  Project Details & Vision *
                </label>
                <textarea
                  id="details"
                  rows={4}
                  value={details}
                  onChange={(e) => {
                    setDetails(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="Share your video concept, references, event date/location in Chennai, or footage scope..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-sm focus:outline-none focus:border-[#e5a93c] focus:ring-1 focus:ring-[#e5a93c] transition-all resize-none"
                />
              </div>

              {validationError && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/30 p-3 rounded-lg border border-rose-500/30">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-[#71717a] font-mono leading-tight">
                  ✦ Opens WhatsApp with your project details prefilled. You can review and press Send.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(229,169,60,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold tracking-wider text-[#060608] bg-[#e5a93c] hover:bg-[#f3c766] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,169,60,0.35)]"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <MessageSquare className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
