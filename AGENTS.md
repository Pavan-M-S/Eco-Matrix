# 🤖 AGENTS.md — Development & Contribution Guidelines for AI Agents

Welcome, AI Agent! This file outlines key architectural decisions, development practices, code standards, and conventions to follow when inspecting, modifying, or extending the **Eco-Matrix** codebase.

---

## 🧭 Project Essence & Guiding Philosophy

- **Domain:** IoT-driven Autonomous Urban Forestry & Environmental Intelligence.
- **Frontend Core:** Vanilla web stack (HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript).
- **Backend / Realtime Core:** Firebase Realtime Database.
- **Design Aesthetic:** Elegant, nature-inspired modern tech palette (deep moss greens, clay/earth tones, seafoam accents, soft parchment, Fraunces serif typography). Both dark and light themes must be respected.

---

## 🏛️ Code Architecture & Standards

### 1. HTML (`index.html`)
- **Semantic Structure:** Maintain clean semantics (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`).
- **IDs & Anchors:** Interactive widgets and sections use explicit, kebab-case or camelCase IDs (e.g., `moistureLevel`, `connectionStatus`, `tabNav`). Keep them intact as JavaScript queries them directly.
- **Accessibility:** Keep aria-labels, semantic buttons, and accessible form inputs updated.

### 2. Styling (`style.css`)
- **Vanilla CSS Exclusively:** Do **not** inject Tailwind or heavy CSS utility libraries unless explicitly requested by the user.
- **CSS Custom Properties (Variables):**
  - Theme colors are declared under `:root` and `[data-theme="light"]`.
  - Always utilize design tokens (e.g., `var(--bg-primary)`, `var(--text-primary)`, `var(--seafoam)`, `var(--moss-800)`).
- **Responsive Layouts:**
  - Build fluid grids and flex containers.
  - Breakpoint conventions: `max-width: 900px` for tablets/mobile navigation and `max-width: 600px` for compact mobile screens.
- **Motion & Transitions:**
  - Use subtle transitions (`cubic-bezier(0.16, 1, 0.3, 1)` or standard ease).
  - Respect `prefers-reduced-motion` where appropriate.

### 3. JavaScript (`script.js`, `detector.js`, `tracker.js`)
- **Modular Vanilla JS:** Write clean, readable ES6+ JavaScript without unnecessary bundler dependencies.
- **DOM Queries:** Cache references or query safely with null-checks before attaching event listeners.
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
3. Style inside [style.css](file:///run/media/pavan/New%20Volume/PAVAN/Main/VS%20Code%20Projects%20ubuntu/Websites/Eco-Matrix/style.css) using theme variables.
4. Include any reveal selectors in `script.js`'s `revealElements` NodeList.

---

## 🔍 Validation Checklist

Before concluding your task, verify:
- [ ] No broken HTML tags or missing matching brackets.
- [ ] CSS variables are utilized rather than hardcoded hex colors where theme adaptivity is required.
- [ ] No unhandled JavaScript runtime exceptions when Firebase or network requests are offline.
- [ ] Mobile viewports (`<= 900px`) remain functional and clean.
