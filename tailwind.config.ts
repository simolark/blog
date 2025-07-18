import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 液态玻璃色彩系统
      colors: {
        liquid: {
          // 主要液态玻璃颜色
          glass: {
            50: 'rgba(255, 255, 255, 0.9)',
            100: 'rgba(255, 255, 255, 0.8)',
            200: 'rgba(255, 255, 255, 0.7)',
            300: 'rgba(255, 255, 255, 0.6)',
            400: 'rgba(255, 255, 255, 0.5)',
            500: 'rgba(255, 255, 255, 0.4)',
            600: 'rgba(255, 255, 255, 0.3)',
            700: 'rgba(255, 255, 255, 0.2)',
            800: 'rgba(255, 255, 255, 0.1)',
            900: 'rgba(255, 255, 255, 0.05)',
          },
          // 彩色液态玻璃
          frost: {
            blue: 'rgba(59, 130, 246, 0.3)',
            purple: 'rgba(147, 51, 234, 0.3)',
            pink: 'rgba(236, 72, 153, 0.3)',
            emerald: 'rgba(16, 185, 129, 0.3)',
            amber: 'rgba(245, 158, 11, 0.3)',
            teal: 'rgba(20, 184, 166, 0.3)',
          }
        }
      },
      
      // 液态玻璃背景渐变
      backgroundImage: {
        'liquid-gradient-1': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'liquid-gradient-2': 'linear-gradient(45deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 100%)',
        'liquid-gradient-3': 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(245,158,11,0.1) 100%)',
        'liquid-flow': 'conic-gradient(from 0deg, rgba(255,255,255,0.1), rgba(59,130,246,0.15), rgba(147,51,234,0.15), rgba(236,72,153,0.15), rgba(255,255,255,0.1))',
        'liquid-mesh': 'radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 70%), radial-gradient(ellipse at bottom, rgba(59,130,246,0.1) 0%, transparent 70%)',
      },

      // 液态玻璃阴影系统
      boxShadow: {
        'liquid-sm': '0 1px 2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'liquid-md': '0 4px 6px rgba(0, 0, 0, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'liquid-lg': '0 10px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'liquid-xl': '0 20px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'liquid-2xl': '0 25px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'liquid-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'liquid-glow': '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)',
        'liquid-frost': '0 8px 32px rgba(31, 38, 135, 0.37)',
      },

      // 液态动画
      animation: {
        'liquid-float': 'liquidFloat 6s ease-in-out infinite',
        'liquid-pulse': 'liquidPulse 4s ease-in-out infinite',
        'liquid-flow': 'liquidFlow 8s linear infinite',
        'liquid-ripple': 'liquidRipple 2s ease-out',
        'liquid-morph': 'liquidMorph 10s ease-in-out infinite',
      },

      keyframes: {
        liquidFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)',
            filter: 'blur(0px)'
          },
          '50%': { 
            transform: 'translateY(-10px) scale(1.02)',
            filter: 'blur(0.5px)'
          }
        },
        liquidPulse: {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.6',
            transform: 'scale(1.05)'
          }
        },
        liquidFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        liquidRipple: {
          '0%': { 
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(4)',
            opacity: '0'
          }
        },
        liquidMorph: {
          '0%, 100%': { 
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg)'
          },
          '50%': { 
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'rotate(180deg)'
          }
        }
      },

      // 模糊效果
      backdropBlur: {
        'liquid-xs': '2px',
        'liquid-sm': '4px',
        'liquid-md': '8px',
        'liquid-lg': '12px',
        'liquid-xl': '16px',
        'liquid-2xl': '24px',
        'liquid-3xl': '40px',
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            '--tw-prose-body': 'rgba(0, 0, 0, 0.8)',
            '--tw-prose-headings': 'rgba(0, 0, 0, 0.9)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 