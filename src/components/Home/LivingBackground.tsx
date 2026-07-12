"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Decorative animated background: a depth-parallax purple particle field with
// a central glow that intensifies as the page is scrolled, plus velocity
// streaks. Fixed behind the page content. No-JS/SSR safe (renders nothing
// meaningful on the server), paused when the tab is hidden, and static under
// reduced motion.
export const LivingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;

    // Scroll signal.
    let progress = 0;
    let velocity = 0;
    let smoothVel = 0;
    let lastY = window.scrollY || 0;

    type Particle = { x: number; y: number; z: number; r: number };
    let parts: Particle[] = [];

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const seed = () => {
      const count = Math.min(140, Math.floor((W * H) / 13000));
      parts = [];
      for (let i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: 0.25 + Math.random() * 0.75,
          r: 0.6 + Math.random() * 1.7,
        });
      }
    };

    const onScroll = () => {
      const y = window.scrollY || 0;
      velocity = y - lastY;
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    };

    const onResize = () => {
      resize();
      seed();
    };

    const paintGlow = (glow: number) => {
      const g = ctx.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, Math.max(W, H) * 0.62);
      g.addColorStop(0, `rgba(172,107,237,${glow.toFixed(3)})`);
      g.addColorStop(1, "rgba(172,107,237,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };

    // Single static frame for reduced motion.
    const paintStatic = () => {
      ctx.clearRect(0, 0, W, H);
      paintGlow(0.06);
      for (const p of parts) {
        ctx.fillStyle = `rgba(200,150,255,${(0.1 + p.z * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = () => {
      smoothVel += (velocity - smoothVel) * 0.08;
      velocity *= 0.9;

      ctx.clearRect(0, 0, W, H);
      paintGlow(0.04 + progress * 0.15);

      const drift = 1 + progress * 1.8;
      for (const p of parts) {
        p.y -= (0.1 + p.z * 0.45) * drift;
        p.x += smoothVel * p.z * 0.3;
        if (p.y < -4) {
          p.y = H + 4;
          p.x = Math.random() * W;
        }
        if (p.x < -4) p.x = W + 4;
        else if (p.x > W + 4) p.x = -4;

        const a = 0.1 + p.z * 0.4 * (0.5 + progress * 0.5);
        const streak = Math.min(Math.abs(smoothVel) * p.z * 0.5, 20);
        const color = `rgba(200,150,255,${a.toFixed(3)})`;
        if (streak > 2) {
          ctx.strokeStyle = color;
          ctx.lineWidth = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - Math.sign(smoothVel) * streak, p.y);
          ctx.stroke();
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!prefersReduced) start();
    };

    resize();
    seed();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    if (prefersReduced) paintStatic();
    else start();

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};
