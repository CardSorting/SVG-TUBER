# 🔌 SVG-TUBER Integration & Embedding Guide

This guide explains how to integrate SVG-TUBER as an embedded component, web widget, or standalone VTubing engine within external React, Next.js, Vue, or vanilla JavaScript web applications, as well as controlling it via WebSockets for live stream bots.

---

## 📜 Table of Contents
- [React / Next.js Component Embedding](#-react--nextjs-component-embedding)
- [Vanilla JavaScript & HTML IFrame Integration](#-vanilla-javascript--html-iframe-integration)
- [WebSocket & Stream Bot Automation](#-websocket--stream-bot-automation)
- [Custom Motion & Expression Trigger API](#-custom-motion--expression-trigger-api)

---

## ⚛️ React / Next.js Component Embedding

You can embed `<SVGPuppetRenderer />` directly inside your own React or Next.js application.

```tsx
import React, { useRef, useEffect } from 'react';
import { SVGPuppetRenderer } from './components/SVGPuppetRenderer';
import { FaceTracker } from './engine/FaceTracker';
import { PhysicsEngine } from './engine/PhysicsEngine';
import { BUILTIN_AVATARS } from './avatars';

export const EmbeddedVTuber: React.FC = () => {
  const trackerRef = useRef(new FaceTracker());
  const physicsRef = useRef(new PhysicsEngine());
  const trackingDataRef = useRef(trackerRef.current.currentData);

  const [config, setConfig] = React.useState({
    trackingMode: 'hybrid',
    scale: 1.0,
    activeExpression: 'neutral',
    // ... complete EngineConfig object
  });

  useEffect(() => {
    const tracker = trackerRef.current;
    const physics = physicsRef.current;

    async function start() {
      await tracker.initMediaPipe();
      await tracker.startCamera();
      await tracker.startMicrophone();

      tracker.onUpdate((raw) => {
        trackingDataRef.current = physics.update(raw, BUILTIN_AVATARS[0].defaultConfig);
      });
    }

    start();

    return () => {
      tracker.stop();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <SVGPuppetRenderer
        puppet={BUILTIN_AVATARS[0]}
        trackingDataRef={trackingDataRef}
        physics={physicsRef.current}
        config={config}
      />
    </div>
  );
};
```

---

## 🌐 Vanilla JavaScript & HTML IFrame Integration

If hosting SVG-TUBER on a web server, embed it into any web application or broadcast tool using an `<iframe>` with cross-origin MediaPipe camera/microphone permissions enabled:

```html
<!-- Embedded Transparent OBS Overlay View -->
<iframe
  src="https://your-domain.com/#obs"
  width="1280"
  height="720"
  style="border: none; background: transparent;"
  allow="camera; microphone; autoplay; display-capture"
></iframe>
```

---

## 🤖 WebSocket & Stream Bot Automation

You can drive expressions, props, and pose keyframes programmatically over WebSockets from Twitch/YouTube chat bots (e.g. Node.js, Python, or Stream Deck plugins).

### Example: Node.js Twitch Chat Trigger Script

```javascript
import WebSocket from 'ws';
import { tmi } from 'tmi.js';

// Connect to Stream Bot Event Server
const client = new tmi.Client({
  channels: [ 'your_twitch_channel' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  const msg = message.toLowerCase();

  if (msg === '!blush') {
    triggerVTuberExpression('blush');
  } else if (msg === '!angry') {
    triggerVTuberExpression('angry');
  } else if (msg === '!boba') {
    triggerVTuberProp('boba');
  }
});

function triggerVTuberExpression(expr) {
  // Send postMessage to SVG-TUBER window or iframe
  window.postMessage({ type: 'SVG_TUBER_EXPRESSION', expression: expr }, '*');
}
```

---

## 🎯 Event Listener Bridge API

SVG-TUBER listens for browser `postMessage` events for cross-origin or iframe automation:

```javascript
// Send expression trigger to SVG-TUBER iframe
iframeWindow.postMessage({
  type: 'SET_EXPRESSION',
  payload: { expression: 'happy' }
}, '*');

// Send prop equip event
iframeWindow.postMessage({
  type: 'EQUIP_PROP',
  payload: { prop: 'glasses' }
}, '*');
```
