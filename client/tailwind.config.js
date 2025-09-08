/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#001643",
        silver: "#FBFBFB",
        lightblue: "#55C2C3",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito Sans", "sans-serif"],
      },
      animation: {
        "slide-Left": "slideLeft 1s ease-out forwards",
        "slide-Right": "slideRight 1s ease-out forwards",
        "slide-Down": "slideDown 1s ease-out forwards",
        'slide': "slide 15s linear infinite",
        'bounce-title': 'bounceTitle 1s ',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-up': 'scaleUp 0.5s ease-out',
        'float': 'floatEffect 3s ease-in-out infinite',
        'glow': 'glowAnimation 1.5s ease-in-out infinite',
        'light-fade': 'lightFade 1.5s ease-in-out',
        'skew-in': 'skewIn 1s ease-out',
        'float-bg': 'floatBg 5s ease-in-out ',
        'fade-scale': 'fadeScale 1.5s ease-out',
        'bounce-in': 'bounceIn 2s ease-out',
        'zoom-in': 'zoomIn 3s ease-out',
        'wave': 'waveAnimation 2s ease-in-out ',
        'bounce-out': 'bounceOut 2s ease-out',
        'flip-card': 'flipCard 1s ease-out',
        'flicker': 'flickerAnimation 3s infinite',
        'zoom-blur': 'zoomBlur 1s ease-out',
        'rotate-bg': 'rotateBg 1.5s ease-in-out',
        'typing': 'typing 3s steps(30) 1s 1 normal both',
        'bounce-text': 'bounceText 1.2s ease-out ',
        'fade-in-paragraph': 'fadeInParagraph 2s ease-out',
        'slide-in-paragraph': 'slideInParagraph 1.5s ease-out',
        'flip-card-hover': 'flipCardHover 1s ease-in-out',
        'bounce-in-card': 'bounceInCard 1s ease-out',





      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
     
        flipAnimation: {
          '0%': { transform: 'rotateY(-180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        slide: {
          "0%": { transform: "translateX(-100%)" }, // Start completely off-screen left
          "50%": { transform: "translateX(50%)" }, // Center
          "100%": { transform: "translateX(100%)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeScale: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        floatEffect: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        glowAnimation: {
          '0%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.7)' },
          '50%': { textShadow: '0 0 20px rgba(255, 255, 255, 1)' },
          '100%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.7)' },
        },
        lightFade: {
          '0%': { opacity: 0, textShadow: '0 0 10px rgba(255, 255, 255, 0.2)' },
          '100%': { opacity: 1, textShadow: '0 0 30px rgba(255, 255, 255, 0.5)' },
        },
        bounceTitle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        bounceIn: {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '60%': { opacity: 1, transform: 'scale(1.1)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        bounceText: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        waveAnimation: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceOut: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(0)' },
        },
        flipCard: {
          '0%': { transform: 'rotateY(-180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        zoomBlur: {
          '0%': { transform: 'scale(1)', filter: 'blur(5px)' },
          '100%': { transform: 'scale(1.1)', filter: 'blur(0)' },
        },
        rotateBg: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        skewIn: {
          '0%': { transform: 'skewX(-20deg)' },
          '100%': { transform: 'skewX(0deg)' },
        },
        fadeInParagraph: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInParagraph: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        flipCardHover: {
          '0%': { transform: 'rotateY(0deg)' },
       
          '100%': { transform: 'rotateY(360deg)' },
        },
        bounceInCard: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '60%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)' },
        },
  
      },

      boxShadow: {
        "custom-light": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 6px 10px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
