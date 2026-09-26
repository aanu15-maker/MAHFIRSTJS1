
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// JavaScript Class replacing your Python Particle class

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        // random.randint(2, 5) -> Min 2, max 5
        this.radius = Math.floor(Math.random() * (5 - 2 + 1)) + 2; 
        
        // Replaces your Pygame color tuple: (0, random(155,255), random(155,255))
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        const r = Math.floor(Math.random() * 255);
        this.color = `rgb(${r}, ${g}, ${b})`;
        
        // random.uniform(-15, 15)
        this.speedX = (Math.random() * 30) - 15;
        this.speedY = (Math.random() * 30) - 15;
        
        // random.randint(100, 1000)
        this.lifetime = Math.floor(Math.random() * 901) + 1000;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.lifetime -= 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Replaces particles = []
const particles = [];

// Replaces event.type == pygame.MOUSEBUTTONDOWN
// Replaces event.type == pygame.MOUSEBUTTONDOWN
canvas.addEventListener('mousedown', (event) => {
    // Get mouse position relative to the canvas bounding box
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // FIX: Changed .append() to .push()
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(mouseX, mouseY)); 
        document.getElementById('myAudio').play();
    }
});

// Replaces the while running: loop
function animate() {
    // 1. Clear screen (screen.fill((0, 0, 0)))
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Loop backwards through the array to avoid flickering/skipping when deleting items
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        // if particle.lifetime <= 0: particles.remove(particle)
        if (particle.lifetime <= 0) {
            particles.splice(i, 1);
        }
    }

    // 3. Keep loop ticking smoothly at monitor's frame rate
    requestAnimationFrame(animate);
}


// Start loop execution
animate();

