# AUREON TECH - Replit Project Guide

## Overview

AUREON TECH is a modern IT company website featuring a futuristic, interactive design with advanced visual effects. The project is built as a static website with sophisticated frontend animations, particle systems, and audio interactions. The site showcases the company's technology services with the slogan "TRUST. DELIVER. LEAD." and emphasizes cutting-edge web technologies.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript implementation
- **Modular JavaScript**: Organized into separate modules for animations, particles, audio, and main functionality
- **Canvas-based Effects**: Dual canvas system for matrix background and particle animations
- **Performance-aware Design**: Adaptive performance modes based on device capabilities

### Technology Stack
- **Core**: HTML5, CSS3, Vanilla JavaScript ES6+
- **Fonts**: Google Fonts (Roboto, Open Sans)
- **Icons**: Font Awesome 6.4.0
- **Visual Effects**: Canvas API, Web Audio API
- **Deployment**: Python HTTP server for development

## Key Components

### 1. Visual Effects System
- **Matrix Background**: Animated falling characters reminiscent of the Matrix movie
- **Particle System**: Interactive particle effects that respond to mouse movement
- **Custom Cursor**: Enhanced cursor with trail effects
- **Holographic Elements**: CSS animations for futuristic UI elements

### 2. Animation Engine (`js/animations.js`)
- Performance-adaptive animations based on device capabilities
- Custom easing functions (bounce, elastic, easeInOut, etc.)
- Scroll-triggered animations with Intersection Observer
- Morphing elements and counter animations

### 3. Audio System (`js/audio.js`)
- Web Audio API integration for interactive sound design
- Ambient soundscape generation
- Audio analysis and visualization capabilities
- User preference storage for audio settings

### 4. Navigation System
- Floating navigation orbs with tooltips
- Smooth scrolling between sections
- Active state management for current section

### 5. Interactive Features
- Typewriter effect for hero text
- Tech stack showcase with detailed information
- Contact form with success feedback
- Responsive design for various screen sizes

## Data Flow

1. **Initialization**: Main application class initializes all subsystems
2. **User Interactions**: Mouse movements trigger particle system updates
3. **Navigation**: Floating orbs control section visibility and scrolling
4. **Animations**: Intersection Observer triggers animations as elements enter viewport
5. **Audio**: Optional audio system provides feedback for user interactions

## External Dependencies

### CDN Resources
- **Google Fonts**: Roboto and Open Sans font families
- **Font Awesome**: Icon library for UI elements

### Browser APIs
- **Canvas API**: For particle effects and matrix background
- **Web Audio API**: For interactive sound design
- **Intersection Observer API**: For scroll-triggered animations
- **Local Storage API**: For user preferences

## Deployment Strategy

### Development Environment
- **Server**: Python HTTP server on port 5000
- **Modules**: Node.js 20 and Python 3.11 support
- **Workflow**: Parallel execution with automated server startup

### Production Considerations
- Static file hosting recommended (Netlify, Vercel, GitHub Pages)
- CDN integration for optimal performance
- Asset optimization for faster loading
- Progressive enhancement for low-performance devices

### File Structure
```
/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Core styles and layout
│   ├── animations.css  # Animation definitions
│   └── particles.css   # Particle system styles
├── js/
│   ├── main.js        # Main application logic
│   ├── animations.js  # Animation engine
│   ├── particles.js   # Particle system
│   └── audio.js       # Audio system
├── assets/
│   └── icons.svg      # Custom SVG icons
└── .replit            # Replit configuration
```

## Changelog

- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.