// AUREON TECH - Main JavaScript File
// Revolutionary Interactive Experience

class AureonTech {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.startAnimations();
        this.initializeParticles();
        this.setupIntersectionObserver();
        this.initializeAudio();
    }

    initializeApp() {
        // Initialize cursor
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorTrail = document.querySelector('.cursor-trail');
        
        // Initialize navigation
        this.floatingNav = document.getElementById('floating-nav');
        this.navOrbs = document.querySelectorAll('.nav-orb');
        
        // Initialize header
        this.header = document.getElementById('header');
        
        // Initialize forms
        this.contactForm = document.getElementById('contact-form');
        this.formSuccess = document.getElementById('form-success');
        
        // Initialize tech stack
        this.techDetails = document.getElementById('tech-details');
        this.techGrid = document.getElementById('tech-grid');
        
        // Initialize counters
        this.statsAnimated = false;
        
        // Initialize typewriter
        this.typewriterElement = document.getElementById('hero-description');
        this.typewriterTexts = [
            'Revolutionary IT solutions powered by cutting-edge technology and innovative thinking',
            'Building the future with holographic interfaces and quantum computing',
            'Transforming businesses through AI-powered automation and smart solutions',
            'Leading the digital revolution with blockchain and decentralized applications'
        ];
        this.currentTextIndex = 0;
        
        // Tech stack data
        this.techData = {
            frontend: [
                'React.js', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript ES6+',
                'TypeScript', 'Sass/SCSS', 'Webpack', 'Vite', 'Next.js', 'Nuxt.js',
                'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Styled Components'
            ],
            backend: [
                'Node.js', 'Express.js', 'Django', 'Flask', 'Laravel', 'Spring Boot',
                'Ruby on Rails', 'ASP.NET Core', 'FastAPI', 'Nest.js', 'Koa.js', 'Fastify',
                'GraphQL', 'REST API', 'Microservices', 'Socket.io'
            ],
            database: [
                'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra',
                'Neo4j', 'DynamoDB', 'Firebase', 'Supabase', 'PlanetScale', 'CockroachDB',
                'SQLite', 'Oracle', 'SQL Server', 'InfluxDB'
            ],
            cloud: [
                'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
                'Ansible', 'Jenkins', 'GitLab CI', 'GitHub Actions', 'Serverless', 'Vercel',
                'Heroku', 'DigitalOcean', 'Cloudflare', 'Firebase Hosting'
            ],
            tools: [
                'Git', 'GitHub', 'GitLab', 'Jira', 'Slack', 'VS Code',
                'IntelliJ IDEA', 'Postman', 'Figma', 'Adobe XD', 'Sketch', 'Zeplin'
            ]
        };
        
        // Theme management
        this.currentTheme = localStorage.getItem('aureon-theme') || 'dark';
        this.applyTheme(this.currentTheme);
        
        console.log('🚀 AUREON TECH - System Initialized');
    }

    setupEventListeners() {
        // Custom cursor
        document.addEventListener('mousemove', (e) => this.updateCursor(e));
        document.addEventListener('mousedown', () => this.cursor.style.transform = 'scale(0.8)');
        document.addEventListener('mouseup', () => this.cursor.style.transform = 'scale(1)');
        
        // Navigation
        this.navOrbs.forEach(orb => {
            orb.addEventListener('click', (e) => this.handleNavigation(e));
        });
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        // Tech stack interaction
        document.querySelectorAll('.planet').forEach(planet => {
            planet.addEventListener('mouseenter', (e) => this.showTechDetails(e));
            planet.addEventListener('mouseleave', () => this.hideTechDetails());
        });
        
        // Service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.playHoverSound());
            card.addEventListener('click', () => this.playClickSound());
        });
        
        // CTA Button
        const ctaButton = document.getElementById('explore-btn');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.playClickSound();
                this.scrollToSection('services');
            });
        }
        
        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Top navigation links
        const topNavLinks = document.querySelectorAll('.nav-link');
        topNavLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleTopNavigation(e));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Page visibility
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    updateCursor(e) {
        if (window.innerWidth > 768) {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            // Delayed trail effect
            setTimeout(() => {
                this.cursorTrail.style.left = e.clientX + 'px';
                this.cursorTrail.style.top = e.clientY + 'px';
            }, 100);
        }
    }

    handleNavigation(e) {
        const target = e.currentTarget.getAttribute('data-target');
        
        // Update active state
        this.navOrbs.forEach(orb => orb.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Scroll to section
        this.scrollToSection(target);
        
        // Play sound
        this.playClickSound();
    }

    handleTopNavigation(e) {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('data-target');
        
        // Update active state for top nav
        const topNavLinks = document.querySelectorAll('.nav-link');
        topNavLinks.forEach(link => link.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Update active state for floating nav
        this.navOrbs.forEach(orb => orb.classList.remove('active'));
        const correspondingOrb = document.querySelector(`[data-target="${target}"]`);
        if (correspondingOrb) {
            correspondingOrb.classList.add('active');
        }
        
        // Scroll to section
        this.scrollToSection(target);
        
        // Play sound
        this.playClickSound();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('aureon-theme', this.currentTheme);
        
        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        if (this.currentTheme === 'light') {
            themeIcon.className = 'fas fa-sun theme-icon';
        } else {
            themeIcon.className = 'fas fa-moon theme-icon';
        }
        
        this.playClickSound();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header background
        if (scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Update active navigation
        this.updateActiveNavigation();
        
        // Parallax effects
        this.updateParallax(scrollY);
        
        // Animate stats when in view
        if (!this.statsAnimated) {
            const statsSection = document.querySelector('.stats-grid');
            if (statsSection && this.isElementInViewport(statsSection)) {
                this.animateStats();
                this.statsAnimated = true;
            }
        }
    }

    updateActiveNavigation() {
        const sections = ['home', 'about', 'services', 'tech-stack', 'contact'];
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navOrb = document.querySelector(`[data-target="${sectionId}"]`);
            
            if (section && navOrb) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navOrbs.forEach(orb => orb.classList.remove('active'));
                    navOrb.classList.add('active');
                }
            }
        });
    }

    updateParallax(scrollY) {
        // Hero section parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        // Geometric shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
        });
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.05);
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateStat = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateStat();
        });
    }

    showTechDetails(e) {
        const techType = e.target.getAttribute('data-tech');
        const techList = this.techData[techType];
        
        if (techList) {
            const categoryTitle = document.querySelector('.tech-category');
            categoryTitle.textContent = techType.charAt(0).toUpperCase() + techType.slice(1) + ' Technologies';
            
            this.techGrid.innerHTML = '';
            
            techList.forEach((tech, index) => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                techItem.textContent = tech;
                techItem.style.animationDelay = `${index * 0.1}s`;
                techItem.classList.add('fade-in-up');
                this.techGrid.appendChild(techItem);
            });
            
            this.playHoverSound();
        }
    }

    hideTechDetails() {
        setTimeout(() => {
            const categoryTitle = document.querySelector('.tech-category');
            categoryTitle.textContent = 'Select a Technology';
            this.techGrid.innerHTML = '<p class="tech-placeholder">Hover over a planet to explore technologies</p>';
        }, 500);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validation
        if (!this.validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showFormSuccess();
            this.contactForm.reset();
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            this.playSuccessSound();
        }, 2000);
    }

    validateForm(name, email, subject, message) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name || name.length < 2) {
            this.showFormError('Please enter a valid name');
            return false;
        }
        
        if (!email || !emailRegex.test(email)) {
            this.showFormError('Please enter a valid email address');
            return false;
        }
        
        if (!subject || subject.length < 5) {
            this.showFormError('Please enter a subject (minimum 5 characters)');
            return false;
        }
        
        if (!message || message.length < 10) {
            this.showFormError('Please enter a message (minimum 10 characters)');
            return false;
        }
        
        return true;
    }

    showFormError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.cssText = `
                background: rgba(255, 0, 0, 0.1);
                border: 1px solid rgba(255, 0, 0, 0.3);
                color: #ff4444;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
            `;
            this.contactForm.insertBefore(errorDiv, this.contactForm.firstChild);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
        
        this.playErrorSound();
    }

    showFormSuccess() {
        this.formSuccess.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.formSuccess.classList.remove('show');
        }, 5000);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.animate-on-scroll, .fade-in-up, .service-card, .info-item');
        animateElements.forEach(el => observer.observe(el));
    }

    startAnimations() {
        // Start typewriter animation
        this.startTypewriter();
        
        // Start morphing title animations
        this.startMorphingTitles();
        
        // Start holographic effects
        this.startHolographicEffects();
        
        // Start particle connections
        this.startParticleConnections();
    }

    startTypewriter() {
        if (!this.typewriterElement) return;
        
        const typeText = (text, callback) => {
            let i = 0;
            this.typewriterElement.textContent = '';
            this.typewriterElement.style.borderRight = '2px solid var(--primary-cyan)';
            
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    this.typewriterElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        this.typewriterElement.style.borderRight = 'none';
                        if (callback) callback();
                    }, 1000);
                }
            }, 50);
        };
        
        const cycleTexts = () => {
            typeText(this.typewriterTexts[this.currentTextIndex], () => {
                setTimeout(() => {
                    this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
                    cycleTexts();
                }, 3000);
            });
        };
        
        cycleTexts();
    }

    startMorphingTitles() {
        const morphingTitles = document.querySelectorAll('.morphing-title');
        
        morphingTitles.forEach(title => {
            setInterval(() => {
                title.style.textShadow = `
                    0 0 10px var(--primary-cyan),
                    0 0 20px var(--primary-purple),
                    0 0 30px var(--primary-orange)
                `;
                
                setTimeout(() => {
                    title.style.textShadow = 'none';
                }, 500);
            }, 4000);
        });
    }

    startHolographicEffects() {
        const holographicElements = document.querySelectorAll('.holographic-card, .holographic-panel');
        
        holographicElements.forEach(element => {
            setInterval(() => {
                element.style.boxShadow = `
                    0 0 20px rgba(0, 255, 255, 0.5),
                    inset 0 0 20px rgba(0, 255, 255, 0.1)
                `;
                
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 1000);
            }, 6000);
        });
    }

    startParticleConnections() {
        // This will be handled by the particles.js file
        // Just trigger the initialization
        if (window.ParticleSystem) {
            new ParticleSystem();
        }
    }

    initializeParticles() {
        // Initialize particle system
        if (window.ParticleSystem) {
            this.particleSystem = new ParticleSystem();
        }
    }

    initializeAudio() {
        // Initialize audio system
        if (window.AudioSystem) {
            this.audioSystem = new AudioSystem();
        }
    }

    // Audio methods
    playHoverSound() {
        if (this.audioSystem && this.audioSystem.soundEnabled) {
            this.audioSystem.playHover();
        }
    }

    playClickSound() {
        if (this.audioSystem && this.audioSystem.soundEnabled) {
            this.audioSystem.playClick();
        }
    }

    playSuccessSound() {
        if (this.audioSystem && this.audioSystem.soundEnabled) {
            this.audioSystem.playSuccess();
        }
    }

    playErrorSound() {
        if (this.audioSystem && this.audioSystem.soundEnabled) {
            this.audioSystem.playError();
        }
    }

    toggleAudio() {
        if (this.audioSystem) {
            this.audioSystem.toggle();
            const audioToggle = document.getElementById('audio-toggle');
            if (this.audioSystem.soundEnabled) {
                audioToggle.classList.remove('muted');
            } else {
                audioToggle.classList.add('muted');
            }
        }
    }

    // Utility methods
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    toggleMobileMenu() {
        const mobileOverlay = document.getElementById('mobile-nav-overlay');
        const mobileMenuToggle = document.getElementById('mobile-menu');
        
        if (mobileOverlay.classList.contains('active')) {
            mobileOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        } else {
            mobileOverlay.classList.add('active');
            mobileMenuToggle.classList.add('active');
        }
        
        this.playClickSound();
    }

    handleKeyboardNav(e) {
        // Handle keyboard navigation
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(el => el.classList.remove('active'));
        }
        
        // Arrow key navigation through nav orbs
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const activeOrb = document.querySelector('.nav-orb.active');
            const orbs = Array.from(this.navOrbs);
            const currentIndex = orbs.indexOf(activeOrb);
            
            let nextIndex;
            if (e.key === 'ArrowUp') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : orbs.length - 1;
            } else {
                nextIndex = currentIndex < orbs.length - 1 ? currentIndex + 1 : 0;
            }
            
            orbs[nextIndex].click();
        }
    }

    handleResize() {
        // Handle window resize
        if (this.particleSystem) {
            this.particleSystem.resize();
        }
        
        // Update cursor visibility
        if (window.innerWidth <= 768) {
            this.cursor.style.display = 'none';
            this.cursorTrail.style.display = 'none';
        } else {
            this.cursor.style.display = 'block';
            this.cursorTrail.style.display = 'block';
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            if (this.particleSystem) {
                this.particleSystem.pause();
            }
        } else {
            // Resume animations when tab becomes visible
            if (this.particleSystem) {
                this.particleSystem.resume();
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aureonTech = new AureonTech();
    
    // Add some global utility functions
    window.utils = {
        random: (min, max) => Math.random() * (max - min) + min,
        lerp: (start, end, factor) => start + (end - start) * factor,
        clamp: (value, min, max) => Math.min(Math.max(value, min), max),
        map: (value, inMin, inMax, outMin, outMax) => {
            return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        }
    };
    
    console.log('✨ AUREON TECH - Ready for the Future!');
});

// Handle page load
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Start advanced animations
    document.body.classList.add('loaded');
    
    console.log('🚀 AUREON TECH - All Systems Operational!');
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    // Clean up resources
    if (window.aureonTech && window.aureonTech.particleSystem) {
        window.aureonTech.particleSystem.destroy();
    }
    
    if (window.aureonTech && window.aureonTech.audioSystem) {
        window.aureonTech.audioSystem.destroy();
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('💥 AUREON TECH Error:', e.error);
    // Could send error to monitoring service
});

// Service Worker registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
