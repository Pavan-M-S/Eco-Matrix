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
// ----- NAV SCROLL SHADOW -----
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
