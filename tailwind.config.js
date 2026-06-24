/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'brand-gradient': 'linear-gradient(135deg, #1E88E5 0%, #4CAF50 50%, #8BC34A 100%)',
  			'brand-gradient-soft': 'linear-gradient(135deg, rgba(30,136,229,0.12) 0%, rgba(76,175,80,0.12) 50%, rgba(139,195,74,0.12) 100%)',
  		},
  		colors: {
  			'ink': '#050505',
  			'navy': '#07111F',
  			'stage': '#0A0A0A',
  			'prodyum-blue': {
  				DEFAULT: '#1E88E5',
  				50: '#E3F2FD',
  				100: '#BBDEFB',
  				200: '#90CAF9',
  				300: '#64B5F6',
  				400: '#42A5F5',
  				500: '#1E88E5',
  				600: '#1976D2',
  				700: '#1565C0',
  				800: '#0D47A1',
  				900: '#0A3D91',
  			},
  			'prodyum-green': {
  				DEFAULT: '#4CAF50',
  				50: '#E8F5E9',
  				100: '#C8E6C9',
  				200: '#A5D6A7',
  				300: '#81C784',
  				400: '#66BB6A',
  				500: '#4CAF50',
  				600: '#43A047',
  				700: '#388E3C',
  				800: '#2E7D32',
  				900: '#1B5E20',
  			},
  			'prodyum-lime': {
  				DEFAULT: '#8BC34A',
  				50: '#F1F8E9',
  				100: '#DCEDC8',
  				200: '#C5E1A5',
  				300: '#AED581',
  				400: '#9CCC65',
  				500: '#8BC34A',
  				600: '#7CB342',
  				700: '#689F38',
  				800: '#558B2F',
  				900: '#33691E',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'float': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-18px)' }
  			},
  			'float-slow': {
  				'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
  				'50%': { transform: 'translateY(-28px) translateX(14px)' }
  			},
  			'shine': {
  				'0%': { backgroundPosition: '-200% center' },
  				'100%': { backgroundPosition: '200% center' }
  			},
  			'marquee': {
  				'0%': { transform: 'translateX(0)' },
  				'100%': { transform: 'translateX(-50%)' }
  			},
  			'spin-slow': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' }
  			},
  			'pulse-ring': {
  				'0%': { transform: 'scale(0.8)', opacity: '0.6' },
  				'100%': { transform: 'scale(2.2)', opacity: '0' }
  			},
  			'film-grain-shift': {
  				'0%, 100%': { transform: 'translate(0,0)' },
  				'10%': { transform: 'translate(-3%,-5%)' },
  				'30%': { transform: 'translate(4%,-2%)' },
  				'50%': { transform: 'translate(-2%,3%)' },
  				'70%': { transform: 'translate(3%,2%)' },
  				'90%': { transform: 'translate(-4%,4%)' }
  			},
  			'light-sweep': {
  				'0%, 100%': { opacity: '0.15', transform: 'translateX(-30%) rotate(12deg)' },
  				'50%': { opacity: '0.4', transform: 'translateX(30%) rotate(12deg)' }
  			},
  			'reel-spin': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'float': 'float 6s ease-in-out infinite',
  			'float-slow': 'float-slow 14s ease-in-out infinite',
  			'shine': 'shine 3s linear infinite',
  			'marquee': 'marquee 40s linear infinite',
  			'spin-slow': 'spin-slow 26s linear infinite',
  			'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4,0,0.6,1) infinite',
  			'film-grain-shift': 'film-grain-shift 1.2s steps(4) infinite',
  			'light-sweep': 'light-sweep 9s ease-in-out infinite',
  			'reel-spin': 'reel-spin 16s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};