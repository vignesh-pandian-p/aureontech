// AUREON TECH - Advanced Particle System
// Revolutionary Interactive Particle Effects

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-system');
        this.matrixCanvas = document.getElementById('matrix-bg');
        
        if (!this.canvas || !this.matrixCanvas) {
            console.warn('Particle canvases not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.matrixCtx = this.matrixCanvas.getContext('2d');
        
        this.particles = [];
        this.interactiveParticles = [];
        this.connections = [];
        this.matrixChars = [];
        this.energyOrbs = [];
        this.explosions = [];
        
        this.mouse = { x: 0, y: 0 };
        this.isRunning = true;
        this.attractionRadius = 150;
        this.connectionDistance = 100;
        
        this.colors = {
            cyan: 'rgba(0, 255, 255, ',
            purple: 'rgba(157, 78, 221, ',
            orange: 'rgba(255, 107, 53, ',
            white: 'rgba(255, 255, 255, '
        };
        
        this.matrixCharacters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()';
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.createMatrixRain();
        this.createEnergyOrbs();
        this.setupEventListeners();
        this.animate();
        
        console.log('🌟 Particle System Initialized');
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.matrixCanvas.width = window.innerWidth;
        this.matrixCanvas.height = window.innerHeight;
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createMouseTrail(e.clientX, e.clientY);
        });
        
        document.addEventListener('click', (e) => {
            this.createExplosion(e.clientX, e.clientY);
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX;
            this.mouse.y = touch.clientY;
        });
        
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.createExplosion(touch.clientX, touch.clientY);
        });
    }
    
    createParticles() {
        const particleCount = window.innerWidth < 768 ? 50 : 100;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = {
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                color: this.getRandomColor(),
                life: Math.random() * 100 + 50,
                maxLife: 100,
                trail: []
            };
            
            this.particles.push(particle);
        }
        
        // Create interactive particles
        for (let i = 0; i < 30; i++) {
            const particle = {
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                baseX: 0,
                baseY: 0,
                vx: 0,
                vy: 0,
                size: Math.random() * 2 + 1,
                opacity: 0.6,
                color: this.colors.cyan,
                attracted: false
            };
            
            particle.baseX = particle.x;
            particle.baseY = particle.y;
            
            this.interactiveParticles.push(particle);
        }
    }
    
    createMatrixRain() {
        const columns = Math.floor(this.width / 20);
        
        for (let i = 0; i < columns; i++) {
            const char = {
                x: i * 20,
                y: Math.random() * this.height,
                char: this.getRandomMatrixChar(),
                speed: Math.random() * 5 + 2,
                opacity: Math.random() * 0.8 + 0.2,
                fadePhase: Math.random() * Math.PI * 2
            };
            
            this.matrixChars.push(char);
        }
    }
    
    createEnergyOrbs() {
        const orbCount = window.innerWidth < 768 ? 3 : 6;
        
        for (let i = 0; i < orbCount; i++) {
            const orb = {
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: Math.random() * 15 + 10,
                pulsePhase: Math.random() * Math.PI * 2,
                color: this.getRandomColor(),
                energy: Math.random() * 100 + 50
            };
            
            this.energyOrbs.push(orb);
        }
    }
    
    createMouseTrail(x, y) {
        const trail = {
            x: x,
            y: y,
            size: Math.random() * 5 + 2,
            opacity: 1,
            life: 30,
            maxLife: 30,
            color: this.colors.cyan
        };
        
        // Add to particle array as temporary trail particle
        this.particles.push(trail);
    }
    
    createExplosion(x, y) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 8 + 2;
            
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 4 + 2,
                opacity: 1,
                color: this.colors.orange,
                life: 60,
                maxLife: 60,
                gravity: 0.1,
                friction: 0.98,
                isExplosion: true
            };
            
            this.explosions.push(particle);
        }
    }
    
    updateParticles() {
        // Update regular particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary wrapping
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;
            
            // Update life
            if (particle.life !== undefined) {
                particle.life--;
                particle.opacity = particle.life / particle.maxLife;
                
                if (particle.life <= 0) {
                    this.particles.splice(i, 1);
                }
            }
            
            // Update trail
            if (particle.trail) {
                particle.trail.push({ x: particle.x, y: particle.y });
                if (particle.trail.length > 10) {
                    particle.trail.shift();
                }
            }
        }
        
        // Update interactive particles
        this.interactiveParticles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.attractionRadius) {
                const force = (this.attractionRadius - distance) / this.attractionRadius;
                particle.vx += dx * force * 0.01;
                particle.vy += dy * force * 0.01;
                particle.attracted = true;
                particle.opacity = Math.min(1, 0.6 + force * 0.4);
            } else {
                // Return to base position
                const returnDx = particle.baseX - particle.x;
                const returnDy = particle.baseY - particle.y;
                particle.vx += returnDx * 0.02;
                particle.vy += returnDy * 0.02;
                particle.attracted = false;
                particle.opacity = 0.6;
            }
            
            // Apply velocity with damping
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.95;
            particle.vy *= 0.95;
        });
        
        // Update explosion particles
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const particle = this.explosions[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.vx *= particle.friction;
            particle.vy *= particle.friction;
            
            particle.life--;
            particle.opacity = particle.life / particle.maxLife;
            
            if (particle.life <= 0) {
                this.explosions.splice(i, 1);
            }
        }
    }
    
    updateMatrixRain() {
        this.matrixChars.forEach(char => {
            char.y += char.speed;
            char.fadePhase += 0.1;
            char.opacity = (Math.sin(char.fadePhase) + 1) * 0.4 + 0.2;
            
            if (char.y > this.height + 20) {
                char.y = -20;
                char.char = this.getRandomMatrixChar();
            }
            
            // Occasionally change character
            if (Math.random() < 0.02) {
                char.char = this.getRandomMatrixChar();
            }
        });
    }
    
    updateEnergyOrbs() {
        this.energyOrbs.forEach(orb => {
            orb.x += orb.vx;
            orb.y += orb.vy;
            orb.pulsePhase += 0.05;
            
            // Boundary collision
            if (orb.x < orb.size || orb.x > this.width - orb.size) {
                orb.vx *= -1;
            }
            if (orb.y < orb.size || orb.y > this.height - orb.size) {
                orb.vy *= -1;
            }
            
            // Pulse effect
            orb.currentSize = orb.size + Math.sin(orb.pulsePhase) * 5;
        });
    }
    
    updateConnections() {
        this.connections = [];
        
        // Create connections between nearby particles
        for (let i = 0; i < this.interactiveParticles.length; i++) {
            for (let j = i + 1; j < this.interactiveParticles.length; j++) {
                const p1 = this.interactiveParticles[i];
                const p2 = this.interactiveParticles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    this.connections.push({
                        x1: p1.x,
                        y1: p1.y,
                        x2: p2.x,
                        y2: p2.y,
                        opacity: opacity * 0.3
                    });
                }
            }
        }
    }
    
    render() {
        // Clear canvases
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.matrixCtx.clearRect(0, 0, this.width, this.height);
        
        // Render matrix background
        this.renderMatrix();
        
        // Render connections
        this.renderConnections();
        
        // Render particles
        this.renderParticles();
        this.renderInteractiveParticles();
        this.renderEnergyOrbs();
        this.renderExplosions();
    }
    
    renderMatrix() {
        this.matrixCtx.font = '14px Courier New';
        this.matrixCtx.textAlign = 'center';
        
        this.matrixChars.forEach(char => {
            this.matrixCtx.fillStyle = `rgba(0, 255, 255, ${char.opacity})`;
            this.matrixCtx.fillText(char.char, char.x, char.y);
            
            // Add glow effect
            this.matrixCtx.shadowColor = 'rgba(0, 255, 255, 0.5)';
            this.matrixCtx.shadowBlur = 10;
            this.matrixCtx.fillText(char.char, char.x, char.y);
            this.matrixCtx.shadowBlur = 0;
        });
    }
    
    renderConnections() {
        this.connections.forEach(connection => {
            this.ctx.beginPath();
            this.ctx.moveTo(connection.x1, connection.y1);
            this.ctx.lineTo(connection.x2, connection.y2);
            this.ctx.strokeStyle = `rgba(0, 255, 255, ${connection.opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
    }
    
    renderParticles() {
        this.particles.forEach(particle => {
            // Render trail
            if (particle.trail && particle.trail.length > 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                
                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }
                
                this.ctx.strokeStyle = `${particle.color}${particle.opacity * 0.3})`;
                this.ctx.lineWidth = particle.size * 0.5;
                this.ctx.stroke();
            }
            
            // Render particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}${particle.opacity})`;
            this.ctx.fill();
            
            // Add glow
            this.ctx.shadowColor = `${particle.color}0.8)`;
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    renderInteractiveParticles() {
        this.interactiveParticles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            if (particle.attracted) {
                this.ctx.fillStyle = `${this.colors.orange}${particle.opacity})`;
                this.ctx.shadowColor = this.colors.orange + '0.8)';
                this.ctx.shadowBlur = particle.size * 3;
            } else {
                this.ctx.fillStyle = `${particle.color}${particle.opacity})`;
                this.ctx.shadowColor = particle.color + '0.6)';
                this.ctx.shadowBlur = particle.size * 2;
            }
            
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    renderEnergyOrbs() {
        this.energyOrbs.forEach(orb => {
            const gradient = this.ctx.createRadialGradient(
                orb.x, orb.y, 0,
                orb.x, orb.y, orb.currentSize
            );
            
            gradient.addColorStop(0, `${orb.color}0.8)`);
            gradient.addColorStop(0.5, `${orb.color}0.4)`);
            gradient.addColorStop(1, `${orb.color}0)`);
            
            this.ctx.beginPath();
            this.ctx.arc(orb.x, orb.y, orb.currentSize, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Add outer glow
            this.ctx.shadowColor = orb.color + '0.6)';
            this.ctx.shadowBlur = orb.currentSize;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    renderExplosions() {
        this.explosions.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}${particle.opacity})`;
            this.ctx.fill();
            
            // Add intense glow for explosion particles
            this.ctx.shadowColor = `${particle.color}1)`;
            this.ctx.shadowBlur = particle.size * 4;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.updateParticles();
        this.updateMatrixRain();
        this.updateEnergyOrbs();
        this.updateConnections();
        this.render();
        
        requestAnimationFrame(() => this.animate());
    }
    
    // Utility methods
    getRandomColor() {
        const colors = [this.colors.cyan, this.colors.purple, this.colors.orange];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    getRandomMatrixChar() {
        return this.matrixCharacters[Math.floor(Math.random() * this.matrixCharacters.length)];
    }
    
    // Control methods
    pause() {
        this.isRunning = false;
    }
    
    resume() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    destroy() {
        this.isRunning = false;
        this.particles = [];
        this.interactiveParticles = [];
        this.connections = [];
        this.matrixChars = [];
        this.energyOrbs = [];
        this.explosions = [];
    }
    
    // Public methods for external control
    addBurst(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 5 + 2;
            
            const particle = {
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 1,
                opacity: 1,
                color: this.getRandomColor(),
                life: 80,
                maxLife: 80,
                trail: []
            };
            
            this.particles.push(particle);
        }
    }
    
    setAttractionRadius(radius) {
        this.attractionRadius = radius;
    }
    
    setConnectionDistance(distance) {
        this.connectionDistance = distance;
    }
}

// Initialize particle system
window.ParticleSystem = ParticleSystem;

// Auto-initialize if canvas exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particle-system')) {
        window.particleSystem = new ParticleSystem();
    }
});

