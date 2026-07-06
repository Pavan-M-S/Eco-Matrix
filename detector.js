// ================================================================
//  COMPLETE BROWSER + OS + DEVICE DETECTION – 30+ browsers
//  Exposes global function: getCompleteBrowserInfo()
// ================================================================

function getCompleteBrowserInfo() {
    const ua = navigator.userAgent;
    const uaLower = ua.toLowerCase();

    // ============================================================
    // 1. BROWSER DETECTION (30+ browsers)
    // ============================================================

    let browser = { name: 'Unknown', version: 'Unknown', engine: 'Unknown' };

    // --- Edge (Chromium) ---
    if (ua.indexOf('Edg/') > -1) {
        browser.name = 'Microsoft Edge';
        browser.version = ua.match(/Edg\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Edge (Legacy) ---
    else if (ua.indexOf('Edge/') > -1) {
        browser.name = 'Microsoft Edge (Legacy)';
        browser.version = ua.match(/Edge\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'EdgeHTML';
    }
    // --- Opera / Opera GX ---
    else if (ua.indexOf('OPR/') > -1 || ua.indexOf('Opera/') > -1) {
        browser.name = ua.indexOf('GX') > -1 ? 'Opera GX' : 'Opera';
        browser.version = ua.match(/(?:OPR|Opera)\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Brave ---
    else if (ua.indexOf('Brave/') > -1) {
        browser.name = 'Brave';
        browser.version = ua.match(/Brave\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Vivaldi ---
    else if (ua.indexOf('Vivaldi/') > -1) {
        browser.name = 'Vivaldi';
        browser.version = ua.match(/Vivaldi\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Arc ---
    else if (ua.indexOf('Arc/') > -1) {
        browser.name = 'Arc';
        browser.version = ua.match(/Arc\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Tor Browser ---
    else if (ua.indexOf('TorBrowser/') > -1) {
        browser.name = 'Tor Browser';
        browser.version = ua.match(/TorBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Firefox';
    }
    // --- Samsung Internet ---
    else if (ua.indexOf('SamsungBrowser/') > -1) {
        browser.name = 'Samsung Internet';
        browser.version = ua.match(/SamsungBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- UC Browser ---
    else if (ua.indexOf('UCBrowser/') > -1) {
        browser.name = 'UC Browser';
        browser.version = ua.match(/UCBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- QQ Browser ---
    else if (ua.indexOf('QQBrowser/') > -1) {
        browser.name = 'QQ Browser';
        browser.version = ua.match(/QQBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Baidu Browser ---
    else if (ua.indexOf('Baidu/') > -1 && ua.indexOf('BaiduBrowser/') > -1) {
        browser.name = 'Baidu Browser';
        browser.version = ua.match(/BaiduBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Yandex Browser ---
    else if (ua.indexOf('YaBrowser/') > -1) {
        browser.name = 'Yandex Browser';
        browser.version = ua.match(/YaBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- DuckDuckGo Browser ---
    else if (ua.indexOf('DuckDuckGo/') > -1) {
        browser.name = 'DuckDuckGo Browser';
        browser.version = ua.match(/DuckDuckGo\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'WebKit';
    }
    // --- Pale Moon ---
    else if (ua.indexOf('PaleMoon/') > -1) {
        browser.name = 'Pale Moon';
        browser.version = ua.match(/PaleMoon\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Goanna';
    }
    // --- Waterfox ---
    else if (ua.indexOf('Waterfox/') > -1) {
        browser.name = 'Waterfox';
        browser.version = ua.match(/Waterfox\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Firefox';
    }
    // --- Kiwi Browser ---
    else if (ua.indexOf('Kiwi/') > -1) {
        browser.name = 'Kiwi Browser';
        browser.version = ua.match(/Kiwi\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Bromite ---
    else if (ua.indexOf('Bromite/') > -1) {
        browser.name = 'Bromite';
        browser.version = ua.match(/Bromite\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Mull ---
    else if (ua.indexOf('Mull/') > -1) {
        browser.name = 'Mull';
        browser.version = ua.match(/Mull\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Firefox';
    }
    // --- Fennec ---
    else if (ua.indexOf('Fennec/') > -1) {
        browser.name = 'Fennec (Firefox for Android)';
        browser.version = ua.match(/Fennec\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Firefox';
    }
    // --- Iceraven ---
    else if (ua.indexOf('Iceraven/') > -1) {
        browser.name = 'Iceraven';
        browser.version = ua.match(/Iceraven\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Firefox';
    }
    // --- Cromite ---
    else if (ua.indexOf('Cromite/') > -1) {
        browser.name = 'Cromite';
        browser.version = ua.match(/Cromite\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Thorium ---
    else if (ua.indexOf('Thorium/') > -1) {
        browser.name = 'Thorium';
        browser.version = ua.match(/Thorium\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Ungoogled Chromium ---
    else if (ua.indexOf('Chromium/') > -1 && ua.indexOf('Chrome/') === -1) {
        browser.name = 'Ungoogled Chromium';
        browser.version = ua.match(/Chromium\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Iridium ---
    else if (ua.indexOf('Iridium/') > -1) {
        browser.name = 'Iridium';
        browser.version = ua.match(/Iridium\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Falkon ---
    else if (ua.indexOf('Falkon/') > -1) {
        browser.name = 'Falkon';
        browser.version = ua.match(/Falkon\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'WebKit';
    }
    // --- Konqueror ---
    else if (ua.indexOf('Konqueror/') > -1) {
        browser.name = 'Konqueror';
        browser.version = ua.match(/Konqueror\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'KHTML';
    }
    // --- Lynx (text browser) ---
    else if (ua.indexOf('Lynx/') > -1) {
        browser.name = 'Lynx';
        browser.version = ua.match(/Lynx\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Text';
    }
    // --- w3m (text browser) ---
    else if (ua.indexOf('w3m/') > -1) {
        browser.name = 'w3m';
        browser.version = ua.match(/w3m\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Text';
    }
    // --- Silk (Amazon) ---
    else if (ua.indexOf('Silk/') > -1) {
        browser.name = 'Amazon Silk';
        browser.version = ua.match(/Silk\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'WebKit';
    }
    // --- Huawei Browser ---
    else if (ua.indexOf('HuaweiBrowser/') > -1) {
        browser.name = 'Huawei Browser';
        browser.version = ua.match(/HuaweiBrowser\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Xiaomi Browser ---
    else if (ua.indexOf('XiaoMi/') > -1) {
        browser.name = 'Xiaomi Browser';
        browser.version = ua.match(/XiaoMi\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Firefox ---
    else if (ua.indexOf('Firefox/') > -1 && ua.indexOf('Seamonkey') === -1) {
        browser.name = 'Firefox';
        browser.version = ua.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Firefox';
    }
    // --- Safari ---
    else if (ua.indexOf('Safari/') > -1 && ua.indexOf('Chrome') === -1) {
        browser.name = 'Safari';
        browser.version = ua.match(/Safari\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'WebKit';
    }
    // --- Chrome (fallback) ---
    else if (ua.indexOf('Chrome/') > -1) {
        browser.name = 'Google Chrome';
        browser.version = ua.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown';
        browser.engine = 'Chromium';
    }
    // --- Fallback ---
    else {
        browser.name = 'Unknown';
        browser.version = 'Unknown';
        browser.engine = 'Unknown';
    }

    // ============================================================
    // 2. OS DETECTION (with detailed versions)
    // ============================================================

    let os = { name: 'Unknown', version: 'Unknown', versionName: '' };

    // --- Windows ---
    if (ua.indexOf('Windows NT 10.0') > -1) {
        os.name = 'Windows';
        os.version = '10.0';
        const build = ua.match(/Windows NT 10.0; Win64; x64; rv:([\d.]+)/)?.[1] ||
            ua.match(/Windows NT 10.0; WOW64; rv:([\d.]+)/)?.[1] ||
            ua.match(/Windows NT 10.0; Win64; x64; ([\d.]+)/)?.[1] ||
            '22000';
        os.versionName = parseInt(build) >= 22000 ? '11' : '10';
    } else if (ua.indexOf('Windows NT 6.3') > -1) {
        os.name = 'Windows'; os.version = '6.3'; os.versionName = '8.1';
    } else if (ua.indexOf('Windows NT 6.2') > -1) {
        os.name = 'Windows'; os.version = '6.2'; os.versionName = '8';
    } else if (ua.indexOf('Windows NT 6.1') > -1) {
        os.name = 'Windows'; os.version = '6.1'; os.versionName = '7';
    } else if (ua.indexOf('Windows NT 6.0') > -1) {
        os.name = 'Windows'; os.version = '6.0'; os.versionName = 'Vista';
    } else if (ua.indexOf('Windows NT 5.1') > -1) {
        os.name = 'Windows'; os.version = '5.1'; os.versionName = 'XP';
    } else if (ua.indexOf('Windows NT 5.0') > -1) {
        os.name = 'Windows'; os.version = '5.0'; os.versionName = '2000';
    } else if (ua.indexOf('Windows 98') > -1) {
        os.name = 'Windows'; os.version = '4.1'; os.versionName = '98';
    } else if (ua.indexOf('Windows ME') > -1) {
        os.name = 'Windows'; os.version = '4.9'; os.versionName = 'ME';
    }

    // --- macOS ---
    else if (ua.indexOf('Mac OS X') > -1 || ua.indexOf('Macintosh') > -1) {
        os.name = 'macOS';
        const versionMatch = ua.match(/Mac OS X ([\d_]+)/);
        if (versionMatch) {
            const ver = versionMatch[1].replace(/_/g, '.');
            os.version = ver;
            const major = parseInt(ver.split('.')[0]) || 10;
            const minor = parseInt(ver.split('.')[1]) || 0;
            const map = {
                '10.15': 'Catalina', '10.14': 'Mojave', '10.13': 'High Sierra',
                '10.12': 'Sierra', '10.11': 'El Capitan', '10.10': 'Yosemite',
                '10.9': 'Mavericks', '10.8': 'Mountain Lion', '10.7': 'Lion',
                '10.6': 'Snow Leopard', '10.5': 'Leopard', '10.4': 'Tiger',
                '10.3': 'Panther', '10.2': 'Jaguar', '10.1': 'Puma', '10.0': 'Cheetah'
            };
            if (major === 10 && map[ver]) os.versionName = map[ver];
            else if (major === 11) os.versionName = 'Big Sur';
            else if (major === 12) os.versionName = 'Monterey';
            else if (major === 13) os.versionName = 'Ventura';
            else if (major === 14) os.versionName = 'Sonoma';
            else if (major === 15) os.versionName = 'Sequoia';
            else os.versionName = `macOS ${major}`;
        }
    }

    // --- iOS / iPadOS ---
    else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1 || ua.indexOf('iPod') > -1) {
        const isiPad = ua.indexOf('iPad') > -1;
        os.name = isiPad ? 'iPadOS' : 'iOS';
        const versionMatch = ua.match(/OS ([\d_]+)/);
        if (versionMatch) {
            const ver = versionMatch[1].replace(/_/g, '.');
            os.version = ver;
            os.versionName = ver;
        }
    }

    // --- Android ---
    else if (ua.indexOf('Android') > -1) {
        os.name = 'Android';
        const versionMatch = ua.match(/Android ([\d.]+)/);
        if (versionMatch) {
            const ver = versionMatch[1];
            os.version = ver;
            const major = parseInt(ver) || 0;
            const map = {
                '15': 'Vanilla Ice Cream', '14': 'Upside Down Cake',
                '13': 'Tiramisu', '12': 'Snow Cone', '11': 'Red Velvet Cake',
                '10': 'Queen Cake', '9': 'Pie', '8.1': 'Oreo (8.1)',
                '8.0': 'Oreo', '7.1': 'Nougat (7.1)', '7.0': 'Nougat',
                '6.0': 'Marshmallow', '5.1': 'Lollipop (5.1)', '5.0': 'Lollipop',
                '4.4': 'KitKat', '4.3': 'Jelly Bean', '4.2': 'Jelly Bean',
                '4.1': 'Jelly Bean', '4.0': 'Ice Cream Sandwich'
            };
            os.versionName = map[ver] || map[String(major)] || ver;
        }
    }

    // --- ChromeOS ---
    else if (ua.indexOf('CrOS') > -1) {
        os.name = 'ChromeOS';
        const versionMatch = ua.match(/CrOS [^\s]+ ([\d.]+)/);
        if (versionMatch) { os.version = versionMatch[1]; os.versionName = `ChromeOS ${os.version}`; }
    }

    // --- Linux ---
    else if (ua.indexOf('Linux') > -1 && ua.indexOf('Android') === -1) {
        os.name = 'Linux';
        if (ua.indexOf('Ubuntu') > -1) {
            os.name = 'Ubuntu Linux';
            const verMatch = ua.match(/Ubuntu[\/ ]([\d.]+)/);
            if (verMatch) os.version = verMatch[1];
        } else if (ua.indexOf('Debian') > -1) {
            os.name = 'Debian Linux';
            const verMatch = ua.match(/Debian[\/ ]([\d.]+)/);
            if (verMatch) os.version = verMatch[1];
        } else if (ua.indexOf('Fedora') > -1) {
            os.name = 'Fedora Linux';
            const verMatch = ua.match(/Fedora[\/ ]([\d.]+)/);
            if (verMatch) os.version = verMatch[1];
        } else if (ua.indexOf('Arch') > -1) {
            os.name = 'Arch Linux';
        } else if (ua.indexOf('CentOS') > -1) {
            os.name = 'CentOS Linux';
            const verMatch = ua.match(/CentOS[\/ ]([\d.]+)/);
            if (verMatch) os.version = verMatch[1];
        } else if (ua.indexOf('openSUSE') > -1) {
            os.name = 'openSUSE Linux';
            const verMatch = ua.match(/openSUSE[\/ ]([\d.]+)/);
            if (verMatch) os.version = verMatch[1];
        } else {
            os.version = 'Unknown';
        }
    }

    // --- WebOS (LG) ---
    else if (ua.indexOf('WebOS') > -1) {
        os.name = 'WebOS';
        const verMatch = ua.match(/WebOS[\/ ]([\d.]+)/);
        if (verMatch) { os.version = verMatch[1]; os.versionName = 'LG WebOS'; }
    }

    // --- Tizen (Samsung) ---
    else if (ua.indexOf('Tizen') > -1) {
        os.name = 'Tizen';
        const verMatch = ua.match(/Tizen[\/ ]([\d.]+)/);
        if (verMatch) { os.version = verMatch[1]; os.versionName = 'Samsung Tizen'; }
    }

    // ============================================================
    // 3. DEVICE DETECTION
    // ============================================================

    let device = { type: 'Unknown', name: 'Unknown', manufacturer: 'Unknown', model: 'Unknown' };

    // --- Detect type ---
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Silk/i.test(ua)) {
        device.type = 'Mobile';
    } else if (/Tablet|iPad|Kindle|Silk|PlayBook/i.test(ua)) {
        device.type = 'Tablet';
    } else {
        device.type = 'Desktop';
    }

    // --- iPhone models ---
    if (ua.indexOf('iPhone') > -1) {
        device.manufacturer = 'Apple';
        const modelMatch = ua.match(/iPhone(\d+,\d+)/);
        if (modelMatch) {
            const model = modelMatch[1];
            const map = {
                '15,2': 'iPhone 14 Pro', '15,3': 'iPhone 14 Pro Max',
                '15,4': 'iPhone 14', '15,5': 'iPhone 14 Plus',
                '14,2': 'iPhone 13 Pro', '14,3': 'iPhone 13 Pro Max',
                '14,4': 'iPhone 13 Mini', '14,5': 'iPhone 13',
                '14,6': 'iPhone SE (3rd)',
                '13,1': 'iPhone 12 Mini', '13,2': 'iPhone 12',
                '13,3': 'iPhone 12 Pro', '13,4': 'iPhone 12 Pro Max',
                '12,1': 'iPhone 11', '12,3': 'iPhone 11 Pro',
                '12,5': 'iPhone 11 Pro Max',
                '11,8': 'iPhone XR', '11,2': 'iPhone XS',
                '11,4': 'iPhone XS Max',
                '10,3': 'iPhone X', '10,6': 'iPhone X',
                '9,1': 'iPhone 7', '9,3': 'iPhone 7',
                '9,2': 'iPhone 7 Plus', '9,4': 'iPhone 7 Plus',
                '8,1': 'iPhone 6s', '8,2': 'iPhone 6s Plus',
                '7,2': 'iPhone 6', '7,1': 'iPhone 6 Plus'
            };
            device.name = map[model] || `iPhone ${model}`;
            device.model = model;
        } else {
            device.name = 'iPhone';
        }
    }

    // --- iPad models ---
    else if (ua.indexOf('iPad') > -1) {
        device.manufacturer = 'Apple';
        const modelMatch = ua.match(/iPad(\d+,\d+)/);
        if (modelMatch) {
            const model = modelMatch[1];
            const map = {
                '13,4': 'iPad Pro 11" (3rd)', '13,5': 'iPad Pro 11" (3rd)',
                '13,6': 'iPad Pro 11" (3rd)', '13,7': 'iPad Pro 11" (3rd)',
                '13,8': 'iPad Pro 12.9" (5th)', '13,9': 'iPad Pro 12.9" (5th)',
                '13,10': 'iPad Pro 12.9" (5th)', '13,11': 'iPad Pro 12.9" (5th)',
                '12,1': 'iPad Pro 11" (2nd)', '12,2': 'iPad Pro 12.9" (4th)',
                '11,1': 'iPad Pro 11"', '11,2': 'iPad Pro 12.9" (3rd)',
                '8,1': 'iPad Pro 12.9" (2nd)', '8,2': 'iPad Pro 12.9" (2nd)',
                '7,1': 'iPad Pro 12.9"', '7,2': 'iPad Pro 12.9"',
                '6,3': 'iPad Pro 9.7"', '6,4': 'iPad Pro 9.7"'
            };
            device.name = map[model] || `iPad ${model}`;
            device.model = model;
        } else {
            device.name = 'iPad';
        }
    }

    // --- Android devices ---
    else if (ua.indexOf('Android') > -1) {
        device.manufacturer = 'Unknown';
        const buildMatch = ua.match(/Build\/([\w\s]+);/);
        if (buildMatch) {
            const build = buildMatch[1];
            const parts = build.split(' ');
            if (parts.length > 1) {
                device.manufacturer = parts[0];
                device.model = parts.slice(1).join(' ');
                device.name = `${parts[0]} ${parts.slice(1).join(' ')}`;
            } else {
                device.model = build;
                device.name = build;
            }
        } else {
            const brandMatch = ua.match(/(Samsung|SM-|Pixel|OnePlus|Xiaomi|Redmi|POCO|Realme|OPPO|Vivo|Nokia|Motorola|LG|Sony|HTC|Google|Honor|Huawei|ZTE|Asus|Lenovo)/i);
            if (brandMatch) {
                device.manufacturer = brandMatch[1];
                const modelMatch = ua.match(/(SM-[A-Z0-9]+|Pixel [\d]+|OnePlus [A-Z0-9]+|Xiaomi [\w]+)/);
                if (modelMatch) {
                    device.model = modelMatch[1];
                    device.name = `${brandMatch[1]} ${modelMatch[1]}`;
                } else {
                    device.name = brandMatch[1];
                }
            }
        }
        if (ua.indexOf('SM-') > -1) {
            device.manufacturer = 'Samsung';
            const modelMatch = ua.match(/SM-([A-Z0-9]+)/);
            if (modelMatch) { device.model = `SM-${modelMatch[1]}`; device.name = `Samsung ${device.model}`; }
        } else if (ua.indexOf('Pixel') > -1) {
            device.manufacturer = 'Google';
            const modelMatch = ua.match(/Pixel ([\d]+)/);
            if (modelMatch) { device.model = `Pixel ${modelMatch[1]}`; device.name = `Google Pixel ${modelMatch[1]}`; }
        } else if (ua.indexOf('OnePlus') > -1) {
            device.manufacturer = 'OnePlus';
            const modelMatch = ua.match(/OnePlus ([\w]+)/);
            if (modelMatch) { device.model = modelMatch[1]; device.name = `OnePlus ${modelMatch[1]}`; }
        } else if (ua.indexOf('Xiaomi') > -1) {
            device.manufacturer = 'Xiaomi';
        } else if (ua.indexOf('Redmi') > -1) {
            device.manufacturer = 'Xiaomi (Redmi)';
        } else if (ua.indexOf('Realme') > -1) {
            device.manufacturer = 'Realme';
        } else if (ua.indexOf('OPPO') > -1) {
            device.manufacturer = 'OPPO';
        } else if (ua.indexOf('Vivo') > -1) {
            device.manufacturer = 'Vivo';
        } else if (ua.indexOf('Nokia') > -1) {
            device.manufacturer = 'Nokia';
        } else if (ua.indexOf('Motorola') > -1) {
            device.manufacturer = 'Motorola';
        }
    }

    // --- Kindle / Amazon ---
    else if (ua.indexOf('Kindle') > -1 || ua.indexOf('Silk') > -1) {
        device.manufacturer = 'Amazon';
        device.name = ua.indexOf('Kindle') > -1 ? 'Kindle' : 'Amazon Tablet';
    }

    // --- BlackBerry ---
    else if (ua.indexOf('BlackBerry') > -1) {
        device.manufacturer = 'BlackBerry';
        device.name = 'BlackBerry';
    }

    // --- Windows Phone ---
    else if (ua.indexOf('Windows Phone') > -1) {
        device.manufacturer = 'Microsoft';
        device.name = 'Windows Phone';
    }

    // --- Desktop manufacturer ---
    if (device.type === 'Desktop') {
        if (ua.indexOf('Macintosh') > -1) {
            device.manufacturer = 'Apple';
            device.name = 'Mac';
        } else if (ua.indexOf('Windows') > -1) {
            device.manufacturer = 'PC (Windows)';
            device.name = 'Windows PC';
        } else if (ua.indexOf('CrOS') > -1) {
            device.manufacturer = 'Google';
            device.name = 'Chromebook';
        }
    }

    // ============================================================
    // 4. RETURN
    // ============================================================

    return {
        browser: browser.name,
        browserVersion: browser.version,
        browserEngine: browser.engine,
        os: os.name,
        osVersion: os.version,
        osVersionName: os.versionName,
        deviceType: device.type,
        deviceName: device.name,
        deviceManufacturer: device.manufacturer,
        deviceModel: device.model,
        userAgent: ua,
        fullBrowser: `${browser.name} ${browser.version}`,
        fullOS: os.versionName ? `${os.name} ${os.versionName} (${os.version})` : `${os.name} ${os.version}`,
        fullDevice: device.type === 'Desktop' ? device.name : `${device.manufacturer} ${device.name}`,
        summary: `${browser.name}${browser.version ? ' v'+browser.version : ''} | ${os.name}${os.versionName ? ' '+os.versionName : ''} | ${device.type}`
    };
}