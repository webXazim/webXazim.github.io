const canvas = document.getElementById('starry-background');
const ctx = canvas.getContext('2d');

// Set canvas size to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;

// Star constructor
function Star(x, y, radius, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speed = speed;
}

// Initialize stars
function initStars() {
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.5;
    const speed = Math.random() * 0.5 + 0.2;
    stars.push(new Star(x, y, radius, speed));
  }
}

// Draw stars
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  drawMoon();
  drawBrightStar();
}

// Draw a realistic crescent moon with shading
function drawMoon() {
    const moonX = canvas.width - 180; // X position for the moon
    const moonY = 120;                // Y position for the moon
    const moonRadius = 60;            // Radius of the full moon

    // Create a radial gradient to simulate the light and shadow on the moon
    const moonGradient = ctx.createRadialGradient(moonX, moonY, moonRadius - 20, moonX, moonY, moonRadius);
    moonGradient.addColorStop(0, '#f1f1f1');  // Light center
    moonGradient.addColorStop(1, '#bfbfbf');  // Darker edges for shadow

    // Draw the full moon with gradient shading
    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Overlay a dark crescent shadow to create the crescent effect
    ctx.fillStyle = '#1c1c1c';  // Dark shadow color
    ctx.beginPath();
    ctx.arc(moonX + 20, moonY, moonRadius - 5, 0, Math.PI * 2); // Adjust position and radius for crescent
    ctx.fill();

    // Add subtle craters for a realistic moon texture
    drawMoonCraters(moonX, moonY, moonRadius);
}

// Function to add subtle craters to the moon surface
function drawMoonCraters(moonX, moonY, moonRadius) {
    ctx.fillStyle = '#b3b3b3'; // Darker color for the craters

    const craterPositions = [
        { x: moonX - 20, y: moonY - 10, radius: 8 },
        { x: moonX + 15, y: moonY + 20, radius: 5 },
        { x: moonX - 30, y: moonY + 25, radius: 4 },
        { x: moonX + 25, y: moonY - 15, radius: 6 },
        { x: moonX + 5, y: moonY - 30, radius: 7 },
    ];

    craterPositions.forEach(crater => {
        ctx.beginPath();
        ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}
// Function to add random moon craters
function drawMoonCraters(moonX, moonY, moonRadius) {
    ctx.fillStyle = '#b3b3b3'; // Darker color for the craters

    const craterPositions = [
        { x: moonX - 20, y: moonY - 10, radius: 8 },
        { x: moonX + 15, y: moonY + 20, radius: 5 },
        { x: moonX - 30, y: moonY + 25, radius: 4 },
        { x: moonX + 25, y: moonY - 15, radius: 6 },
        { x: moonX + 5, y: moonY - 30, radius: 7 },
    ];

    craterPositions.forEach(crater => {
        ctx.beginPath();
        ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}


// Draw a bright star
function drawBrightStar() {
  const starX = 200; // X position for the bright star
  const starY = 150; // Y position for the bright star
  const starRadius = 8; // Size of the bright star

  // Draw the bright star
  ctx.fillStyle = '#ffffff'; // White for the bright star
  ctx.beginPath();
  ctx.arc(starX, starY, starRadius, 0, Math.PI * 2);
  ctx.fill();
}

// Animate stars
function animateStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
    }
  });
  drawStars();
  requestAnimationFrame(animateStars);
}

// Handle window resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars.length = 0;
  initStars();
});

// Start the starry background
initStars();
animateStars();