const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/tw-elements/dist/js/**/*.js'],

	theme: {
		extend: {}
	},

	plugins: [
		require('daisyui', 'tw-elements/dist/plugin'),
		//require('tw-elements/dist/plugin'),
	]
};

module.exports = config;
