/* 
 ==========================================
   UNDER THE SAME SKY - CORE JAVASCRIPT
 ==========================================
   This engine manages:
   1. A central, easy-to-edit configuration block.
   2. A custom lag-free cursor trailer.
   3. An optimized 60FPS background starfield & shooting stars.
   4. A high-performance canvas-based particle morphing text engine.
   5. A Web Audio API romantic piano synthesizer fallback.
   6. A high-fidelity relationship count-up clock.
   7. Photo lightboxes and secret glassmorphism letter events.
*/

// =========================================================================
// 1. CONFIGURATION SYSTEM (Customize your girlfriend's details here!)
// =========================================================================
const CONFIG = {
    // 1. Her Name (Use ALL CAPS for best typographic alignment in star constellation)
    girlfriendName: "SHAKI",

    // 2. The Start Date of your Relationship (YYYY-MM-DDTHH:MM:SS format)
    startDate: "2026-04-01T00:00:00",

    // 3. Path to your background music MP3.
    // NOTE: If this file is missing or fails to load, the script will automatically 
    // activate a gorgeous, built-in ambient piano synthesizer using the Web Audio API!
    musicSrc: "assets/The Beloved.mp3",

    // 4. Memory Gallery Photos: URLs and Captions
    photos: [
        { url: "assets/photo1.jpg", caption: "A beautiful butterfly ring for a beautiful soul 🦋" },
        { url: "assets/photo2.jpg", caption: "Your smile is my favorite constellation ✨" },
        { url: "assets/photo3.jpg", caption: "Sweet moments and magic adventures together ❤️" }
    ],

    // 5. Secret Love Letter content (Opens by clicking the realistic glowing Moon)
    loveLetter: {
        greeting: "My Dearest Shaki,",
        body: "Out of all the stars in the universe, you're my absolute favorite one.\n\nThank you for bringing warmth, infinite laughter, and beautiful light into my life. Every single day spent by your side is a gift I will always cherish. Even when we are apart, I look up at the night sky and know we are looking at the very same moon and stars.\n\nThank you for being part of my life. I love you beyond words.",
        closing: "With all my love, always ❤️"
    }
};


// =========================================================================
// 2. INITIALIZATION & STATE MANAGEMENT
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Dynamically insert partner's name in Landing Screen
    const namePlaceholder = document.getElementById("partner-name-landing");
    if (namePlaceholder) {
        namePlaceholder.textContent = CONFIG.girlfriendName;
    }

    // Set up Letter greeting/closing
    document.getElementById("letter-greeting").textContent = CONFIG.loveLetter.greeting;
    document.getElementById("letter-closing").textContent = CONFIG.loveLetter.closing;

    initCursor();
    initAudioSystem();
    initRelationshipCounter();
    initMemoryGallery();
    initLetterPopup();
    initHeartsGenerator();
    init3dTilt();
    initScrollReveals(); // Narrative reveals
    initWishSystem(); // Wish starlight engine
    initGiftBox(); // Surprise gift box engine

    // CRITICAL VISIBILITY UPGRADE: Wait for custom Google Font (Outfit) to be fully loaded
    // before initializing the starfield canvas and scanning the name text coordinate matrix!
    // Scanning immediately causes a fallback to thin system fonts. waiting guarantees
    // the true ultra-bold premium Outfit typography is scanned!
    if (document.fonts) {
        document.fonts.ready.then(() => {
            initStarfieldCanvas();
        });
    } else {
        setTimeout(initStarfieldCanvas, 600);
    }
});


// =========================================================================
// 3. CURSOR ENGINE (Delicate trailing indicator)
// =========================================================================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let cursorDotX = 0, cursorDotY = 0;

function initCursor() {
    const cursor = document.getElementById("cursor");
    const cursorDot = document.getElementById("cursor-dot");

    if (!cursor || !cursorDot) return;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Elegant linear interpolation (lerp) loop for buttery smooth trails
    function renderCursor() {
        // Outer glow circle trailer (slower lag)
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Inner solid dot trailer (faster response)
        cursorDotX += (mouseX - cursorDotX) * 0.3;
        cursorDotY += (mouseY - cursorDotY) * 0.3;
        cursorDot.style.left = `${cursorDotX}px`;
        cursorDot.style.top = `${cursorDotY}px`;

        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover triggers
    const interactives = document.querySelectorAll(".clickable, button, .polaroid-card, .moon, a");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hovered");
            cursorDot.style.backgroundColor = "var(--accent-love)";
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovered");
            cursorDot.style.backgroundColor = "var(--moonlight-white)";
        });
    });
}


// =========================================================================
// 4. MUSIC & SYNTHESIZER SYSTEM
// =========================================================================
let audioContext = null;
let isAudioPlaying = false;
let realAudioElement = null;
let synthTimer = null;
let synthNodes = []; // Track active oscillators for smooth cleanup
let audioSourceConnected = false;
let analyserNode = null;

function initAudioSystem() {
    const musicToggle = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    const equalizer = document.getElementById("equalizer");

    // Create actual HTML audio element for fallback check
    realAudioElement = new Audio();
    realAudioElement.src = CONFIG.musicSrc;
    realAudioElement.loop = true;
    realAudioElement.volume = 0.5;

    // Triggered upon Clicking "Begin Journey"
    const beginBtn = document.getElementById("begin-btn");
    beginBtn.addEventListener("click", () => {
        startJourney();
    });

    musicToggle.addEventListener("click", () => {
        toggleMusicState();
    });
}

function startJourney() {
    // Initialize Web Audio context on user interaction (modern browser requirement)
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
        audioContext = new AudioContextClass();
        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 64; // Small fftSize for light performance
        analyserNode.connect(audioContext.destination);
    }

    if (audioContext && !audioSourceConnected && realAudioElement) {
        try {
            const source = audioContext.createMediaElementSource(realAudioElement);
            source.connect(analyserNode);
            audioSourceConnected = true;
        } catch (e) {
            console.warn("Could not connect audio source to visualizer", e);
        }
    }

    // Try playing real MP3 file first.
    realAudioElement.play()
        .then(() => {
            setMusicUI(true);
        })
        .catch(err => {
            console.log("MP3 file not found or blocked. Initializing dynamic ambient piano synthesizer fallback.");
            playSynthMusic();
            setMusicUI(true);
        });

    // Start transition
    const landing = document.getElementById("landing-screen");
    const canvas = document.getElementById("star-canvas");

    landing.classList.add("fade-out");
    canvas.style.opacity = "1";

    // Zoom/drift stars into cinematic view before morphing
    setTimeout(() => {
        // Trigger particle text morphing
        assembleConstellation();
    }, 2200);
}

function toggleMusicState() {
    if (isAudioPlaying) {
        // Pause audio
        if (realAudioElement && !realAudioElement.paused) {
            realAudioElement.pause();
        }
        stopSynthMusic();
        setMusicUI(false);
    } else {
        // Play audio
        if (audioContext && audioContext.state === "suspended") {
            audioContext.resume();
        }

        if (audioContext && !audioSourceConnected && realAudioElement) {
            try {
                const source = audioContext.createMediaElementSource(realAudioElement);
                source.connect(analyserNode);
                audioSourceConnected = true;
            } catch (e) {
                console.warn("Could not connect audio source to visualizer", e);
            }
        }

        realAudioElement.play()
            .then(() => {
                setMusicUI(true);
            })
            .catch(() => {
                playSynthMusic();
                setMusicUI(true);
            });
    }
}

function setMusicUI(playing) {
    isAudioPlaying = playing;
    const musicIcon = document.getElementById("music-icon");
    const equalizer = document.getElementById("equalizer");

    if (playing) {
        musicIcon.className = "fas fa-volume-up";
        equalizer.classList.add("playing");
    } else {
        musicIcon.className = "fas fa-volume-mute";
        equalizer.classList.remove("playing");
    }
}

// -------------------------------------------------------------------------
// DYNAMIC WEB AUDIO ROMANTIC SYNTHESIZER
// Generates warm, ambient piano arpeggios programmatically.
// -------------------------------------------------------------------------
const romanticChords = [
    [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj7 (C3, G3, B3, E4, G4)
    [110.00, 164.81, 220.00, 261.63, 329.63], // Am7 (A2, E3, A3, C4, E4)
    [87.31, 130.81, 174.61, 220.00, 261.63],  // Fmaj7 (F2, C3, F3, A3, C4)
    [98.00, 146.83, 196.00, 246.94, 293.66]   // G6 (G2, D3, G3, B3, D4)
];

const arpeggioPattern = [0, 2, 1, 3, 2, 4, 3, 1]; // Twinkling note progression
let chordIndex = 0;
let noteTick = 0;

function playSynthMusic() {
    if (!audioContext) return;

    isAudioPlaying = true;
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Play loop
    synthTimer = setInterval(() => {
        if (!isAudioPlaying) return;

        const currentChord = romanticChords[chordIndex];

        // Every 8 ticks (3.2 seconds), transition to the next chord
        if (noteTick % 8 === 0) {
            // Play a warm base note on the chord change
            playSoftSynthNote(currentChord[0], 0.22, 1.8, "triangle");
            playSoftSynthNote(currentChord[1], 0.15, 1.4, "sine");
        }

        // Play arpeggio note
        const noteIndex = arpeggioPattern[noteTick % 8];
        const pitch = currentChord[noteIndex] * 2; // Arpeggio pitched higher

        // Play twinkling piano arpeggios with triangle oscillator & reverb simulator
        playSoftSynthNote(pitch, 0.08, 0.9, "triangle");

        noteTick++;
        if (noteTick % 8 === 0) {
            chordIndex = (chordIndex + 1) % romanticChords.length;
        }
    }, 400); // 400ms pace
}

function playSoftSynthNote(frequency, volume, duration, type) {
    if (!audioContext || audioContext.state === 'suspended') return;

    try {
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioContext.currentTime);

        // Warm analog low-pass filter
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, audioContext.currentTime);
        filter.Q.setValueAtTime(1, audioContext.currentTime);

        // Smooth volumetric envelope (Attack, Decay, Sustain, Release)
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.08); // 80ms Attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration); // Long Release

        osc.connect(filter);
        filter.connect(gainNode);

        if (analyserNode) {
            gainNode.connect(analyserNode);
        } else {
            gainNode.connect(audioContext.destination);
        }

        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + duration);

        synthNodes.push(osc);
        // Garbage collect nodes
        setTimeout(() => {
            const index = synthNodes.indexOf(osc);
            if (index > -1) synthNodes.splice(index, 1);
        }, duration * 1000 + 100);

    } catch (e) {
        console.error("Synthesizer error", e);
    }
}

function stopSynthMusic() {
    isAudioPlaying = false;
    if (synthTimer) {
        clearInterval(synthTimer);
        synthTimer = null;
    }
    // Fade out active oscillators gracefully
    synthNodes.forEach(node => {
        try {
            node.stop();
        } catch (e) { }
    });
    synthNodes = [];
}


// =========================================================================
// 5. CINEMATIC CANVASES: STARFIELD & CONSTELLATION MORPH
// =========================================================================
let canvas, ctx;
let stars = [];
let particles = [];
let shootingStars = [];
let animationFrameId;

// Logical width & height variables for High-DPI HD rendering
let width = window.innerWidth;
let height = window.innerHeight;

// State management
let constellationAssembling = false;
let constellationComplete = false;
let constellationOpacity = 1.0; // Global opacity multiplier for fixed text to prevent scrolling overlap
const MAX_PARTICLES = 1600;

function initStarfieldCanvas() {
    canvas = document.getElementById("star-canvas");
    ctx = canvas.getContext("2d", { willReadFrequently: true });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize Twinkling Starfield with 3 distinct Parallax Depth layers
    for (let i = 0; i < 220; i++) {
        const depth = Math.floor(Math.random() * 3); // 0: far, 1: mid, 2: close
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.3 + 0.15 + (depth * 0.45), // Close stars are larger
            opacity: Math.random(),
            twinkleSpeed: 0.007 + Math.random() * 0.014,
            color: Math.random() > 0.85 ? "rgba(255, 101, 132, 0.7)" : "rgba(255, 255, 255, 0.7)",
            depth: depth
        });
    }

    // Initialize Swirling Nebula Particles (floating initially)
    for (let i = 0; i < MAX_PARTICLES; i++) {
        // Star particle constructor
        particles.push(new ConstellationStar());
    }

    // Begin render frame loop
    drawCanvasFrame();
}

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Scale drawing buffer to physical pixels for crystal-clear HD text and stars
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Maintain CSS dimensions in logical pixels
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // Scale context drawing actions automatically
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
}

// Particle Class
class ConstellationStar {
    constructor() {
        // Start as floating orbital ring around center
        const angle = Math.random() * Math.PI * 2;
        const radius = 200 + Math.random() * 250;

        this.x = width / 2 + Math.cos(angle) * radius;
        this.y = height / 2 + Math.sin(angle) * radius;

        // Target positioning (bound later during text scan)
        this.targetX = null;
        this.targetY = null;

        // Physics
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.baseVx = this.vx;
        this.baseVy = this.vy;

        this.size = Math.random() * 1.8 + 0.6;
        this.alpha = 0.2 + Math.random() * 0.75;
        this.twinklePhase = Math.random() * Math.PI;
        this.arrived = false;

        // Steering properties
        this.maxSpeed = 3.5 + Math.random() * 4.5;
        this.damping = 0.90 + Math.random() * 0.05;
        this.accel = 0.08 + Math.random() * 0.12;
    }

    update() {
        // If assembling constellation, steer towards targets
        if (constellationAssembling && this.targetX !== null) {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 1.5) {
                // Settle at target
                this.x = this.targetX;
                this.y = this.targetY;
                this.vx = 0;
                this.vy = 0;
                this.arrived = true;
            } else {
                // High-fidelity seek-and-arrive force vectoring
                const speedLimit = Math.min(this.maxSpeed, dist * 0.12);
                const tx = (dx / dist) * speedLimit;
                const ty = (dy / dist) * speedLimit;

                // Push velocities gently
                this.vx += (tx - this.vx) * this.accel;
                this.vy += (ty - this.vy) * this.accel;

                this.x += this.vx;
                this.y += this.vy;
            }
        } else {
            // Cosmic drift (prior to assembling)
            const angle = Math.atan2(this.y - height / 2, this.x - width / 2);
            // Swirl orbital rotation force
            this.vx += Math.cos(angle + Math.PI / 2) * 0.002;
            this.vy += Math.sin(angle + Math.PI / 2) * 0.002;

            this.x += this.vx;
            this.y += this.vy;

            // Boundary loop
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.x = width / 2 + (Math.random() - 0.5) * 100;
                this.y = height / 2 + (Math.random() - 0.5) * 100;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
            }
        }

        // Twinkling animation
        this.twinklePhase += 0.02;
        this.alpha = 0.35 + Math.sin(this.twinklePhase) * 0.5;
    }

    draw() {
        // Draw the glowing core star with global constellationOpacity multiplier
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * constellationOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft, organic radial stardust glow for arrived constellation stars (Neon pink/rose glow)
        if (this.arrived) {
            const glowSize = this.size * (this.size > 1.3 ? 6.5 : 5.0);
            const glowGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
            // Neon rose/gold color bleed
            glowGrad.addColorStop(0, `rgba(255, 101, 132, ${this.alpha * 0.45 * constellationOpacity})`); // Core neon pink
            glowGrad.addColorStop(0.4, `rgba(217, 70, 239, ${this.alpha * 0.15 * constellationOpacity})`); // Inner purple halo
            glowGrad.addColorStop(1, 'rgba(217, 70, 239, 0)');

            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// -------------------------------------------------------------------------
// TEXT SCANNING FOR STAR PLACEMENT
// Renders the text on a hidden canvas and extracts letter coordinates.
// -------------------------------------------------------------------------
function scanConstellationName() {
    const textCanvas = document.createElement("canvas");
    const tctx = textCanvas.getContext("2d");

    // Match logical window sizing
    textCanvas.width = width;
    textCanvas.height = height;

    // Choose beautiful premium font - using 900 for ultra-bold thickness
    // Also increase the size slightly on mobile for high legibility
    const fontSize = Math.min(width * 0.14, 120);
    tctx.font = `900 ${fontSize}px 'Outfit', sans-serif`;
    tctx.fillStyle = "#ffffff";
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";

    // Apple-style typography thickness upgrade:
    // We add a subtle glowing blur shadow to the text canvas, which naturally thickens the strokes,
    // packing the particles densely and making them extremely legible!
    tctx.shadowBlur = 6;
    tctx.shadowColor = "#ffffff";

    // Write her name in middle
    tctx.fillText(CONFIG.girlfriendName, textCanvas.width / 2, textCanvas.height / 2);

    // Scan pixel matrix
    const imgData = tctx.getImageData(0, 0, textCanvas.width, textCanvas.height);
    const pixels = imgData.data;
    const coordinates = [];

    // Grid search resolution - reduced step size for high star density!
    const step = width < 600 ? 3 : 4;

    for (let y = 0; y < textCanvas.height; y += step) {
        for (let x = 0; x < textCanvas.width; x += step) {
            const index = (y * textCanvas.width + x) * 4;
            const alpha = pixels[index + 3];

            if (alpha > 128) {
                coordinates.push({ x, y });
            }
        }
    }

    return coordinates;
}

function assembleConstellation() {
    const targets = scanConstellationName();

    // Shuffle targets to map randomly to particles for an elegant explosion assembly
    targets.sort(() => Math.random() - 0.5);

    // Map targets to particles
    for (let i = 0; i < particles.length; i++) {
        if (i < targets.length) {
            particles[i].targetX = targets[i].x;
            particles[i].targetY = targets[i].y;
        } else {
            // Unused particles drift away into space
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.max(width, height) * 0.7;
            particles[i].targetX = width / 2 + Math.cos(angle) * dist;
            particles[i].targetY = height / 2 + Math.sin(angle) * dist;
            particles[i].size = Math.random() * 0.5; // shrink them
        }
        particles[i].arrived = false;
    }

    constellationAssembling = true;

    // Monitor arrival progress
    const arrivalCheckInterval = setInterval(() => {
        let arrivedCount = 0;
        let totalCount = 0;

        particles.forEach(p => {
            if (p.targetX !== null && p.targetX < width && p.targetY < height) {
                totalCount++;
                if (p.arrived) arrivedCount++;
            }
        });

        const ratio = arrivedCount / (totalCount || 1);

        if (ratio > 0.95 || !constellationAssembling) {
            clearInterval(arrivalCheckInterval);
            triggerTransitionToDashboard();
        }
    }, 400);
}

function triggerTransitionToDashboard() {
    constellationComplete = true;

    // Fade in romantic handwritten note
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.classList.add("visible");

    // Start cyclic Interstellar quote rotation
    startQuoteRotation();

    // Smoothly fade in main relationship dash elements
    setTimeout(() => {
        const interactiveDash = document.getElementById("interactive-interface");
        interactiveDash.style.display = "block";

        // Force reflow for CSS opacity fade
        interactiveDash.offsetHeight;
        interactiveDash.classList.add("active");

        // Slide / reposition page scroll so the user can scrolling discover content
        document.body.style.overflowY = "auto";

        // Fade in dynamic bouncing scroll indicator
        const scrollPrompt = document.getElementById("scroll-prompt");
        if (scrollPrompt) {
            scrollPrompt.style.opacity = "0.7";
        }
    }, 3500);
}

// -------------------------------------------------------------------------
// CANVAS FRAME RENDERING LOOP
// -------------------------------------------------------------------------
let constellationFlares = []; // Track glittering spark tracers along constellation outline
let wishStars = []; // Clickable pulsing wishes in canvas sky
let wishExplosions = []; // Cosmic spark explosion particles

function drawCanvasFrame() {
    // 1. Draw rich cosmos deep space gradient background
    const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, width * 0.8
    );
    gradient.addColorStop(0, '#0a0a20');
    gradient.addColorStop(0.5, '#050512');
    gradient.addColorStop(1, '#020206');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Render base starfield with multi-layered Parallax scrolling offsets (with soft neon bloom)
    stars.forEach(star => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
            star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Parallax multipliers (based on cursor distance + vertical page scroll)
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
        const dx = (mouseX - width / 2) * (star.depth * 0.015);
        const dy = (mouseY - height / 2) * (star.depth * 0.015) + (currentScroll * (star.depth * 0.08));

        let drawX = star.x - dx;
        let drawY = star.y - dy; // Offset in opposite scroll direction

        // Screen boundary wrapping
        if (drawX < 0) drawX += width;
        if (drawX > width) drawX -= width;
        if (drawY < 0) drawY += height;
        if (drawY > height) drawY -= height;

        // Core star
        ctx.fillStyle = star.color.replace('0.7', star.opacity.toFixed(2));
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Neon star halo
        ctx.fillStyle = star.color.replace('0.7', (star.opacity * 0.3).toFixed(2));
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size * 3.0, 0, Math.PI * 2);
        ctx.fill();
    });

    // 3. Render and update dynamic swarming particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // 4. Draw starry constellation linking skeleton with global fade
    if (constellationAssembling) {
        ctx.strokeStyle = `rgba(255, 101, 132, ${0.075 * constellationOpacity})`; // Soft neon pink connectors
        ctx.lineWidth = 0.75;

        // To keep frame rate high, we sample connected lines selectively
        const listLength = particles.length;
        const scanRatio = width < 600 ? 5 : 3;

        for (let i = 0; i < listLength; i += scanRatio) {
            const p1 = particles[i];
            if (!p1.arrived) continue;

            let connections = 0;
            for (let j = i + 1; j < listLength; j += 6) {
                const p2 = particles[j];
                if (!p2.arrived) continue;

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const d = dx * dx + dy * dy;

                // If particles are within tight 45px distance draw links
                if (d < 2000) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();

                    connections++;
                    if (connections > 2) break; // Limit connection links to preserve FPS
                }
            }
        }
    }

    // 4.5 Render and update Celestial Flares (glowing electric traces)
    if (constellationComplete && Math.random() < 0.015) {
        const arrived = particles.filter(p => p.arrived);
        if (arrived.length > 5) {
            const p1 = arrived[Math.floor(Math.random() * arrived.length)];
            // Find nearby arrived neighbors
            const neighbors = [];
            arrived.forEach(p2 => {
                if (p1 !== p2) {
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const d = dx * dx + dy * dy;
                    if (d < 2000) neighbors.push(p2);
                }
            });
            if (neighbors.length > 0) {
                const p2 = neighbors[Math.floor(Math.random() * neighbors.length)];
                constellationFlares.push({
                    p1: p1,
                    p2: p2,
                    t: 0,
                    speed: 0.02 + Math.random() * 0.03,
                    color: Math.random() > 0.6 ? "rgba(255, 101, 132, 0.9)" : "rgba(255, 255, 255, 0.9)"
                });
            }
        }
    }

    constellationFlares.forEach((f, idx) => {
        f.t += f.speed;

        // Lerp positions
        const x = f.p1.x + (f.p2.x - f.p1.x) * f.t;
        const y = f.p1.y + (f.p2.y - f.p1.y) * f.t;

        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = f.color;

        // Spark core - reacting to scroll fade
        ctx.fillStyle = f.color.replace('0.9', (0.95 * constellationOpacity).toFixed(2));
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Spark halo glow - reacting to scroll fade
        ctx.fillStyle = f.color.replace('0.9', (0.35 * constellationOpacity).toFixed(2));
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (f.t >= 1) {
            constellationFlares.splice(idx, 1);
        }
    });

    // 4.6. Render and update permanent Wish Stars twinkling
    wishStars.forEach(ws => {
        ws.pulsePhase += ws.pulseSpeed;
        ws.opacity = 0.6 + Math.sin(ws.pulsePhase) * 0.4;

        ctx.fillStyle = ws.color.replace('0.9', ws.opacity.toFixed(2));
        ctx.beginPath();
        ctx.arc(ws.x, ws.y, ws.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = ws.color.replace('0.9', (ws.opacity * 0.22).toFixed(2));
        ctx.beginPath();
        ctx.arc(ws.x, ws.y, ws.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // 4.7. Render and update dynamic Wish Explosions upward sparks
    wishExplosions.forEach((we, idx) => {
        we.x += we.vx;
        we.y += we.vy;

        // Deceleration friction + gentle gravity pull
        we.vx *= 0.98;
        we.vy *= 0.98;
        we.vy += 0.06; // Soft downwards gravity pull
        we.opacity -= we.fadeSpeed;

        ctx.fillStyle = we.color.replace('0.95', we.opacity.toFixed(2));
        ctx.beginPath();
        ctx.arc(we.x, we.y, we.size, 0, Math.PI * 2);
        ctx.fill();

        if (we.opacity <= 0) {
            wishExplosions.splice(idx, 1);
        }
    });

    // 5. Shooting Star engine (Vibrant Neon Comets)
    if (Math.random() < 0.0075) { // Spawn chance
        const colors = ["rgba(255, 101, 132, 0.95)", "rgba(56, 189, 248, 0.95)", "rgba(251, 191, 36, 0.95)", "rgba(217, 70, 239, 0.95)"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        shootingStars.push({
            x: Math.random() * width * 0.7,
            y: Math.random() * height * 0.4,
            length: 80 + Math.random() * 90,
            speed: 12 + Math.random() * 15,
            thickness: Math.random() * 1.5 + 0.8,
            opacity: 1,
            fadeSpeed: 0.02 + Math.random() * 0.015,
            color: randomColor
        });
    }

    shootingStars.forEach((s, idx) => {
        ctx.save();
        
        // High-DPI Neon Shadow parameters
        ctx.shadowBlur = 18;
        ctx.shadowColor = s.color;
        ctx.strokeStyle = s.color.replace('0.95', s.opacity.toFixed(2));
        ctx.lineWidth = s.thickness;
        
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        // Draw trailing diagonal tail
        ctx.lineTo(s.x + s.length, s.y + s.length * 0.5);
        ctx.stroke();
        
        ctx.restore();

        // Move shooting star
        s.x += s.speed;
        s.y += s.speed * 0.5;
        s.opacity -= s.fadeSpeed;

        if (s.opacity <= 0) {
            shootingStars.splice(idx, 1);
        }
    });

    // 6. Update Audio Reactive visualizer for Singing Moon
    if (analyserNode && isAudioPlaying) {
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(dataArray);

        // Calculate average amplitude of the lower/bass frequencies (index 0 to 4)
        let sum = 0;
        const sampleSize = Math.min(5, dataArray.length);
        for (let i = 0; i < sampleSize; i++) {
            sum += dataArray[i];
        }
        const average = sum / sampleSize;

        // Map range 0-255 to dynamic scale 1.0 to 1.35
        const targetScale = 1.0 + (average / 255) * 0.35;

        // Smooth out the scaling (lerp) to avoid flashing too abruptly
        let currentScale = parseFloat(document.documentElement.style.getPropertyValue('--audio-glow-scale')) || 1.0;
        currentScale += (targetScale - currentScale) * 0.15;

        document.documentElement.style.setProperty('--audio-glow-scale', currentScale.toFixed(3));
    } else {
        // Return to base scale of 1.0 when audio is paused
        let currentScale = parseFloat(document.documentElement.style.getPropertyValue('--audio-glow-scale')) || 1.0;
        if (currentScale > 1.001) {
            currentScale += (1.0 - currentScale) * 0.15;
            document.documentElement.style.setProperty('--audio-glow-scale', currentScale.toFixed(3));
        }
    }

    animationFrameId = requestAnimationFrame(drawCanvasFrame);
}


// =========================================================================
// 6. TIME TIMER ENGINE (Relationship Counter)
// =========================================================================
function initRelationshipCounter() {
    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minutesEl = document.getElementById("count-minutes");

    function updateCounter() {
        const start = new Date(CONFIG.startDate);
        const now = new Date();
        const difference = now.getTime() - start.getTime();

        if (difference < 0) {
            daysEl.textContent = "000";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            return;
        }

        // Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        // Apply roll-up numbers (prepend leading zeros if needed)
        daysEl.textContent = String(days).padStart(3, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
    }

    updateCounter();
    setInterval(updateCounter, 60000); // Update every minute to preserve power
}


// =========================================================================
// 7. MEMORY PHOTO GALLERY & LIGHTBOX
// =========================================================================
let activeIndex = 1; // Start with the middle slide highlighted in center spotlight

function initMemoryGallery() {
    const container = document.getElementById("gallery-container");
    const dotsContainer = document.getElementById("carousel-dots");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");

    if (!container || !dotsContainer || !prevBtn || !nextBtn) return;

    // Clear and build slides dynamically
    container.innerHTML = "";
    dotsContainer.innerHTML = "";

    CONFIG.photos.forEach((photo, idx) => {
        // 1. Create Carousel Slide (Layout Wrapper)
        const slide = document.createElement("div");
        slide.className = "carousel-slide";
        slide.dataset.index = idx;

        // Inner polaroid handles independent floating zero-gravity animation
        slide.innerHTML = `
            <div class="polaroid-card clickable">
                <div class="polaroid-image-wrapper">
                    <img src="${photo.url}" alt="${photo.caption}" class="polaroid-img" loading="lazy">
                </div>
                <div class="polaroid-caption">${photo.caption}</div>
            </div>
        `;

        // Apply out-of-sync floating animation durations/delays to each slide card
        const durations = ["7.5s", "9.2s", "8.0s"];
        const delays = ["-1.2s", "-4.5s", "-2.8s"];
        const innerCard = slide.querySelector(".polaroid-card");
        innerCard.style.setProperty("--float-duration", durations[idx % durations.length]);
        innerCard.style.setProperty("--float-delay", delays[idx % delays.length]);

        // 3D Carousel Click interaction
        slide.addEventListener("click", () => {
            if (idx === activeIndex) {
                // Active center slide zooms into the premium lightbox overlay
                openPhotoLightbox(photo);
            } else {
                // Side slides slide/spin into active center spotlight
                activeIndex = idx;
                updateCarousel();
            }
        });

        container.appendChild(slide);

        // 2. Create Star Pagination Dot
        const dot = document.createElement("button");
        dot.className = "carousel-dot clickable";
        dot.title = `Go to Slide ${idx + 1}`;
        dot.addEventListener("click", () => {
            activeIndex = idx;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    // Arrow controls
    prevBtn.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % CONFIG.photos.length;
        updateCarousel();
    });

    // Touch Swipe support for smooth mobile interactions
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 55) { // 55px swipe threshold
            if (diff > 0) {
                // Swipe right -> Previous slide
                activeIndex = (activeIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
            } else {
                // Swipe left -> Next slide
                activeIndex = (activeIndex + 1) % CONFIG.photos.length;
            }
            updateCarousel();
        }
    }, { passive: true });

    // Render initial layout states
    updateCarousel();
}

function updateCarousel() {
    const N = CONFIG.photos.length;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");

    slides.forEach((slide, i) => {
        // Reset classes
        slide.className = "carousel-slide";

        let d = i - activeIndex;
        // Circular wrap-around deck math
        if (d > Math.floor(N / 2)) d -= N;
        if (d < -Math.floor(N / 2)) d += N;

        // Apply classes based on relative distance in deck
        if (d === 0) {
            slide.classList.add("active");
            // Add a subtle random tilt angle to center slide for artistic organic style
            const tilts = [-1.5, -0.5, 0.5, 1.5];
            const tilt = tilts[i % tilts.length];
            slide.style.setProperty("--angle", `${tilt}deg`);
        } else if (d === -1) {
            slide.classList.add("left-side");
        } else if (d === 1) {
            slide.classList.add("right-side");
        } else if (d < -1) {
            slide.classList.add(d === -2 ? "far-left-side" : "hidden-slide");
        } else if (d > 1) {
            slide.classList.add(d === 2 ? "far-right-side" : "hidden-slide");
        }
    });

    // Update glowing star pagination dots
    dots.forEach((dot, i) => {
        if (i === activeIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function openPhotoLightbox(photo) {
    const lightbox = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");

    if (!lightbox || !lightboxImg || !lightboxCaption || !closeBtn) return;

    lightboxImg.src = photo.url;
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    // Self-cleaning click handler to prevent event listener piling
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflowY = "auto";
        closeBtn.removeEventListener("click", closeLightbox);
        lightbox.removeEventListener("click", overlayClick);
    };

    const overlayClick = (e) => {
        if (e.target === lightbox) closeLightbox();
    };

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", overlayClick);
}

// -------------------------------------------------------------------------
// UPGRADE 3D TILT COORDINATES ENGINE
// -------------------------------------------------------------------------
function init3dTilt() {
    const grid = document.querySelector(".counter-grid");
    const items = document.querySelectorAll(".counter-item");

    if (!grid) return;

    grid.addEventListener("mousemove", (e) => {
        const rect = grid.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const normX = x / (rect.width / 2);
        const normY = y / (rect.height / 2);

        const rotX = -normY * 8; // Max 8 degrees pitch tilt
        const rotY = normX * 8; // Max 8 degrees yaw tilt

        grid.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;

        // Double depth parallax popup
        items.forEach(item => {
            item.style.transform = `translateZ(15px)`;
        });
    });

    grid.addEventListener("mouseleave", () => {
        grid.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        items.forEach(item => {
            item.style.transform = `translateZ(0px)`;
        });
    });
}


// =========================================================================
// 8. SECRET LOVE LETTER ENGINE (Easter Egg Popup)
// =========================================================================
function initLetterPopup() {
    const moon = document.getElementById("interactive-moon");
    const overlay = document.getElementById("letter-overlay");
    const envelope = document.getElementById("interactive-envelope");
    const waxSeal = document.getElementById("wax-seal");
    const letterClose = document.getElementById("letter-close");

    if (!moon || !overlay || !envelope || !waxSeal || !letterClose) return;

    moon.addEventListener("click", () => {
        // Trigger a gorgeous stellar ripple animation!
        triggerStellarMoonRipple();

        // Launch modal overlay
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";

        // Reset envelope states
        envelope.classList.remove("opened");
        document.getElementById("letter-body").textContent = "";
    });

    waxSeal.addEventListener("click", () => {
        if (envelope.classList.contains("opened")) return;

        // 1. Synthesize satisfying click-crack seal break sound
        synthesizeWaxCrackSound();

        // 2. Open envelope flaps & slide out sheet
        envelope.classList.add("opened");

        // 3. Begin typewriter reveal once sheet has finished sliding up
        setTimeout(() => {
            typewriteLetter();
        }, 1200); // 1200ms matches CSS transition slide-out
    });

    letterClose.addEventListener("click", closeLetterOverlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeLetterOverlay();
        }
    });
}

function closeLetterOverlay() {
    const overlay = document.getElementById("letter-overlay");
    const envelope = document.getElementById("interactive-envelope");

    if (typingTimer) clearInterval(typingTimer);

    overlay.classList.remove("active");
    envelope.classList.remove("opened");
    document.body.style.overflowY = "auto";
}

function synthesizeWaxCrackSound() {
    if (!audioContext || audioContext.state === 'suspended') return;

    try {
        const now = audioContext.currentTime;

        // Part 1: High frequency cracking noise (white noise burst)
        const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.04, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noiseNode = audioContext.createBufferSource();
        noiseNode.buffer = noiseBuffer;

        const noiseFilter = audioContext.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.setValueAtTime(6500, now);

        const noiseGain = audioContext.createGain();
        noiseGain.gain.setValueAtTime(0.04, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        noiseNode.start(now);

        // Part 2: Low-frequency organic paper pop/thump
        const thumpOsc = audioContext.createOscillator();
        const thumpGain = audioContext.createGain();

        thumpOsc.type = "sine";
        thumpOsc.frequency.setValueAtTime(140, now);
        thumpOsc.frequency.exponentialRampToValueAtTime(70, now + 0.07);

        thumpGain.gain.setValueAtTime(0.12, now);
        thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

        thumpOsc.connect(thumpGain);
        thumpGain.connect(audioContext.destination);

        thumpOsc.start(now);
        thumpOsc.stop(now + 0.07);

    } catch (e) {
        console.error("Wax seal sound synthesizer error", e);
    }
}

function triggerStellarMoonRipple() {
    // Accelerate stars twinkling momentarily
    stars.forEach(s => {
        s.twinkleSpeed *= 15;
    });

    // Spawn rapid shooting stars
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            shootingStars.push({
                x: Math.random() * canvas.width * 0.5,
                y: Math.random() * canvas.height * 0.4,
                length: 120 + Math.random() * 100,
                speed: 18 + Math.random() * 10,
                thickness: 2,
                opacity: 1,
                fadeSpeed: 0.04
            });
        }, i * 150);
    }

    // Slow back down after flash fades
    setTimeout(() => {
        stars.forEach(s => {
            s.twinkleSpeed /= 15;
        });
    }, 2500);
}

let typingTimer = null;

function typewriteLetter() {
    const text = CONFIG.loveLetter.body;
    const bodyEl = document.getElementById("letter-body");
    bodyEl.textContent = ""; // Clear existing

    let i = 0;
    if (typingTimer) clearInterval(typingTimer);

    // Fast, rhythmic typing
    typingTimer = setInterval(() => {
        if (i < text.length) {
            bodyEl.textContent += text.charAt(i);
            i++;

            // Auto scroll letter window down if text overflows on mobile
            const letterPanel = document.querySelector(".letter-sheet");
            if (letterPanel) {
                letterPanel.scrollTop = letterPanel.scrollHeight;
            }
        } else {
            clearInterval(typingTimer);
        }
    }, 28); // 28ms typing stroke
}


// =========================================================================
// 9. CONTINUOUS FLOATING HEARTS GENERATOR
// =========================================================================
function initHeartsGenerator() {
    const container = document.getElementById("hearts-container");
    if (!container) return;

    // Periodically spawn floating hearts on the final screen
    setInterval(() => {
        // Only spawn if final scene is visible to save resources
        const finalSec = document.getElementById("final-scene");
        const rect = finalSec.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            spawnHeart(container);
        }
    }, 850); // Every 850ms
}

function spawnHeart(container) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = `<i class="fas fa-heart"></i>`;

    // Random styling properties
    const size = Math.random() * 14 + 10; // 10px to 24px
    const startX = Math.random() * 100; // 0% to 100% of container width
    const driftX = (Math.random() - 0.5) * 200; // -100px to 100px horizontal drift
    const duration = 6 + Math.random() * 6; // 6s to 12s travel speed
    const rotation = (Math.random() - 0.5) * 90; // -45deg to 45deg tilt

    heart.style.fontSize = `${size}px`;
    heart.style.left = `${startX}%`;
    heart.style.setProperty("--drift-x", `${driftX}px`);
    heart.style.setProperty("--rotation", `${rotation}deg`);

    // Random transparency
    heart.style.opacity = (0.3 + Math.random() * 0.55).toFixed(2);

    // Apply dynamic duration inside inline style overrides
    heart.style.animationDuration = `${duration}s`;

    container.appendChild(heart);

    // Remove node after animation completes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// -------------------------------------------------------------------------
// DYNAMIC NARRATIVE SCROLL REVEALS observer
// -------------------------------------------------------------------------
function initScrollReveals() {
    const reveals = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(el => observer.observe(el));

    // Bind window scroll listener to fade out bouncing chevron indicators and fixed constellation name
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
        const scrollPrompt = document.getElementById("scroll-prompt");
        if (scrollPrompt) {
            if (currentScroll > 60) {
                scrollPrompt.style.opacity = "0";
            } else if (constellationComplete) {
                scrollPrompt.style.opacity = "0.7";
            }
        }

        // Smoothly fade out fixed constellation name when scrolling away from moon section
        const fadeThreshold = 350; // Scroll distance to fully disperse stardust text
        if (currentScroll < fadeThreshold) {
            constellationOpacity = 1.0 - (currentScroll / fadeThreshold);
        } else {
            constellationOpacity = 0.0;
        }
    });
}

// -------------------------------------------------------------------------
// MAKE A WISH COSMIC STAR ENGINE
// -------------------------------------------------------------------------
function initWishSystem() {
    const wishBtn = document.getElementById("wish-btn");
    const wishInput = document.getElementById("wish-input");

    if (!wishBtn || !wishInput) return;

    // Load saved wishes and project them as stars
    const savedWishes = JSON.parse(localStorage.getItem("wishes") || "[]");
    savedWishes.forEach(text => {
        createWishStar(text);
    });

    wishBtn.addEventListener("click", submitWish);
    wishInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            submitWish();
        }
    });
}

function submitWish() {
    const input = document.getElementById("wish-input");
    const status = document.getElementById("wish-status");

    if (!input || !status || !input.value.trim()) return;

    const wishText = input.value.trim();

    // 1. Save wish in localStorage
    const saved = JSON.parse(localStorage.getItem("wishes") || "[]");
    saved.push(wishText);
    localStorage.setItem("wishes", JSON.stringify(saved));

    // 2. Spawn gold wish star in background sky
    createWishStar(wishText);

    // 3. Trigger canvas particle stardust explosion
    const rect = input.getBoundingClientRect();
    const spawnX = rect.left + rect.width / 2;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    const spawnY = rect.top + rect.height / 2 + currentScroll; // adjust for page scroll offsets
    triggerCosmicWishSparks(spawnX, spawnY);

    // 4. Trigger giant pink shooting star across night sky
    triggerBrilliantShootingStar();

    // 5. Display glowing starlight success msg
    status.textContent = "Your wish has been written in the stars... 🌠";
    status.classList.add("visible");

    // Clear text field
    input.value = "";

    setTimeout(() => {
        status.classList.remove("visible");
    }, 4500);
}

function createWishStar(text) {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight * 0.45; // upper sky coordinates

    const sx = 50 + Math.random() * (canvasWidth - 100);
    const sy = 120 + Math.random() * (canvasHeight - 120);

    const starNode = {
        x: sx,
        y: sy,
        text: text,
        size: Math.random() * 1.5 + 2.2, // larger glowing wishes
        opacity: 0.8,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI,
        color: "rgba(254, 215, 170, 0.9)" // Amber starlight gold
    };

    wishStars.push(starNode);

    // Project dynamic DOM marker over star coordinates for hover tooltips!
    appendWishStarTooltip(starNode);
}

function appendWishStarTooltip(star) {
    const marker = document.createElement("div");
    marker.className = "wish-marker clickable";
    marker.style.cssText = `
        position: absolute;
        left: ${star.x}px;
        top: ${star.y}px;
        width: 24px;
        height: 24px;
        transform: translate(-50%, -50%);
        z-index: 15;
        pointer-events: auto;
    `;

    const tooltip = document.createElement("div");
    tooltip.className = "wish-star-tooltip";
    tooltip.textContent = star.text;

    marker.appendChild(tooltip);
    document.body.appendChild(marker);

    // Hover scales and glows
    marker.addEventListener("mouseenter", () => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateX(-50%) translateY(0)";

        const cursor = document.getElementById("cursor");
        if (cursor) cursor.classList.add("hovered");
    });

    marker.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateX(-50%) translateY(5px)";

        const cursor = document.getElementById("cursor");
        if (cursor) cursor.classList.remove("hovered");
    });
}

function triggerCosmicWishSparks(startX, startY) {
    // 80 dynamic gravity cone particles
    for (let i = 0; i < 80; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.3; // Upwards cone
        const speed = 7 + Math.random() * 9;

        wishExplosions.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 1.8 + 1.2,
            opacity: 1.0,
            fadeSpeed: 0.009 + Math.random() * 0.015,
            color: Math.random() > 0.45 ? "rgba(255, 101, 132, 0.95)" : "rgba(254, 215, 170, 0.95)"
        });
    }
}

function triggerBrilliantShootingStar() {
    shootingStars.push({
        x: 0,
        y: canvas.height * 0.35,
        length: 220,
        speed: 19,
        thickness: 3.5,
        opacity: 1.0,
        fadeSpeed: 0.008,
        color: "rgba(255, 101, 132, 1)" // Giant pink shooting star
    });
}

// -------------------------------------------------------------------------
// INTERSTELLAR COSMIC QUOTE ROTATION ENGINE
// -------------------------------------------------------------------------
const romanticQuotes = [
    "No matter where we are,<br>we're under the same sky ❤️",
    "\"Love is the one thing we're capable of perceiving that transcends dimensions of time and space.\"<br><span style='font-size: 0.75em; opacity: 0.7;'>— Interstellar 🌌</span>",
    "\"We've always defined ourselves by the ability to overcome the impossible.\"<br><span style='font-size: 0.75em; opacity: 0.7;'>— Interstellar ✨</span>",
    "\"Maybe love is some evidence, some artifact of a higher dimension we can't consciously perceive.\"<br><span style='font-size: 0.75em; opacity: 0.7;'>— Interstellar 💫</span>",
    "\"We're still pioneers. We've barely begun.\"<br><span style='font-size: 0.75em; opacity: 0.7;'>— Interstellar 🚀</span>"
];

let quoteRotationTimer = null;

function startQuoteRotation() {
    const quoteEl = document.querySelector(".romantic-quote");
    if (!quoteEl) return;

    let index = 0;
    if (quoteRotationTimer) clearInterval(quoteRotationTimer);

    quoteRotationTimer = setInterval(() => {
        // 1. Fade out quote element
        quoteEl.style.opacity = "0";
        quoteEl.style.transform = "translateY(12px)";

        setTimeout(() => {
            // 2. Cycle index and update innerHTML
            index = (index + 1) % romanticQuotes.length;
            quoteEl.innerHTML = romanticQuotes[index];

            // 3. Fade back in
            quoteEl.style.opacity = "1";
            quoteEl.style.transform = "translateY(0)";
        }, 1000); // Wait for CSS transition fade out (1.0s matches style.css romantic-quote transition)
    }, 8500); // Transition every 8.5 seconds
}

// =========================================================================
// 12. FINAL SURPRISE GIFT BOX SYSTEM
// =========================================================================
function initGiftBox() {
    const giftContainer = document.getElementById("interactive-gift");
    const giftCardReveal = document.getElementById("gift-card-reveal");
    
    if (!giftContainer || !giftCardReveal) return;
    
    giftContainer.addEventListener("click", () => {
        if (giftContainer.classList.contains("opened")) return;
        
        // 1. Mark as opened to trigger 3D CSS open transitions
        giftContainer.classList.add("opened");
        
        // 2. Play beautiful major-scale magical harp chime cascade
        synthesizeMagicalGiftChime();
        
        // 3. Trigger giant pink shooting star across night sky
        triggerBrilliantShootingStar();
        
        // 4. Trigger brilliant gold, pink, and magenta stardust sparks explosion
        const rect = giftContainer.getBoundingClientRect();
        // Since canvas is fixed viewport, we use viewport coordinates directly!
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        triggerCosmicGiftSparks(startX, startY);
        
        // 5. Smoothly slide reveal the thank-you card
        giftCardReveal.classList.add("visible");
        
        // 6. Scroll down smoothly to show the revealed letter card
        setTimeout(() => {
            giftCardReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 800);
    });
}

function triggerCosmicGiftSparks(startX, startY) {
    const colors = [
        "rgba(255, 101, 132, 0.95)", // Celestial Pink
        "rgba(254, 215, 170, 0.95)", // Gold Dust
        "rgba(255, 255, 255, 0.95)", // White Starlight
        "rgba(217, 70, 239, 0.95)"   // Cosmic Magenta
    ];
    
    // Spawn 120 dynamic 360-degree floating particles in canvas background
    for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2; // 360 degrees
        const speed = 3 + Math.random() * 11;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        wishExplosions.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 2.8 + 1.2,
            opacity: 1.0,
            fadeSpeed: 0.005 + Math.random() * 0.01, // slow lingering drift
            color: randomColor
        });
    }
}

function synthesizeMagicalGiftChime() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!audioContext && AudioContextClass) {
        audioContext = new AudioContextClass();
    }
    
    if (!audioContext) return;
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    try {
        const now = audioContext.currentTime;
        
        // A gorgeous cascading major arpeggio sweep (C5, E5, G5, C6, E6, G6, C7)
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
        
        notes.forEach((freq, index) => {
            const timeOffset = index * 0.07; // 70ms cascade
            const noteTime = now + timeOffset;
            
            const osc = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            osc.type = "triangle"; // sweet, music-box-like resonance
            osc.frequency.setValueAtTime(freq, noteTime);
            
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(2800, noteTime);
            filter.Q.setValueAtTime(1, noteTime);
            
            const duration = 2.0; // long, sparkling decay tail
            gainNode.gain.setValueAtTime(0, noteTime);
            gainNode.gain.linearRampToValueAtTime(0.12, noteTime + 0.02); // crisp attack
            gainNode.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration); // smooth decay
            
            osc.connect(filter);
            filter.connect(gainNode);
            
            if (analyserNode) {
                gainNode.connect(analyserNode);
            } else {
                gainNode.connect(audioContext.destination);
            }
            
            osc.start(noteTime);
            osc.stop(noteTime + duration);
            
            synthNodes.push(osc);
            
            setTimeout(() => {
                const idx = synthNodes.indexOf(osc);
                if (idx > -1) synthNodes.splice(idx, 1);
            }, (timeOffset + duration) * 1000 + 100);
        });
        
    } catch (e) {
        console.error("Surprise box sound synthesizer error", e);
    }
}

