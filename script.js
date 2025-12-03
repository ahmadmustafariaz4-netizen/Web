// ===== CANVAS SETUP =====
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Brush settings
const colorPicker = document.getElementById('colorPicker');
const brushSizeInput = document.getElementById('brushSize');

let drawing = false;

// ===== DRAWING EVENTS =====
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.fillStyle = colorPicker.value;
  ctx.beginPath();
  ctx.arc(x, y, brushSizeInput.value, 0, Math.PI * 2);
  ctx.fill();
});

// ===== BUTTONS =====
document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'myDrawing.png';
  link.click();
});

// ===== SVG ANIMATION =====
const circle = document.getElementById('movingCircle');
let posX = 50;
let speed = 2;

function animateCircle() {
  posX += speed;
  if (posX > 480 || posX < 20) speed *= -1; // Bounce back
  circle.setAttribute('cx', posX);
  requestAnimationFrame(animateCircle);
}

animateCircle();
