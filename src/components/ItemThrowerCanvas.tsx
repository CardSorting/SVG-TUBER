import React, { useEffect, useRef } from 'react';

interface ThrownItem {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  progress: number;
  type: 'boba' | 'heart' | 'star';
  active: boolean;
}

interface ItemThrowerCanvasProps {
  onHeadImpact: () => void;
}

const ITEM_TYPES: ('boba' | 'heart' | 'star')[] = ['boba', 'heart', 'star'];
const MAX_ITEMS = 50;

export const ItemThrowerCanvas = React.memo<ItemThrowerCanvasProps>(({ onHeadImpact }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsPoolRef = useRef<ThrownItem[]>(
    Array.from({ length: MAX_ITEMS }, () => ({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      startX: 0,
      startY: 0,
      progress: 0,
      type: 'boba',
      active: false,
    }))
  );
  const onHeadImpactRef = useRef(onHeadImpact);

  useEffect(() => {
    onHeadImpactRef.current = onHeadImpact;
  }, [onHeadImpact]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const pool = itemsPoolRef.current;
      let activeCount = 0;

      for (let i = 0; i < pool.length; i++) {
        const item = pool[i];
        if (!item.active) continue;

        item.progress += 0.04;
        item.x = item.startX + (item.targetX - item.startX) * item.progress;
        item.y = item.startY + (item.targetY - item.startY) * item.progress - Math.sin(item.progress * Math.PI) * 120;

        ctx.save();
        ctx.font = '32px sans-serif';
        const icon = item.type === 'boba' ? '🧋' : item.type === 'heart' ? '💖' : '⭐';
        ctx.fillText(icon, item.x - 16, item.y + 16);
        ctx.restore();

        if (item.progress >= 1) {
          item.active = false;
          onHeadImpactRef.current(); // Trigger physical head squish on impact!
        } else {
          activeCount++;
        }
      }

      if (activeCount > 0) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    const startLoop = () => {
      if (animId === null) {
        render();
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Don't throw when clicking on dashboard UI
      if ((e.target as HTMLElement).closest('.glass-panel') || (e.target as HTMLElement).closest('button')) return;

      const randomType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
      const pool = itemsPoolRef.current;

      for (let i = 0; i < pool.length; i++) {
        const item = pool[i];
        if (!item.active) {
          item.x = e.clientX;
          item.y = e.clientY;
          item.startX = e.clientX;
          item.startY = e.clientY;
          item.targetX = window.innerWidth / 2;
          item.targetY = window.innerHeight / 2 - 50;
          item.progress = 0;
          item.type = randomType;
          item.active = true;
          startLoop();
          break;
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      itemsPoolRef.current.forEach((item) => (item.active = false));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-22"
    />
  );
});
