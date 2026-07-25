# 🛠️ Comprehensive Troubleshooting & Diagnostic Matrix

This guide provides solutions for common runtime, display, audio, permissions, and performance issues encountered in SVG-TUBER.

---

## 📜 Error & Issue Matrix

| Category | Problem Symptom | Root Cause | Solution |
|---|---|---|---|
| **Camera** | `Camera API is not supported in this browser context` | Non-HTTPS origin or restricted iframe permission. | Ensure hosting on `https://` or `localhost`. Add `allow="camera; microphone"` to iframe tags. |
| **Camera** | Camera stays black or throws `NotAllowedError` | OS permission denied or another app locking camera. | Close Zoom/Discord/OBS Virtual Cam. Check Windows Privacy -> Camera permissions. |
| **MediaPipe** | `GPU face landmarker fallback to CPU` warning in console | WebGL context lost or GPU delegate unsupported. | Harmless warning. SVG-TUBER automatically initializes CPU fallback mode seamlessly. |
| **Audio** | Microphone volume stays at 0 / Mouth doesn't move | AudioContext suspended or mic threshold too high. | Lower `micThreshold` in Control Dashboard or interact with window to unlock AudioContext autoplay policies. |
| **OBS** | Black border or white box behind avatar in OBS | Window Capture set without alpha channel support. | Use `OBS Browser Source` pointing to `http://localhost:5173/#obs` OR set Window Capture mode to `Windows 10 Graphics Capture` with `Allow Transparency` checked. |
| **Electron** | Clicks don't pass to background games | Click-Through mode disabled or OS window focus lost. | Press `Ctrl + Shift + T` or enable Click-Through in the top right dashboard header. |
| **Performance** | Stuttering on 144Hz / 240Hz gaming monitors | VSync mismatch with browser rAF scheduling. | Chrome/Edge hardware acceleration mismatch. Enable Hardware Acceleration in browser settings. |

---

## 🔍 Detailed Diagnostic Steps

### 1. Diagnosing MediaPipe WASM Loading Failures
If MediaPipe fails to load:
1. Open browser Developer Tools (`F12`).
2. Go to the **Network** tab and filter by `wasm`.
3. Verify that `@mediapipe/tasks-vision` WASM assets are successfully fetching from `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm`.
4. If working offline in an isolated environment, self-host the `.wasm` and `.task` files locally inside `public/wasm/`.

---

## 🔊 Fixing Web Audio Latency

If voice formant mouth morphing feels delayed:
1. Open **Control Dashboard**.
2. Increase **Mic Sensitivity** (range: 1 - 10, default: 5).
3. Decrease **Mic Threshold** (default: `0.04`).
4. Set **Smoothing** LERP factor to `0.35` for faster mouth response.

---

## 🪟 Windows 11 Desktop Transparency Setup

If running in Electron mode and transparency shows a solid black background:
1. Verify `frame: false` and `transparent: true` are set in `electron/main.js`.
2. Ensure Windows GPU settings are configured with High Performance for Electron binaries (`svg-tuber.exe`).
