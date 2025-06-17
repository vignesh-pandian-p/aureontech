// AUREON TECH - Advanced Animation Engine
// Revolutionary Animation System with Performance Optimization

class AnimationEngine {
    constructor() {
        this.activeAnimations = new Map();
        this.observers = new Map();
        this.performanceMode = this.detectPerformanceMode();
        
        this.easingFunctions = {
            easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeOut: t => 1 - Math.pow(1 - t, 3),
            easeIn: t => t * t * t,
            bounce: t => {
                if (t < 1/2.75) return 7.5625 * t * t;
                if (t < 2/2.75) return 7.5625 * (t -= 1.5/2.75) * t + 0.75;
                if (t < 2.5/2.75) return 7.5625 * (t -= 2.25/2.75) * t + 0.9375;
                return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
            },
            elastic: t => Math.sin(13 * Math.PI / 2 * t) * Math.pow(2, 10 * (t - 1))
        };
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupMorphingElements();
        this.setupCounterAnimations();
        this.setupRevealAnimations();
        this.setupParallaxEffects();
        
        console.log('🎭 Animation Engine Initialized');
    }
    
    detectPerformanceMode() {
        // Detect device performance capabilities
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        const connection = navigator.connection?.effectiveType || '4g';
        
        if (memory >= 8 && cores >= 8 && connection === '4g') {
            return 'high';
        } else if (memory >= 4 && cores >= 4) {
            return 'medium';
        } else {
            return 'low';
        }
    }
    
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll-animation]');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.scrollAnimation;
                    const delay = parseInt(element.dataset.scrollDelay) || 0;
                    
                    setTimeout(() => {
                        this.triggerScrollAnimation(element, animationType);
                    }, delay);
                    
                    scrollObserver.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        scrollElements.forEach(el => scrollObserver.observe(el));
        this.observers.set('scroll', scrollObserver);
    }
    
    setupHoverAnimations() {
        // Magnetic attraction effect
        const magneticElements = document.querySelectorAll('.magnetic, .service-card, .nav-orb');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.startMagneticEffect(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.stopMagneticEffect(e.target);
            });
            
            element.addEventListener('mousemove', (e) => {
                this.updateMagneticEffect(e);
            });
        });
        
        // Hover lift effect
        const liftElements = document.querySelectorAll('.hover-lift, .cta-button, .info-item');
        
        liftElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.animateElement(element, {
                    transform: 'translateY(-10px) scale(1.02)',
                    filter: 'brightness(1.1)',
                    boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
                }, 300, 'easeOut');
            });
            
            element.addEventListener('mouseleave', () => {
                this.animateElement(element, {
                    transform: 'translateY(0) scale(1)',
                    filter: 'brightness(1)',
                    boxShadow: 'none'
                }, 300, 'easeOut');
            });
        });
    }
    
    setupMorphingElements() {
        const morphingElements = document.querySelectorAll('.morphing-title, .morphing-form');
        
        morphingElements.forEach(element => {
            this.startContinuousMorphing(element);
        });
    }
    
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.counter);
                    const duration = parseInt(element.dataset.counterDuration) || 2000;
                    
                    this.animateCounter(element, target, duration);
                    counterObserver.unobserve(element);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
        this.observers.set('counter', counterObserver);
    }
    
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const direction = element.dataset.revealDirection || 'up';
                    const delay = parseInt(element.dataset.revealDelay) || 0;
                    
                    setTimeout(() => {
                        this.revealElement(element, direction);
                    }, delay);
                    
                    revealObserver.unobserve(element);
                }
            });
        }, { threshold: 0.2 });
        
        revealElements.forEach(el => revealObserver.observe(el));
        this.observers.set('reveal', revealObserver);
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            let ticking = false;
            
            const updateParallax = () => {
                const scrollTop = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.dataset.parallax) || 0.5;
                    const yPos = -(scrollTop * speed);
                    
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
                
                ticking = false;
            };
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            });
        }
    }
    
    // Animation methods
    triggerScrollAnimation(element, type) {
        switch (type) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'slideInLeft':
                this.slideInLeft(element);
                break;
            case 'slideInRight':
                this.slideInRight(element);
                break;
            case 'zoomIn':
                this.zoomIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            case 'flipIn':
                this.flipIn(element);
                break;
            default:
                this.fadeInUp(element);
        }
    }
    
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'translateY(0)'
        }, 800, 'easeOut');
    }
    
    slideInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-100px)';
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'translateX(0)'
        }, 800, 'easeOut');
    }
    
    slideInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(100px)';
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'translateX(0)'
        }, 800, 'easeOut');
    }
    
    zoomIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'scale(1)'
        }, 600, 'easeOut');
    }
    
    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'rotate(0deg) scale(1)'
        }, 800, 'easeOut');
    }
    
    flipIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotateY(-90deg)';
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'rotateY(0deg)'
        }, 600, 'easeOut');
    }
    
    startMagneticEffect(element) {
        element.style.transition = 'transform 0.3s ease';
        element.dataset.magnetic = 'true';
    }
    
    stopMagneticEffect(element) {
        element.style.transform = 'translate(0, 0) scale(1)';
        element.dataset.magnetic = 'false';
    }
    
    updateMagneticEffect(e) {
        const element = e.currentTarget;
        if (element.dataset.magnetic !== 'true') return;
        
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const intensity = 0.3;
        const transformX = x * intensity;
        const transformY = y * intensity;
        
        element.style.transform = `translate(${transformX}px, ${transformY}px) scale(1.05)`;
    }
    
    startContinuousMorphing(element) {
        const morphAnimation = () => {
            if (this.performanceMode === 'low') return;
            
            const duration = 4000;
            const keyframes = [
                { 
                    textShadow: '0 0 10px var(--primary-cyan)',
                    filter: 'hue-rotate(0deg)'
                },
                { 
                    textShadow: '0 0 20px var(--primary-purple)',
                    filter: 'hue-rotate(120deg)'
                },
                { 
                    textShadow: '0 0 15px var(--primary-orange)',
                    filter: 'hue-rotate(240deg)'
                },
                { 
                    textShadow: '0 0 25px var(--primary-cyan)',
                    filter: 'hue-rotate(360deg)'
                }
            ];
            
            element.animate(keyframes, {
                duration: duration,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        };
        
        morphAnimation();
    }
    
    animateCounter(element, target, duration) {
        const startTime = performance.now();
        const startValue = 0;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = this.easingFunctions.easeOut(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    revealElement(element, direction) {
        let initialTransform = '';
        
        switch (direction) {
            case 'up':
                initialTransform = 'translateY(50px)';
                break;
            case 'down':
                initialTransform = 'translateY(-50px)';
                break;
            case 'left':
                initialTransform = 'translateX(-50px)';
                break;
            case 'right':
                initialTransform = 'translateX(50px)';
                break;
            case 'scale':
                initialTransform = 'scale(0.8)';
                break;
        }
        
        element.style.opacity = '0';
        element.style.transform = initialTransform;
        
        this.animateElement(element, {
            opacity: '1',
            transform: 'translateY(0) translateX(0) scale(1)'
        }, 800, 'easeOut');
    }
    
    // Core animation method
    animateElement(element, properties, duration, easing = 'easeInOut') {
        const startTime = performance.now();
        const startValues = {};
        const targetValues = {};
        
        // Parse current and target values
        Object.keys(properties).forEach(prop => {
            const currentValue = this.getCurrentValue(element, prop);
            startValues[prop] = currentValue;
            targetValues[prop] = this.parseValue(properties[prop]);
        });
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = this.easingFunctions[easing](progress);
            
            Object.keys(properties).forEach(prop => {
                const startValue = startValues[prop];
                const targetValue = targetValues[prop];
                const currentValue = this.interpolateValue(startValue, targetValue, easedProgress);
                
                this.setElementProperty(element, prop, currentValue);
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    // Advanced animation effects
    createRippleEffect(element, x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.3);
            pointer-events: none;
            transform: scale(0);
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        element.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            ripple.remove();
        });
    }
    
    createFloatingText(text, x, y, color = 'var(--primary-cyan)') {
        const floatingText = document.createElement('div');
        floatingText.textContent = text;
        floatingText.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: ${color};
            font-weight: bold;
            pointer-events: none;
            z-index: 9999;
            text-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(floatingText);
        
        floatingText.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-50px) scale(1.2)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            floatingText.remove();
        });
    }
    
    createGlitchEffect(element, duration = 200) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*(){}[]|\\:";\'<>?,./`~';
        
        let glitchInterval;
        let elapsed = 0;
        
        const glitch = () => {
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            element.textContent = glitchedText;
            
            elapsed += 50;
            if (elapsed >= duration) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
            }
        };
        
        glitchInterval = setInterval(glitch, 50);
    }
    
    // Utility methods
    getCurrentValue(element, property) {
        const computedStyle = getComputedStyle(element);
        
        switch (property) {
            case 'opacity':
                return parseFloat(computedStyle.opacity) || 0;
            case 'transform':
                return computedStyle.transform || 'none';
            case 'filter':
                return computedStyle.filter || 'none';
            case 'boxShadow':
                return computedStyle.boxShadow || 'none';
            default:
                return computedStyle[property] || '';
        }
    }
    
    parseValue(value) {
        if (typeof value === 'string') {
            const numMatch = value.match(/-?\d+\.?\d*/g);
            if (numMatch) {
                return {
                    value: parseFloat(numMatch[0]),
                    unit: value.replace(numMatch[0], ''),
                    originalString: value
                };
            }
        }
        return { value: value, unit: '', originalString: value };
    }
    
    interpolateValue(start, target, progress) {
        if (typeof start === 'object' && typeof target === 'object') {
            const interpolated = start.value + (target.value - start.value) * progress;
            return interpolated + target.unit;
        }
        return start + (target - start) * progress;
    }
    
    setElementProperty(element, property, value) {
        switch (property) {
            case 'transform':
            case 'filter':
            case 'boxShadow':
                element.style[property] = value;
                break;
            case 'opacity':
                element.style.opacity = value;
                break;
            default:
                element.style[property] = value;
        }
    }
    
    // Performance optimization
    optimizeAnimations() {
        if (this.performanceMode === 'low') {
            // Disable expensive animations
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            document.querySelectorAll('.matrix-background, .particle-canvas').forEach(el => {
                el.style.display = 'none';
            });
        } else if (this.performanceMode === 'medium') {
            // Reduce animation complexity
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }
    }
    
    // Cleanup methods
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.activeAnimations.clear();
        this.observers.clear();
    }
    
    // Public API methods
    animateIn(element, type = 'fadeInUp', delay = 0) {
        setTimeout(() => {
            this.triggerScrollAnimation(element, type);
        }, delay);
    }
    
    pulse(element, intensity = 1.1, duration = 1000) {
        element.animate([
            { transform: 'scale(1)' },
            { transform: `scale(${intensity})` },
            { transform: 'scale(1)' }
        ], {
            duration: duration,
            easing: 'ease-in-out',
            iterations: 1
        });
    }
    
    shake(element, intensity = 5, duration = 500) {
        const keyframes = [];
        const steps = 10;
        
        for (let i = 0; i <= steps; i++) {
            const offset = i % 2 === 0 ? intensity : -intensity;
            keyframes.push({ transform: `translateX(${offset}px)` });
            intensity *= 0.8; // Decrease intensity
        }
        
        keyframes.push({ transform: 'translateX(0)' });
        
        element.animate(keyframes, {
            duration: duration,
            easing: 'ease-in-out'
        });
    }
    
    glow(element, color = 'var(--primary-cyan)', duration = 2000) {
        element.animate([
            { boxShadow: `0 0 5px ${color}` },
            { boxShadow: `0 0 25px ${color}, 0 0 50px ${color}` },
            { boxShadow: `0 0 5px ${color}` }
        ], {
            duration: duration,
            easing: 'ease-in-out',
            iterations: 1
        });
    }
}

// Initialize animation engine
window.AnimationEngine = AnimationEngine;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.animationEngine = new AnimationEngine();
    
    // Add data attributes to existing elements for auto-animation
    const elementsToAnimate = [
        { selector: '.service-card', animation: 'fadeInUp', stagger: 200 },
        { selector: '.info-item', animation: 'slideInLeft', stagger: 150 },
        { selector: '.tech-item', animation: 'zoomIn', stagger: 100 },
        { selector: '.stat-item', animation: 'slideInUp', stagger: 100 }
    ];
    
    elementsToAnimate.forEach(({ selector, animation, stagger }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.setAttribute('data-scroll-animation', animation);
            el.setAttribute('data-scroll-delay', index * stagger);
        });
    });
});

