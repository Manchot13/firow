import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '399px' },
        sm: { max: '639px' },
        md: { max: '767px' },
        lg: { max: '1023px' },
        xl: { max: '1279px' },
        'lg-sm': { max: '1023px', min: '640px' },
        'lg-md': { max: '1023px', min: '768px' },
        'xl-md': { max: '1279px', min: '768px' },
        'md-xs': { max: '767px', min: '400px' },
        'sm-xs': { max: '639px', min: '400px' },
        fHD: { max: '1980px', min: '1750px' },
        tab: { max: '999px', min: '768px' },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        snow: {
          50: '#ffffff',
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3d3d3d',
          950: '#292929',
        },
        'trinidad': {
          '50': '#fff6ec',
          '100': '#ffead4',
          '200': '#ffd0a7',
          '300': '#ffaf70',
          '400': '#ff8236',
          '500': '#ff600f',
          '600': '#f24405',
          '700': '#c83006',
          '800': '#9e270e',
          '900': '#7f220f',
          '950': '#450e05',
        },


      },
    },
  },
  plugins: [],
} satisfies Config;
