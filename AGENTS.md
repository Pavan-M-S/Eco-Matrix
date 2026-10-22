# 🤖 AGENTS.md — Development & Contribution Guidelines for AI Agents

Welcome, AI Agent! This file outlines key architectural decisions, development practices, code standards, and conventions to follow when inspecting, modifying, or extending the **Eco-Matrix** codebase.

---

## 🧭 Project Essence & Guiding Philosophy

- **Domain:** IoT-driven Autonomous Urban Forestry & Environmental Intelligence.
- **Frontend Core:** Vanilla web stack (HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript).
- **Backend / Realtime Core:** Firebase Realtime Database.
- **Design Aesthetic:** Elegant, nature-inspired modern tech palette (deep moss greens, clay/earth tones, seafoam accents, soft parchment, Fraunces serif typography). Both dark and light themes must be respected across all UI components, custom cursors, and background simulations.

---

## 🏛️ Code Architecture & Standards

### 1. HTML (`index.html`)
- **Semantic Structure:** Maintain clean semantics (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`).
- **IDs & Anchors:** Interactive widgets and sections use explicit, kebab-case or camelCase IDs (e.g., `moistureLevel`, `connectionStatus`, `tabNav`, `ecoBgCanvas`, `ecoCursorDot`, `ecoCursorRing`). Keep them intact as JavaScript queries them directly.
- **Accessibility & Decorative Elements:** Decorative visual features (such as `#ecoBgCanvas`, `#ecoCursorDot`, `#ecoCursorRing`) must always carry `aria-hidden="true"`.
- **Form Inputs:** Keep aria-labels, semantic buttons, and accessible form inputs updated.

### 2. Styling (`style.css`)
- **Vanilla CSS Exclusively:** Do **not** inject Tailwind or heavy CSS utility libraries unless explicitly requested by the user.
- **CSS Custom Properties (Variables):**
  - Theme colors are declared under `:root` and `[data-theme="light"]`.
  - Always utilize design tokens (e.g., `var(--bg-primary)`, `var(--text-primary)`, `var(--seafoam)`, `var(--moss-800)`).
- **Stacking Context & Layering:**
  - The live interactive canvas (`#ecoBgCanvas`) is placed at `position: fixed; top: 0; left: 0; z-index: 0; pointer-events: none;`.
  - Page content sections (`section, .hero, .stats-strip, footer`) must have `position: relative; z-index: 1;`.
  - Fixed navigation (`nav`) resides at `z-index: 100;`.
  - Custom cursor components (`.eco-cursor-dot`, `.eco-cursor-ring`, `.eco-cursor-ripple`) reside in the uppermost layer (`z-index: 999997` to `999999`) and **must always** specify `pointer-events: none;`.
- **Responsive Layouts:**
  - Build fluid grids and flex containers.
  - Breakpoint conventions: `max-width: 900px` for tablets/mobile navigation and `max-width: 600px` for compact mobile screens.
- **Motion & Transitions:**
  - Use subtle transitions (`cubic-bezier(0.16, 1, 0.3, 1)` or standard ease).
  - Respect `prefers-reduced-motion` across animations, follower lerp speeds, and particle physics.

### 3. JavaScript (`script.js`, `detector.js`, `tracker.js`)
- **Modular Vanilla JS:** Write clean, readable ES6+ JavaScript organized into self-contained sections or IIFEs to prevent global namespace pollution.
- **DOM Queries:** Cache references or query safely with null-checks before attaching event listeners.
- **Custom Cursor Implementation:**
  - Only initialize on fine-pointer devices: test `window.matchMedia('(hover: hover) and (pointer: fine)').matches`.
  - Never hide the native cursor on touchscreens or mobile viewports.
  - Dot updates immediately on `mousemove` (0ms lag); the follower ring uses linear interpolation (`lerp`) inside `requestAnimationFrame`.
  - Event delegation on `document` must be used for hover states (`INTERACTIVE_SELECTORS` and `TEXT_INPUT_SELECTORS`) so dynamically rendered content is automatically supported.
  - Morph cursor into a slender vertical I-beam on text inputs (`input[type="text"]`, `input[type="email"]`, `textarea`).
  - Transient ripple elements created on `mousedown` must be removed from the DOM via `setTimeout` after animation ends.
- **Interactive Live Background ("Eco-Mesh"):**
  - Uses HTML5 Canvas 2D with capped device pixel ratio (`Math.min(window.devicePixelRatio || 1, 2)`).
  - Particle density dynamically scales based on viewport width (e.g., 24 on mobile, 38 on tablet, 62 on desktop).
  - Listens to `data-theme` changes via `MutationObserver` to transition particle and connection line colors without re-instantiating the simulation.
  - Must pause `requestAnimationFrame` on `document.visibilityState === 'hidden'` to preserve client CPU and battery life.
- **Firebase Listeners:**
  - When attaching listeners (`.on('value')`), handle empty snapshots or network disconnection gracefully (`snapshot.val() || {}`).
  - Keep fallback values (e.g., displaying `'nil'` or `'offline'`) consistent across UI components when data is missing.
- **Device & Visitor Tracking:**
  - `detector.js` exposes `getCompleteBrowserInfo()` to inspect browser/OS details without external libraries.
  - `tracker.js` coordinates analytics via `CONFIG` overrides (`window.TRACKER_CONFIG`). Do not log sensitive user data or break fallback execution paths.

---

## 🛠️ Safe Modification Rules for Agents

1. **Preserve Existing Comments & Docstrings:** Do not strip comments or headers when making targeted edits.
2. **Minimal Invasiveness:**
   - Prefer surgical changes over sweeping refactors.
   - Use `replace_file_content` or `multi_replace_file_content` for precise line edits.
3. **Local Development Simplicity:**
   - The application does not require a complex build or bundling step.
   - Any static file server (`python -m http.server`, `npx serve`, or Live Server) is sufficient to test changes.
4. **Credential Security:**
   - Do not commit production secret keys or write private tokens directly into public documentation or logs.

---

## 📋 Common Agent Tasks & Workflows

### Adding a New Dashboard Metric
1. Add the display element into `<div class="dash-body">` in [index.html](file:///run/media/pavan/New%20Volume/PAVAN/Main/VS%20Code%20Projects%20ubuntu/Websites/Eco-Matrix/index.html) with a distinct ID.
2. Reference the element in [script.js](file:///run/media/pavan/New%20Volume/PAVAN/Main/VS%20Code%20Projects%20ubuntu/Websites/Eco-Matrix/script.js) under the dashboard section.
3. Bind the new property within `database.ref('ecomatrix/data').on('value')` listener.
4. Provide standard fallback handling (`formatValue(...)`).

### Adding a Section or Component
1. Place the new `<section id="my-section">` with class `section-alt` or dedicated wrapper in [index.html](file:///run/media/pavan/New%20Volume/PAVAN/Main/VS%20Code%20Projects%20ubuntu/Websites/Eco-Matrix/index.html).
2. Add navigation anchor links to `#my-section` in the `<nav>` menu.
3. Style inside [style.css](file:///run/media/pavan/New%20Volume/PAVAN/Main/VS%20Code%20Projects%20ubuntu/Websites/Eco-Matrix/style.css) using theme variables. If an alternate background is used, leverage `backdrop-filter: blur(8px)` to maintain the live mesh depth.
4. Include any reveal selectors in `script.js`'s `revealElements` NodeList.

### Extending Interactive Elements for the Custom Cursor
1. Interactive triggers are defined in `INTERACTIVE_SELECTORS` in [script.js](file:///run/media/pavan/New%20Volume/PAVAN/Main/VS%20Code%20Projects%20ubuntu/Websites/Eco-Matrix/script.js).
2. If adding a new custom clickable component (e.g. `.custom-card-trigger`), add its selector to `INTERACTIVE_SELECTORS`.
3. If adding a custom text field, add its selector to `TEXT_INPUT_SELECTORS`.

---

## 🔍 Validation Checklist

Before concluding your task, verify:
- [ ] No broken HTML tags or missing matching brackets.
- [ ] CSS variables are utilized rather than hardcoded hex colors where theme adaptivity is required.
- [ ] Custom cursor has `pointer-events: none` and does not obstruct clicks or text selection.
- [ ] Mobile/touch devices are unaffected by custom cursor (`@media (hover: hover) and (pointer: fine)`).
- [ ] Background canvas pauses when the browser tab is hidden (`document.hidden`).
- [ ] Both Dark and Light themes render properly with legible text and coordinated particle palettes.
- [ ] No unhandled JavaScript runtime exceptions when Firebase or network requests are offline.
- [ ] Mobile viewports (`<= 900px`) remain functional and clean.
