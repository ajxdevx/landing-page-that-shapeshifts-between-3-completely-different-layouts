# Landing Page That Shapeshifts Between 3 Completely Different Layouts

An interactive landing page by **anassjid** — author **AJ**.

Scattered desk objects animate between three distinct layouts with [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/): chaotic clutter, a clean grid, and a notebook-style arrangement. Built with React and Vite.

## Layouts

| Mode | Description |
|------|-------------|
| **Chaos** | Objects scattered at playful angles across the desk |
| **Cleanup** | Neat, aligned grid — everything in its place |
| **Notebook** | Clustered, journal-like composition |

Use the three buttons at the bottom of the page to switch modes.

## Tech stack

- React 19
- Vite
- GSAP + Flip plugin
- React Router

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |

## Project structure

```
src/
  components/CreativeClutter.jsx   # Main landing page UI
  hooks/useDeskLayout.js           # GSAP Flip layout logic
  data/creativeClutter.js          # Layout positions & item data
  pages/HomePage.jsx
  styles/index.css
public/                            # Desk item images
```

## Credits

- **Author:** AJ
- **Studio:** anassjid
