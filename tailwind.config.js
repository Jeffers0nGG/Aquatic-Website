/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    50: '#e6e9f0',
                    100: '#c2c9dc',
                    200: '#9ba6c8',
                    300: '#7483b4',
                    400: '#5669a5',
                    500: '#384f96',
                    600: '#32488e',
                    700: '#2b3f83',
                    800: '#243679',
                    900: '#172668',
                    950: '#0d1a42',
                },
                deep: {
                    50: '#ede7f6',
                    100: '#d1c4e9',
                    200: '#b39ddb',
                    300: '#9575cd',
                    400: '#7e57c2',
                    500: '#673ab7',
                    600: '#5e35b1',
                    700: '#512da8',
                    800: '#4527a0',
                    900: '#311b92',
                    950: '#1a0e4e',
                },
                neon: {
                    violet: '#a78bfa',
                    cyan: '#22d3ee',
                    purple: '#c084fc',
                    blue: '#60a5fa',
                },
                border: 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-ocean': 'linear-gradient(135deg, #0d1a42 0%, #1a0e4e 50%, #172668 100%)',
                'gradient-glow': 'radial-gradient(circle at center, rgba(167, 139, 250, 0.15) 0%, transparent 70%)',
            },
            boxShadow: {
                'glow-sm': '0 0 10px rgba(167, 139, 250, 0.3)',
                'glow-md': '0 0 20px rgba(167, 139, 250, 0.4)',
                'glow-lg': '0 0 30px rgba(167, 139, 250, 0.5)',
                'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.4)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'drift': 'drift 20s linear infinite',
                'wave': 'wave 8s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s ease-out',
                'slide-up': 'slide-up 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                drift: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                wave: {
                    '0%, 100%': { transform: 'translateX(0%) translateY(0%)' },
                    '50%': { transform: 'translateX(5%) translateY(3%)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
