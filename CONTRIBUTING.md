# 🤝 Contributing to SVG-TUBER

First off, thank you for considering contributing to SVG-TUBER! It's open-source projects like this that make the VTubing and creator community amazing.

This document outlines the guidelines and best practices for contributing to the project.

---

## 📜 Table of Contents
- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#-development-setup)
- [Coding Guidelines](#-coding-guidelines)
  - [Zero-Allocation Rule for 60 FPS Loops](#zero-allocation-rule-for-60-fps-loops)
  - [TypeScript & Styling](#typescript--styling)
- [Commit Message Format](#-commit-message-format)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by the [SVG-TUBER Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 💡 How Can I Contribute?

### Reporting Bugs
Before creating a bug report, please check existing GitHub issues to make sure it hasn't already been reported.

When creating a bug report, please include:
- **Use a clear title** describing the issue.
- **Environment details**: Operating System, Node.js version, Browser/Electron version, Camera/Mic model.
- **Steps to reproduce**: Clear, step-by-step instructions.
- **Expected vs Actual behavior**.
- **Console error logs & tracebacks**.

### Suggesting Features
Feature requests are always welcome! Please open an issue using the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md) and describe:
- The problem your feature solves or the user experience it enhances.
- Suggested implementation or API design.
- Alternative solutions considered.

### Submitting Pull Requests
1. Fork the repository and create your feature branch from `main`:
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
2. Make your changes and run verification commands:
   ```bash
   npm run build
   npx tsc --noEmit
   ```
3. Ensure your code adheres to zero-allocation memory guidelines.
4. Commit your changes using conventional commit messages.
5. Push to your branch and open a Pull Request!

---

## 💻 Development Setup

```bash
# 1. Clone your fork
git clone https://github.com/cardsorting/SVG-TUBER.git
cd SVG-TUBER

# 2. Install dependencies
npm install

# 3. Start development server (Vite Web mode)
npm run dev

# 4. Start Electron desktop development mode
npm run electron:dev
```

---

## 📏 Coding Guidelines

### Zero-Allocation Rule for 60 FPS Loops
To maintain 60 FPS performance without garbage collection pauses:
- **No object/array instantiations in frame loops**: Never create `{ ... }` or `[ ... ]` inside functions called by `requestAnimationFrame`.
- **Use object pools**: Use pre-allocated object pools for particles, items, and temporary buffers.
- **Use `WeakMap` for DOM metadata**: Never attach custom JS properties directly onto DOM elements.

### TypeScript & Styling
- Enable strict type checks in TypeScript.
- Follow Tailwind CSS v4 utility patterns or Vanilla CSS variables for glassmorphic dark mode styling.

---

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add webcam device selection dropdown`
- `fix: resolve MediaStreamTrack leak on camera toggle`
- `perf: decouple rAF animation loop from React config state`
- `docs: update rigging guide with SVG layer tag table`
- `refactor: optimize spring physics loop math`

---

Thank you for building the future of open-source VTubing with us! 🚀
