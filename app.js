// ===== Animated Background with Bouncing Balls =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let balls = [];

// Ball colors matching the theme
const colors = [
    'rgba(108, 99, 255, 0.4)',   // Primary purple
    'rgba(0, 212, 255, 0.3)',    // Cyan
    'rgba(255, 107, 157, 0.3)',  // Pink accent
    'rgba(139, 131, 255, 0.35)', // Light purple
    'rgba(108, 99, 255, 0.25)',  // Faded purple
];

class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.radius = Math.random() * 80 + 20;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.blur = Math.random() * 20 + 10;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
            this.vx *= -1;
            this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
            this.vy *= -1;
            this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.filter = `blur(${this.blur}px)`;
        ctx.fill();
        ctx.filter = 'none';
    }
}

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function initBalls() {
    balls = [];
    const numBalls = Math.min(15, Math.floor((width * height) / 80000));
    for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball());
    }
}

function animate() {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a0f');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Update and draw balls
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize
window.addEventListener('resize', () => {
    resizeCanvas();
    initBalls();
});

resizeCanvas();
initBalls();
animate();

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Here you would typically send the data to a server
    // For now, show a success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
    }
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Don't hide hero section
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'none';
