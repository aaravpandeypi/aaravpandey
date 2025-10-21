// Define global variables
let particles = [];
let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;
let dots = [];
let dotCtx;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  setupCanvas();
  setupMouseTracking();
  setupDotsBackground();
  startAnimationLoop();
});

// Setup canvas elements
function setupCanvas() {
  const particleCanvas = document.getElementById('particle-canvas');
  const dotCanvas = document.getElementById('dots-canvas');
  dotCtx = dotCanvas.getContext('2d');

  function resize() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    dotCanvas.width = window.innerWidth;
    dotCanvas.height = window.innerHeight;
    setupDotsBackground();
  }
  window.addEventListener('resize', resize);
  resize();

  // init particles
  for (let i=0; i<20; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      color: '#444444'
    });
  }
}

// Track mouse for effects
function setupMouseTracking() {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

// Create background dots
function setupDotsBackground() {
  dots = [];
  const spacing = 40;
  const cols = Math.ceil(window.innerWidth / spacing);
  const rows = Math.ceil(window.innerHeight / spacing);
  for (let i=0; i<=cols; i++) {
    for (let j=0; j<=rows; j++) {
      dots.push({
        x: i*spacing,
        y: j*spacing,
        originalX: i*spacing,
        originalY: j*spacing,
        size: 2,
        opacity: Math.random()*0.4+0.1,
        pulsePhase: Math.random()*Math.PI*2,
        wavePhase: Math.random()*Math.PI*2,
        color: '#444444'
      });
    }
  }
}

// Animation loop
function startAnimationLoop() {
  function animate() {
    updateParticles();
    updateDots();
    requestAnimationFrame(animate);
  }
  animate();
}

// Animate particles
function updateParticles() {
  const ctx = document.getElementById('particle-canvas').getContext('2d');
  ctx.clearRect(0,0,innerWidth, innerHeight);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    // bounce
    if (p.x <= 0 || p.x >= innerWidth) p.vx *= -1;
    if (p.y <= 0 || p.y >= innerHeight) p.vy *= -1;
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fill();
    // connect
    for (let j=i+1; j<particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 100) {
        ctx.globalAlpha = 0.3 * (1 - dist/100);
        ctx.strokeStyle = p.color;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
}

// Animate background dots
function updateDots() {
  dotCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const time = Date.now() * 0.001;
  dots.forEach(dot => {
    const pulse = Math.sin(time + dot.pulsePhase) * 0.2 + 0.8;
    const waveX = Math.sin(time * 0.5 + dot.wavePhase) * 2;
    const waveY = Math.cos(time * 0.3 + dot.wavePhase) * 1;
    const mouseDist = Math.hypot(mouseX - dot.originalX, mouseY - dot.originalY);
    let parallaxX=0, parallaxY=0;
    if (mouseDist < 200) {
      const influence = (200 - mouseDist) / 200;
      parallaxX = (mouseX - dot.originalX) * influence * 0.1;
      parallaxY = (mouseY - dot.originalY) * influence * 0.1;
    }
    dot.x=dot.originalX + waveX + parallaxX;
    dot.y=dot.originalY + waveY + parallaxY;

    // draw dot
    dotCtx.globalAlpha=dot.opacity*pulse;
    dotCtx.fillStyle=dot.color;
    dotCtx.beginPath();
    dotCtx.arc(dot.x, dot.y, dot.size * pulse, 0, Math.PI*2);
    dotCtx.fill();
  });
}

// Add extra effects as needed, like interactions, glitches, effects, etc.
