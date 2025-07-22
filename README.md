# 3D Physics Playground

**Interactive 3D Physics Simulation with Advanced Lighting Effects**

A stunning React Three.js application featuring realistic physics simulations, advanced SSGI (Screen Space Global Illumination) rendering, and interactive 3D spheres.

*Last deployed: January 2025*

## ✨ Features

- **Real-time Physics**: Powered by Rapier physics engine for realistic sphere interactions
- **Advanced Lighting**: SSGI (Screen Space Global Illumination) for photorealistic rendering
- **Interactive Controls**: Mouse influence, keyboard shortcuts, and dynamic color themes
- **12 Color Themes**: Cycling through beautiful color palettes
- **Post-processing Effects**: Bloom, FXAA anti-aliasing, and advanced shader effects
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Optimized**: Efficient rendering with fallback systems

## 🎮 How to Use

- **Mouse Movement**: Influence physics simulation
- **Click**: Change color themes
- **Space**: Shake up the physics
- **R**: Reset sphere positions
- **C**: Cycle colors manually

## 🚀 Technology Stack

- **React Three Fiber**: React renderer for Three.js
- **Three.js**: 3D graphics library
- **Rapier**: Real-time physics engine
- **Postprocessing**: Advanced visual effects
- **React**: Modern UI framework

## 🛠️ Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/DrakeMikels/sphere-physics.git
   cd sphere-physics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is optimized for Vercel deployment:

- Pre-configured `vercel.json`
- Optimized build settings
- Static asset caching
- Security headers included

Simply connect your GitHub repository to Vercel for automatic deployments.

## 📁 Project Structure

```
📦 sphere-physics
├── 🎨 src/
│   ├── App.js              # Main application component
│   ├── Effects.js          # Post-processing and SSGI effects
│   ├── styles.css          # Global styles and UI
│   ├── index.js            # Application entry point
│   └── realism-effects/    # Advanced lighting shaders
├── 🌐 public/             # Static assets
├── ⚙️ vercel.json         # Deployment configuration
├── 📚 README.md           # Project documentation
└── 🔧 package.json       # Dependencies and scripts
```

## 🎨 Customization

- **Colors**: Modify the `accents` array in `App.js`
- **Physics**: Adjust gravity and damping in the Physics component
- **Effects**: Configure SSGI settings in `Effects.js`
- **UI**: Customize styles in `styles.css`

## 🌍 Browser Support

- Chrome/Chromium 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Note**: WebGL 2.0 support required for optimal performance.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Three.js community for amazing 3D web graphics
- React Three Fiber for seamless React integration
- Rapier physics engine for realistic simulations
- Original CodeSandbox inspiration for SSGI implementation 