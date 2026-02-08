# 🚀 Getting Started with Jeffers0n Aquat1cs

This guide will help you get the premium Neocaridina shrimp e-commerce website up and running in minutes.

## Quick Start

### 1. Prerequisites
Make sure you have Node.js 18+ installed. Check your version:
```bash
node --version
npm --version
```

### 2. Installation
Navigate to the project directory and install dependencies:
```bash
cd Aquatic-Website
npm install
```

### 3. Development Server
Start the development server:
```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### 4. Build for Production
Create an optimized production build:
```bash
npm run build
npm start
```

## 📖 What's Included

### Pages
- **Home** (`/`) - Hero section with featured products
- **Products** (`/products`) - Filterable & sortable product catalog
- **Product Detail** (`/product/[id]`) - Full product with gallery and zoom
- **Shopping Cart** (`/cart`) - Cart management and summary
- **Checkout** (`/checkout`) - Multi-step checkout flow
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form

### Features
✨ **Particle System** - Interactive bubble animation
🎨 **Smooth Animations** - Framer Motion & GSAP powered
🛒 **Shopping Cart** - Persistent state with Zustand
📱 **Responsive Design** - Mobile-first Tailwind CSS
♿ **Accessible** - WCAG AA compliant
⚡ **Optimized** - 60fps animations, <3s load time

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the ocean color palette:
```javascript
colors: {
  ocean: { /* ... */ },
  teal: { /* ... */ },
  coral: { /* ... */ },
}
```

### Fonts
Change fonts in `tailwind.config.js`:
- **Serif**: Playfair Display
- **Sans**: Poppins

### Animation Timings
Adjust animation settings in `lib/animation-constants.ts`:
```typescript
export const TRANSITION = {
  default: { duration: 0.6, ease: EASING.smooth },
  fast: { duration: 0.3, ease: EASING.smooth },
  slow: { duration: 0.9, ease: EASING.smooth },
};
```

### Bubble System
Customize bubble behavior in `app/components/BubbleSystem.tsx`:
- `bubbleCount` - Number of bubbles (25-40)
- `repelDistance` - How far cursor repels bubbles (150px)
- `speedY` - Floating speed
- Colors and gradients

## 🔧 Development Tips

### Hot Reload
Changes to files automatically reload in the browser while `npm run dev` is running.

### TypeScript
Full TypeScript support is enabled. Type errors will appear in:
- Terminal during `npm run build`
- VS Code (if ESLint extension is installed)

### Performance
Monitor performance with:
```bash
npm run build  # Generates bundle analysis
```

### Debugging
Add browser DevTools breakpoints in `app/components/` files to debug:
- Animations
- State management
- Particle system

## 📦 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── BubbleSystem    # Particle animation
│   ├── ProductCard     # Product card component
│   ├── HeroSection     # Hero section
│   └── providers/      # State providers
├── (pages)/            # App routes
├── globals.css         # Global styles
└── layout.tsx          # Root layout

lib/
├── animation-constants.ts  # Animation config
└── utils.ts                # Helper functions

tailwind.config.js      # Tailwind CSS config
tsconfig.json           # TypeScript config
next.config.js          # Next.js config
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
1. Run `npm run build`
2. Deploy the `.next` folder
3. Set Node.js as runtime
4. Set `npm start` as start command

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Build Errors
Clear cache and rebuild:
```bash
rm -r .next node_modules
npm install
npm run build
```

### Animations Not Smooth
- Check if browser supports requestAnimationFrame
- Ensure tab is active (animations pause on inactive tabs)
- Check performance in DevTools (target 60 FPS)

## 📚 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP**: https://greensock.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev

## 🎯 Next Steps

1. **Customize Content** - Update product data in pages
2. **Connect API** - Replace mock data with real backend
3. **Add Payment** - Integrate Stripe or PayPal
4. **Deploy** - Push to Vercel or preferred hosting
5. **Analytics** - Add Google Analytics or Mixpanel

## 💡 Tips for Best Results

- Keep animations under 600ms for smooth feel
- Test on mobile devices (use DevTools responsive mode)
- Verify color contrast for accessibility
- Cache busting for new deployments
- Monitor Core Web Vitals in production

## 📞 Support

For issues or questions:
1. Check the main [README.md](README.md)
2. Review component comments for implementation details
3. Check Next.js and library documentation

---

**Happy coding! 🌊✨**
