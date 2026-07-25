# 🔒 Security Policy

SVG-TUBER takes security seriously. We appreciate your efforts to responsibly disclose vulnerabilities.

---

## 🛡️ Supported Versions

| Version | Supported |
|---|---|
| 4.x.x | ✅ Supported |
| < 4.0 | ❌ End of Life |

---

## 📩 Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you believe you have discovered a security vulnerability in SVG-TUBER, please report it privately:

- **Email**: Send detailed vulnerability reports to `security@svg-tuber.org`.
- **Response Time**: We acknowledge receipt of vulnerability reports within 48 hours and aim to release a patch within 7 business days.

### Please Include:
- A description of the vulnerability and potential impact.
- Step-by-step instructions or proof-of-concept script to reproduce the issue.
- Affected component(s) (e.g. MediaPipe loading, IPC channels in Electron, AudioContext).

---

## 🔒 Electron & IPC Security Model

SVG-TUBER enforces strict security defaults in Electron desktop mode:
- `contextIsolation: true`
- `nodeIntegration: false`
- `webSecurity: false` (restricted to loading local MediaPipe WASM binaries)
- Preload script exposes explicitly sanitized IPC bridges (`setIgnoreMouseEvents`).
