/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
   theme: {
   	extend: {
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		},
   		colors: {
			primary:"var(--primary)",
			secondary:"var(--secondary)",
		}
   	}
   },
   plugins: [require("tailwindcss-animate")],
};
