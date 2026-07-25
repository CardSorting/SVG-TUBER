# ⌨️ Command-Line Interface (CLI) & Environment Scripts Reference

This document provides a detailed reference for all npm scripts, CLI flags, build commands, and environment variables in SVG-TUBER ULTIMATE.

---

## 📜 NPM Scripts Reference

All scripts are executed from the repository root:

```bash
npm run <script-name>
```

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Starts Vite local HMR development server (`http://localhost:5173`). |
| `build` | `tsc && vite build` | Runs strict TypeScript compiler check (`tsc`) and builds production bundle (`dist/`). |
| `preview` | `vite preview` | Boots a local production preview server for testing static assets. |
| `electron:dev` | `concurrently ...` | Launches Vite dev server and spawns transparent Electron desktop window concurrently. |
| `electron:build` | `npm run build && electron-builder` | Builds production web bundle and compiles standalone desktop executables (`.exe`, `.dmg`, `.AppImage`). |

---

## 🌐 Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `NODE_ENV` | `development` | Environment mode (`development` or `production`). |
| `PORT` | `5173` | Local HTTP port for Vite web server. |
| `WAIT_ON_CONCURRENTLY` | `true` | Tells Electron launcher script to wait until Vite port is open before creating browser window. |

---

## 🔧 Vite & Electron Config Files

- [`vite.config.ts`](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/vite.config.ts) – Vite build plugins, Tailwind CSS v4 integration, and asset bundling.
- [`tsconfig.json`](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/tsconfig.json) – Strict TypeScript compiler settings (`strict: true`, `target: ES2022`).
- [`electron/main.js`](file:///c:/Users/media/OneDrive/Desktop/SVG-TUBER/electron/main.js) – Electron main process window creation, global hotkeys, transparency flags, and IPC channel registrations.
