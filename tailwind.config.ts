import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          light: {
            bg: '#FFFFFF',
            soft: '#F5F5F5',
            medium: '#E3E3E3',
            hard: '#929292',
            border: '#E3E3E3',
            secondaryMedium: '#F5F5F5',
            green: '#F7F4FF',
            leafGreen: '#F4FFFB',
            blue: '#EFF2FF',
          },
          dark: {
            bg: '#171717',
            soft: '#929292',
            medium: '#3B3B3B',
            hard: '#202020',
            border: '#454545',
            secondaryMedium: '#353535',
            green: '#DAFF00',
            leafGreen: '#032F1F',
            blue: '#09243B',
            blackCow: "#484848"
          },
        },
        textAndElements: {
          light: {
            primaryButton: '#040404',
            primary: '#252525',
            secondary: '#6A6A6A',
            tertiary: '#A4A4A4',
            disable: '#E3E3E3',
          },
          dark: {
            primaryButton: '#DAFF00',
            primary: '#E8E8E8',
            secondary: '#CECECE',
            tertiary: '#747474',
            disable: '#929292',
          },
        },
      },
      fontSize: {
        headingXl: ['4rem', { lineHeight: '4.844rem', letterSpacing: '-1px' }],
        headingLg: ['2.5rem', { lineHeight: '3.025rem', letterSpacing: '-1px' }],
        headingMd: ['2rem', { lineHeight: '2.419rem', letterSpacing: '-0.5px' }],
        headingSm: ['1.5rem', { lineHeight: '1.75rem', letterSpacing: '-0.5px' }],
        headingXs: ['1.25rem', { lineHeight: '1.513rem', letterSpacing: '-0.5px' }],
        bodyXl: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0px' }],
        bodyLg: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0px' }],
        bodyMd: ['0.875rem', { lineHeight: '1.313rem', letterSpacing: '0px' }],
        bodySm: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0px' }],
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1.5rem",
          lg: "2.5rem",
          xl: "5rem",
        },
        screens: {
          sm: "375px",
          md: "768px",
          lg: "960px",
          xl: "1440px",
        },
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "960px",
        xl: "1440px",
      }
    },
  },
  plugins: [],
} satisfies Config;
