/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'mk-blue': '#034169',
                'mk-yellow': '#DEDC00'
            },
            backgroundImage: {
                'mk-bg': "url('/img/mk.jpg')",
            },
            fontFamily: {
                sans: [
                    "Inter semibold, sans-serif",
                    { fontFeatureSettings: '"cv11", "ss01"' },
                ],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
