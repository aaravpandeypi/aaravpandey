// SIMPLIFIED JS - BACKUP ONLY
// Main functionality now inline in HTML for reliability
console.log('Backup JS file - not used in current implementation');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupCanvas();
    setupMouseTracking();
    setupTextScramble();
    setupMagneticEffect();
    setupNameEffects();
    setupQuantumEffects();
    setupGravityWells();
    setupRealityDistortion();
    setupNeuralNetwork();
    setupDotsBackground();
    startAnimationLoop();
}

// Canvas Setup
function setupCanvas() {
    const particleCanvas = document.getElementById('particle-canvas');
    dotCanvas = document.getElementById('dots-canvas');
    
    // Particle Canvas
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    
    // Dots Canvas
    dotCanvas.width = window.innerWidth;
    dotCanvas.height = window.innerHeight;
    dotCtx = dotCanvas.getContext('2d');
    
    // Initialize particles (fewer for minimal aesthetic)
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1,
            color: '#444444'
        });
    }
    
    // Handle resize
    window.addEventListener('resize', function() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        dotCanvas.width = window.innerWidth;
        dotCanvas.height = window.innerHeight;
        setupDotsBackground();
    });
}

// Mouse Tracking
function setupMouseTracking() {
    const mouseTrail = document.getElementById('mouse-trail');
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update mouse trail
        mouseTrail.style.left = (mouseX - 10) + 'px';
        mouseTrail.style.top = (mouseY - 10) + 'px';
        
        // Add subtle particle at mouse position
        if (Math.random() > 0.9) {
            particles.push({
                x: mouseX,
                y: mouseY,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 1 + 1,
                opacity: 0.6,
                color: '#666666',
                life: 60
            });
        }
    });
}





// Text Scramble Effect
function setupTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    scrambleElements.forEach(element => {
        const originalText = element.textContent;
        
        element.addEventListener('mouseenter', function() {
            scrambleText(element, originalText, chars);
        });
    });
}

function scrambleText(element, originalText, chars) {
    let iteration = 0;
    const speed = 50;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, speed);
}

// Magnetic Effect for Social Links
function setupMagneticEffect() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', function(e) {
            const rect = link.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            
            link.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2) rotate(180deg)`;
        });
        
        link.addEventListener('mouseleave', function() {
            link.style.transform = '';
        });
    });
}

// Animation Loop
function startAnimationLoop() {
    function animate() {
        updateParticles();
        updateDots();
        requestAnimationFrame(animate);
    }
    animate();
}

// Particle System
function updateParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Update life and opacity
        if (particle.life !== undefined) {
            particle.life--;
            particle.opacity = particle.life / 30;
            
            if (particle.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
        }
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const distance = Math.sqrt(
                Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
            );
            
            if (distance < 100) {
                ctx.globalAlpha = (1 - distance / 100) * 0.3;
                ctx.strokeStyle = particle.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
    }
    
    ctx.globalAlpha = 1;
}

// Grey Dots Background Setup
function setupDotsBackground() {
    dots = [];
    const spacing = 40;
    const cols = Math.ceil(dotCanvas.width / spacing);
    const rows = Math.ceil(dotCanvas.height / spacing);
    
    for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
            dots.push({
                x: i * spacing,
                y: j * spacing,
                originalX: i * spacing,
                originalY: j * spacing,
                size: 2,
                opacity: Math.random() * 0.4 + 0.1,
                pulsePhase: Math.random() * Math.PI * 2,
                wavePhase: Math.random() * Math.PI * 2,
                color: '#444444'
            });
        }
    }
}

// Update Dots Animation
function updateDots() {
    if (!dotCtx) return;
    
    dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);
    
    const time = Date.now() * 0.001;
    
    dots.forEach(dot => {
        // Subtle pulsing
        const pulse = Math.sin(time + dot.pulsePhase) * 0.2 + 0.8;
        
        // Gentle wave motion
        const waveX = Math.sin(time * 0.5 + dot.wavePhase) * 2;
        const waveY = Math.cos(time * 0.3 + dot.wavePhase) * 1;
        
        // Mouse parallax effect
        const mouseDistance = Math.sqrt(
            Math.pow(mouseX - dot.originalX, 2) + 
            Math.pow(mouseY - dot.originalY, 2)
        );
        
        let parallaxX = 0;
        let parallaxY = 0;
        
        if (mouseDistance < 200) {
            const influence = (200 - mouseDistance) / 200;
            parallaxX = (mouseX - dot.originalX) * influence * 0.1;
            parallaxY = (mouseY - dot.originalY) * influence * 0.1;
        }
        
        dot.x = dot.originalX + waveX + parallaxX;
        dot.y = dot.originalY + waveY + parallaxY;
        
        // Draw dot
        dotCtx.globalAlpha = dot.opacity * pulse;
        dotCtx.fillStyle = dot.color;
        dotCtx.beginPath();
        dotCtx.arc(dot.x, dot.y, dot.size * pulse, 0, Math.PI * 2);
        dotCtx.fill();
    });
    
    dotCtx.globalAlpha = 1;
}



function createParticleExplosion(rect) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: centerX,
            y: centerY,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            size: Math.random() * 3 + 2,
            opacity: 1,
            color: ['#00FFFF', '#FF00FF', '#00FF00', '#FFFFFF'][Math.floor(Math.random() * 4)],
            life: 60
        });
    }
}

// Add CSS animations for new effects
const style = document.createElement('style');
style.textContent = `
@keyframes digit-flip {
    0% { transform: perspective(400px) rotateX(0deg); }
    50% { transform: perspective(400px) rotateX(90deg); }
    100% { transform: perspective(400px) rotateX(0deg); }
}

@keyframes quantum-flicker {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.2); }
}

@keyframes reality-glitch {
    0%, 100% { transform: translateX(0) skew(0deg); filter: hue-rotate(0deg); }
    25% { transform: translateX(-5px) skew(2deg); filter: hue-rotate(90deg); }
    50% { transform: translateX(5px) skew(-2deg); filter: hue-rotate(180deg); }
    75% { transform: translateX(-3px) skew(1deg); filter: hue-rotate(270deg); }
}

@keyframes screen-crack {
    0% { filter: brightness(1); }
    50% { filter: brightness(2) contrast(2); }
    100% { filter: brightness(1); }
}

@keyframes matrix-glitch-line {
    0% { opacity: 0; transform: translateY(-20px); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateY(20px); }
}

@keyframes portal-expand {
    0% { width: 0px; height: 0px; opacity: 1; }
    50% { width: 300px; height: 300px; opacity: 0.8; }
    100% { width: 600px; height: 600px; opacity: 0; }
}

@keyframes reality-ripple {
    0% { width: 10px; height: 10px; opacity: 1; }
    100% { width: 200px; height: 200px; opacity: 0; }
}

@keyframes text-particle-fall {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
}

@keyframes gravity-well-pulse {
    0% { width: 20px; height: 20px; opacity: 0.8; }
    50% { width: 100px; height: 100px; opacity: 0.4; }
    100% { width: 200px; height: 200px; opacity: 0; }
}

@keyframes quantum-burst {
    0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
    50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
    100% { transform: scale(1) rotate(360deg); opacity: 0.3; }
}

@keyframes quantum-error {
    0%, 100% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(2deg); }
    75% { transform: scale(0.9) rotate(-2deg); }
}

@keyframes reality-restore {
    0% { filter: blur(5px) brightness(2); }
    100% { filter: blur(0px) brightness(1); }
}

@keyframes dimensional-portal-expand {
    0% { width: 0px; height: 0px; opacity: 1; transform: translate(-50%, -50%) rotate(0deg); }
    50% { width: 400px; height: 400px; opacity: 0.6; transform: translate(-50%, -50%) rotate(180deg); }
    100% { width: 800px; height: 800px; opacity: 0; transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes reality-warp {
    0%, 100% { transform: scale(1) skew(0deg); }
    25% { transform: scale(1.02) skew(1deg); }
    50% { transform: scale(0.98) skew(-1deg); }
    75% { transform: scale(1.01) skew(0.5deg); }
}

@keyframes chromatic-split {
    0% { transform: translateX(0); }
    25% { transform: translateX(2px); }
    50% { transform: translateX(-2px); }
    75% { transform: translateX(1px); }
    100% { transform: translateX(0); }
}
`;
document.head.appendChild(style);

// Name Section Effects
function setupNameEffects() {
    const nameTitle = document.querySelector('.name-title');
    const letters = document.querySelectorAll('.letter');
    
    // Continuous quantum fluctuation
    setInterval(() => {
        if (Math.random() > 0.95) {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)];
            randomLetter.style.animation = 'quantum-flicker 0.3s ease-in-out';
            setTimeout(() => {
                randomLetter.style.animation = '';
            }, 300);
        }
    }, 1000);
    
    // Hover portal effect
    nameTitle.addEventListener('mouseenter', function() {
        createDimensionalPortalEffect(this);
        document.body.style.animation = 'reality-warp 2s ease-in-out';
    });
    
    nameTitle.addEventListener('mouseleave', function() {
        document.body.style.animation = '';
    });
}

// Quantum Effects System
function setupQuantumEffects() {
    const quantumOverlay = document.querySelector('.quantum-overlay');
    
    // Random quantum shifts
    setInterval(() => {
        if (Math.random() > 0.8) {
            quantumOverlay.style.animation = 'quantum-burst 1s ease-out';
            setTimeout(() => {
                quantumOverlay.style.animation = 'quantum-shift 8s ease-in-out infinite';
            }, 1000);
        }
    }, 5000);
    
    // Quantum entanglement effects
    const elements = document.querySelectorAll('.time-unit, .social-link, .letter');
    elements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            // Entangle with random other element
            const partner = elements[Math.floor(Math.random() * elements.length)];
            if (partner !== element) {
                partner.classList.add('quantum-entangled');
                setTimeout(() => {
                    partner.classList.remove('quantum-entangled');
                }, 1000);
            }
        });
    });
}

// Gravity Wells System
function setupGravityWells() {
    const gravityContainer = document.querySelector('.gravity-wells');
    
    document.addEventListener('mousemove', function(e) {
        // Create gravity well at mouse position
        if (Math.random() > 0.98) {
            createGravityWell(e.clientX, e.clientY);
        }
        
        // Warp nearby elements
        warpNearbyElements(e.clientX, e.clientY);
    });
}

// Reality Distortion System
function setupRealityDistortion() {
    const chromaticLayer = document.querySelector('.chromatic-layer');
    
    // Random chromatic aberration
    setInterval(() => {
        if (Math.random() > 0.9) {
            chromaticLayer.style.opacity = '0.3';
            chromaticLayer.style.background = `
                linear-gradient(90deg, rgba(255, 0, 0, 0.1) 0%, transparent 33%, rgba(0, 255, 0, 0.1) 66%, transparent 100%),
                linear-gradient(180deg, rgba(0, 0, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 0, 0.1) 100%)
            `;
            chromaticLayer.style.animation = 'chromatic-split 0.3s ease-out';
            
            setTimeout(() => {
                chromaticLayer.style.opacity = '0';
                chromaticLayer.style.animation = '';
            }, 300);
        }
    }, 3000);
}

// Neural Network Visualization
function setupNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network');
    
    // Create pulsing nodes
    for (let i = 0; i < 8; i++) {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = '4px';
        node.style.height = '4px';
        node.style.background = '#00FFFF';
        node.style.borderRadius = '50%';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animation = `neural-pulse ${2 + Math.random() * 3}s ease-in-out infinite`;
        node.style.animationDelay = Math.random() * 2 + 's';
        neuralNetwork.appendChild(node);
    }
}



// Dimensional Portal Effect
function createDimensionalPortal(element) {
    const portal = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    portal.style.position = 'fixed';
    portal.style.left = rect.left + rect.width/2 + 'px';
    portal.style.top = rect.top + rect.height/2 + 'px';
    portal.style.width = '0px';
    portal.style.height = '0px';
    portal.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 255, 0.5) 30%, transparent 70%)';
    portal.style.borderRadius = '50%';
    portal.style.zIndex = '1001';
    portal.style.transform = 'translate(-50%, -50%)';
    portal.style.animation = 'portal-expand 2s ease-out forwards';
    
    document.body.appendChild(portal);
    
    setTimeout(() => {
        portal.remove();
    }, 2000);
}





// Gravity Well Creation
function createGravityWell(x, y) {
    const well = document.createElement('div');
    
    well.style.position = 'fixed';
    well.style.left = x + 'px';
    well.style.top = y + 'px';
    well.style.width = '20px';
    well.style.height = '20px';
    well.style.background = 'radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, transparent 70%)';
    well.style.borderRadius = '50%';
    well.style.transform = 'translate(-50%, -50%)';
    well.style.animation = 'gravity-well-pulse 2s ease-out forwards';
    well.style.zIndex = '5';
    well.style.pointerEvents = 'none';
    
    document.querySelector('.gravity-wells').appendChild(well);
    
    setTimeout(() => {
        well.remove();
    }, 2000);
}

// Warp Nearby Elements
function warpNearbyElements(mouseX, mouseY) {
    const elements = document.querySelectorAll('.time-unit, .social-link, .letter');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
        
        if (distance < 200) {
            const force = (200 - distance) / 200;
            const deltaX = (centerX - mouseX) * force * 0.1;
            const deltaY = (centerY - mouseY) * force * 0.1;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${1 + force * 0.1})`;
        } else {
            element.style.transform = '';
        }
    });
}



// Dimensional Portal Effect for Name
function createDimensionalPortalEffect(element) {
    const portal = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    portal.style.position = 'fixed';
    portal.style.left = rect.left + rect.width/2 + 'px';
    portal.style.top = rect.top + rect.height/2 + 'px';
    portal.style.width = '0px';
    portal.style.height = '0px';
    portal.style.background = 'conic-gradient(from 0deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3), rgba(0, 255, 0, 0.3), rgba(0, 255, 255, 0.3))';
    portal.style.borderRadius = '50%';
    portal.style.zIndex = '14';
    portal.style.transform = 'translate(-50%, -50%)';
    portal.style.animation = 'dimensional-portal-expand 1.5s ease-out forwards';
    
    document.body.appendChild(portal);
    
    setTimeout(() => {
        portal.remove();
    }, 1500);
}

// Additional minimal effects for clean aesthetic
document.addEventListener('DOMContentLoaded', function() {
    // Subtle dot interaction effects
    setInterval(() => {
        if (Math.random() > 0.95) {
            const randomDot = dots[Math.floor(Math.random() * dots.length)];
            if (randomDot) {
                randomDot.opacity = Math.min(1, randomDot.opacity + 0.3);
                setTimeout(() => {
                    randomDot.opacity = Math.max(0.1, randomDot.opacity - 0.3);
                }, 500);
            }
        }
    }, 2000);
    
    // Minimal particle bursts
    setInterval(() => {
        if (Math.random() > 0.95) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: 1,
                opacity: 0.4,
                color: '#666666',
                life: 120
            });
        }
    }, 5000);
});
