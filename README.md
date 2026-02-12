# Neocaridina Shrimp Showcase Website

A premium single-page e-commerce showcase website for Neocaridina shrimp built with React and Tailwind CSS. This is a product discovery and inquiry platform with no database, cart, or checkout functionality.

## 🎨 Features

### Design & Aesthetics
- **Dark Theme**: Built from dark navy blue and deep purple tones with soft gradients
- **Glassmorphism**: Transparent glass effects with blur and glow accents
- **Underwater Animation**: Canvas-based particle system with light rays and parallax effects
- **Smooth Animations**: Framer Motion for micro-interactions and page transitions
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Accessibility**: Keyboard navigation, focus states, ARIA labels, and reduced motion support

### Sections
1. **Hero Section**: Crossfading image carousel with trust badges and CTAs
2. **Shrimp Showcase**: Filterable product grid with search, sorting, and skeleton loaders
3. **Grades Section**: Visual grading scale and comparison table
4. **Care Guide**: Accordion layout with parameter chips and setup checklist
5. **Gallery**: Masonry grid with lightbox functionality
6. **Reviews**: Horizontal scrollable carousel with star ratings
7. **FAQ**: Accordion with 12 common questions
8. **Contact**: Inquiry form with clipboard copy functionality

### Components
- Sticky navigation with scroll progress indicator
- Product cards with hover effects and quick facts
- Product detail modal with specifications
- Inquiry modal with form validation
- Animated background with parallax
- Custom hooks for scroll, intersection observer, and more

## 📁 Project Structure

```
Aquatic-Website/
├── assets/
│   └── shrimps/
│       ├── Neocardina Blue Dream.jpg
│       ├── Neocardina Orange.jpg
│       ├── Neocardina Red Cherry.jpg
│       └── Neocardina Yellow Fire.jpg
├── src/
│   ├── components/
│   │   ├── CareGuide.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── Footer.jsx
│   │   ├── Gallery.jsx
│   │   ├── GradesSection.jsx
│   │   ├── Hero.jsx
│   │   ├── InquiryModal.jsx
│   │   ├── Navigation.jsx
│   │   ├── ProductDetailModal.jsx
│   │   ├── Reviews.jsx
│   │   ├── ShrimpCard.jsx
│   │   ├── ShrimpShowcase.jsx
│   │   └── UnderwaterBackground.jsx
│   ├── data/
│   │   └── shrimpData.js
│   ├── hooks/
│   │   └── useCustomHooks.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 🎯 Sample Data

The site includes 14 sample shrimp strains with:
- Name, scientific name, and description
- Grade, color, size range, and temperament
- Tank requirements (temperature, pH, GH, KH, TDS)
- Compatibility and tank mate suggestions
- Price ranges and availability status
- Featured and newest flags

## 🖼️ Image Handling

Images are loaded from `assets/shrimps/` folder. The system includes:
- Automatic image path resolution
- Gradient placeholders for missing images
- Lazy loading with intersection observer
- Responsive image sizing

## 🎨 Color Palette

### Base Colors
- Navy: `#0d1a42` to `#172668`
- Deep Purple: `#1a0e4e` to `#311b92`

### Accent Colors
- Neon Violet: `#a78bfa`
- Neon Cyan: `#22d3ee`
- Neon Purple: `#c084fc`
- Neon Blue: `#60a5fa`

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Reduced motion media query support
- High contrast text
- Alt text for images
- Screen reader friendly

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Custom Hooks

- `useInView`: Intersection observer for scroll animations
- `useScrollProgress`: Track scroll position
- `useScroll`: Detect scroll direction and position
- `useWindowSize`: Responsive window dimensions
- `useMousePosition`: Parallax mouse tracking
- `useLazyLoad`: Lazy load images
- `useReducedMotion`: Respect user motion preferences
- `useBodyScrollLock`: Lock body scroll for modals

## 📝 Utility Functions

- Image path resolution
- Gradient placeholder generation
- Smooth scroll to section
- Debounce for search
- Filter and sort shrimp
- Format inquiry message
- Copy to clipboard

## 🎭 Animation System

- Framer Motion for component animations
- CSS keyframe animations for continuous effects
- Canvas-based particle system
- Parallax effects on mouse move
- Scroll-triggered reveal animations
- Reduced motion fallbacks

## 💡 Performance Optimizations

- Lazy loading images
- Debounced search input
- Memoized filter/sort operations
- Intersection observer for animations
- Optimized re-renders
- Code splitting ready

## 📋 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Limitations

- No backend integration
- No actual e-commerce functionality
- Inquiry form copies to clipboard (no email sending)
- Sample data only
- Local images only

## 📄 License

This project is for demonstration purposes.

## 🙏 Credits

- React + Vite
- Tailwind CSS
- Framer Motion
- Google Fonts (Inter)
