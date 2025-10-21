* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  background: #000;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  text-align: center;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* Container content */
.container {
  position: relative;
  z-index: 10;
  padding: 20px;
  color: #ccc;
}

.name-title {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
}

.letter {
  cursor: default;
  transition: color 0.3s ease;
  margin: 0 0.05em;
  color: #ccc;
}

.letter:hover {
  color: #888;
}

.subtitle {
  margin-top: 0.3em;
  font-size: clamp(1.2rem, 3vw, 2rem);
}

.email {
  display: inline-block;
  margin-top: 0.6em;
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email:hover {
  color: #fff;
  text-decoration: underline;
}
