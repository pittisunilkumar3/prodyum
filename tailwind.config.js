/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  			'text': {
  				'0%': {
  					backgroundPosition: '0 0'
  				},
  				'50%': {
  					backgroundPosition: '200px'
  				},
  				'100%': {
  					backgroundPosition: '0 0'
  				}
  			},
  			'textReverse': {
  				'0%': {
  					backgroundPosition: '0 0'
  				},
  				'50%': {
  					backgroundPosition: '-200px'
  				},
  				'100%': {
  					backgroundPosition: '0 0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'text': 'text 5s ease-in-out infinite',
  			'text-reverse': 'textReverse 5s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};