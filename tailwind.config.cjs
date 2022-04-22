const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			
		},
		container: {
			center: true,
		}
	},

	plugins: [forms, typography, require('daisyui')],
	darkMode: 'class'
};

module.exports = config;
