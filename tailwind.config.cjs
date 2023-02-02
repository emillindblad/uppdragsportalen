const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'mk-blue': '#034169',
                'mk-yellow': '#DEDC00',
                'mk-yellow-hover' : '#b0ae02',
                'mk-blue-select' : '#166EA7',
                'mk-blue-hover' : '#09507E'
            },
            backgroundImage: {
                'mk-bg': "url('/img/mk.jpg')",
            },
            fontFamily: {
                sans: ['var(--font-inter)', ...fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
