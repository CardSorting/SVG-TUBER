import React, { useEffect, useRef } from 'react';
import { ExpressionType } from '../types/tuber';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  type: ExpressionType;
  active: boolean;
}

interface ParticleFXCanvasProps {
  activeExpression: ExpressionType;
}

const MAX_PARTICLES = 100;

export const ParticleFXCanvas = React.memo<ParticleFXCanvasProps>(({ activeExpression }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlePoolRef = useRef<Particle[]>(
    Array.from({ length: MAX_PARTICLES }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: 0,
      alpha: 0,
      life: 0,
      maxLife: 0,
      type: 'neutral',
      active: false,
    }))
  );
  const lastEmitRef = useRef<number>(0);
  const activeExpressionRef = useRef<ExpressionType>(activeExpression);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    activeExpressionRef.current = activeExpression;
    if (activeExpression !== 'neutral' && startLoopRef.current) {
      startLoopRef.current();
    }
  }, [activeExpression]);

  const startLoopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const emitParticle = (expr: ExpressionType) => {
      if (expr === 'neutral') return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2 - 50;

      const pool = particlePoolRef.current;
      const count = expr === 'shocked' || expr === 'angry' ? 3 : 2;
      let emitted = 0;

      for (let i = 0; i < pool.length && emitted < count; i++) {
        const p = pool[i];
        if (!p.active) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3;

          p.x = centerX + (Math.random() - 0.5) * 200;
          p.y = centerY + (Math.random() - 0.5) * 150;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed - (expr === 'blush' || expr === 'happy' ? 1.5 : 0);
          p.size = 8 + Math.random() * 16;
          p.alpha = 1.0;
          p.life = 0;
          p.maxLife = 40 + Math.random() * 40;
          p.type = expr;
          p.active = true;
          emitted++;
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      const currentExpr = activeExpressionRef.current;
      if (currentExpr !== 'neutral' && now - lastEmitRef.current > 120) {
        emitParticle(currentExpr);
        lastEmitRef.current = now;
      }

      const pool = particlePoolRef.current;
      let activeCount = 0;

      for (let i = 0; i < pool.length; i++) {
        const p = pool[i];
        if (!p.active) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life < p.maxLife) {
          activeCount++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);

          switch (p.type) {
            case 'blush':
            case 'heart_eyes':
              ctx.fillStyle = '#f43f5e';
              ctx.font = `${p.size}px sans-serif`;
              ctx.fillText('♥', p.x, p.y);
              break;
            case 'happy':
            case 'star_eyes':
              ctx.fillStyle = '#facc15';
              ctx.font = `${p.size}px sans-serif`;
              ctx.fillText('★', p.x, p.y);
              break;
            case 'angry':
              ctx.fillStyle = '#ef4444';
              ctx.font = `${p.size}px sans-serif`;
              ctx.fillText('💢', p.x, p.y);
              break;
            case 'shocked':
              ctx.fillStyle = '#38bdf8';
              ctx.font = `${p.size}px sans-serif`;
              ctx.fillText('⚡', p.x, p.y);
              break;
            case 'tears':
              ctx.fillStyle = '#06b6d4';
              ctx.font = `${p.size}px sans-serif`;
              ctx.fillText('💧', p.x, p.y);
              break;
            default:
              ctx.fillStyle = '#a855f7';
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
              ctx.fill();
          }

          ctx.restore();
        } else {
          p.active = false;
        }
      }

      if (activeExpressionRef.current !== 'neutral' || activeCount > 0) {
        animIdRef.current = requestAnimationFrame(render);
      } else {
        animIdRef.current = null;
      }
    };

    const startLoop = () => {
      if (animIdRef.current === null) {
        render();
      }
    };
    startLoopRef.current = startLoop;

    startLoop();

    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', resize);
      particlePoolRef.current.forEach((p) => (p.active = false));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
});
