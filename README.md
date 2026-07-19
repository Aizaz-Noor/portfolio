# Aizaz Noor - Portfolio

A portfolio site built with React and Three.js. It features a 3D particle tunnel that reacts to scroll position, providing depth behind the page content.

**Live Demo:** [https://portfolio-seven-opal-48.vercel.app/](https://portfolio-seven-opal-48.vercel.app/)

## Tech Stack

- **Framework:** React 19 + Vite
- **3D Rendering:** Three.js
- **Declarative WebGL:** React Three Fiber
- **Helpers:** Drei
- **Styling:** Vanilla CSS 

## Features

- **DevHQ Aesthetic:** Premium dark mode UI with glassmorphic elements, refined typography, and subtle micro-animations.
- **Scroll-Driven Camera:** The camera's Z-axis position updates based on the window scroll offset.
- **Particle System:** Displays 4,000 points using `Float32Array` and `BufferGeometry` for 60fps performance.
- **DOM Overlays:** Standard HTML elements layer over the WebGL canvas using CSS z-index. This keeps text accessible and avoids WebGL font rendering issues.
- **Custom GitHub Heatmap:** Real-time GitHub contribution graph with an injected SVG filter for a 3D recessed appearance.
- **Native-style UI:** The navigation bar uses an expanding pill design that mimics macOS interfaces.

## Local Development

### Requirements
- Node.js (v18+)
- npm or pnpm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Aizaz-Noor/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173`.

## Deployment

The repository is set up for Vercel. Pushing to the `main` branch runs `npm run build` and deploys the `dist` folder.

## License

MIT
