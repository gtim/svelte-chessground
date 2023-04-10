module.exports = {
	root: true,
	extends: ['eslint:recommended','plugin:jsdoc/recommended'],
	plugins: ['svelte3','jsdoc'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	settings: {
		jsdoc: {
			mode: "typescript"
		}
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
