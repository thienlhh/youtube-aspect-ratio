# Aspect Ratio Changer for YouTube™

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-blue?style=flat-square&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/aspect-ratio-changer-for/iliinafimaknnhelpmjaochndmjlolla)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-brightgreen.svg?style=flat-square)](wxt.config.ts)
[![WXT](https://img.shields.io/badge/Framework-WXT-purple.svg?style=flat-square)](https://wxt.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?style=flat-square)](tsconfig.json)
[![Build Status](https://img.shields.io/badge/Build-Passing-success.svg?style=flat-square)](package.json)

A lightweight, zero-dependency browser extension (Manifest V3) built with [WXT](https://wxt.dev) that allows you to easily adjust, zoom, and stretch video aspect ratios directly within the native YouTube player controls.

---

## 📥 Installation

Install directly from the official store:

👉 **[Download on Chrome Web Store](https://chromewebstore.google.com/detail/aspect-ratio-changer-for/iliinafimaknnhelpmjaochndmjlolla)**

---

## ✨ Features

- 🎯 **21 Calibrated Presets**: Easily adjust aspect ratio and zoom with direct scale controls:
  - **Original**: `Original (100%)` (Reset to native video aspect ratio).
  - **Horizontal Scales**: `Horizontal 70%`, `Horizontal 75%`, `Horizontal 85%`, `Horizontal 94%`, `Horizontal 107%`, `Horizontal 133%`, `Horizontal 142%`.
  - **Vertical Scales**: `Vertical 75%`, `Vertical 85%`, `Vertical 111%`, `Vertical 125%`, `Vertical 133%`, `Vertical 142%`.
  - **Proportional Zooms**: `Zoom 104%`, `Zoom 111%`, `Zoom 114%`, `Zoom 117%`, `Zoom 125%`, `Zoom 133%`, `Zoom 142%`.
- ⚡ **Seamless Player Integration**: Embedded directly inside YouTube's bottom control bar beside the Settings menu.
- 🎨 **Modern Frosted Dark Glass UI**: Semi-transparent blurred dropdown menu matching YouTube's native design aesthetics.
- ⌨️ **Keyboard Accessibility**: Full keyboard support (`Enter`, `Space`, `Escape`) and ARIA-compliant attributes.
- 🔒 **100% Private & Local**: Zero data collection, zero network requests, zero telemetry.
- 🚀 **Ultra-lightweight**: Built with TypeScript and WXT, compiled into a single optimized script (< 16 KB).

---

## 🛠️ Development & Building

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
git clone https://github.com/thienlhh/youtube-aspect-ratio.git
cd youtube-aspect-ratio
npm install
```

### Available Scripts
```bash
# Start development server with auto-reload and HMR
npm run dev

# Start development server for Firefox
npm run dev:firefox

# Build production bundle for Chrome (outputs to .output/chrome-mv3)
npm run build

# Build production bundle for Firefox (outputs to .output/firefox-mv2)
npm run build:firefox

# Package release zip for Chrome Web Store (outputs to .output/)
npm run zip

# Package release zip for Firefox Add-ons
npm run zip:firefox

# Run TypeScript type check
npm run type-check

# Run test suite with Vitest
npm test
```

---

## 📦 Loading Unpacked in Chrome (Local Testing)

1. Run `npm run build` (or `npm run dev`).
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked**.
5. Select the `.output/chrome-mv3` directory.
6. Open any [YouTube](https://www.youtube.com) video and enjoy full aspect ratio control!

---

## 🚀 Release & Store Publishing Automation

Automated CI/CD workflows run via GitHub Actions:
* **CI Quality Checks** on every pull request and push to `main` ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).
* **GitHub Releases & Chrome Web Store Publishing** triggered automatically on Git version tags (e.g. `v1.0.1`) ([`.github/workflows/release.yml`](.github/workflows/release.yml)).
* See [`.github/PUBLISHING.md`](.github/PUBLISHING.md) for full credentials setup and release instructions.

---

## 📄 Privacy & Permissions

Aspect Ratio Changer for YouTube™ strictly adheres to privacy-first principles:
* **No user data** is collected, stored, or transmitted off-device.
* Content script execution is strictly limited to `https://www.youtube.com/*` and `https://youtube.com/*`.
* See full details in [PRIVACY.md](PRIVACY.md).

---

## ⚖️ Trademark Disclaimer

YouTube is a trademark of Google LLC. This extension is an independent project and is not affiliated with, sponsored by, or endorsed by Google LLC or YouTube.

---

## 📜 License

Distributed under the [MIT License](LICENSE). Copyright © 2026 Thien Le.
