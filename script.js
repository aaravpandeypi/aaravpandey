// ====== GLOBAL VARIABLES ======
let particles = [];
let dots = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let dotCtx;

// ====== INIT ======
document.addEventListener("DOMContentLoaded", () => {
  setupCanvas();
  setupMouseTracking();
  setupDotsBackground();
  startAnimationLoop();
});

// ====== SETUP CANVAS ======
function setupCanvas() {
  const dotCanvas = document.getElementById("dots-canvas");
  const particleCanvas = document.getElementById("particle-canvas");

  // Set size before getting context
  dotCanvas.width = window.innerWidth;
  dotCanvas.height = window.innerHeight;
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;

  dotCtx = dotCanvas.getContext("2d");
  const particleCtx = particleCanvas.getContext("2d");

  // Handle resize
  window.addEventListener("resize", () => {
    dotCanvas.width = window.innerWidth;
    dotCanvas.height = window.innerHeight;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    setupDotsBackground();
  });

  // Initialize particles
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5),
      vy: (Math.random() - 0.5),
      size: Math.random() * 2 + 1,
      color: "#00FFFF",
      opacity: 0.6
    });
  }
}

// ====== TRACK MOUSE ======
function setupMouseTracking() {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

// ====== CREATE DOT GRID ======
function setupDotsBackground() {
  dots = [];
  const spacing = 40;
  const cols = Math.ceil(window.innerWidth / spacing);
  const rows = Math.ceil(window.innerHeight / spacing);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      dots.push({
        x: i * spacing,
        y: j * spacing,
        originalX: i * spacing,
        originalY: j * spacing,
        size: 2,
        color: "#00FFFF",
        opacity: 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
        wavePhase: Math.random() * Math.PI * 2
      });
    }
  }
}

// ====== MAIN ANIMATION LOOP ======
function startAnimationLoop() {
  const particleCanvas = document.getElementById("particle-canvas");
  const particleCtx = particleCanvas.getContext("2d");

  function animate() {
    // Clear particle and dot layers
    particleCtx.clearRect(0, 0, innerWidth, innerHeight);
    dotCtx.clearRect(0, 0, innerWidth, innerHeight);

    updateDots();
    updateParticles(particleCtx);
    requestAnimationFrame(animate);
  }
  animate();
}

// ====== PARTICLE ANIMATION ======
function updateParticles(ctx) {
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x <= 0 || p.x >= innerWidth) p.vx *= -1;
    if (p.y <= 0 || p.y >= innerHeight) p.vy *= -1;

    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 100) {
        ctx.globalAlpha = 0.2 * (1 - dist / 100);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
}

// ====== DOT GRID ANIMATION ======
function updateDots() {
  const time = Date.now() * 0.001;
  dots.forEach(dot => {
    const pulse = Math.sin(time + dot.pulsePhase) * 0.2 + 0.8;
    const waveX = Math.sin(time * 0.5 + dot.wavePhase) * 2;
    const waveY = Math.cos(time * 0.3 + dot.wavePhase) * 1;

    const mouseDist = Math.hypot(mouseX - dot.originalX, mouseY - dot.originalY);
    let parallaxX = 0, parallaxY = 0;
    if (mouseDist < 200) {
      const influence = (200 - mouseDist) / 200;
      parallaxX = (mouseX - dot.originalX) * influence * 0.05;
      parallaxY = (mouseY - dot.originalY) * influence * 0.05;
    }

    dot.x = dot.originalX + waveX + parallaxX;
    dot.y = dot.originalY + waveY + parallaxY;

    dotCtx.globalAlpha = dot.opacity * pulse;
    dotCtx.fillStyle = dot.color;
    dotCtx.beginPath();
    dotCtx.arc(dot.x, dot.y, dot.size * pulse, 0, Math.PI * 2);
    dotCtx.fill();
  });
}
