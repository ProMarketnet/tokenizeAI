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
        // Light mode colors (Anthropic-inspired)
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
      },
      borderRadius: {
        'message': '18px',
        'message-corner': '4px',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
