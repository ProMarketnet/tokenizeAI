/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Light mode
        background: '#FFFFFF',
        surface: '#F8F9FA',
        border: '#E5E7EB',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        accent: '#3B82F6',
        'accent-hover': '#2563EB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        
        // Dark mode variants
        'dark-background': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-border': '#334155',
        'dark-text-primary': '#F8FAFC',
        'dark-text-secondary': '#CBD5E1',
        'dark-accent': '#60A5FA',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'message': '18px',
        'message-corner': '4px',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      boxShadow: {
        'message': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'block': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
