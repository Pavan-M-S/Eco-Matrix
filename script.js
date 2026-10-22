// ============================================================
// FIREBASE CONFIGURATION – EcoMatrix
// ============================================================
const firebaseConfig = {
    apiKey: "AIzaSyC2qST8vZoIdGsFi0BzG30hjlvGyhk09QA",
    authDomain: "water-dispenser-df505.firebaseapp.com",
    databaseURL: "https://water-dispenser-df505-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "water-dispenser-df505",
    storageBucket: "water-dispenser-df505.firebasestorage.app",
    messagingSenderId: "1055301805602",
    appId: "1:1055301805602:web:88aeecb0a41fd264be0c7b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ============================================================
// REAL-TIME FIREBASE CONNECTION STATUS
// ============================================================
const connectionDot = document.getElementById('connectionDot');
const connectionStatus = document.getElementById('connectionStatus');

const connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snap) => {
    const isConnected = snap.val() === true;
    if (isConnected) {
        connectionDot.style.background = 'var(--seafoam)';
        connectionDot.style.animation = 'blink 1.5s infinite';
        connectionStatus.textContent = 'CONNECTED';
        connectionStatus.style.color = 'var(--seafoam)';
    } else {
        connectionDot.style.background = 'var(--red)';
        connectionDot.style.animation = 'none';
        connectionStatus.textContent = 'DISCONNECTED';
        connectionStatus.style.color = 'var(--red)';
    }
});

// ----- THEME TOGGLE -----
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('ecomatrix-theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ecomatrix-theme', next);
});

// ----- MOBILE NAV -----
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ----- MOBILE DROPDOWN TOGGLE -----
document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            const parent = this.closest('.dropdown');
            parent.classList.toggle('open');
        }
    });
});
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 900) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        }
    }
});

// ----- ABSTRACT TABS -----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = {
    problems: document.getElementById('panel-problems'),
    advantages: document.getElementById('panel-advantages'),
    impact: document.getElementById('panel-impact'),
    audience: document.getElementById('panel-audience'),
};
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        Object.keys(tabPanels).forEach(key => {
            tabPanels[key].classList.toggle('active', key === btn.dataset.tab);
        });
    });
});

// ----- FAQ ACCORDION -----
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        if (wasOpen) {
            item.classList.remove('open');
        } else {
            item.classList.add('open');
        }
    });
});

// ============================================================
// 1. DASHBOARD METRICS – read from firebase/data
// ============================================================
const moistureEl = document.getElementById('moistureLevel');
const tempEl = document.getElementById('tempLevel');
const healthEl = document.getElementById('healthScore');
const waterSavedEl = document.getElementById('waterSaved');
const alertCountEl = document.getElementById('alertCount');
const ecoScoreEl = document.getElementById('ecoScore');
const moistureBar = document.getElementById('moistureBar');
const tempBar = document.getElementById('tempBar');
const healthBar = document.getElementById('healthBar');

function formatValue(value, unit) {
    if (value === null || value === undefined || value === 0) {
        return 'nil';
    }
    return value + (unit || '');
}

const dataRef = database.ref('ecomatrix/data');
dataRef.on('value', (snapshot) => {
    const data = snapshot.val() || {};

    // Soil Moisture (%)
    const moisture = data.moisture;
    if (moisture !== null && moisture !== undefined && moisture !== 0) {
        moistureEl.textContent = moisture + '%';
        moistureBar.style.width = Math.min(moisture, 100).toFixed(1) + '%';
    } else {
        moistureEl.textContent = 'nil';
        moistureBar.style.width = '0%';
    }

    // Temperature (°C)
    const temp = data.temperature;
    if (temp !== null && temp !== undefined && temp !== 0) {
        tempEl.textContent = temp + '°C';
        tempBar.style.width = Math.min((temp / 50) * 100, 100).toFixed(1) + '%';
    } else {
        tempEl.textContent = 'nil';
        tempBar.style.width = '0%';
    }

    // Network Health (%)
    const health = data.health;
    if (health !== null && health !== undefined && health !== 0) {
        healthEl.textContent = health + '%';
        healthBar.style.width = Math.min(health, 100).toFixed(1) + '%';
    } else {
        healthEl.textContent = 'nil';
        healthBar.style.width = '0%';
    }

    // Total Water Saved (L)
    const saved = data.waterSaved;
    waterSavedEl.textContent = formatValue(saved, ' L');

    // Active Alerts (count)
    const alerts = data.alerts;
    if (alerts !== null && alerts !== undefined && alerts !== 0) {
        alertCountEl.textContent = alerts;
        alertCountEl.className = 'dash-panel-val ' + (alerts > 3 ? 'danger' : 'amber');
    } else {
        alertCountEl.textContent = 'nil';
        alertCountEl.className = 'dash-panel-val seafoam';
    }

    // Ecosystem Score (%)
    const score = data.ecoScore;
    if (score !== null && score !== undefined && score !== 0) {
        ecoScoreEl.textContent = score + '%';
    } else {
        ecoScoreEl.textContent = 'nil';
    }

}, (error) => {
    console.warn('Dashboard read error:', error);
    moistureEl.textContent = 'offline';
    tempEl.textContent = 'offline';
    healthEl.textContent = 'offline';
    waterSavedEl.textContent = 'offline';
    alertCountEl.textContent = 'offline';
    ecoScoreEl.textContent = 'offline';
});

// ============================================================
// 2. NODES & ACTIVITY LOG – read from firebase/nodes and /transactions
// ============================================================
let nodeMap = {};
let transactions = [];
const activityBody = document.getElementById('activityBody');

// Load nodes map (nodeId -> node details)
const nodesRef = database.ref('ecomatrix/nodes');
nodesRef.on('value', (snapshot) => {
    const nodesData = snapshot.val() || {};
    nodeMap = {};
    Object.keys(nodesData).forEach(key => {
        const node = nodesData[key];
        if (node && node.nodeId) {
            nodeMap[node.nodeId] = {
                name: node.name || 'Unknown Node',
                location: node.location || 'Unknown'
            };
        }
    });
    console.log('✅ Node map loaded:', Object.keys(nodeMap).length, 'nodes');
    renderActivity();
}, (error) => {
    console.warn('Error loading nodes:', error);
});

// Load transactions (latest 10)
const transactionsRef = database.ref('ecomatrix/transactions');
transactionsRef.limitToLast(10).on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) {
        transactions = [];
        renderActivity();
        return;
    }
    const newList = Object.values(data).map(entry => {
        if (!entry.timestamp) {
            entry.timestamp = Date.now();
        }
        return entry;
    });
    newList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    transactions = newList.slice(0, 5);
    renderActivity();
}, (error) => {
    console.warn('Error loading transactions:', error);
    activityBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--red);">Error loading activity</td></tr>`;
});

function renderActivity() {
    if (!activityBody) return;

    if (transactions.length === 0) {
        activityBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No activity logged</td></tr>`;
        return;
    }

    let html = '';
    transactions.forEach(entry => {
        const nodeId = entry.nodeId || '';
        const node = nodeMap[nodeId] || null;
        const location = node ? node.location : 'Unknown';
        const moisture = entry.moisture || 0;
        const temp = entry.temperature || 0;
        const battery = entry.battery || 0;
        const status = entry.status || 'Unknown';

        let badgeClass, badgeText;
        if (status === 'Healthy' || status === 'OK') {
            badgeClass = 'badge-green';
            badgeText = '✓ Healthy';
        } else if (status === 'Stress' || status === 'Warning') {
            badgeClass = 'badge-amber';
            badgeText = '⚠ Stress';
        } else if (status === 'Critical' || status === 'Error') {
            badgeClass = 'badge-red';
            badgeText = '✗ Critical';
        } else {
            badgeClass = 'badge-amber';
            badgeText = '⚠ ' + status;
        }

        html += `<tr>
            <td style="color:var(--aqua)">${nodeId}</td>
            <td>${location}</td>
            <td>${moisture}%</td>
            <td>${temp}°C</td>
            <td>${battery}%</td>
            <td><span class="badge ${badgeClass}">${badgeText}</span></td>
        </tr>`;
    });

    activityBody.innerHTML = html;
}

transactionsRef.limitToLast(1).on('child_added', (snapshot) => {
    const newEntry = snapshot.val();
    if (!newEntry) return;
    if (!newEntry.timestamp) newEntry.timestamp = Date.now();
    const exists = transactions.some(t => t.timestamp === newEntry.timestamp && t.nodeId === newEntry.nodeId);
    if (!exists) {
        transactions.unshift(newEntry);
        if (transactions.length > 5) transactions.pop();
        renderActivity();
    }
});

// ============================================================
// 3. SCROLL REVEAL
// ============================================================
const revealElements = document.querySelectorAll(
    '.component-card, .feature-card, .future-card, .impact-metric, .data-card, ' +
    '.control-card, .faq-item, .section-title, .section-sub, ' +
    '.section-eyebrow, .stats-strip .stat-item, .contact-info, .contact-form, ' +
    '.dashboard-shell, .cta-section h2, .cta-section p, .cta-section .btn-primary, .cta-section .btn-secondary'
);
revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    const delay = Math.min(index % 6 + 1, 6);
    el.classList.add(`delay-${delay}`);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

document.querySelectorAll('section').forEach(section => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
            }
        });
    }, { threshold: 0.1 });
    sectionObserver.observe(section);
});

window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
});

// ============================================================
// 4. CONTACT FORM SUBMISSION → FIREBASE (ecomatrix)
//    KEY = formattedTimestamp string
// ============================================================
const contactForm = document.getElementById('contactForm');

function formatTimestamp() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const sec = pad(now.getSeconds());
    const min = pad(now.getMinutes());
    const hrs = pad(now.getHours());
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    return `${sec}${min}${hrs}${day}${month}${year}`;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const org = document.getElementById('contactOrg').value.trim() || 'N/A';
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    const now = Date.now();
    const formatted = formatTimestamp(); // e.g., "27561903072026"

    const responsesRef = database.ref('responses/ecomatrix');

    // ✅ KEY = formattedTimestamp string
    responsesRef.child(formatted).set({
        name: name,
        email: email,
        organization: org,
        message: message,
        formattedTimestamp: formatted
    }).then(() => {
        alert('✅ Thank you for reaching out! We\'ll respond within 24 hours.');
        contactForm.reset();
    }).catch((error) => {
        console.error('Error sending message:', error);
        alert('❌ Something went wrong. Please try again later.');
    });
});

console.log('Eco Matrix loaded · theme:', currentTheme);

// ============================================================
// 5. THEMED INTERACTIVE LIVE BACKGROUND (ECO-MESH SIMULATION)
// ============================================================
(function initEcoLiveBackground() {
    const canvas = document.getElementById('ecoBgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = null;
    let particles = [];
    let shockwaves = [];
    let lastTime = performance.now();

    const mouse = {
        x: -1000,
        y: -1000,
        active: false,
        lastMoved: 0
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive particle count based on screen size
    function getParticleCount() {
        const w = window.innerWidth;
        if (w < 600) return 24;
        if (w < 1024) return 38;
        return 62;
    }

    // Dynamic color palettes matching active theme
    function getThemePalette() {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
            return {
                nodeColors: [
                    'rgba(22, 101, 52, ',   // Deep forest green
                    'rgba(74, 115, 68, ',   // Sage green
                    'rgba(184, 106, 61, ',  // Earth clay
                    'rgba(34, 197, 94, '    // Vivid leaf
                ],
                lineColor: 'rgba(45, 74, 58, ',
                mouseLineColor: 'rgba(22, 101, 52, ',
                lineMaxAlpha: 0.12,
                mouseLineMaxAlpha: 0.28,
                shockwaveColor: 'rgba(22, 101, 52, '
            };
        } else {
            return {
                nodeColors: [
                    'rgba(74, 222, 128, ',  // Seafoam / Emerald
                    'rgba(169, 199, 153, ', // Sage bright
                    'rgba(219, 162, 118, ', // Clay / Warm earth
                    'rgba(52, 211, 153, '   // Bioluminescent green
                ],
                lineColor: 'rgba(139, 168, 126, ',
                mouseLineColor: 'rgba(74, 222, 128, ',
                lineMaxAlpha: 0.16,
                mouseLineMaxAlpha: 0.38,
                shockwaveColor: 'rgba(74, 222, 128, '
            };
        }
    }

    let palette = getThemePalette();

    // Listen to theme changes smoothly
    const themeObserver = new MutationObserver(() => {
        palette = getThemePalette();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    class Particle {
        constructor() {
            this.init(true);
        }

        init(randomizePosition = false) {
            this.x = randomizePosition ? Math.random() * width : (Math.random() < 0.5 ? 0 : width);
            this.y = randomizePosition ? Math.random() * height : Math.random() * height;
            
            const speed = prefersReducedMotion ? 0.08 : (0.2 + Math.random() * 0.4);
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;

            this.baseRadius = 1.6 + Math.random() * 2.0;
            this.radius = this.baseRadius;
            this.pulseSpeed = 0.015 + Math.random() * 0.02;
            this.pulsePhase = Math.random() * Math.PI * 2;

            this.isSpore = Math.random() < 0.22;
            this.swayAmp = 0.3 + Math.random() * 0.5;
            this.swaySpeed = 0.01 + Math.random() * 0.015;
            this.swayPhase = Math.random() * Math.PI * 2;

            const r = Math.random();
            this.colorIdx = r < 0.45 ? 0 : (r < 0.75 ? 1 : (r < 0.9 ? 2 : 3));
            this.alpha = 0.35 + Math.random() * 0.45;
        }

        update(time, delta) {
            // Gentle sinusoidal sway for organic spores
            if (this.isSpore && !prefersReducedMotion) {
                this.x += Math.sin(time * this.swaySpeed + this.swayPhase) * this.swayAmp;
            }

            this.x += this.vx * delta;
            this.y += this.vy * delta;

            // Screen wrap around with gentle boundary padding
            const pad = 24;
            if (this.x < -pad) this.x = width + pad;
            else if (this.x > width + pad) this.x = -pad;
            if (this.y < -pad) this.y = height + pad;
            else if (this.y > height + pad) this.y = -pad;

            // Gentle breathing pulse
            if (!prefersReducedMotion) {
                this.radius = this.baseRadius + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.4;
            }

            // Mouse proximity interaction (soft elastic parting)
            if (mouse.active) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 75 && dist > 1) {
                    const push = (1 - dist / 75) * 0.9;
                    this.x += (dx / dist) * push;
                    this.y += (dy / dist) * push;
                }
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.max(0.8, this.radius), 0, Math.PI * 2);
            ctx.fillStyle = palette.nodeColors[this.colorIdx] + this.alpha + ')';
            ctx.fill();
        }
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        const targetCount = getParticleCount();
        while (particles.length < targetCount) {
            particles.push(new Particle());
        }
        if (particles.length > targetCount) {
            particles.length = targetCount;
        }
    }

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 100);
    });

    // Track mouse coordinates & active status
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        mouse.lastMoved = performance.now();
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    // Radial bio-shockwave on click
    window.addEventListener('click', (e) => {
        if (shockwaves.length < 5) {
            shockwaves.push({
                x: e.clientX,
                y: e.clientY,
                radius: 4,
                maxRadius: 180,
                speed: 4.5,
                alpha: 0.55
            });
        }
    });

    // Main animation loop
    function animate(time) {
        animationId = requestAnimationFrame(animate);

        const delta = Math.min((time - lastTime) / 16.666, 2.5);
        lastTime = time;

        // Auto-sleep mouse interaction if idle for 3.5s
        if (mouse.active && (time - mouse.lastMoved > 3500)) {
            mouse.active = false;
        }

        ctx.clearRect(0, 0, width, height);

        // Update shockwaves
        for (let i = shockwaves.length - 1; i >= 0; i--) {
            const sw = shockwaves[i];
            sw.radius += sw.speed * delta;
            sw.alpha *= 0.96;

            if (sw.radius >= sw.maxRadius || sw.alpha < 0.02) {
                shockwaves.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = palette.shockwaveColor + sw.alpha + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Push particles with expanding shockwave
            for (let j = 0; j < particles.length; j++) {
                const p = particles[j];
                const dx = p.x - sw.x;
                const dy = p.y - sw.y;
                const d = Math.hypot(dx, dy);
                if (Math.abs(d - sw.radius) < 25 && d > 1) {
                    const force = (1 - Math.abs(d - sw.radius) / 25) * 1.5;
                    p.x += (dx / d) * force;
                    p.y += (dy / d) * force;
                }
            }
        }

        // Draw mesh connections between nearby particles (LoRa mesh network)
        const connectDist = 130;
        const count = particles.length;
        for (let i = 0; i < count; i++) {
            const p1 = particles[i];
            p1.update(time, delta);
            p1.draw(ctx);

            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.hypot(dx, dy);

                if (dist < connectDist) {
                    const alpha = (1 - dist / connectDist) * palette.lineMaxAlpha;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = palette.lineColor + alpha + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Draw radiant connection to active mouse cursor
            if (mouse.active) {
                const mdx = p1.x - mouse.x;
                const mdy = p1.y - mouse.y;
                const mdist = Math.hypot(mdx, mdy);
                const mouseConnectDist = 160;
                if (mdist < mouseConnectDist) {
                    const mAlpha = (1 - mdist / mouseConnectDist) * palette.mouseLineMaxAlpha;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = palette.mouseLineColor + mAlpha + ')';
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        }
    }

    // Save CPU/Battery by pausing animation when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            lastTime = performance.now();
            if (!animationId) {
                animationId = requestAnimationFrame(animate);
            }
        }
    });

    resize();
    animationId = requestAnimationFrame(animate);
})();

// ============================================================
// 6. CUSTOM GREEN THEMED CURSOR
// ============================================================
(function initEcoCustomCursor() {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return; // Retain native touch interactions on touchscreens

    const cursorDot = document.getElementById('ecoCursorDot');
    const cursorRing = document.getElementById('ecoCursorRing');
    if (!cursorDot || !cursorRing) return;

    // Enable custom cursor styles on fine-pointer devices
    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let rafId = null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lerpFactor = prefersReducedMotion ? 1 : 0.18;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
            ringX = mouseX;
            ringY = mouseY;
        }

        // Instant dot positioning for zero latency
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        isVisible = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

    // Smooth follower physics for the outer ring
    function updateFollower() {
        if (isVisible) {
            ringX += (mouseX - ringX) * lerpFactor;
            ringY += (mouseY - ringY) * lerpFactor;
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        }
        rafId = requestAnimationFrame(updateFollower);
    }
    rafId = requestAnimationFrame(updateFollower);

    // Interactive element hover detection via event delegation
    const INTERACTIVE_SELECTORS = 'a, button, input[type="submit"], input[type="button"], .btn-primary, .btn-secondary, .theme-toggle, .tab-btn, .dropdown > a, .faq-question, [role="button"], .nav-hamburger, .nav-cta, .dash-panel, .specimen';
    const TEXT_INPUT_SELECTORS = 'input[type="text"], input[type="email"], textarea';

    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (!target) return;

        if (target.closest(TEXT_INPUT_SELECTORS)) {
            cursorRing.classList.add('cursor-text');
            cursorDot.classList.add('cursor-text');
            cursorRing.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        } else if (target.closest(INTERACTIVE_SELECTORS)) {
            cursorRing.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
            cursorRing.classList.remove('cursor-text');
            cursorDot.classList.remove('cursor-text');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (!target) return;

        if (target.closest(TEXT_INPUT_SELECTORS)) {
            cursorRing.classList.remove('cursor-text');
            cursorDot.classList.remove('cursor-text');
        }
        if (target.closest(INTERACTIVE_SELECTORS)) {
            cursorRing.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        }
    });

    // Mousedown / Click Ripple effect
    document.addEventListener('mousedown', (e) => {
        cursorRing.classList.add('cursor-click');

        // Create momentary ripple element
        const ripple = document.createElement('div');
        ripple.className = 'eco-cursor-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 550);
    });

    document.addEventListener('mouseup', () => {
        cursorRing.classList.remove('cursor-click');
    });
})();