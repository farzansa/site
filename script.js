/**
 * Terranox Minerals Global - Premium Core Interface Engine
 * Standardized for Tailwind v4 Ecosystem
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize default specification table
    switchSpecTable('fe');
    
    // Initialize intersection observer for counter animations
    initStatsObserver();
});

/* ==========================================
   1. LUXURY THEME ROTATION ENGINE
   ========================================== */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themes = ['emerald', 'cyber', 'royal'];
let currentThemeIndex = 0;

// Hydrate theme state from localStorage
const savedTheme = localStorage.getItem('terranox_premium_theme');
if (savedTheme) {
    currentThemeIndex = themes.indexOf(savedTheme);
    applyTheme(savedTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[currentThemeIndex];
        applyTheme(nextTheme);
        localStorage.setItem('terranox_premium_theme', nextTheme);
    });
}

/**
 * Mutates the DOM body class architecture to swap CSS custom variable packages
 * @param {string} theme - The target theme key ('emerald' | 'cyber' | 'royal')
 */
function applyTheme(theme) {
    document.body.classList.remove('cyber-dark', 'royal-light');
    if (theme === 'cyber') document.body.classList.add('cyber-dark');
    if (theme === 'royal') document.body.classList.add('royal-light');
}

/* ==========================================
   2. CHEMICAL MATRIX DATA REPOSITORY
   ========================================== */
const specData = {
    fe: [
        { element: "Total Fe (آهن کل)", guaranteed: "62.00% Min", typical: "62.45%", method: "ISO 2597" },
        { element: "SiO2 (سیلیس)", guaranteed: "3.50% Max", typical: "3.20%", method: "ASTM E246" },
        { element: "Al2O3 (آلومینا)", guaranteed: "2.00% Max", typical: "1.85%", method: "XRF Spectrometry" },
        { element: "Sulfur (گوگرد)", guaranteed: "0.08% Max", typical: "0.05%", method: "Combustion" },
        { element: "Phosphorus (فسفر)", guaranteed: "0.07% Max", typical: "0.06%", method: "ICP-AES" },
        { element: "Moisture (رطوبت بار)", guaranteed: "8.00% Max", typical: "4.50%", method: "ISO 3087" }
    ],
    si: [
        { element: "SiO2 (خلوص سیلیس ممتاز)", guaranteed: "99.20% Min", typical: "99.48%", method: "XRF Spectrometry" },
        { element: "Fe2O3 (اکسید آهن)", guaranteed: "0.05% Max", typical: "0.03%", method: "Spectrophotometry" },
        { element: "Al2O3 (آلومینا صنعتی)", guaranteed: "0.30% Max", typical: "0.22%", method: "ICP-OES" },
        { element: "Whiteness (درجه سفیدی کربنات)", guaranteed: "96.00% Min", typical: "97.50%", method: "HunterLab R457" },
        { element: "Mesh Size (دانه بندی کائولن)", guaranteed: "325 Mesh (98% Pass)", typical: "99.1% Pass", method: "Laser Diffraction" }
    ],
    bit: [
        { element: "Penetration @ 25°C (درجه نفوذ قیر)", guaranteed: "60 / 70", typical: "65", method: "ASTM D5" },
        { element: "Softening Point °C (نقطه نرمی)", guaranteed: "49 / 56 °C", typical: "52 °C", method: "ASTM D36" },
        { element: "Ductility @ 25°C (شکل‌پذیری)", guaranteed: "100 Min", typical: "102 cm", method: "ASTM D113" },
        { element: "Flash Point °C (نقطه اشتعال)", guaranteed: "250 °C Min", typical: "268 °C", method: "ASTM D92" },
        { element: "Solubility in Trichloroethylene", guaranteed: "99.0% Min", typical: "99.65%", method: "ASTM D2042" }
    ]
};

/**
 * Toggles and updates technical Certificate of Analysis matrices dynamically
 * @param {string} productType - Key referencing data array ('fe' | 'si' | 'bit')
 */
function switchSpecTable(productType) {
    const tbody = document.getElementById('spec-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = ''; 
    
    specData[productType].forEach(item => {
        const row = `
            <tr class="hover:bg-[var(--bg-surface)]/50 transition-colors border-b theme-border">
                <td class="p-4 font-bold theme-text-title">${item.element}</td>
                <td class="p-4 theme-text-main">${item.guaranteed}</td>
                <td class="p-4 theme-text-primary font-mono">${item.typical}</td>
                <td class="p-4 theme-text-muted text-xs">${item.method}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Re-assign active state styling classes to control tabs
    ['fe', 'si', 'bit'].forEach(type => {
        const btn = document.getElementById(`btn-spec-${type}`);
        if (!btn) return;
        
        if (type === productType) {
            btn.className = "px-4 py-2 text-xs font-bold rounded-lg border border-[var(--primary)] bg-[var(--primary)] text-black cursor-pointer transition-all";
        } else {
            btn.className = "px-4 py-2 text-xs font-bold rounded-lg border theme-border theme-text-main hover:border-[var(--primary)] cursor-pointer transition-all";
        }
    });
}

/* ==========================================
   3. HIGH-PERFORMANCE DATA COUNTER ENGINE
   ========================================== */
/**
 * Smooth, micro-calculated cubic ease-out counting mechanism
 */
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-card__number');
    const duration = 2600; 
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); 

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        let startTime = null;

        const updateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progressTime = currentTime - startTime;
            let progress = Math.min(progressTime / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentValue = Math.floor(easedProgress * target);

            counter.innerText = prefix + currentValue.toLocaleString('en-US') + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = prefix + target.toLocaleString('en-US') + suffix;
            }
        };
        requestAnimationFrame(updateCount);
    });
};

/**
 * Initializes IntersectionObserver to optimize counter activation lazily on viewport collision
 */
const initStatsObserver = () => {
    const statsSection = document.querySelector('.class-stats-container');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    observer.observe(statsSection);
};
