// State
let state = {
    mode: null, // 'structure' or 'colors'
    area: null,
    rooms: null,
    selectedColors: []
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

const houseImages = [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687931-570a59b925b6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
];

const roomImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745a8e4e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
];

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
    
    // Landing Cards Clicks
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            state.mode = card.dataset.action;
            if(state.mode === 'structure') {
                showStep('step-area');
            } else {
                showStep('step-colors');
            }
        });
    });

    homeBtn.addEventListener('click', restartApp);
    generateColorsBtn.addEventListener('click', () => showResults('colors'));
    
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

function restartApp() {
    state = { mode: null, area: null, rooms: null, selectedColors: [] };
    
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
        showResults('structure');
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

// Step 5: Results Handling
function showResults(type) {
    showStep('step-results');
    const loader = document.getElementById('results-loader');
    const gallery = document.getElementById('results-gallery');
    const title = document.getElementById('results-title');
    const subtitle = document.getElementById('results-subtitle');

    loader.classList.remove('hidden');
    gallery.classList.add('hidden');

    if(type === 'structure') {
        title.textContent = `${state.area} kv.m maydondagi ${state.rooms} xonali loyihalar`;
        subtitle.textContent = "Siz uchun tanlangan eng yaxshi 10 ta uy arxitekturasi";
    } else {
        title.textContent = "Tanlangan ranglardagi xona interyerlari";
        subtitle.textContent = "Siz tanlagan 3 ta rang uyg'unligidagi 10 xil dizayn";
    }

    // Simulate API Call
    setTimeout(() => {
        loader.classList.add('hidden');
        gallery.classList.remove('hidden');
        renderImages(type);
    }, 1500);
}

function renderImages(type) {
    const gallery = document.getElementById('results-gallery');
    const sourceImages = type === 'structure' ? houseImages : roomImages;
    
    // Suffle array roughly for uniqueness effect on multiple plays
    const shuffled = [...sourceImages].sort(() => 0.5 - Math.random());
    
    gallery.innerHTML = shuffled.slice(0, 10).map((img, i) => `
        <div class="result-card" onclick="openModal('${img}', '${type === 'structure' ? `Loyiha #${i+1} (${state.area}kv, ${state.rooms} xona)` : `Interyer #${i+1}`}')">
            <img src="${img}" alt="Design ${i+1}" loading="lazy">
            <div class="result-info">
                <h3>${type === 'structure' ? 'Loyiha' : 'Interyer'} #${i+1}</h3>
            </div>
        </div>
    `).join('');
}

// Modal Functions
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('modal-caption');

function openModal(src, caption) {
    modal.classList.remove('hidden');
    modalImg.src = src;
    captionText.innerHTML = caption;
}

function closeModal() {
    modal.classList.add('hidden');
}
