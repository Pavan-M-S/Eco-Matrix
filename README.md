# 🌿 Eco Matrix

> **The autonomous lifeline for urban plants.**  
> A self-regulating, soil-sensing IoT mesh network and live dashboard designed to monitor, protect, and sustain urban trees and green spaces against heat, drought, and neglect.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [Configuration & Firebase Setup](#-configuration--firebase-setup)
- [Telemetry & Analytics](#-telemetry--analytics)
- [Hardware & Field Deployment](#-hardware--field-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

Rapid urbanization and climate extremes subject city trees to severe environmental stress: compacted soil, irregular watering, heat islands, and neglect. In fact, up to 62% of young street trees perish within their first five years due to preventable water stress.

**Eco Matrix** addresses this crisis through:
1. **In-situ Soil & Microclimate Sensing:** Real-time data collection of soil moisture, ambient temperature, humidity, and sunlight.
2. **Autonomous Edge Mesh Nodes:** Solar-powered LoRa mesh nodes operating off-grid with intelligent power management.
3. **Live Web Control Center:** Responsive telemetry dashboard with real-time Firebase syncing, health scoring, and active alert systems.
4. **Community & Municipal Action:** Accessible data streams for urban arborists, municipal authorities, and community stewards.

---

## 🚀 Key Features

- **Real-Time Telemetry Dashboard:** Live monitoring of soil moisture, ambient temperature, overall network health index, water savings, and anomaly alerts.
- **Bi-directional Firebase Realtime Database Integration:** Dynamic live metric streaming, node state synchronization, and transaction activity logging.
- **Node Activity & Sensor Stream:** View individual sensor nodes with battery levels, readings, locations, and health statuses (`Healthy`, `Stress`, `Critical`).
- **Dark / Light Theme Toggle:** Adaptive theme support with persistent user preferences saved in `localStorage`.
- **Integrated Visitor Intelligence:** Built-in client and browser device detection (`detector.js`) and universal visitor telemetry logging (`tracker.js`).
- **Inquiry & Feedback Dispatch:** Interactive contact workflow logging inquiries directly to Firebase with timestamped identifiers.
- **Off-Grid & Resilient:** Tailored for decentralized LoRa peer-to-peer transmission, self-healing routing, and low-power hardware.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[IoT Edge Nodes / Sensors] -->|LoRa Mesh / ESP32 Gateway| B[(Firebase Realtime DB)]
    B -->|Real-time Synchronization| C[Eco Matrix Web Dashboard]
    C -->|User Interaction & Theme| D[Client UI]
    C -->|Feedback & Inquiry| B
    E[Client Browser & Device] -->|Telemetry & Device Insights| F[Visitor Tracker]
```

---

## 💻 Tech Stack

### Frontend & Interface
- **HTML5:** Semantic architecture, accessible forms, and SVG-based live specimen graphics.
- **CSS3:** Custom properties (CSS variables), responsive flexbox and grid layouts, theme variables (`dark`/`light`), glassmorphic panels, and keyframe animations.
- **Vanilla JavaScript (ES6+):** Pure client logic, event listeners, tabs, scroll-reveal Intersection Observers, and DOM rendering.
- **Typography & Icons:** Google Fonts (*Fraunces*, *Inter*, *Space Mono*) and Font Awesome 6.5.

### Cloud & Backend
- **Firebase Realtime Database:** High-speed real-time database managing node telemetry (`ecomatrix/data`), node mapping (`ecomatrix/nodes`), and event logs (`ecomatrix/transactions`).

---

## 📂 Repository Structure

```text
Eco-Matrix/
├── index.html          # Main application page, hero section, abstract, components & dashboard
├── style.css           # Design tokens, color palette, responsive breakpoints, animations & themes
├── script.js           # Core UI logic, Firebase Realtime Database listeners, interactions
├── detector.js         # Comprehensive client, device, browser, and OS detection engine
├── tracker.js          # Universal visitor analytics, geo-location fallbacks, telemetry logger
├── credentials.js      # Configuration and credentials reference
├── favicon.png         # Site favicon
├── icon.png            # Application logo / asset
├── README.md           # Project documentation and developer guide
└── AGENTS.md           # Instructions, conventions, and rules for AI agents and contributors
```

---

## ⚡ Getting Started

### Prerequisites

All you need is a modern web browser and any static file server or local development server.

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pavan-M-S/Eco-Matrix.git
   cd Eco-Matrix
   ```

2. **Serve the project:**
   You can serve the directory using any HTTP server:

   - **Using Python 3:**
     ```bash
     python3 -m http.server 8000
     ```
   - **Using Node `npx serve`:**
     ```bash
     npx serve .
     ```
   - **Using VS Code Live Server extension:**
     Right-click `index.html` and select **"Open with Live Server"**.

3. **Open the browser:**
   Navigate to `http://localhost:8000` (or the port specified by your server).

---

## ⚙️ Configuration & Firebase Setup

Firebase configuration is initialized inside `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Firebase Schema Structure

- **`ecomatrix/data`**:
  ```json
  {
    "moisture": 42.5,
    "temperature": 26.8,
    "health": 94,
    "waterSaved": 1280,
    "alerts": 0,
    "ecoScore": 88
  }
  ```
- **`ecomatrix/nodes`**:
  ```json
  {
    "node_01": {
      "nodeId": "EM-01",
      "name": "Central Park North",
      "location": "Zone 6b - Elm Grove"
    }
  }
  ```
- **`ecomatrix/transactions`**:
  ```json
  {
    "-OXYZ123": {
      "nodeId": "EM-01",
      "moisture": 38,
      "temperature": 27.2,
      "battery": 92,
      "status": "Healthy",
      "timestamp": 1729600000000
    }
  }
  ```

---

## 📊 Telemetry & Analytics

The client utilizes `detector.js` and `tracker.js` for analytics and device telemetry:
- Detects browser versions, operating systems, screen resolutions, and WebGL support.
- Configurable via `window.TRACKER_CONFIG` with EmailJS / Statcounter integration flags.

---

## 🛠️ Hardware & Field Deployment

Eco Matrix nodes are engineered around low-power IoT specifications:
- **Core Controller:** ESP32 / Nordic nRF52 series with ultra-low sleep modes.
- **Soil Probe:** Capacitive corrosion-resistant soil moisture probes.
- **Ambient Sensors:** Digital temperature, relative humidity, and light intensity (Lux) sensors.
- **Power Unit:** Mini solar cell array with MPPT charge regulator and 10,000 mAh Li-ion battery.
- **Mesh Connectivity:** 868 / 915 MHz LoRa transceiver with mesh routing protocols.

---

## 🤝 Contributing

Contributions, feedback, and issue reports are welcome!
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details (if applicable).
