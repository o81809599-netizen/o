// ==================== STATE ====================
const state = {
    rooms: null,
    bathrooms: 1,
    bathroomType: 'combined', // 'combined' | 'separate'
    showers: 1,
    selectedColors: [],
    currentStyle: null
};

// ==================== DATA ====================
const colorsPalette = [
    { hex: '#FFFFFF', name: 'Oq / Klassik' }, { hex: '#F5F5DC', name: 'Krем / Beige' },
    { hex: '#9CA3AF', name: 'Kulrang / Neytral' }, { hex: '#1F2937', name: 'Qora / Elegant' },
    { hex: '#8B4513', name: 'Jigarrang / Vintage' }, { hex: '#3B82F6', name: 'Moviy / Zamonaviy' },
    { hex: '#1E3A8A', name: 'To\'q moviy / Navy' }, { hex: '#10B981', name: 'Yashil / Eco' },
    { hex: '#A7F3D0', name: 'Och yashil / Mint' }, { hex: '#FBBF24', name: 'Sariq / Warm' },
    { hex: '#EF4444', name: 'Qizil / Bold' }, { hex: '#8B5CF6', name: 'Binafsha / Royal' }
];

// 3 House Styles — each has exterior images per room tier
const houseStyles = [
    {
        id: 'villa',
        label: 'Villa',
        labelUz: 'Hashamatli Villa',
        icon: 'fa-crown',
        desc: 'Keng, ulug\'vor, premium darajali arxitektura',
        badge: '⭐ Premium',
        exteriors: {
            small: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            medium: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
            large: 'https://images.unsplash.com/photo-1512918766775-d263227b5311'
        },
        floorPlans: {
            small: 'images/floor_plan_3d_2_1778855438613.png',
            medium: 'images/floor_plan_3d_3_1778855647178.png',
            large: 'images/floor_plan_3d_4_1778855704907.png'
        }
    },
    {
        id: 'modern',
        label: 'Premium',
        labelUz: 'Zamonaviy Premium',
        icon: 'fa-gem',
        desc: 'Ultra-zamonaviy, shisha fasadli, minimalist',
        badge: '💎 Zamonaviy',
        exteriors: {
            small: 'https://images.unsplash.com/photo-1600566753190-17f0bcd2a6c4',
            medium: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
            large: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126'
        },
        floorPlans: {
            small: 'images/floor_plan_3d_2_1778855438613.png',
            medium: 'images/floor_plan_3d_3_1778855647178.png',
            large: 'images/floor_plan_3d_4_1778855704907.png'
        }
    },
    {
        id: 'classic',
        label: 'Klassik',
        labelUz: 'Qulay Klassik',
        icon: 'fa-house',
        desc: 'Sodda, qulay, oilaviy, hayotiy',
        badge: '🏡 Klassik',
        exteriors: {
            small: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09',
            medium: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
            large: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be'
        },
        floorPlans: {
            small: 'images/floor_plan_3d_2_1778855438613.png',
            medium: 'images/floor_plan_3d_3_1778855647178.png',
            large: 'images/floor_plan_3d_4_1778855704907.png'
        }
    }
];

const roomCatalog = {
    'Mehmonxona': [
        { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', tags: ['#FFFFFF','#F5F5DC','#8B4513','#9CA3AF'] },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', tags: ['#1F2937','#9CA3AF','#FFFFFF'] },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', tags: ['#3B82F6','#1E3A8A','#8B5CF6'] },
        { url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e', tags: ['#10B981','#FBBF24','#EF4444'] }
    ],
    'Yotoqxona': [
        { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0', tags: ['#FFFFFF','#F5F5DC','#8B4513'] },
        { url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85', tags: ['#1F2937','#9CA3AF'] },
        { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457', tags: ['#3B82F6','#1E3A8A'] },
        { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf', tags: ['#10B981','#8B5CF6','#EF4444'] }
    ],
    'Oshxona': [
        { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f', tags: ['#FFFFFF','#F5F5DC','#FBBF24'] },
        { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d', tags: ['#1F2937','#9CA3AF'] },
        { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6', tags: ['#3B82F6','#10B981','#8B5CF6','#EF4444'] }
    ],
    'Bolalar xonasi': [
        { url: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d', tags: ['#FFFFFF','#A7F3D0','#8B5CF6','#3B82F6'] },
        { url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf', tags: ['#FBBF24','#EF4444','#F5F5DC'] }
    ],
    'Balkon': [
        { url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88', tags: ['#FFFFFF','#10B981'] },
        { url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9', tags: ['#3B82F6','#FBBF24','#EF4444','#8B5CF6'] }
    ],
    'Dahliz': [
        { url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea', tags: ['#FFFFFF','#F5F5DC','#8B4513'] },
        { url: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef', tags: ['#1F2937','#9CA3AF','#3B82F6','#8B5CF6'] }
    ],
    'Hojatxona': [
        { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14', tags: ['#FFFFFF','#F5F5DC','#A7F3D0'] },
        { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea', tags: ['#1F2937','#9CA3AF','#3B82F6','#8B5CF6','#EF4444'] }
    ],
    'Dush xonasi': [
        { url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14', tags: ['#FFFFFF','#10B981','#A7F3D0'] },
        { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a', tags: ['#1F2937','#3B82F6','#8B5CF6','#EF4444'] }
    ]
};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    // QR Code
    new QRCode(document.getElementById('qr-code-canvas'), {
        text: 'https://o81809599-netizen.github.io/o/',
        width: 160, height: 160,
        colorDark: '#0f172a', colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Room buttons 2-7
    const roomBtn = document.getElementById('room-buttons');
    for (let i = 2; i <= 7; i++) {
        const b = document.createElement('button');
        b.className = 'select-btn';
        b.textContent = i + ' xona';
        b.onclick = () => selectRooms(i);
        roomBtn.appendChild(b);
    }

    // Bathroom count 1-3
    const bathBtn = document.getElementById('bathroom-count-buttons');
    for (let i = 1; i <= 3; i++) {
        const b = document.createElement('button');
        b.className = 'select-btn';
        b.textContent = i + ' ta';
        b.onclick = () => selectBathroomCount(i);
        bathBtn.appendChild(b);
    }

    // Shower count 1-3
    const showerBtn = document.getElementById('shower-count-buttons');
    for (let i = 1; i <= 3; i++) {
        const b = document.createElement('button');
        b.className = 'select-btn';
        b.textContent = i + ' ta';
        b.onclick = () => selectShowerCount(i);
        showerBtn.appendChild(b);
    }

    // Colors
    const colorsContainer = document.getElementById('colors-container');
    colorsPalette.forEach((c, idx) => {
        const d = document.createElement('div');
        d.className = 'color-item';
        d.style.backgroundColor = c.hex;
        if (c.hex === '#FFFFFF') d.style.border = '2px solid #ccc';
        d.title = c.name;
        d.onclick = () => toggleColor(idx, d, c.hex);
        colorsContainer.appendChild(d);
    });

    document.getElementById('generate-colors-btn').onclick = showResults;
    document.getElementById('home-btn').onclick = restartApp;

    // Close modals on backdrop click
    document.getElementById('house-modal').onclick = (e) => { if (e.target.id === 'house-modal') closeHouseModal(); };
    document.getElementById('filter-modal').onclick = (e) => { if (e.target.id === 'filter-modal') closeFilterModal(); };
});

// ==================== NAVIGATION ====================
function showStep(id) {
    document.querySelectorAll('.step').forEach(s => { s.classList.add('hidden'); s.classList.remove('active'); });
    const el = document.getElementById(id);
    el.classList.remove('hidden');
    el.classList.add('active');
    const isHome = id === 'step-landing';
    document.getElementById('home-btn').classList.toggle('hidden', isHome);
}

function startFlow() { showStep('step-rooms'); }
function goBack(to) { showStep(to); }

function goBackFromColors() {
    if (state.bathroomType === 'separate') showStep('step-shower');
    else showStep('step-bathrooms');
}

function restartApp() {
    state.rooms = null; state.bathrooms = 1; state.bathroomType = 'combined';
    state.showers = 1; state.selectedColors = [];
    document.querySelectorAll('.select-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.color-item').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.type-card').forEach(b => b.classList.remove('selected'));
    document.getElementById('color-count').textContent = '0';
    updateColorsBtn();
    showStep('step-landing');
}

// ==================== SELECTIONS ====================
function selectRooms(n) {
    state.rooms = n;
    document.querySelectorAll('#room-buttons .select-btn').forEach(b => {
        b.classList.toggle('selected', b.textContent.includes(n));
    });
    setTimeout(() => showStep('step-bathrooms'), 300);
}

function selectBathroomCount(n) {
    state.bathrooms = n;
    document.querySelectorAll('#bathroom-count-buttons .select-btn').forEach(b => {
        b.classList.toggle('selected', b.textContent.includes(n));
    });
}

function selectBathroomType(type) {
    state.bathroomType = type;
    document.getElementById('type-combined').classList.toggle('selected', type === 'combined');
    document.getElementById('type-separate').classList.toggle('selected', type === 'separate');
    setTimeout(() => {
        if (type === 'separate') showStep('step-shower');
        else showStep('step-colors');
    }, 300);
}

function selectShowerCount(n) {
    state.showers = n;
    document.querySelectorAll('#shower-count-buttons .select-btn').forEach(b => {
        b.classList.toggle('selected', b.textContent.includes(n));
    });
    setTimeout(() => showStep('step-colors'), 300);
}

function toggleColor(idx, el, hex) {
    if (state.selectedColors.includes(hex)) {
        state.selectedColors = state.selectedColors.filter(c => c !== hex);
        el.classList.remove('selected');
    } else {
        if (state.selectedColors.length >= 3) {
            el.style.transform = 'scale(0.85)';
            setTimeout(() => el.style.transform = '', 200);
            return;
        }
        state.selectedColors.push(hex);
        el.classList.add('selected');
    }
    document.getElementById('color-count').textContent = state.selectedColors.length;
    updateColorsBtn();
}

function updateColorsBtn() {
    const btn = document.getElementById('generate-colors-btn');
    const ok = state.selectedColors.length === 3;
    btn.disabled = !ok;
    btn.classList.toggle('disabled', !ok);
}

// ==================== RESULTS ====================
function getRoomTier() {
    if (state.rooms <= 3) return 'small';
    if (state.rooms <= 5) return 'medium';
    return 'large';
}

function buildRoomList() {
    const names = ['Mehmonxona', 'Yotoqxona', 'Oshxona', 'Bolalar xonasi', 'Balkon', 'Dahliz'];
    let rooms = names.slice(0, state.rooms);
    // Add bathrooms
    for (let i = 0; i < state.bathrooms; i++) {
        rooms.push(state.bathroomType === 'combined' ? 'Hojatxona' : 'Hojatxona');
    }
    // Add showers if separate
    if (state.bathroomType === 'separate') {
        for (let i = 0; i < state.showers; i++) rooms.push('Dush xonasi');
    }
    return rooms;
}

function showResults() {
    showStep('step-results');
    const loader = document.getElementById('results-loader');
    const gallery = document.getElementById('results-gallery');
    loader.classList.remove('hidden');
    gallery.classList.add('hidden');

    const tier = getRoomTier();
    const colorNames = state.selectedColors.map(h => {
        const c = colorsPalette.find(x => x.hex === h);
        return `<span class="color-swatch-mini" style="background:${h}; ${h==='#FFFFFF'?'border:1px solid #ccc':''}"></span>`;
    }).join('');

    const bathInfo = state.bathroomType === 'combined'
        ? `${state.bathrooms} ta (WC+Dush birgalikda)`
        : `${state.bathrooms} ta WC + ${state.showers} ta Dush (alohida)`;

    document.getElementById('results-title').textContent = `${state.rooms} xonali uy — 3 ta loyiha`;
    document.getElementById('results-subtitle').textContent = `Hojatxona: ${bathInfo}`;

    setTimeout(() => {
        loader.classList.add('hidden');
        gallery.classList.remove('hidden');

        gallery.innerHTML = houseStyles.map((style, si) => {
            const imgUrl = style.exteriors[tier] + '?auto=format&fit=crop&w=800&q=80';
            const colorDots = state.selectedColors.map(h =>
                `<span class="color-dot-sm" style="background:${h}; ${h==='#FFFFFF'?'border:1px solid #ccc':''}"></span>`
            ).join('');
            return `
            <div class="result-house-card" style="--accent: ${state.selectedColors[si % state.selectedColors.length]}">
                <div class="result-card-img-wrap">
                    <img src="${imgUrl}" alt="${style.labelUz}" loading="lazy">
                    <div class="result-card-style-badge">${style.badge}</div>
                    <div class="result-card-color-overlay" style="background:${state.selectedColors[si%state.selectedColors.length]}; opacity:0.15; mix-blend-mode:color;"></div>
                </div>
                <div class="result-card-body">
                    <div class="result-card-top">
                        <i class="fa-solid ${style.icon}" style="color:var(--primary)"></i>
                        <h3>${style.labelUz}</h3>
                        <p class="result-card-desc">${style.desc}</p>
                    </div>
                    <div class="result-card-meta">
                        <div class="meta-row"><i class="fa-solid fa-door-open"></i><span>${state.rooms} xona</span></div>
                        <div class="meta-row"><i class="fa-solid fa-toilet"></i><span>${bathInfo}</span></div>
                        <div class="meta-row"><i class="fa-solid fa-palette"></i><span>${colorDots}</span></div>
                    </div>
                    <button class="view-house-btn" onclick="openHouseModal(${si})">
                        <i class="fa-solid fa-eye"></i> Uyni ko'rish
                    </button>
                </div>
            </div>`;
        }).join('');
    }, 1500);
}

// ==================== HOUSE MODAL ====================
function openHouseModal(styleIndex) {
    const style = houseStyles[styleIndex];
    const tier = getRoomTier();
    const floorPlan = style.floorPlans[tier];
    const roomList = buildRoomList();
    const modal = document.getElementById('house-modal');
    modal.classList.remove('hidden');

    let roomsHTML = roomList.map((roomName, i) => {
        const colorHex = state.selectedColors[i % state.selectedColors.length];
        const colorObj = colorsPalette.find(c => c.hex === colorHex) || { name: 'Maxsus', hex: colorHex };
        const colorNameUz = colorObj.name.split(' / ')[0];
        const pool = roomCatalog[roomName] || roomCatalog['Dahliz'];
        let matched = pool.filter(r => r.tags.includes(colorHex));
        if (!matched.length) matched = pool.filter(r => r.tags.some(t => state.selectedColors.includes(t)));
        if (!matched.length) matched = pool;
        const imgUrl = matched[(i + styleIndex) % matched.length].url + '?auto=format&fit=crop&w=600&q=80';
        return `
        <div class="modal-room-card" style="border:2px solid ${colorHex}40; box-shadow:0 8px 24px ${colorHex}20; border-radius:16px; overflow:hidden;">
            <div style="position:relative; height:180px; overflow:hidden;">
                <img src="${imgUrl}" alt="${roomName}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
                <div style="position:absolute;inset:0;background:${colorHex};opacity:0.2;mix-blend-mode:color;pointer-events:none;"></div>
                <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 55%,rgba(15,23,42,0.85));pointer-events:none;"></div>
                <div style="position:absolute;bottom:8px;left:10px;font-weight:700;color:#fff;font-size:0.95rem;text-shadow:0 1px 4px #000a">${roomName}</div>
            </div>
            <div style="padding:0.8rem 1rem;background:rgba(15,23,42,0.6);">
                <div style="display:inline-flex;align-items:center;gap:0.5rem;background:${colorHex}15;border:1px solid ${colorHex}40;padding:0.3rem 0.7rem;border-radius:20px;">
                    <span style="width:10px;height:10px;border-radius:50%;background:${colorHex};${colorHex==='#FFFFFF'?'border:1px solid #ccc':''}; display:inline-block;"></span>
                    <span style="color:${colorHex==='#FFFFFF'?'#fff':colorHex};font-size:0.8rem;font-weight:600;">${colorNameUz} uslubi</span>
                </div>
            </div>
        </div>`;
    }).join('');

    document.getElementById('house-modal-inner').innerHTML = `
        <h2 style="color:#fff;font-size:1.8rem;margin-bottom:0.5rem;">${style.labelUz} — Loyiha</h2>
        <p style="color:#94a3b8;margin-bottom:1.5rem;">${state.rooms} xona · ${style.desc}</p>

        <div class="modal-floor-plan-section">
            <h3 style="color:var(--primary);margin-bottom:1rem;font-size:1.1rem;display:flex;align-items:center;gap:0.5rem;">
                <i class="fa-solid fa-drafting-compass"></i> Chizma (3D rejasi)
            </h3>
            <div class="floor-plan-hero">
                <img src="${floorPlan}" alt="Chizma" style="width:100%;border-radius:16px;border:1px solid rgba(255,255,255,0.1);">
            </div>
        </div>

        <div class="modal-rooms-section">
            <h3 style="color:var(--primary);margin:1.5rem 0 1rem;font-size:1.1rem;display:flex;align-items:center;gap:0.5rem;">
                <i class="fa-solid fa-layer-group"></i> Xonalar (${roomList.length} ta)
            </h3>
            <div class="modal-gallery">${roomsHTML}</div>
        </div>
    `;
}

function closeHouseModal() {
    document.getElementById('house-modal').classList.add('hidden');
}

// ==================== FILTER MODAL ====================
let filterState = { rooms: null, selectedColors: [] };

function openFilterModal() {
    filterState.rooms = state.rooms;
    filterState.selectedColors = [...state.selectedColors];

    const rb = document.getElementById('filter-room-buttons');
    rb.innerHTML = '';
    for (let i = 2; i <= 7; i++) {
        rb.innerHTML += `<button class="select-btn ${filterState.rooms===i?'selected':''}" onclick="fSelectRoom(${i})">${i} xona</button>`;
    }

    const cc = document.getElementById('filter-colors-container');
    cc.innerHTML = colorsPalette.map((c, i) => `
        <div class="color-item ${filterState.selectedColors.includes(c.hex)?'selected':''}"
            style="background:${c.hex};${c.hex==='#FFFFFF'?'border:2px solid #ccc':''}"
            title="${c.name}" onclick="fToggleColor(${i})"></div>
    `).join('');

    updateFilterBtn();
    document.getElementById('filter-modal').classList.remove('hidden');
}

function closeFilterModal() { document.getElementById('filter-modal').classList.add('hidden'); }

function fSelectRoom(n) {
    filterState.rooms = n;
    document.querySelectorAll('#filter-room-buttons .select-btn').forEach(b => {
        b.classList.toggle('selected', b.textContent.includes(n));
    });
}

function fToggleColor(idx) {
    const hex = colorsPalette[idx].hex;
    const el = document.getElementById('filter-colors-container').children[idx];
    if (filterState.selectedColors.includes(hex)) {
        filterState.selectedColors = filterState.selectedColors.filter(c => c !== hex);
        el.classList.remove('selected');
    } else if (filterState.selectedColors.length < 3) {
        filterState.selectedColors.push(hex);
        el.classList.add('selected');
    }
    updateFilterBtn();
}

function updateFilterBtn() {
    const btn = document.getElementById('apply-filter-btn');
    const ok = filterState.selectedColors.length === 3 && filterState.rooms;
    btn.disabled = !ok;
    btn.classList.toggle('disabled', !ok);
}

function applyFilters() {
    state.rooms = filterState.rooms;
    state.selectedColors = [...filterState.selectedColors];
    closeFilterModal();
    showResults();
}

function toggleQR() {
    document.getElementById('qr-popup').classList.toggle('hidden');
}
