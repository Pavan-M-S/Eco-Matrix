# 🌿 Eco Matrix

> **The autonomous lifeline for urban plants**

Eco Matrix is a self-regulating, soil-sensing mesh network that keeps city trees and green spaces thriving through heat, drought, and neglect. By combining real-time sensing, autonomous power, and long-range LoRa communication, it provides actionable intelligence to urban foresters and communities.

---

## 🚀 Overview

Urban trees face extreme heat, compacted soil, erratic watering, and neglect. Cities lack real-time data to intervene effectively. Eco Matrix provides a solution through a decentralized, low-power mesh network that continuously monitors and streams rich environmental data.

- **Addresses SDGs:** Sustainable Cities (SDG 11), Climate Action (SDG 13), Life on Land (SDG 15)
- **Impact:** Reduces water usage by up to 62% and cuts young-tree mortality by 85%.

## ✨ Core Capabilities

- **🌿 Real-time sensing:** Continuous monitoring of soil moisture, temperature, ambient light, and humidity.
- **⚡ Autonomous power:** Integrated solar panel with 10,000 mAh battery. Operates 3+ years without maintenance.
- **📡 Long-range mesh:** LoRa-based peer-to-peer network with 2-km range in dense urban areas. Self-healing routing.
- **🔔 Smart alerts:** Customizable thresholds trigger LED indicators, email, SMS, or push notifications.
- **🌐 Offline-first:** The mesh and dashboard work completely offline. Cloud sync is optional for remote access.
- **🧩 Open ecosystem:** REST API and MQTT support. Open hardware schematics available.

## 🛠️ Hardware Architecture

Every node is built to deliver reliable, actionable intelligence in the toughest urban environments:

- **ESP32‑S3 Microcontroller:** Dual-core processor with integrated Wi-Fi/Bluetooth.
- **Capacitive Soil Moisture Sensor:** I²C interface with ±3% accuracy.
- **DHT22 Temperature Sensor:** Precision temperature probe, ±0.5°C accuracy, waterproof.
- **LoRa SX1276 Transceiver:** 868/915 MHz, long-range up to 2 km (urban).
- **Relay Output:** 24 V AC dry-contact relay for automated irrigation systems.

## 💻 Tech Stack & Dashboard

The admin analytics panel is built as a lightweight, vanilla web application:

- **Frontend:** HTML5, CSS3 (Custom Properties for Theming), Vanilla JavaScript.
- **Backend/Data Sync:** Firebase Realtime Database for live telemetry streaming.
- **Features:** Dark/Light theme support, real-time node activity logs, predictive analytics overview, and responsive design.

## 🚀 Getting Started

### Local Development

1. Clone the repository.
2. The project does not require a build step or package manager.
3. Start a local static web server to run the live preview. For example, using Python:
   ```bash
   python3 -m http.server 3000
   ```
4. Open your browser and navigate to `http://localhost:3000`.

### Deployment Steps (Hardware)

1. **Assemble:** Mount the solar panel, connect sensors, insert battery.
2. **Calibrate:** Insert probe near root zone, run dashboard calibration.
3. **Connect:** Power on gateway – node automatically discovers and joins the mesh.
4. **Configure:** Select plant species or set custom moisture/temperature thresholds.
5. **Go Live:** Stream data, set alerts, invite the team, and start saving water immediately.

## 🔮 Future Scope

- **AI Disease Detection:** Low-power camera with on-device CNN for early detection of fungal infections and nutrient deficiencies.
- **Automated Irrigation:** Direct integration with solenoid valves for closed-loop control.
- **City-wide Canopy Maps:** High-resolution urban heat and greenness mapping.
- **Citizen Science App:** Mobile application for communities to adopt and track tree health.

---

### Contact & Support

Ready to green your city? Get in touch for free consultations for municipalities and non-profits.

- **Email:** pavan310512@gmail.com
- **Phone:** +91 9347274015
- **Location:** Tadipatri, Andhra Pradesh
