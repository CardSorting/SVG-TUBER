import React, { useEffect, useRef } from 'react';
import { PostFilter } from '../types/tuber';

interface PostProcessingCanvasProps {
  filter: PostFilter;
}

export const PostProcessingCanvas = React.memo<PostProcessingCanvasProps>(({ filter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filterRef = useRef<PostFilter>(filter);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    filterRef.current = filter;
    if (filter === 'none' && animIdRef.current !== null) {
      cancelAnimationFrame(animIdRef.current);
      animIdRef.current = null;
    }
  }, [filter]);

  useEffect(() => {
    if (filter === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let crtGradient: CanvasGradient | null = null;
    let bloomGradient: CanvasGradient | null = null;

    const buildGradients = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const crtGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.7);
      crtGrad.addColorStop(0, 'rgba(0,0,0,0)');
      crtGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
      crtGradient = crtGrad;

      const bloomGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      bloomGrad.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      bloomGrad.addColorStop(1, 'rgba(236, 72, 153, 0.12)');
      bloomGradient = bloomGrad;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.scale(dpr, dpr);
      buildGradients(cssW, cssH);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const currentFilter = filterRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (currentFilter === 'none') {
        ctx.clearRect(0, 0, w, h);
        animIdRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, w, h);

      if (currentFilter === 'crt') {
        // CRT Scanlines
        ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
        for (let y = 0; y < h; y += 4) {
          ctx.fillRect(0, y, w, 1.5);
        }
        // CRT Vignette
        if (crtGradient) {
          ctx.fillStyle = crtGradient;
          ctx.fillRect(0, 0, w, h);
        }
      } else if (currentFilter === 'vhs') {
        // VHS RGB Static / Tape Noise
        ctx.fillStyle = 'rgba(6, 182, 212, 0.04)';
        ctx.fillRect(0, 0, w, h);

        const now = performance.now();
        const noiseY = (now * 0.1) % h;
        ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
        ctx.fillRect(0, noiseY, w, 3);
      } else if (currentFilter === 'bloom') {
        // Cyber Bloom Glow
        if (bloomGradient) {
          ctx.fillStyle = bloomGradient;
          ctx.fillRect(0, 0, w, h);
        }
      } else if (currentFilter === 'pixel') {
        // Retro Pixel Grid (Single batched stroke path)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        const step = 16;
        ctx.beginPath();
        for (let x = 0; x < w; x += step) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let y = 0; y < h; y += step) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
      window.removeEventListener('resize', resize);
    };
  }, [filter]);

  if (filter === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-25"
    />
  );
});
