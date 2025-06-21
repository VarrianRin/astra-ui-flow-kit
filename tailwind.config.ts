
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1140px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#F7FAFF',
				foreground: '#000000',
				primary: {
					DEFAULT: '#39C6A8',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: '#FF5C5C',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#0086FF',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#000000'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				success: '#2ABB6F',
				error: '#FF5C5C',
				'text-body': '#4F4F4F',
				'premium-accent': '#E2AA52',
				'gradient-primary-start': '#A3E4FF',
				'gradient-primary-end': '#39C6A8',
				'accent-start': '#00C3FF',
				'accent-end': '#0086FF',
				'premium-start': '#F6DDA5',
				'premium-end': '#E2AA52'
			},
			borderRadius: {
				lg: '24px',
				md: '12px',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'base': '16px',
				'h1': '42px',
				'h2': '32px',
				'h3': '24px',
			},
			fontWeight: {
				'bold': '700',
				'semibold': '600',
				'normal': '400',
			},
			boxShadow: {
				'soft-40': '0 8px 40px rgba(0, 0, 0, 0.12)',
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
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in': 'slide-in 0.4s ease-out'
			},
			transitionDuration: {
				'200': '200ms',
				'400': '400ms'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
