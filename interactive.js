let litKeysCount = 34;
const totalKeys = 88;
let audioEnabled = true;
let selectedAmount = 29;

// Audio Synthesizer using Web Audio API
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Play realistic warm piano note tone
function playNoteFrequency(freq) {
    if (!audioEnabled) return;
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
        console.log("Audio play error:", e);
    }
}

// Calculate note frequency for 88 keys
function getKeyFrequency(index) {
    return 27.5 * Math.pow(2, index / 12);
}

// Render 88-Key Piano Keyboard Layout
function renderPiano() {
    const pianoEl = document.getElementById('piano-keyboard');
    if (!pianoEl) return;
    
    pianoEl.innerHTML = '';

    const pattern = ['w', 'b', 'w', 'w', 'b', 'w', 'b', 'w', 'w', 'b', 'w', 'b']; 
    const litIndices = new Set([2, 5, 8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 40, 42, 45, 48, 52, 55, 58, 62, 65, 68, 70, 72, 75, 78, 80, 82, 84, 85, 86]);

    let whiteKeyOffset = 0;
    const isMobile = window.innerWidth < 640;
    const whiteKeyWidth = isMobile ? 28 : 40; // Largeur en px raccord avec le CSS
    const blackKeyOffset = isMobile ? 18 : 26;

    for (let i = 0; i < totalKeys; i++) {
        const noteType = pattern[i % 12];
        const isLit = litIndices.has(i);

        if (noteType === 'w') {
            const key = document.createElement('div');
            key.className = `white-key relative w-7 sm:w-10 h-44 sm:h-60 flex-shrink-0 cursor-pointer ${isLit ? 'lit' : ''}`;
            key.dataset.index = i;
            
            if (isLit) {
                key.innerHTML = `<div class="absolute bottom-3 left-1/2 -translate-x-1/2 text-orange-800 text-[10px] font-bold"><i class="fa-solid fa-house"></i></div>`;
            }

            key.addEventListener('mousedown', () => triggerKey(i, key));
            key.addEventListener('touchstart', (e) => { e.preventDefault(); triggerKey(i, key); });

            pianoEl.appendChild(key);
            whiteKeyOffset++;
        } else {
            const key = document.createElement('div');
            key.className = `black-key absolute w-4 sm:w-6 h-28 sm:h-36 cursor-pointer z-20 ${isLit ? 'lit' : ''}`;
            
            const leftPos = (whiteKeyOffset - 1) * whiteKeyWidth + blackKeyOffset;
            key.style.left = `${leftPos}px`;
            key.dataset.index = i;

            key.addEventListener('mousedown', (e) => { e.stopPropagation(); triggerKey(i, key); });
            key.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); triggerKey(i, key); });

            pianoEl.appendChild(key);
        }
    }
}

// Trigger Key Animation & Sound
function triggerKey(index, el) {
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 200);
if (noteType === 'w') {
            const key = document.createElement('div');
            key.className = `white-key relative w-7 sm:w-10 h-44 sm:h-60 flex-shrink-0 cursor-pointer ${isLit ? 'lit' : ''}`;
            key.dataset.index = i;
            
            if (isLit) {
                key.innerHTML = `<div class="absolute bottom-3 left-1/2 -translate-x-1/2 text-orange-800 text-[10px] font-bold"><i class="fa-solid fa-house"></i></div>`;
            }

            // Utilisation de pointerdown pour gérer à la fois la souris et le tactile de manière fluide
            key.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                triggerKey(i, key);
            });

            pianoEl.appendChild(key);
            whiteKeyOffset++;
        } else {
            const key = document.createElement('div');
            key.className = `black-key absolute w-4 sm:w-6 h-28 sm:h-36 cursor-pointer z-20 ${isLit ? 'lit' : ''}`;

            const leftPos = (whiteKeyOffset - 1) * whiteKeyWidth + blackKeyOffset;
            key.style.left = `${leftPos}px`;
            key.dataset.index = i;

            key.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerKey(i, key);
            });

            pianoEl.appendChild(key);
        }

// Audio toggle
function toggleAudio() {
    audioEnabled = !audioEnabled;
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-status-text');

    if (audioEnabled) {
        if (icon) icon.className = 'fa-solid fa-volume-high text-gold';
        if (text) text.innerText = 'Son Activé';
    } else {
        if (icon) icon.className = 'fa-solid fa-volume-xmark text-cream/40';
        if (text) text.innerText = 'Son Coupé';
    }
}

// Modal Controls
function openModal() {
    const modal = document.getElementById('donation-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('donation-modal');
    if (modal) modal.classList.add('hidden');
}

function selectAmount(amount) {
    selectedAmount = amount;
    const btns = document.querySelectorAll('.amount-btn');
    btns.forEach(btn => {
        if (btn.innerText.includes(amount)) {
            btn.className = 'amount-btn border-2 border-orange bg-orange/5 text-orange font-bold py-3 rounded-xl text-center text-sm focus:outline-none';
        } else {
            btn.className = 'amount-btn border-2 border-cream-200 hover:border-orange font-bold py-3 rounded-xl text-center text-sm focus:outline-none';
        }
    });
}

function handleDonation(event) {
    event.preventDefault();
    closeModal();
    
    litKeysCount = Math.min(88, litKeysCount + 1);
    updateCounter();

    showNotification(`Merci ! Votre soutien de ${selectedAmount}€ a illuminé une nouvelle touche du Piano des Toits !`);
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-6 right-6 z-50 bg-navy text-cream p-4 rounded-2xl shadow-2xl border border-orange/40 max-w-sm flex items-center gap-3 animate-bounce';
    notif.innerHTML = `
        <div class="w-8 h-8 bg-orange text-white rounded-full flex items-center justify-center shrink-0">
            <i class="fa-solid fa-check"></i>
        </div>
        <div class="text-xs">${message}</div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
}

// Initialisation sécurisée au chargement complet du DOM
document.addEventListener('DOMContentLoaded', function() {
    renderPiano();
    
    // Gestion du menu mobile s'il existe
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('hidden');
        });
    }
});

// Réactualisation de l'affichage du piano en cas de redimensionnement de fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderPiano, 250);
});