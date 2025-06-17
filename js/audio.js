// AUREON TECH - Advanced Audio System
// Revolutionary Interactive Sound Design

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.soundEnabled = localStorage.getItem('aureon-audio') !== 'false';
        this.masterVolume = 0.3;
        this.sounds = {};
        this.activeOscillators = [];
        this.analyser = null;
        this.audioBuffer = null;
        
        this.frequencyData = new Uint8Array(256);
        this.waveform = new Float32Array(256);
        
        this.init();
    }
    
    async init() {
        try {
            if (this.soundEnabled) {
                await this.initAudioContext();
                this.createSounds();
                this.setupAnalyser();
                this.startAmbientSoundscape();
            }
            
            this.setupEventListeners();
            console.log('🔊 Audio System Initialized');
        } catch (error) {
            console.warn('Audio initialization failed:', error);
            this.soundEnabled = false;
        }
    }
    
    async initAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Resume context if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }
    
    setupAnalyser() {
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.connect(this.audioContext.destination);
    }
    
    createSounds() {
        // Create different types of sounds using Web Audio API
        this.sounds = {
            hover: this.createHoverSound(),
            click: this.createClickSound(),
            success: this.createSuccessSound(),
            error: this.createErrorSound(),
            notification: this.createNotificationSound(),
            whoosh: this.createWhooshSound(),
            zap: this.createZapSound(),
            ambient: this.createAmbientLoop()
        };
    }
    
    createHoverSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.15);
            
            this.activeOscillators.push(oscillator);
            
            oscillator.onended = () => {
                const index = this.activeOscillators.indexOf(oscillator);
                if (index > -1) {
                    this.activeOscillators.splice(index, 1);
                }
            };
        };
    }
    
    createClickSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(500, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
            
            this.activeOscillators.push(oscillator);
            
            oscillator.onended = () => {
                const index = this.activeOscillators.indexOf(oscillator);
                if (index > -1) {
                    this.activeOscillators.splice(index, 1);
                }
            };
        };
    }
    
    createSuccessSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
            
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.type = 'triangle';
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.15, this.audioContext.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.3);
                    
                    this.activeOscillators.push(oscillator);
                    
                    oscillator.onended = () => {
                        const index = this.activeOscillators.indexOf(oscillator);
                        if (index > -1) {
                            this.activeOscillators.splice(index, 1);
                        }
                    };
                }, index * 100);
            });
        };
    }
    
    createErrorSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(200, this.audioContext.currentTime + 0.5);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.3, this.audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
            
            this.activeOscillators.push(oscillator);
            
            oscillator.onended = () => {
                const index = this.activeOscillators.indexOf(oscillator);
                if (index > -1) {
                    this.activeOscillators.splice(index, 1);
                }
            };
        };
    }
    
    createNotificationSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator1.connect(filter);
            oscillator2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(880, this.audioContext.currentTime);
            
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(1100, this.audioContext.currentTime);
            
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            filter.Q.setValueAtTime(5, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            
            oscillator1.start(this.audioContext.currentTime);
            oscillator1.stop(this.audioContext.currentTime + 0.3);
            
            oscillator2.start(this.audioContext.currentTime);
            oscillator2.stop(this.audioContext.currentTime + 0.3);
            
            this.activeOscillators.push(oscillator1, oscillator2);
        };
    }
    
    createWhooshSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const bufferSize = this.audioContext.sampleRate * 0.5;
            const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = (Math.random() * 2 - 1) * Math.pow((bufferSize - i) / bufferSize, 2);
            }
            
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            source.buffer = buffer;
            source.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
            
            source.start(this.audioContext.currentTime);
            source.stop(this.audioContext.currentTime + 0.5);
        };
    }
    
    createZapSound() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(2000, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.05);
            
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1500, this.audioContext.currentTime);
            filter.Q.setValueAtTime(10, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.05);
            
            this.activeOscillators.push(oscillator);
        };
    }
    
    createAmbientLoop() {
        return () => {
            if (!this.soundEnabled || !this.audioContext) return;
            
            // Create a subtle ambient drone
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            
            // Setup LFO for modulation
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.1, this.audioContext.currentTime);
            lfo.connect(lfoGain);
            lfoGain.gain.setValueAtTime(20, this.audioContext.currentTime);
            lfoGain.connect(oscillator1.frequency);
            
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(55, this.audioContext.currentTime); // A1
            
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(82.4, this.audioContext.currentTime); // E2
            
            oscillator1.connect(filter);
            oscillator2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
            filter.Q.setValueAtTime(1, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.05, this.audioContext.currentTime + 2);
            
            lfo.start(this.audioContext.currentTime);
            oscillator1.start(this.audioContext.currentTime);
            oscillator2.start(this.audioContext.currentTime);
            
            // Keep references for cleanup
            this.ambientOscillators = [lfo, oscillator1, oscillator2];
        };
    }
    
    startAmbientSoundscape() {
        if (this.soundEnabled && this.audioContext) {
            // Start subtle ambient sound after user interaction
            document.addEventListener('click', () => {
                if (!this.ambientStarted) {
                    this.sounds.ambient();
                    this.ambientStarted = true;
                }
            }, { once: true });
        }
    }
    
    setupEventListeners() {
        // Auto-play sounds based on interactions
        document.addEventListener('DOMContentLoaded', () => {
            // Hover sounds
            const hoverElements = document.querySelectorAll('.nav-orb, .service-card, .cta-button, .info-item');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => this.playHover());
            });
            
            // Click sounds
            const clickElements = document.querySelectorAll('button, .nav-orb, .service-card, a');
            clickElements.forEach(element => {
                element.addEventListener('click', () => this.playClick());
            });
            
            // Form events
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', () => this.playSuccess());
                
                const formInputs = form.querySelectorAll('input, textarea');
                formInputs.forEach(input => {
                    input.addEventListener('focus', () => this.playNotification());
                });
            }
            
            // Special effects
            document.addEventListener('scroll', this.throttle(() => {
                if (Math.random() < 0.1) { // 10% chance on scroll
                    this.playWhoosh();
                }
            }, 1000));
        });
    }
    
    // Public API methods
    playHover() {
        if (this.sounds.hover) this.sounds.hover();
    }
    
    playClick() {
        if (this.sounds.click) this.sounds.click();
    }
    
    playSuccess() {
        if (this.sounds.success) this.sounds.success();
    }
    
    playError() {
        if (this.sounds.error) this.sounds.error();
    }
    
    playNotification() {
        if (this.sounds.notification) this.sounds.notification();
    }
    
    playWhoosh() {
        if (this.sounds.whoosh) this.sounds.whoosh();
    }
    
    playZap() {
        if (this.sounds.zap) this.sounds.zap();
    }
    
    // Audio visualization
    getFrequencyData() {
        if (this.analyser) {
            this.analyser.getByteFrequencyData(this.frequencyData);
            return this.frequencyData;
        }
        return null;
    }
    
    getWaveformData() {
        if (this.analyser) {
            this.analyser.getFloatTimeDomainData(this.waveform);
            return this.waveform;
        }
        return null;
    }
    
    // Volume control
    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('aureon-volume', this.masterVolume.toString());
    }
    
    getVolume() {
        return this.masterVolume;
    }
    
    // Enable/disable audio
    toggle() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('aureon-audio', this.soundEnabled.toString());
        
        if (!this.soundEnabled) {
            this.stopAllSounds();
        } else if (!this.audioContext) {
            this.init();
        }
        
        return this.soundEnabled;
    }
    
    enable() {
        if (!this.soundEnabled) {
            this.toggle();
        }
    }
    
    disable() {
        if (this.soundEnabled) {
            this.toggle();
        }
    }
    
    // Cleanup
    stopAllSounds() {
        this.activeOscillators.forEach(oscillator => {
            try {
                oscillator.stop();
            } catch (e) {
                // Oscillator may already be stopped
            }
        });
        this.activeOscillators = [];
        
        if (this.ambientOscillators) {
            this.ambientOscillators.forEach(oscillator => {
                try {
                    oscillator.stop();
                } catch (e) {
                    // Oscillator may already be stopped
                }
            });
            this.ambientOscillators = [];
        }
    }
    
    destroy() {
        this.stopAllSounds();
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.sounds = {};
        this.soundEnabled = false;
    }
    
    // Utility methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Advanced audio effects
    createReverbEffect() {
        if (!this.audioContext) return null;
        
        const convolver = this.audioContext.createConvolver();
        const bufferSize = this.audioContext.sampleRate * 2;
        const buffer = this.audioContext.createBuffer(2, bufferSize, this.audioContext.sampleRate);
        
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const output = buffer.getChannelData(channel);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
            }
        }
        
        convolver.buffer = buffer;
        return convolver;
    }
    
    createDistortionEffect() {
        if (!this.audioContext) return null;
        
        const waveshaper = this.audioContext.createWaveShaper();
        const samples = 44100;
        const curve = new Float32Array(samples);
        const degree = 50;
        
        for (let i = 0; i < samples; i++) {
            const x = (i * 2) / samples - 1;
            curve[i] = ((3 + degree) * x * 20 * Math.PI) / 180 / (Math.PI + degree * Math.abs(x));
        }
        
        waveshaper.curve = curve;
        waveshaper.oversample = '4x';
        
        return waveshaper;
    }
    
    // Spatial audio
    createSpatialSound(x, y, z = 0) {
        if (!this.audioContext) return null;
        
        const panner = this.audioContext.createPanner();
        panner.panningModel = 'HRTF';
        panner.distanceModel = 'exponential';
        panner.refDistance = 1;
        panner.maxDistance = 10000;
        panner.rolloffFactor = 1;
        panner.coneInnerAngle = 360;
        panner.coneOuterAngle = 0;
        panner.coneOuterGain = 0;
        
        panner.setPosition(x, y, z);
        
        return panner;
    }
}

// Initialize audio system
window.AudioSystem = AudioSystem;

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.audioSystem = new AudioSystem();
});

