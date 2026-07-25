# ⚡ Performance & Memory Optimization Reference

This document outlines the architectural optimizations implemented in SVG-TUBER ULTIMATE to guarantee zero memory leaks, minimal CPU overhead, and locked 60 FPS performance.

---

## 🛠️ Summary of Executed Optimizations

| Optimization Strategy | Target Component | Benefit / Waste Eliminated |
|---|---|---|
| **rAF Loop Decoupling** | `SVGPuppetRenderer.tsx`, `AvatarPropsOverlay.tsx` | Prevented constant cancellation and re-instantiation of 60 FPS animation loops when sliders/config props change. |
| **WeakMap DOM Transform Cache** | `SVGPuppetRenderer.tsx` | Replaced direct DOM node object mutation (`(el as any)._lastTx`) with a `WeakMap<SVGElement, CacheEntry>` to prevent V8 DOM wrapper memory retention. |
| **Idle Shader Loop Halt** | `PostProcessingCanvas.tsx` | Immediately halts `requestAnimationFrame` when filter is set to `'none'`, saving 60 FPS idle CPU/GPU rendering. |
| **Particle Object Pool** | `ParticleFXCanvas.tsx` | Pre-allocated 100-particle array pool to reuse particle objects, eliminating 100% of particle allocations & GC pauses during expressions. |
| **Thrown Item Object Pool** | `ItemThrowerCanvas.tsx` | Pre-allocated 50-item array pool, eliminating object allocations on screen clicks. |
| **In-Place Frame Buffer Mutation** | `MotionRecorder.ts` | Mutates existing frame objects in-place during keyframe recording, eliminating up to 10,000 object allocations per recording. |
| **Stream Request Cancellation Tokens** | `FaceTracker.ts` | Prevents MediaStreamTrack leaks when camera or microphone devices are toggled rapidly in succession. |
| **AudioContext State Guarding** | `SFXEngine.ts`, `FaceTracker.ts` | Prevents creating un-garbage-collected `AudioContext` instances and reuses frequency array buffers. |

---

## 🔍 Memory Leak Diagnostic Guidelines

### 1. Checking DOM Element Retainments
If SVG elements are added or removed (e.g. changing custom avatars), ensure no JavaScript objects hold direct references to detached DOM nodes.
- **Good Pattern**:
  ```ts
  const transformCache = new WeakMap<SVGElement, { tx: string; origin: string }>();
  ```
  `WeakMap` keys hold weak references to DOM nodes, allowing V8 to garbage collect detached SVG elements automatically.

### 2. Guarding `requestAnimationFrame` Loops
- Always store animation frame IDs in `useRef` or local closures (`animId = requestAnimationFrame(render)`).
- Ensure the cleanup function of `useEffect` cancels the frame:
  ```ts
  return () => {
    if (animIdRef.current !== null) {
      cancelAnimationFrame(animIdRef.current);
      animIdRef.current = null;
    }
  };
  ```

### 3. Object Allocation Zero-Tolerance in 60 FPS Loops
- Avoid instantiating new objects (`{ ... }`), arrays (`[ ... ]`), or closures inside 60 FPS rendering functions.
- Reuse persistent class buffers (`this.playbackBuffer`, `this.audioDataArray`) or pre-allocated pool arrays (`particlePoolRef.current`).
