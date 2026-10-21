import React, { useEffect, useRef, useState } from 'react';
import './WebThreads.css';

interface WebThreadsProps {
  threadsCount?: number;
  amplitude?: number;
  speed?: number;
  glowIntensity?: number;
  color?: string; // Base accent color reference
  className?: string;
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export const WebThreads: React.FC<WebThreadsProps> = ({
  threadsCount = 5,
  amplitude = 0.85,
  speed = 0.32,
  glowIntensity = 0.8,
  color = '#d4af37',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setHasWebGL(false);
      return;
    }

    let animationFrameId: number;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track mouse
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    // Pulses generated on click
    const pulses: Pulse[] = [];

    // Introduction animation progress (0 to 1)
    let introProgress = 0;
    const introDuration = 1.8;
    let startTime: number | null = null;
    let lastTime = performance.now();

    // Canvas sizing
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse events on container
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      pulses.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.75,
        alpha: 0.65,
        speed: Math.max(width, height) * 0.4,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('click', handleClick);

    // Visibility Observer to pause off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Rich cinematic palette: Rich champagne gold, warm amber, and brighter gold highlights
    const threadPalettes = [
      { r: 243, g: 199, b: 102, a: 0.62 }, // Rich Brighter Gold highlight
      { r: 229, g: 169, b: 60,  a: 0.58 }, // Core Varun Warm Gold
      { r: 247, g: 218, b: 142, a: 0.65 }, // Luminous Champagne Gold
      { r: 212, g: 149, b: 43,  a: 0.52 }, // Deep Warm Amber
      { r: 236, g: 188, b: 96,  a: 0.56 }, // Vibrant Golden Ochre
    ];

    // Perimeter distribution: Keep trails primarily toward outer edges (top and bottom)
    // to preserve negative space and keep hero headline, subtitle, and CTA buttons free of obstruction
    const perimeterRatios = [
      0.12, // Upper edge framing top navbar/badge
      0.23, // Upper third, drifting smoothly above headline
      0.74, // Lower third, floating below CTA buttons
      0.84, // Lower edge, behind location & stats badges
      0.92, // Bottom perimeter, above scroll indicator
      0.07, // Extra upper margin if count > 5
      0.78, // Extra lower margin if count > 6
    ];

    // Seeded parameters for each thread with varied spacing and silky harmonic waves
    const threads = Array.from({ length: threadsCount }, (_, i) => {
      const baseYRatio = perimeterRatios[i % perimeterRatios.length];
      return {
        palette: threadPalettes[i % threadPalettes.length],
        freqX: 0.0009 + (i * 0.00022),
        freqY: 0.0012 + (i * 0.00018),
        phaseSpeed: (0.28 + (i * 0.08)) * speed,
        amplitudeOffset: (Math.sin(i * 1.8) * 16) * amplitude,
        baseYRatio,
        phase: (i * Math.PI) / 2.6,
        // Stronger line thickness: 2–2.8px stroke on desktop with soft visible outer glow
        strokeWidth: 2.1 + (i % 2 === 0 ? 0.6 : 0.0),
      };
    });

    let simTime = 0;

    // Render loop
    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      introProgress = Math.min(elapsed / introDuration, 1.0);

      // Slow, subtle, cinematic movement with zero jitter
      const effectiveSpeed = prefersReducedMotion ? 0.04 : 0.85;
      simTime += dt * effectiveSpeed;

      // Smooth mouse lerp
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.04;
        mouse.y += (-1000 - mouse.y) * 0.04;
      }

      ctx.save();
      // Scale canvas coordinate system to CSS pixels
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Additive screen blend for gentle, luminous streaks without muddying
      ctx.globalCompositeOperation = 'screen';

      // Update and render subtle click pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += pulse.speed * dt;
        pulse.alpha = Math.max(0, 1 - pulse.radius / pulse.maxRadius);

        if (pulse.alpha <= 0.01) {
          pulses.splice(p, 1);
          continue;
        }

        // Draw soft champagne radial wave
        const grad = ctx.createRadialGradient(
          pulse.x,
          pulse.y,
          Math.max(0, pulse.radius - 50),
          pulse.x,
          pulse.y,
          pulse.radius
        );
        grad.addColorStop(0, 'rgba(226, 188, 126, 0)');
        grad.addColorStop(0.7, `rgba(218, 176, 110, ${0.08 * pulse.alpha})`);
        grad.addColorStop(0.95, `rgba(234, 202, 148, ${0.14 * pulse.alpha})`);
        grad.addColorStop(1, 'rgba(226, 188, 126, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw threads across full horizontal span with high resolution
      const segments = Math.max(70, Math.floor(width / 12));
      const stepX = width / segments;

      threads.forEach((thread) => {
        const points: { x: number; y: number; lightBoost: number }[] = [];
        const baseY = height * thread.baseYRatio + thread.amplitudeOffset;

        for (let s = 0; s <= segments; s++) {
          const x = s * stepX;
          // Soft introduction reveal left-to-right
          const revealThreshold = (x / width) * 1.05;
          if (introProgress < revealThreshold) {
            continue;
          }

          // Long, silky flowing harmonic curves
          const wave1 = Math.sin(x * thread.freqX + simTime * thread.phaseSpeed + thread.phase);
          const wave2 = Math.cos(x * thread.freqY * 1.15 - simTime * (thread.phaseSpeed * 0.65) + 0.8);
          let y = baseY + (wave1 * 26 + wave2 * 14) * amplitude;

          // Intelligent Center Avoidance:
          // Keep the headline, subtitle, description, and CTA buttons unobstructed
          // If a trail drifts into the central 35%-68% vertical zone within the middle horizontal span,
          // smoothly curve it toward the corresponding outer margin.
          const normX = x / width;
          if (normX > 0.18 && normX < 0.82) {
            const centerBell = Math.sin(((normX - 0.18) / 0.64) * Math.PI); // 0 at edges, 1 at center
            const centerY = height * 0.48;
            const distFromCenter = y - centerY;
            const exclusionZone = height * 0.22; // exclusion radius around center

            if (Math.abs(distFromCenter) < exclusionZone) {
              const pushFactor = (1 - Math.abs(distFromCenter) / exclusionZone) * centerBell;
              // Push gently away from center text (upward for top trails, downward for bottom trails)
              y += (distFromCenter < 0 ? -1 : 1) * pushFactor * 32;
            }
          }

          // Gentle mouse deflection
          let lightBoost = 0;
          if (mouse.x > -500) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 180;

            if (dist < influenceRadius) {
              const factor = (1 - dist / influenceRadius);
              const repel = Math.sin((factor * Math.PI) / 2) * 22;
              y += (dy >= 0 ? 1 : -1) * repel * 0.5;
              lightBoost += factor * 0.35;
            }
          }

          // Subtle pulse lighting interaction
          pulses.forEach((pulse) => {
            const dx = x - pulse.x;
            const dy = y - pulse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ringDist = Math.abs(dist - pulse.radius);
            if (ringDist < 70) {
              const pulseFactor = (1 - ringDist / 70) * pulse.alpha;
              lightBoost += pulseFactor * 0.4;
            }
          });

          points.push({ x, y, lightBoost });
        }

        if (points.length < 2) return;

        // Construct smooth quadratic Bezier path
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const xc = (points[i].x + points[i - 1].x) / 2;
          const yc = (points[i].y + points[i - 1].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }

        const avgBoost = points.reduce((acc, p) => acc + p.lightBoost, 0) / points.length;
        const alpha = Math.min(0.92, (thread.palette.a + avgBoost * 0.3) * glowIntensity * introProgress);

        // 1. Visible, soft outer glow (approx 5.5px width, gentle luminous aura)
        ctx.strokeStyle = `rgba(${thread.palette.r}, ${thread.palette.g}, ${thread.palette.b}, ${alpha * 0.34})`;
        ctx.lineWidth = 5.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // 2. Main rich stroke (approx 2.1–2.7px on desktop, rich champagne and warm amber highlight)
        ctx.strokeStyle = `rgba(${thread.palette.r}, ${thread.palette.g}, ${thread.palette.b}, ${alpha * 0.88})`;
        ctx.lineWidth = thread.strokeWidth;
        ctx.stroke();
      });

      ctx.restore();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [threadsCount, amplitude, speed, glowIntensity, color]);

  return (
    <div ref={containerRef} className={`web-threads-container ${className}`} aria-hidden="true">
      {hasWebGL ? (
        <canvas ref={canvasRef} className="web-threads-canvas" />
      ) : (
        <div className="web-threads-fallback" />
      )}
    </div>
  );
};

export default WebThreads;
