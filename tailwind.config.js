/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			"Roboto-Regular": ["Roboto-Regular"],
			"Roboto-Bold": ["Roboto-Bold"],
		},
		screens: {
			sm: "417px",
			md: "768px",
			lg: "1024px",
			xl: "1200px",
			"2xl": "1536px",
			"3xl": "2130px",
		},
		extend: {
			colors: {},
			backgroundImage: {},
		},
	},
	plugins: [],
};
