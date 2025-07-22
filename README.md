# 3D Physics Playground

**Interactive 3D Physics Simulation with Advanced Lighting Effects**

A stunning React Three.js application featuring realistic physics simulations, advanced SSGI (Screen Space Global Illumination) rendering, and interactive 3D spheres.

## ✨ Features

- **🎯 Real-time Physics**: Rapier physics engine with gravity and collisions
- **🌟 Advanced Lighting**: SSGI (Screen Space Global Illumination) for realistic light bouncing
- **🎨 Dynamic Materials**: Multiple sphere types (metallic, glass-like, matte)
- **🖱️ Interactive Controls**: Mouse movement influences physics
- **🎨 Color Customization**: Click to cycle through 8 vibrant accent colors
- **📱 Responsive Design**: Works on desktop and mobile devices
- **⚡ Optimized Performance**: Advanced post-processing with bloom and anti-aliasing

## 🚀 Live Demo

[View Live Demo](https://your-vercel-url.vercel.app)

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **Rapier Physics** - Real-time physics simulation
- **Postprocessing** - Advanced visual effects
- **Custom SSGI Effects** - Realistic global illumination

## 🎮 How to Use

1. **Move your mouse** to influence sphere physics
2. **Click anywhere** to change accent colors
3. **Watch the spheres** interact with realistic physics
4. **Enjoy the lighting** - see how light bounces between spheres

## 🏃‍♂️ Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
src/
├── App.js              # Main application component
├── Effects.js          # Post-processing effects
├── styles.css          # Global styles
├── realism-effects/    # Custom SSGI implementation
│   ├── index.js
│   └── v2.js
└── index.js           # Entry point
```

## 🎨 Customization

The application is highly customizable:

- **Colors**: Modify the `accents` array in `App.js`
- **Physics**: Adjust gravity and physics parameters
- **Effects**: Configure SSGI settings in `Effects.js`
- **Styling**: Update CSS variables for theming

## 📱 Browser Support

- **Chrome/Edge**: Full support with all effects
- **Firefox**: Full support with all effects  
- **Safari**: Full support with all effects
- **Mobile**: Optimized for touch devices

## 📄 License

MIT License - feel free to use this project for your own creations!

## 🙏 Acknowledgments

- Original CodeSandbox inspiration
- React Three Fiber community
- Three.js ecosystem
- Rapier physics engine

---

**Built with ❤️ using React Three Fiber** 