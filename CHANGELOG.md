# 📜 Changelog

All notable changes to the **SVG-TUBER** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.1.0] - 2026-07-25

### 🚀 Added
- **36 Built-in Preset SVG Avatars**: Expanded avatar suite from 4 to 36 rich vector presets across Sci-Fi, Fantasy, Anime & Cute, and Monsters categories (*Cyber Ninja*, *Magical Star Girl*, *Nordic Berserker*, *Jellyfish Siren*, *Lich Skeleton*, *Mecha Bunny*, *Plague Doctor*, *Butterfly Fairy*, *Ember Dragon*, etc.).
- **Paginated Avatar Gallery & Category Filters**: Built a paginated control gallery with real-time genre category pills (`All`, `Sci-Fi`, `Fantasy`, `Anime & Cute`, `Monsters`), live vector thumbnail showcase strip, 2x2 grid/list view toggle, and smart windowed pagination with ellipsis (`1  2  3  ...  9`).
- **Multi-Mode Lip Sync Engine**: Added 1-click Lip Sync Mode selection in Studio Dashboard:
  - **Phoneme Mode**: Real-time audio formant visemes + spectral flux syllable onset tracking.
  - **PNGTuber Mode**: Dual-harmonic 3.8 Hz syllable flapping wave with talking posture baseline.
  - **Continuous Mode**: Continuous scaling and position morphing.
- **Adaptive Resting Lips Calibration & Sensitivity Slider**: Added real-time resting lips baseline zero-point calibration and customizable mouth sensitivity slider (`0.5x` to `2.5x`).
- **60 FPS Opacity Cross-Fade Dissolve**: Replaced binary display popping with smooth CSS opacity cross-fade dissolve (`transition: opacity 0.07s ease-in-out`) between vector mouth layers.
- **Organic Facial Coupling**: Added subtle vertical jaw drop translation and eyebrow flex sync during speech.

---

## [4.0.0] - 2026-07-25

### 🚀 Added
- **Hybrid AI Face & Gaze Tracking**: Upgraded to MediaPipe 478-landmark `FaceLandmarker` with automatic GPU/CPU delegate fallback.
- **Custom SVG Rigging Studio**: Added in-app interactive vector inspector and ID tag mapper for custom SVG avatars.
- **Zero-Allocation Object Pools**: Implemented particle object pooling (`ParticleFXCanvas`) and thrown item object pooling (`ItemThrowerCanvas`).
- **Formant Audio Viseme Engine**: Microphone FFT spectrum analysis mapping voice audio to mouth shapes (`A`, `E`, `I`, `O`, `U`, `M`).
- **Web Audio SFX Engine**: Procedural synthesizers for happy chimes, anger rumbles, zaps, water drops, and star sweeps.
- **Cyber Post-Processing Shaders**: CRT Scanlines, VHS Tape Glitch, Cyber Bloom Glow, and Retro Pixel Grid canvas overlays.
- **Motion Pose Keyframe Recorder**: O(1) in-place array buffer motion keyframe recorder and looping engine.
- **OBS Overlay View (`#obs`)**: Specialized transparent route for OBS Studio Browser Sources.
- **Global Click-Through Hotkey**: `Ctrl+Shift+T` global hotkey support in Electron main process.

### ⚡ Optimized
- **rAF Loop Decoupling**: Decoupled `requestAnimationFrame` animation loops from React state/config object references in `SVGPuppetRenderer` and `AvatarPropsOverlay`.
- **WeakMap DOM Transform Caching**: Replaced DOM object mutations with `WeakMap<SVGElement, CacheEntry>` to prevent V8 DOM wrapper memory retention.
- **Idle Shader Suspension**: Suspended 60 FPS rAF loop execution when post-processing filter is set to `'none'`.
- **Stream Cancellation Tokens**: Added async request sequence IDs to prevent MediaStreamTrack leaks when toggling cameras/microphones rapidly.

### 🐛 Fixed
- Fixed mouse listener detachment bug when reusing `FaceTracker` instances across React remounts.
- Fixed `AudioContext` closed state exceptions during rapid Web Audio instantiation.
- Fixed redundant sub-pixel string allocation jitter in SVG CSS transform generation.

---

## [3.0.0] - 2026-05-10
- Initial release of vector SVG puppet renderer with basic spring physics and mouse tracking.
