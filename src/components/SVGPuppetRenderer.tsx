import React, { useEffect, useRef } from 'react';
import { SVGPuppetDefinition, FaceTrackingData, EngineConfig } from '../types/tuber';
import { PhysicsEngine } from '../engine/PhysicsEngine';

interface SVGPuppetRendererProps {
  puppet: SVGPuppetDefinition;
  trackingData?: FaceTrackingData;
  trackingDataRef?: React.RefObject<FaceTrackingData>;
  physics: PhysicsEngine;
  config: EngineConfig;
}

const transformCache = new WeakMap<SVGElement, { tx: string; origin: string }>();

export const SVGPuppetRenderer = React.memo<SVGPuppetRendererProps>(({
  puppet,
  trackingData,
  trackingDataRef,
  physics,
  config,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeCacheRef = useRef<Record<string, SVGElement | null>>({});

  const lastLeftClosedRef = useRef<boolean | null>(null);
  const lastRightClosedRef = useRef<boolean | null>(null);
  const lastMouthStateRef = useRef<string>('');
  const lastExpressionRef = useRef<string>('');

  const configRef = useRef<EngineConfig>(config);
  const physicsRef = useRef<PhysicsEngine>(physics);
  const puppetRef = useRef<SVGPuppetDefinition>(puppet);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    physicsRef.current = physics;
  }, [physics]);

  useEffect(() => {
    puppetRef.current = puppet;
  }, [puppet]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = puppet.svgContent;
    const svg = containerRef.current.querySelector('svg');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxHeight = '80vh';
      svg.style.display = 'block';

      // Pre-cache DOM query nodes to eliminate querySelector calls per frame
      nodeCacheRef.current = {
        headGroup: svg.querySelector('#head_base_group'),
        eyebrowsGroup: svg.querySelector('#eyebrows_group'),
        eyeLeftGroup: svg.querySelector('#eye_left_group'),
        eyeRightGroup: svg.querySelector('#eye_right_group'),
        noseGroup: svg.querySelector('#nose_group'),
        mouthGroup: svg.querySelector('#mouth_group'),
        hairFrontGroup: svg.querySelector('#hair_front_group'),
        hairBackGroup: svg.querySelector('#hair_back_group'),
        earsGroup: svg.querySelector('#ears_group'),
        bodyGroup: svg.querySelector('#body_group'),
        eyeLeftClosedEl: svg.querySelector('#eye_left_closed'),
        irisLeftEl: svg.querySelector('#iris_left'),
        eyeRightClosedEl: svg.querySelector('#eye_right_closed'),
        irisRightEl: svg.querySelector('#iris_right'),
        mouthClosed: svg.querySelector('#mouth_closed'),
        mouthSmile: svg.querySelector('#mouth_smile'),
        mouthOpenWide: svg.querySelector('#mouth_open_wide'),
        mouthO: svg.querySelector('#mouth_o'),
        expr_blush: svg.querySelector('#expr_blush'),
        expr_angry: svg.querySelector('#expr_angry'),
        expr_shock: svg.querySelector('#expr_shock'),
        expr_tears: svg.querySelector('#expr_tears'),
        expr_stars: svg.querySelector('#expr_stars'),
        expr_hearts: svg.querySelector('#expr_hearts'),
      };
    }
    lastLeftClosedRef.current = null;
    lastRightClosedRef.current = null;
    lastMouthStateRef.current = '';
    lastExpressionRef.current = '';
    return () => {
      nodeCacheRef.current = {};
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [puppet]);

  useEffect(() => {
    let animId: number;

    const r2 = (n: number) => Math.round(n * 100) / 100;
    const origin = '400px 360px';

    const renderFrame = () => {
      const nodes = nodeCacheRef.current;
      const data = trackingDataRef ? trackingDataRef.current : trackingData;
      const currentConfig = configRef.current;
      const currentPhysics = physicsRef.current;
      const currentPuppet = puppetRef.current;

      if (nodes && data) {
        // Sanitize and round float values to eliminate sub-pixel micro-jitter string allocations
        const rotZ = r2(Number.isFinite(data.headRoll) ? data.headRoll : 0);
        const rotY = r2(Number.isFinite(data.headYaw) ? data.headYaw : 0);
        const rotX = r2(Number.isFinite(data.headPitch) ? data.headPitch : 0);

        const posX = r2((Number.isFinite(data.positionX) ? data.positionX : 0) * 30 + (currentConfig.offsetX || 0));
        const bouncePos = r2(currentPhysics && currentPhysics.bounceY && Number.isFinite(currentPhysics.bounceY.pos) ? currentPhysics.bounceY.pos : 0);
        const posY = r2((Number.isFinite(data.positionY) ? data.positionY : 0) * 20 + (currentConfig.offsetY || 0) + bouncePos);

        const squishX = r2(currentPhysics && Number.isFinite(currentPhysics.squishX) && currentPhysics.squishX > 0 ? currentPhysics.squishX : 1.0);
        const squishY = r2(currentPhysics && Number.isFinite(currentPhysics.squishY) && currentPhysics.squishY > 0 ? currentPhysics.squishY : 1.0);

        // Head transform string
        const headTransform = `translate(${posX}px, ${posY}px) rotate(${rotZ}deg) scale(${squishX}, ${squishY}) skewY(${r2(rotY * 0.15)}deg) skewX(${r2(rotX * 0.1)}deg)`;

        const applyTransform = (el: SVGElement | null, customTransform: string, customOrigin: string = origin) => {
          if (!el) return;
          const cached = transformCache.get(el);
          if (cached && cached.tx === customTransform && cached.origin === customOrigin) return;
          transformCache.set(el, { tx: customTransform, origin: customOrigin });
          el.style.transformOrigin = customOrigin;
          el.style.transform = customTransform;
        };

        // 1. Head Base & Facial Features
        applyTransform(nodes.headGroup, headTransform, origin);
        applyTransform(nodes.eyebrowsGroup, `${headTransform} translate(0px, ${-(data.eyebrowRaise || 0) * 10}px)`, origin);
        applyTransform(nodes.eyeLeftGroup, `${headTransform} translate(${rotY * 0.3}px, ${rotX * 0.2}px)`, '330px 365px');
        applyTransform(nodes.eyeRightGroup, `${headTransform} translate(${rotY * 0.3}px, ${rotX * 0.2}px)`, '470px 365px');
        applyTransform(nodes.noseGroup, `${headTransform} translate(${rotY * 0.4}px, ${rotX * 0.3}px)`, '400px 415px');
        applyTransform(nodes.mouthGroup, `${headTransform} translate(${rotY * 0.35}px, ${rotX * 0.25}px)`, '400px 445px');

        // 2. Secondary Motion: Hair Front, Back, Ears & Body
        const hairSway = currentPhysics && currentPhysics.hairSway && Number.isFinite(currentPhysics.hairSway.pos) ? currentPhysics.hairSway.pos : 0;
        const earSway = currentPhysics && currentPhysics.earSway && Number.isFinite(currentPhysics.earSway.pos) ? currentPhysics.earSway.pos : 0;
        const bodySway = currentPhysics && currentPhysics.bodySway && Number.isFinite(currentPhysics.bodySway.pos) ? currentPhysics.bodySway.pos : 0;
        const earBounceFactor = currentConfig.physics?.earBounce ?? 0.8;
        const bodySwayFactor = currentConfig.physics?.bodySway ?? 0.3;

        applyTransform(nodes.hairFrontGroup, `${headTransform} rotate(${hairSway}deg)`, '400px 240px');
        applyTransform(nodes.hairBackGroup, `${headTransform} rotate(${-hairSway * 0.6}deg)`, '400px 360px');
        applyTransform(nodes.earsGroup, `${headTransform} rotate(${earSway * earBounceFactor}deg)`, '400px 250px');
        applyTransform(nodes.bodyGroup, `rotate(${bodySway * bodySwayFactor}deg) translate(${posX * 0.2}px, ${posY * 0.1}px)`, '400px 750px');

        // 3. Eye Blink State Updates (Guarded against redundant 60 FPS DOM writes)
        const isLeftClosed = (data.leftEyeOpen ?? 1) < 0.25 || currentConfig.activeExpression === 'happy';
        const isRightClosed = (data.rightEyeOpen ?? 1) < 0.25 || currentConfig.activeExpression === 'happy';

        if (lastLeftClosedRef.current !== isLeftClosed) {
          lastLeftClosedRef.current = isLeftClosed;
          if (nodes.eyeLeftClosedEl) nodes.eyeLeftClosedEl.style.display = isLeftClosed ? 'block' : 'none';
          if (nodes.irisLeftEl) nodes.irisLeftEl.style.display = isLeftClosed ? 'none' : 'block';
        }

        if (lastRightClosedRef.current !== isRightClosed) {
          lastRightClosedRef.current = isRightClosed;
          if (nodes.eyeRightClosedEl) nodes.eyeRightClosedEl.style.display = isRightClosed ? 'block' : 'none';
          if (nodes.irisRightEl) nodes.irisRightEl.style.display = isRightClosed ? 'none' : 'block';
        }

        // 4. Formant Phoneme & Volume Mouth Morphing (Guarded against redundant 60 FPS DOM writes)
        const openVal = data.mouthOpen || 0;
        const phoneme = data.phoneme || 'M';
        let mouthState = 'closed';
        if (openVal < 0.12 || phoneme === 'M') {
          mouthState = (currentConfig.activeExpression === 'happy' || currentConfig.activeExpression === 'blush') ? 'smile' : 'closed';
        } else if (phoneme === 'A') {
          mouthState = 'openWide';
        } else if (phoneme === 'E' || phoneme === 'I') {
          mouthState = 'smile';
        } else if (phoneme === 'O' || phoneme === 'U') {
          mouthState = 'o';
        } else {
          mouthState = 'smile';
        }

        if (lastMouthStateRef.current !== mouthState) {
          lastMouthStateRef.current = mouthState;
          if (nodes.mouthClosed) nodes.mouthClosed.style.display = mouthState === 'closed' ? 'block' : 'none';
          if (nodes.mouthSmile) nodes.mouthSmile.style.display = mouthState === 'smile' ? 'block' : 'none';
          if (nodes.mouthOpenWide) nodes.mouthOpenWide.style.display = mouthState === 'openWide' ? 'block' : 'none';
          if (nodes.mouthO) nodes.mouthO.style.display = mouthState === 'o' ? 'block' : 'none';
        }

        // 5. Expression Layer Visibility (Guarded against redundant 60 FPS DOM writes)
        const activeExpr = currentConfig.activeExpression;
        if (lastExpressionRef.current !== activeExpr) {
          lastExpressionRef.current = activeExpr;
          const activeLayerIds = currentPuppet.expressionLayers?.[activeExpr] || [];
          const allExprIds = ['expr_blush', 'expr_angry', 'expr_shock', 'expr_tears', 'expr_stars', 'expr_hearts'];
          allExprIds.forEach((id) => {
            const el = nodes[id];
            if (el) {
              el.style.display = activeLayerIds.includes(id) ? 'block' : 'none';
            }
          });
        }
      }

      if (trackingDataRef || trackingData) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [trackingData, trackingDataRef]);

  return (
    <div
      ref={containerRef}
      className="w-[650px] h-[750px] max-w-full max-h-[85vh] flex items-center justify-center pointer-events-none transition-transform duration-75"
      style={{
        transform: `scale(${config.scale || 1.0})`,
      }}
    />
  );
});
