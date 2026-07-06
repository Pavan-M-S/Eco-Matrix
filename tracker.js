// ================================================================
//  UNIVERSAL VISITOR TRACKER – uses detector.js and credentials.js
//  Config from window.TRACKER_CONFIG
//  Location via freegeoip.app (primary) + ip-api.com (fallback)
// ================================================================

// ---------- DEFAULTS ----------
const DEFAULT_CONFIG = {
    project: 'ecomatrix',
    sendEmail: false,          // 👈 Add this line – set to false to disable emails
    emailjsPublicKey: 'Lm0xRXQfM_1D_Ixjg',
    emailjsServiceId: 'service_4ijc7zv',
    emailjsTemplateId: 'template_ywkznzc',
    receiverEmail: 'pavan310512@gmail.com',
    statcounter: { project: 13333804, invisible: 1, security: '719d08da' }
};

// Merge config
const CONFIG = Object.assign({}, DEFAULT_CONFIG, window.TRACKER_CONFIG || {});

// ================================================================
//  CONDITIONALLY LOAD STATCOUNTER (only for hydrotrace)
// ================================================================
function loadStatCounter() {
    if (CONFIG.project !== 'hydrotrace') {
        console.log('ℹ️ StatCounter not loaded – project is', CONFIG.project);
        return;
    }
    if (document.querySelector('script[src*="statcounter.com/counter"]')) {
        console.log('ℹ️ StatCounter already loaded.');
        return;
    }
    const sc = CONFIG.statcounter || {};
    const scProject = sc.project || 13333804;
    const scInvisible = sc.invisible || 1;
    const scSecurity = sc.security || '719d08da';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.statcounter.com/counter/counter.js`;

    const initScript = document.createElement('script');
    initScript.type = 'text/javascript';
    initScript.textContent = `
        var sc_project = ${scProject};
        var sc_invisible = ${scInvisible};
        var sc_security = "${scSecurity}";
    `;

    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(initScript);
    head.appendChild(script);
    console.log('✅ StatCounter loaded for HydroTrace.');
}

// ================================================================
//  HELPER: format timestamp (ssmmhhddmmyyyy)
// ================================================================
function formatTimestamp() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${pad(now.getSeconds())}${pad(now.getMinutes())}${pad(now.getHours())}${pad(now.getDate())}${pad(now.getMonth()+1)}${now.getFullYear()}`;
}

// ================================================================
//  GET IP
// ================================================================
async function getIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    } catch { return null; }
}

// ================================================================
//  GET LOCATION – ipinfo.io (HTTPS, 50k/month) + fallback
// ================================================================
async function getVisitorLocation(ip) {
    // Primary: ipinfo.io (requires token)
    const token = CONFIG.ipinfoToken || '';
    if (token) {
        try {
            const res = await fetch(`https://ipinfo.io/${ip}/json?token=${token}`);
            const data = await res.json();
            if (data && data.city && data.city !== '') {
                return {
                    city: data.city || 'Unknown',
                    region: data.region || 'Unknown',
                    country: data.country || 'Unknown',
                    countryCode: data.country || 'Unknown', // ipinfo doesn't give countryCode separately
                    isp: data.org || 'Unknown',
                    latitude: data.loc?.split(',')[0] || 'N/A',
                    longitude: data.loc?.split(',')[1] || 'N/A',
                    timezone: data.timezone || 'Unknown',
                    postal: data.postal || 'Unknown'
                };
            }
        } catch (e) {
            console.warn('ipinfo.io failed, trying fallback...', e);
        }
    } else {
        console.warn('No ipinfo token provided – skipping primary API.');
    }

    // Fallback: ip-api.com (HTTP) – will be blocked on HTTPS sites, but kept as last resort
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,city,zip,lat,lon,timezone,isp,org`);
        const data = await res.json();
        if (data && data.status === 'success') {
            return {
                city: data.city || 'Unknown',
                region: data.region || 'Unknown',
                country: data.country || 'Unknown',
                countryCode: data.countryCode || 'Unknown',
                isp: data.isp || data.org || 'Unknown',
                latitude: data.lat || 'N/A',
                longitude: data.lon || 'N/A',
                timezone: data.timezone || 'Unknown',
                postal: data.zip || 'Unknown'
            };
        }
    } catch (e) {
        console.warn('ip-api.com failed.', e);
    }

    // If all fail – return unknown
    return {
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        countryCode: 'Unknown',
        isp: 'Unknown',
        latitude: 'N/A',
        longitude: 'N/A',
        timezone: 'Unknown',
        postal: 'Unknown'
    };
}

// ================================================================
//  COLLECT VISITOR DATA (uses detector.js)
// ================================================================
async function collectVisitorData() {
    const ip = await getIP();
    const location = await getVisitorLocation(ip);
    const info = window.getCompleteBrowserInfo ? window.getCompleteBrowserInfo() : { 
        browser: 'Unknown', browserVersion: 'Unknown', browserEngine: 'Unknown',
        os: 'Unknown', osVersion: 'Unknown', osVersionName: '',
        deviceType: 'Unknown', deviceName: 'Unknown', deviceManufacturer: 'Unknown', deviceModel: 'Unknown',
        fullBrowser: 'Unknown', fullOS: 'Unknown', fullDevice: 'Unknown', summary: 'Unknown'
    };
    const now = Date.now();
    const formatted = formatTimestamp();

    return {
        ip: ip || 'Unknown',
        city: location.city,
        region: location.region,
        country: location.country,
        countryCode: location.countryCode,
        isp: location.isp,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
        postal: location.postal,
        browser: info.browser,
        browserVersion: info.browserVersion,
        browserEngine: info.browserEngine,
        os: info.os,
        osVersion: info.osVersion,
        osVersionName: info.osVersionName,
        deviceType: info.deviceType,
        deviceName: info.deviceName,
        deviceManufacturer: info.deviceManufacturer,
        deviceModel: info.deviceModel,
        fullBrowser: info.fullBrowser,
        fullOS: info.fullOS,
        fullDevice: info.fullDevice,
        summary: info.summary,
        pageTitle: document.title,
        pageUrl: window.location.href,
        referrer: document.referrer || 'Direct Visit',
        screenSize: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        colorDepth: window.screen.colorDepth,
        timestamp: now,
        formattedTimestamp: formatted,
        visitTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
}

// ================================================================
//  SEND EMAIL VIA EMAILJS
// ================================================================
async function sendEmail(data) {
    try {
        const templateParams = {
            to_email: CONFIG.receiverEmail,
            visitor_ip: data.ip,
            visitor_city: data.city,
            visitor_region: data.region,
            visitor_country: data.country,
            visitor_country_code: data.countryCode,
            visitor_isp: data.isp,
            visitor_latitude: data.latitude,
            visitor_longitude: data.longitude,
            visitor_timezone: data.timezone,
            visitor_postal: data.postal,
            visitor_browser: data.browser,
            visitor_browser_version: data.browserVersion,
            visitor_browser_engine: data.browserEngine,
            visitor_os: data.os,
            visitor_os_version: data.osVersion,
            visitor_os_version_name: data.osVersionName,
            visitor_device_type: data.deviceType,
            visitor_device_name: data.deviceName,
            visitor_device_manufacturer: data.deviceManufacturer,
            visitor_device_model: data.deviceModel,
            visitor_full_device: data.fullDevice,
            visitor_summary: data.summary,
            visit_duration: '0s (first visit)',
            visit_start: data.visitTime,
            visit_end: data.visitTime,
            page_url: data.pageUrl,
            page_title: data.pageTitle,
            page_referrer: data.referrer,
            page_views: 1,
            screen_size: data.screenSize,
            viewport_size: data.viewportSize,
            language: data.language,
            color_depth: data.colorDepth,
            timezone_offset: Intl.DateTimeFormat().resolvedOptions().timeZone,
            map_link: `https://www.google.com/maps?q=${data.latitude},${data.longitude}`,
            timestamp: data.visitTime,
            formatted_timestamp: data.formattedTimestamp,
            visitor_user_agent: navigator.userAgent
        };

        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: CONFIG.emailjsServiceId,
                template_id: CONFIG.emailjsTemplateId,
                user_id: CONFIG.emailjsPublicKey,
                template_params: templateParams
            })
        });
        if (response.ok) console.log('✅ EmailJS: Visitor email sent.');
        else console.warn('⚠️ EmailJS send failed:', response.status);
    } catch (error) {
        console.error('❌ EmailJS error:', error);
    }
}

// ================================================================
//  STORE IN FIREBASE
// ================================================================
async function storeInFirebase(data) {
    try {
        const db = firebase.database();
        const path = `/ecomatrix/visits/`;
        await db.ref(path).child(data.formattedTimestamp).set(data);
        console.log(`✅ Firebase: Visitor data stored under /${path}/${data.formattedTimestamp}`);
    } catch (error) {
        console.error('❌ Firebase error:', error);
    }
}

// ================================================================
//  MAIN TRACKER
// ================================================================
async function trackVisitor() {
    try {
        const data = await collectVisitorData();
        // Only send email if enabled
        if (CONFIG.sendEmail !== false) {
            await sendEmail(data);
            console.log('✅ EmailJS: Visitor email sent truly.');
        }
        await storeInFirebase(data);
        console.log('✅ Visitor tracking complete.');
    } catch (error) {
        console.error('❌ Tracking error:', error);
    }
}

// ================================================================
//  INIT – load StatCounter (if needed) + start tracking
// ================================================================
(function() {
    loadStatCounter();

    if (!sessionStorage.getItem('visitorTracked')) {
        setTimeout(() => {
            trackVisitor();
            sessionStorage.setItem('visitorTracked', 'true');
        }, 2000);
    } else {
        console.log('ℹ️ Visitor already tracked this session.');
    }
    console.log(`✅ Universal tracker initialized for project: ${CONFIG.project}`);
})();