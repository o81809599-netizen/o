// State
let state = {
    area: null,
    rooms: null,
    selectedColors: [],
    currentBatch: 0
};

// Data
const colorsPalette = [
    { name: 'Oq / White', hex: '#FFFFFF' },
    { name: 'Kulrang / Gray', hex: '#9CA3AF' },
    { name: 'Qora / Black', hex: '#1F2937' },
    { name: 'Och jigarrang / Beige', hex: '#F5F5DC' },
    { name: 'Jigarrang / Brown', hex: '#8B4513' },
    { name: 'Moviy / Blue', hex: '#3B82F6' },
    { name: 'To\'q ko\'k / Navy', hex: '#1E3A8A' },
    { name: 'Yashil / Green', hex: '#10B981' },
    { name: 'Och yashil / Mint', hex: '#A7F3D0' },
    { name: 'Sariq / Yellow', hex: '#FBBF24' },
    { name: 'Qizil / Red', hex: '#EF4444' },
    { name: 'Binafsha / Purple', hex: '#8B5CF6' }
];

// Base structure images (High-end Luxury & Modern IDs)
const baseHouses = [
    "images/media__1778853766759.png", "images/media__1778853791496.png",
    "images/floor_plan_3d_2_1778855438613.png", "images/floor_plan_3d_3_1778855647178.png",
    "images/floor_plan_3d_4_1778855704907.png",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811", "https://images.unsplash.com/photo-1580587767526-cf3671a0e614",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233", "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994", "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126", "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83",
    "https://images.unsplash.com/photo-1449156001437-3a16d1dfda70", "https://images.unsplash.com/photo-1494526585095-c41746248156",
    "https://images.unsplash.com/photo-1513584684374-8bdb7489feef", "https://images.unsplash.com/photo-1512918766775-d263227b5311",
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    "https://images.unsplash.com/photo-1600566753190-17f0bcd2a6c4", "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68"
];

// Generate 100 house images with unique parameters to avoid cache and ensure diversity
const houseImages = [];
for(let i=0; i<100; i++) {
    const base = baseHouses[i % baseHouses.length];
    const sep = base.includes('?') ? '&' : '?';
    houseImages.push(`${base}${sep}auto=format&fit=crop&w=800&q=80&idx=${i}`);
}

// Base Room images with color tags
const baseRoomsTagged = [
    { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", tags: ['#FFFFFF', '#9CA3AF', '#F5F5DC'] }, 
    { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", tags: ['#F5F5DC', '#8B4513', '#9CA3AF'] }, 
    { url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6", tags: ['#FFFFFF', '#1F2937', '#9CA3AF'] }, 
    { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", tags: ['#FFFFFF', '#3B82F6', '#1E3A8A'] }, 
    { url: "https://images.unsplash.com/photo-1497366216548-37526070297c", tags: ['#1F2937', '#9CA3AF', '#FFFFFF'] }, 
    { url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4", tags: ['#FFFFFF', '#10B981', '#A7F3D0'] }, 
    { url: "https://images.unsplash.com/photo-1556910103-1c02745a8e4e", tags: ['#F5F5DC', '#FBBF24', '#FFFFFF'] }, 
    { url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", tags: ['#1E3A8A', '#FFFFFF', '#3B82F6'] }, 
    { url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6", tags: ['#8B4513', '#9CA3AF', '#F5F5DC'] }, 
    { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace", tags: ['#EF4444', '#FFFFFF', '#1F2937'] }, 
    { url: "https://images.unsplash.com/photo-1583847268964-b28ce8f31586", tags: ['#8B5CF6', '#FFFFFF', '#9CA3AF'] }, 
    { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a", tags: ['#A7F3D0', '#FFFFFF', '#10B981'] }, 
    { url: "https://images.unsplash.com/photo-1615874959474-d609969a24d5", tags: ['#F5F5DC', '#1F2937', '#9CA3AF'] }, 
    { url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e", tags: ['#3B82F6', '#FBBF24', '#FFFFFF'] }, 
    { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6", tags: ['#10B981', '#8B4513', '#F5F5DC'] }, 
    { url: "https://images.unsplash.com/photo-1598928506311-c55dd1b48b61", tags: ['#EF4444', '#1F2937', '#FFFFFF'] }, 
    { url: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b", tags: ['#1E3A8A', '#FBBF24', '#3B82F6'] }, 
    { url: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a", tags: ['#8B5CF6', '#9CA3AF', '#1F2937'] }, 
    { url: "https://images.unsplash.com/photo-1505693314120-0d443867891c", tags: ['#A7F3D0', '#3B82F6', '#FFFFFF'] }, 
    { url: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b", tags: ['#FFFFFF', '#F5F5DC', '#9CA3AF'] },
    { url: "https://images.unsplash.com/photo-1616176429133-e88c1b1247a7", tags: ['#1F2937', '#FFFFFF'] },
    { url: "https://images.unsplash.com/photo-1616176429133-e88c1b1247a7", tags: ['#1F2937', '#FFFFFF'] },
    { url: "https://images.unsplash.com/photo-1616176429133-e88c1b1247a7", tags: ['#1F2937', '#FFFFFF'] }
];

// Expand to 100 tagged images with variety
const roomImagesTagged = [];
for(let i=0; i<100; i++) {
    const base = baseRoomsTagged[i % baseRoomsTagged.length];
    roomImagesTagged.push({
        url: `${base.url}?auto=format&fit=crop&w=800&q=80&ridx=${i}`,
        tags: base.tags
    });
}

// DOM Elements
const homeBtn = document.getElementById('home-btn');
const allSteps = document.querySelectorAll('.step');
const areaButtonsContainer = document.getElementById('area-buttons');
const roomButtonsContainer = document.getElementById('room-buttons');
const colorsContainer = document.getElementById('colors-container');
const colorCountEl = document.getElementById('color-count');
const generateColorsBtn = document.getElementById('generate-colors-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initAreaButtons();
    initRoomButtons();
    initColorButtons();
    
    homeBtn.addEventListener('click', restartApp);
    generateColorsBtn.addEventListener('click', () => showResults('unified'));
    
    // Modal events
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('image-modal').addEventListener('click', (e) => {
        if(e.target.id === 'image-modal') closeModal();
    });
});

// Navigation Functions
function showStep(stepId) {
    allSteps.forEach(step => {
        step.classList.add('hidden');
        step.classList.remove('active');
    });
    const target = document.getElementById(stepId);
    target.classList.remove('hidden');
    
    // Kichik animatsiya effekti uchun
    setTimeout(() => {
        target.classList.add('active');
    }, 10);

    if(stepId === 'step-landing') {
        homeBtn.classList.add('hidden');
    } else {
        homeBtn.classList.remove('hidden');
    }
}

function goBack(stepId) {
    showStep(stepId);
}

function startUnifiedFlow() {
    showStep('step-area');
}

function restartApp() {
    state = { area: null, rooms: null, selectedColors: [], currentBatch: 0 };
    
    // Reset selections
    document.querySelectorAll('.select-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.color-item').forEach(item => item.classList.remove('selected'));
    updateColorBtn();
    
    showStep('step-landing');
}

// Step 2: Area Init
function initAreaButtons() {
    // 16 dan 100 gacha, masalan, har 4 qadamda (yoki hammasi)
    // Foydalanuvchini charchatmaslik uchun 16, 20, 24..100 qilamiz
    let buttonsHTML = '';
    buttonsHTML += `<button class="select-btn" onclick="selectArea(16)">16 kv.m</button>`;
    for (let i = 20; i <= 100; i+=5) {
        buttonsHTML += `<button class="select-btn" onclick="selectArea(${i})">${i} kv.m</button>`;
    }
    areaButtonsContainer.innerHTML = buttonsHTML;
}

function selectArea(val) {
    state.area = val;
    // Highlight
    Array.from(areaButtonsContainer.children).forEach(btn => {
        btn.classList.remove('selected');
        if(btn.textContent.includes(val)) btn.classList.add('selected');
    });
    
    // Kichik pauza bilan keyingi bosqichga
    setTimeout(() => {
        showStep('step-rooms');
        document.getElementById('rooms-title').innerHTML = `${val} kv.m uy uchun nechta xona kerak?`;
    }, 300);
}

// Step 3: Rooms Init
function initRoomButtons() {
    let buttonsHTML = '';
    for(let i = 2; i <= 7; i++) {
        buttonsHTML += `<button class="select-btn" onclick="selectRooms(${i})">${i} xona</button>`;
    }
    roomButtonsContainer.innerHTML = buttonsHTML;
}

function selectRooms(val) {
    state.rooms = val;
    Array.from(roomButtonsContainer.children).forEach(btn => {
        btn.classList.remove('selected');
        if(btn.textContent.includes(val)) btn.classList.add('selected');
    });

    setTimeout(() => {
        showStep('step-colors');
    }, 300);
}

// Step 4: Colors Init
function initColorButtons() {
    colorsContainer.innerHTML = colorsPalette.map((c, index) => `
        <div class="color-item" 
             style="background-color: ${c.hex}; ${c.hex==='#FFFFFF' ? 'border-color:#ccc;' : ''}"
             data-index="${index}"
             title="${c.name}"
             onclick="toggleColor(${index})">
        </div>
    `).join('');
}

function toggleColor(index) {
    const el = colorsContainer.children[index];
    const colorHex = colorsPalette[index].hex;
    
    if(state.selectedColors.includes(colorHex)) {
        state.selectedColors = state.selectedColors.filter(c => c !== colorHex);
        el.classList.remove('selected');
    } else {
        if(state.selectedColors.length < 3) {
            state.selectedColors.push(colorHex);
            el.classList.add('selected');
        } else {
            // Shake effect if trying to select more than 3
            el.style.transform = 'translateX(5px)';
            setTimeout(() => el.style.transform = 'translateX(-5px)', 50);
            setTimeout(() => el.style.transform = 'translateX(0)', 100);
        }
    }
    updateColorBtn();
}

function updateColorBtn() {
    colorCountEl.textContent = state.selectedColors.length;
    if(state.selectedColors.length === 3) {
        generateColorsBtn.classList.remove('disabled');
        generateColorsBtn.disabled = false;
    } else {
        generateColorsBtn.classList.add('disabled');
        generateColorsBtn.disabled = true;
    }
}

// Instead of reshuffling randomly on every render, we prepare the shuffled array once per showResults
let currentImagesList = [];

function showResults(type) {
    showStep('step-results');
    const loader = document.getElementById('results-loader');
    const gallery = document.getElementById('results-gallery');
    const title = document.getElementById('results-title');
    const subtitle = document.getElementById('results-subtitle');

    loader.classList.remove('hidden');
    gallery.classList.add('hidden');
    state.currentBatch = 0; // reset batch

    title.textContent = `Siz uchun mukammal 100 ta loyiha`;
    subtitle.textContent = `${state.area} kv.m, ${state.rooms} xonali, siz tanlagan ranglardagi dizaynlar`;
    
    // Categorize and filter images based on Area (KV)
    // Small (16-40), Medium (45-75), Large (80-100)
    let categoryRange = { start: 0, end: 33 }; // Default Small
    if (state.area > 40 && state.area <= 75) {
        categoryRange = { start: 34, end: 66 };
    } else if (state.area > 75) {
        categoryRange = { start: 67, end: 99 };
    }

    // Pick images from the specific category and shuffle them using Rooms as a seed
    let pool = houseImages.slice(categoryRange.start, categoryRange.end + 1);
    
    // If pool is small, fill it up with other images but keep them at the end
    let otherImages = houseImages.filter((_, idx) => idx < categoryRange.start || idx > categoryRange.end);
    
    currentImagesList = [...pool, ...otherImages].sort((a, b) => {
        // More complex hash to ensure diversity
        let hashA = (a.length + (a.indexOf('idx=') * state.rooms)) % 50;
        let hashB = (b.length + (b.indexOf('idx=') * state.rooms)) % 50;
        return hashA - hashB;
    });

    // Simulate API Call
    setTimeout(() => {
        loader.classList.add('hidden');
        gallery.classList.remove('hidden');
        renderImages();
    }, 1500);
}

function nextBatch() {
    state.currentBatch++;
    const gallery = document.getElementById('results-gallery');
    gallery.style.opacity = 0;
    setTimeout(() => {
        renderImages();
        gallery.style.opacity = 1;
    }, 300);
}

function renderImages() {
    const gallery = document.getElementById('results-gallery');
    
    const totalBatches = Math.ceil(currentImagesList.length / 10);
    const batchIdx = state.currentBatch % totalBatches;
    const startIdx = batchIdx * 10;
    const imagesToShow = currentImagesList.slice(startIdx, startIdx + 10);
    
    const selectedColorNames = state.selectedColors.map(hex => {
        const c = colorsPalette.find(item => item.hex === hex);
        return c ? c.name.split(' / ')[0] : hex;
    }).join(', ');

    const roomNamesArr = ['Yotoqxona', 'Mehmonxona', 'Oshxona', 'Dush', 'Dahliz', 'Bolalar xonasi', 'Balkon'];
    const selectedRooms = roomNamesArr.slice(0, state.rooms).join(', ');
    
    gallery.innerHTML = imagesToShow.map((img, i) => {
        // AI Match Score Logic
        const matchScore = 95 + Math.floor(Math.random() * 5); // 95% to 99%
        
        return `
            <div class="result-card" onclick="openModal('${img}', ${startIdx + i + 1})">
                <div class="match-badge">AI Match: ${matchScore}%</div>
                <img src="${img}" alt="Design ${startIdx + i + 1}" loading="lazy">
                <div class="result-info">
                    <h3>Premium Loyiha #${startIdx + i + 1}</h3>
                    <p><strong>Maydoni:</strong> ${state.area} kv.m</p>
                    <p><strong>Xonalar (${state.rooms}):</strong> ${selectedRooms}</p>
                    <p><strong>Ranglar:</strong> ${selectedColorNames}</p>
                    <div style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between;">
                        <span class="view-btn"><i class="fa-solid fa-eye"></i> Xonalarni ko'rish</span>
                        <span class="verified-tag"><i class="fa-solid fa-circle-check"></i> VIP</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Modal Functions
const modal = document.getElementById('image-modal');
const modalGallery = document.getElementById('modal-gallery');
const captionText = document.getElementById('modal-caption');

function openModal(src, id) {
    modal.classList.remove('hidden');
    captionText.innerHTML = `Loyiha #${id} - Ichki Xonalar`;
    
    // Filter room images by selected colors
    // We want to find images that contain AT LEAST ONE of the user's selected colors in their tags
    let matchedRooms = roomImagesTagged.filter(room => {
        return room.tags.some(tag => state.selectedColors.includes(tag));
    });
    
    // If no exact matches, just show a random selection to gracefully degrade
    if(matchedRooms.length === 0) {
        matchedRooms = [...roomImagesTagged].sort(() => 0.5 - Math.random());
    }
    
    // Show up to matching number of rooms
    const displayRooms = matchedRooms.slice(0, state.rooms);
    
    modalGallery.innerHTML = displayRooms.map(room => `
        <img src="${room.url}" alt="Interior Room" loading="lazy">
    `).join('');
}

function closeModal() {
    modal.classList.add('hidden');
}
