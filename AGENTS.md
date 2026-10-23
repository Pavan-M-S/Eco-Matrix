# Eco Matrix: Agent Guide

## Stack and files

Eco Matrix is a single-page urban-plant IoT telemetry dashboard using HTML5, CSS3, and browser-native ES6 JavaScript. There is no package manager, bundler, TypeScript compiler, or automated test suite. Firebase Realtime Database, EmailJS, and analytics are CDN/browser integrations.

- `index.html`: page structure and decorative `#ecoBgCanvas` canvas.
- `style.css`: tokens, responsive UI, dark/light themes, custom cursor, and animation.
- `script.js`: Firebase listeners, dashboard UI, contact workflow, Eco-Mesh canvas, theme state, and cursor behavior.
- `credentials.js`: integration configuration; never add real secrets.
- `detector.js` / `tracker.js`: device and visitor telemetry; preserve public globals/load order.

## Critical constraints

- Preserve end-of-document script order: Firebase App → Firebase Database → `script.js` → EmailJS → `credentials.js` → `detector.js` → `tracker.js`.
- Keep database compatibility with `ecomatrix/data`, `ecomatrix/nodes`, and `ecomatrix/transactions` unless an explicit migration is in scope.
- Public Firebase client config does not replace secure database rules. Do not commit private keys or EmailJS secrets.
- Keep `#ecoBgCanvas` decorative, `aria-hidden`, and non-blocking. Retain DPR scaling, visibility pause/resume, resize handling, and bounded frame work.
- Preserve persisted theme behavior, mobile navigation, keyboard access, focus visibility, responsive layouts, and `prefers-reduced-motion`. The custom cursor must remain fine-pointer-only; touch uses native interaction.

## Run and validate

```bash
python3 -m http.server 8000
```

Use `http://localhost:8000`, not `file://`. For changes, smoke-test desktop/mobile navigation, theme switching, dashboard fallback/loading state, contact handling, canvas performance, and the browser console. Use the existing four-space vanilla HTML/CSS/JS style and keep IDs/classes/data attributes in sync with their consumers.
