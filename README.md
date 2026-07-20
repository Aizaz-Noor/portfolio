# Aizaz Noor - Portfolio

A high-performance, interactive 3D portfolio site built with React and Three.js. It features a 3D particle tunnel that reacts to scroll position, creating depth behind the page content, and sleek glassmorphic UI components optimized for 60fps interaction.

## Key Features

- **DevHQ Aesthetic:** Premium dark mode UI with glassmorphic elements, refined typography, and subtle micro-animations.
- **Scroll-Driven Camera:** The camera's Z-axis position updates seamlessly based on the window scroll offset.
- **Particle System:** Displays 4,000 glowing points using `Float32Array` and `BufferGeometry` for maximum WebGL performance.
- **DOM Overlays:** Standard HTML elements layer over the WebGL canvas using CSS z-index, ensuring accessibility and perfect font rendering.
- **Custom GitHub Heatmap:** Real-time GitHub contribution graph with an injected SVG filter for a 3D recessed appearance.
- **Native-style UI:** The navigation bar uses an expanding pill design that mimics macOS interfaces.
- **3D Tilt Cards:** Interactive project and experience cards with smooth 3D tilting and glowing conic-gradient borders.

## Tech Stack

- **Language**: JavaScript (ES6+)
- **Framework**: React 19
- **Build Tool**: Vite
- **3D Rendering**: Three.js
- **Declarative WebGL**: React Three Fiber (`@react-three/fiber`)
- **3D Helpers**: Drei (`@react-three/drei`)
- **Post-Processing**: React Postprocessing (`@react-three/postprocessing`)
- **Styling**: Vanilla CSS with customized variable theming
- **Icons**: Lucide React & React Icons
- **Deployment**: Vercel

## Prerequisites

- Node.js 18 or higher
- npm or pnpm (npm is used by default)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aizaz-Noor/portfolio.git
cd portfolio
```

### 2. Install JavaScript Dependencies

```bash
npm install
```

### 3. Environment Setup

This project currently relies strictly on client-side rendering and does not require any environment variables (`.env`) for the core aesthetic and 3D features to function locally. 

### 4. Database Setup

This is a static portfolio application and does not require a database connection. All data (Projects, Experience, Certifications) is managed locally via React state or static arrays within the components.

### 5. Start Development Server

Using Vite's blazing fast hot-module replacement (HMR):

```bash
# Start the Vite dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Architecture

### Directory Structure

```
├── public/                 # Static assets (images, favicons)
├── src/
│   ├── components/         # Reusable UI & 3D components
│   │   ├── Background3D.jsx# WebGL Canvas wrapper
│   │   ├── CustomCursor.jsx# Mouse-following aesthetic cursor
│   │   ├── ParticleTunnel.jsx# 3D points geometry & animation
│   │   ├── TiltCard.jsx    # 3D interactive hover cards
│   │   ├── Navbar.jsx      # macOS-style navigation
│   │   ├── Loader.jsx      # Loading state animations
│   │   ├── Preloader.jsx   # Initial site loading screen
│   │   ├── Reveal.jsx      # Scroll reveal animations
│   │   ├── ScrollProgress.jsx # Reading progress indicator
│   │   └── ...
│   ├── pages/              # Content sections
│   │   ├── Hero.jsx        # Landing page content
│   │   ├── About.jsx       # Personal information
│   │   ├── Projects.jsx    # Portfolio projects showcase
│   │   ├── Experience.jsx  # Work history
│   │   ├── Certifications.jsx # Earned certificates
│   │   ├── TechStack.jsx   # Skills and technologies
│   │   ├── Profiles.jsx    # Social and developer links
│   │   └── Contact.jsx     # Contact form and details
│   ├── hooks/              # Custom React hooks
│   ├── App.jsx             # Main routing & layout structure
│   ├── main.jsx            # React root & strict mode
│   └── index.css           # Global CSS variables & styling
├── .gitignore
├── eslint.config.js        # ESLint configuration
├── index.html              # Vite entry HTML
├── package.json            # Project dependencies & scripts
└── vite.config.js          # Vite bundler configuration
```

### Request Lifecycle

1. The browser requests `index.html`.
2. Vite serves the application and loads `src/main.jsx`.
3. `main.jsx` mounts the `<App />` component inside React's StrictMode.
4. The layout is split into two primary layers:
   - **WebGL Layer (`<Background3D />`)**: Renders the `<ParticleTunnel />` which listens to window scroll events to update camera depth.
   - **DOM Layer**: Contains HTML sections (`<Hero />`, `<Projects />`, etc.) overlaying the WebGL canvas using relative positioning and z-indexes.
5. User interactions (scroll, mousemove) trigger state updates or refs (via `useFrame` in R3F) to animate 3D components independently from React's render cycle for optimal performance.

### Data Flow

```
User Scroll Action → Window Event Listener → Three.js Camera Z-Axis
User Hover Action → TiltCard onMouseMove/onMouseLeave → CSS Transforms & R3F hooks
```

### Key Components

**WebGL Background (`src/components/ParticleTunnel.jsx`)**
- Creates a `BufferGeometry` mapped with a `Float32Array` of 4000 positions.
- Leverages `useFrame` to continuously rotate the tunnel array frame-by-frame on the Z-axis.
- Modifies `state.camera.position.z` based on the window's vertical scroll (`window.scrollY`), providing the illusion of travelling through the tunnel as the user scrolls.

**Interactive UI (`src/components/TiltCard.jsx`)**
- Pure DOM-based 3D illusion without canvas overhead.
- Uses mouse event bounding-box calculations to determine tilt degrees (e.g., `rotateX` and `rotateY`).
- Animated glowing borders via CSS pseudo-elements (`::after`) with `conic-gradient` that rotates continuously.

## Environment Variables

No environment variables are required to run this application.

## Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build the app for production into the `dist/` directory |
| `npm run preview` | Serve the production build locally to test before deployment |
| `npm run lint` | Run ESLint to check for code quality and syntax errors |

## Testing

There is currently no automated test suite configured for this project. To verify functionality:
1. Run `npm run lint` to ensure there are no syntax or style errors.
2. Run `npm run build` to verify the application bundles correctly.
3. Serve the bundle using `npm run preview` and manually test the interactive 3D elements in the browser.

## Deployment

### Vercel (Recommended)

This project is perfectly optimized for Vercel deployment without any configuration changes.

1. Create a [Vercel](https://vercel.com/) account and connect your GitHub.
2. Import the `portfolio` repository.
3. Vercel will automatically detect Vite.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

### Netlify

1. Connect your repository to Netlify.
2. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Static/VPS Deployment

```bash
# Pull the latest code
git pull origin main

# Install dependencies
npm install

# Build the project
npm run build

# The resulting `dist/` folder can now be served by any static web server (Nginx, Apache, Caddy).
```

## Troubleshooting

### WebGL Context Errors

**Error:** `WebGL context lost` or poor performance.

**Solution:** 
1. Ensure your browser has hardware acceleration enabled. 
2. The particle tunnel uses 4,000 points which should easily run at 60fps on modern devices, but might struggle if software rendering is forced.

### Dependency Install Failures

**Error:** `ERESOLVE unable to resolve dependency tree`

**Solution:**
```bash
# Force install or use legacy peer dependencies
npm install --legacy-peer-deps
```

### 3D Interactions Stuttering

**Error:** The particle tunnel or TiltCards feel laggy.

**Solution:**
1. Ensure no unnecessary React re-renders are triggered on scroll. 
2. The camera scroll event must modify a `ref` or `state.camera` inside `useFrame`, not trigger an overarching React state update that re-renders DOM nodes. This has already been optimized in `TiltCard.jsx` and `ParticleTunnel.jsx`.

### Vite/React Issues

**Error:** `Vite - Build failed`

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall JS dependencies
rm -rf node_modules && npm install
```
