# 🛠️ SVG-TUBER Developer Environment & Profiling Guide

This guide covers local development practices, debugging tools, Vite HMR, Chrome Memory Profiler heap snapshot audits, and Electron IPC debugging.

---

## 📜 Table of Contents
- [Local Setup & Workflow](#local-setup--workflow)
- [Zero-Allocation Memory Profiling](#zero-allocation-memory-profiling)
- [React DevTools & rAF Loop Auditing](#react-devtools--raf-loop-auditing)
- [Electron IPC Debugging](#electron-ipc-debugging)

---

## 💻 Local Setup & Workflow

### 1. Requirements
- Node.js `v18.0.0+`
- npm `v9.0.0+`
- Chrome / Edge browser with WebGL hardware acceleration enabled.

### 2. Available NPM Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start Vite HMR web development server (`http://localhost:5173`) |
| `npm run build` | Run TypeScript typecheck (`tsc`) and compile Vite production bundle |
| `npm run electron:dev` | Start concurrent Vite server + Electron desktop app |
| `npm run electron:build` | Package Electron desktop executable |
| `npx tsc --noEmit` | Validate strict TypeScript compilation without outputting JavaScript |

---

## 🔬 Zero-Allocation Memory Profiling

SVG-TUBER guarantees 60 FPS performance by enforcing zero-allocation pre-allocated pools during animation rendering loops.

### Inspecting Heap Snapshots in Chrome DevTools:
1. Launch SVG-TUBER (`npm run dev`).
2. Open Chrome Developer Tools (`F12` or `Ctrl+Shift+I`).
3. Navigate to the **Memory** tab.
4. Select **Allocation instrumentation on timeline** and click **Start**.
5. Move your head, trigger expressions, throw items, and move mouse cursor for 30 seconds.
6. Click **Stop recording**.
7. **Expected Benchmark**: The timeline graph should show flat zero blue spikes during idle/active motion, confirming zero heap allocations per frame!

---

## ⚛️ React DevTools & rAF Loop Auditing

### Auditing `requestAnimationFrame` Loop Frequency:
To verify that `SVGPuppetRenderer` does NOT restart its animation loop when sliders move:
1. Open DevTools -> **Performance** tab.
2. Click **Record** and drag sliders in the Control Dashboard.
3. Stop recording and examine the **Main** thread flame graph.
4. Verify that `renderFrame` runs once per 16.6ms frame tick without long tasks or GC sweeps.

---

## 🪟 Electron IPC Debugging

When testing desktop transparent window click-through:
- Open Electron DevTools in `electron/main.js`:
  ```javascript
  mainWindow.webContents.openDevTools({ mode: 'detach' });
  ```
- Verify IPC events emitted over `ipcMain.on('set-ignore-mouse-events')`.
