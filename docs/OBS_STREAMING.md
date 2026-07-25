# 🎥 OBS Studio Streaming & Transparent Overlay Guide

This guide details how to integrate SVG-TUBER ULTIMATE into **OBS Studio**, **Streamlabs**, or **PRISM Live Studio** for live VTubing streams.

---

## 📺 Method 1: OBS Browser Source (Recommended)

The cleanest way to embed SVG-TUBER into OBS without any window borders or titlebars.

### Setup Steps
1. Start SVG-TUBER development server or host it locally (`npm run dev`).
2. Open **OBS Studio**.
3. Under **Sources**, click `+` and select **Browser**.
4. Configure the Browser source settings:
   - **URL**: `http://localhost:5173/#obs` (The `#obs` hash activates full-screen transparent view mode).
   - **Width**: `1920`
   - **Height**: `1080`
   - **Custom CSS**: Leave default or clear all text.
   - Check **Shutdown source when not visible**.
5. Click **OK**. The transparent avatar overlay will now render directly over your game stream capture!

---

## 🪟 Method 2: Transparent Desktop App Window (Electron)

Use SVG-TUBER's transparent desktop application directly on top of your screen or games.

### Setup Steps
1. Launch SVG-TUBER in Electron desktop mode:
   ```bash
   npm run electron:dev
   ```
2. In the Control Dashboard under **Avatars / Background**, ensure **Background Mode** is set to `Transparent`.
3. In **OBS Studio**, add a **Window Capture** source.
4. Select `[main.js] SVG-TUBER ULTIMATE` as the target window.
5. In OBS source properties, select **Capture Method**: `Windows 10 / 11 Graphics Capture`.
6. Enable **Allow Transparency** checkbox in OBS source properties.

---

## 🟢 Method 3: Green / Blue Screen Chroma Key

If your capture software does not support native window alpha channel transparency:

1. Open the Control Dashboard in SVG-TUBER.
2. Under Background options, select **Green Screen** (`#00FF00`) or **Blue Screen** (`#0000FF`).
3. In OBS Studio, right-click your Game/Window capture source -> **Filters**.
4. Add a **Chroma Key** filter and set Key Color Type to `Green` or `Blue`.

---

## 🖱️ Global Mouse Click-Through Mode

When playing full-screen games, you can make the SVG-TUBER desktop window completely transparent to mouse clicks so your clicks pass directly to your game:

1. Click the **Mouse Click-Through** button in the Control Dashboard header.
2. Alternatively, press global hotkey `Ctrl + Shift + T` anywhere on your system to toggle click-through mode on or off instantly.
