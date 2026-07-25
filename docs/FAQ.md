# ❓ Frequently Asked Questions (FAQ)

---

### Q1: Why is my camera preview not loading?
**A**: Ensure that:
1. Your webcam is connected and not being exclusively locked by another app (e.g. Zoom, OBS Virtual Camera, Discord).
2. Camera permissions are allowed in your operating system settings.
3. If MediaPipe GPU fails to initialize, SVG-TUBER automatically falls back to CPU mode. Check browser console logs for any WASM download blocks.

---

### Q2: How do I remove the background completely for streaming in OBS?
**A**: 
1. In the Studio Control Dashboard, select **Background Mode** -> `Transparent`.
2. Use **OBS Browser Source Mode** by pointing OBS to `http://localhost:5173/#obs`. This renders pure transparent background without chromakey borders.

---

### Q3: How do I pass mouse clicks to my games while VTubing?
**A**: 
1. Click the **Mouse Click-Through** button in the top right of the Studio Dashboard.
2. Alternatively, press global hotkey `Ctrl + Shift + T` anywhere on Windows to toggle mouse click-through mode on/off instantly.

---

### Q4: Does SVG-TUBER use high CPU or GPU resources?
**A**: No! SVG-TUBER is specifically engineered with:
- Zero-allocation pre-allocated object pools.
- `WeakMap` DOM element transform caching.
- Halted 60 FPS animation loops when shaders are inactive.
- Micro-second LERP smoothing.
CPU usage typically remains below 1-3% on modern processors.

---

### Q5: Can I create and sell custom SVG avatars for SVG-TUBER?
**A**: Yes! Under the MIT License, you are free to create, export, share, or sell custom `.svg` avatar definitions for SVG-TUBER. Use the in-app **Rigging Studio** to inspect and map SVG layer tags.
