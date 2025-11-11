/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./ui/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'dark-white': '#E1E1E1',
        'dark-hoverwhite': '#CFCFCF',
        'dark-border': '#161616',
        'dark-inputfield': '#161616',
        'dark-activeborder': '#838383',
        'dark-gray': '#181818',
        'dark-hovergray': '#202020',
        'dark-textgray': 'rgb(100, 116, 139)',
        'dark-inputborder': '#252525',
        'dark-black': '#0A0A0A',

        // Light theme colors
        'light-white': '#FFFFFF',
        'light-black': '#171717',
        'light-hoverblack': '#2E2E2E',
        'light-border': '#F2F2F2',
        'light-inputfield': '#FFFFFF',
        'light-activeborder': '#8A8A8A',
        'light-gray': '#F1F2F2',
        'light-hovergray': '#F5F5F5',
        'light-textgray': 'rgb(100, 116, 139)',
      },
    },
  },
  plugins: [],
}
