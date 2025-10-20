<!--
README for the project "BharatOS".
This README is intended to be friendly for contributors, maintainers, and users.
--> 

<div align="center">
  <h1>BharatOS</h1>
  <p><em>A lightweight, web-based desktop environment built with React, TypeScript and Vite</em></p>

  [![Repo stars](https://img.shields.io/github/stars/RajdeepKushwaha5/BharatOS?style=social)](https://github.com/RajdeepKushwaha5/BharatOS/stargazers)
  [![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)
  [![vite](https://img.shields.io/badge/bundler-vite-blue.svg)](https://vitejs.dev/)
  [![typescript](https://img.shields.io/badge/lang-TypeScript-blueviolet.svg)](https://www.typescriptlang.org/)
</div>

<img width="1919" height="973" alt="image" src="https://github.com/user-attachments/assets/72c98b51-be71-4cec-bada-bcda48cf76a7" />

## 📖 Overview

BharatOS is a small, extensible web-based desktop environment that runs entirely in the browser. It emulates core desktop metaphors — desktop icons, draggable/resizable windows, a taskbar, start menu, and several small demo applications (text editor, terminal, paint, media player, file manager, and a small game).

This project is aimed at developers learning UI systems, component design, and client-side application architecture. It can also be used as a starting point for building richer web-desktop experiences.

## 🚀 Features

- 🖥 Desktop UI with icons, windows and taskbar
- 🔧 Multiple demo apps in `apps/` (Text Editor, Terminal, File Manager, Paint, Video player, TileMatch game)
- 🧭 Window management: drag, resize, minimize/maximize
- 🖱 Context menu and Start menu
- 📁 Static asset handling via `public/` (wallpapers served from `public/wallpapers/`)
- ⚡ Fast dev experience with Vite and TypeScript

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite (dev server & build)
- uuid (unique id generation)

## ⚙️ Quick Start — Installation

Prerequisites
- Node.js (LTS recommended — Node 18/20)
- npm (or yarn/pnpm)

Clone and run locally:

```pwsh
git clone https://github.com/RajdeepKushwaha5/BharatOS.git
cd BharatOS

# install dependencies
npm install

# start dev server
npm run dev
```

Open the URL that Vite prints (usually http://localhost:5173).

Build for production:

```pwsh
npm run build
npm run preview
```

## 🔧 Configuration

Environment variables (optional)
- If any features require API keys, create a `.env.local` and add them there. Vite only exposes variables prefixed with `VITE_` to the client.

Example `.env.local`:

```
# VITE_GEMINI_API_KEY=your_gemini_api_key
```

Wallpaper / static assets
- Place wallpapers in `public/wallpapers/`.
- Files in `public/` are served at the server root (e.g. `public/wallpapers/max.jpg` => `/wallpapers/max.jpg`).
- The app's default wallpaper is referenced in `App.tsx` (variable `wallpaperUrl`).

## 🧭 Project Structure

```
.
├─ apps/                  # Demo applications (TextEditor, Terminal, FileManager, etc.)
├─ components/            # UI building blocks (Desktop, Taskbar, Window, Icon, ContextMenu)
│  └─ __tests__/          # component tests
├─ context/               # React context providers (SystemContext)
├─ hooks/                 # custom hooks (useDraggable, useResizable)
├─ public/                # static files (images, wallpapers)
├─ index.html
├─ index.tsx
├─ App.tsx                # top-level app (background, layout)
├─ package.json
└─ tsconfig.json
```

## ✅ Tests

There are test examples under `components/__tests__`. Recommended test stack for Vite projects:

- Vitest + @testing-library/react + @testing-library/jest-dom

Quick setup:

```pwsh
npm i -D vitest @testing-library/react @testing-library/jest-dom
```

Add script to `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

Run tests:

```pwsh
npm run test
```

## 🧰 Linting & Formatting (Recommended)

Add ESLint + Prettier for consistent code style and better DX. Example packages:

```pwsh
npm i -D eslint prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
```

Add `lint` and `format` scripts and basic config files (`.eslintrc`, `.prettierrc`).

## 🤝 Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and add tests
4. Run lint/typecheck/build/tests locally
5. Open a PR with a clear description and screenshots if applicable

Please follow these guidelines:
- Keep PRs focused and small
- Add unit tests for new features
- Run `npm run build` and fix TypeScript errors

If you want, I can add a `CONTRIBUTING.md` and GitHub template files.

## 🧾 License

This project is currently unlicensed in the repository — add a `LICENSE` file if you want to open-source it. A common choice is MIT:

```
MIT License
Copyright (c) YEAR Your Name
```

## 📫 Contact

Maintainer: Rajdeep Kushwaha

- GitHub: https://github.com/RajdeepKushwaha5

---



