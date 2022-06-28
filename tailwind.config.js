/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}"],
	theme: {
		extend: {
			fontFamily: {
				adelia: ["ADELIA", "cursive"],
				baloo: ["baloo", "sans-serif"],
				IBM: ["IBM Plex Mono", "monospace"],
			},
		},
	},
	plugins: [require("daisyui")],
};
