import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: '20px', // 设计规范 radius.lg
        md: '12px', // 设计规范 radius.md
        sm: '6px',  // 设计规范 radius.sm
        round: '9999px', // 设计规范 radius.round
      },
      boxShadow: {
        'small': '0 1px 3px rgba(15, 23, 36, 0.06)',
        'medium': '0 8px 24px rgba(15, 23, 36, 0.12)',
        'large': '0 24px 48px rgba(15, 23, 36, 0.16)',
      },
      backgroundImage: {
        // Custom gradients avoiding purple
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'gradient-cool': 'linear-gradient(135deg, #14b8a6, #0d9488)',
        'gradient-neutral': 'linear-gradient(135deg, #71717a, #3f3f46)',
      },
      transitionDuration: {
        '150': '150ms', // 设计规范 short
        '250': '250ms', // 设计规范 medium
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(.2,.9,.2,1)', // 设计规范 easing
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-in-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      // Accessibility enhancements
      screens: {
        'reduce-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
      },
    },
  },
  plugins: [
    // Custom plugins can be added here
    // Note: Reduced motion functionality is implemented in globals.css
  ],
}
export default config
