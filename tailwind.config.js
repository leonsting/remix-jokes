/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}"],
	theme: {
		extend: {
			fontFamily: {
				adelia: ["ADELIA", "cursive"],
				baloo: ["baloo", "sans-serif"],
			},
		},
	},
	plugins: [require("daisyui")],
};
