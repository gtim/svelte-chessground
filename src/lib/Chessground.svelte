<script>
	import { Chessground } from 'chessground';

	import './assets/chessground.base.css';
	import './assets/chessground.brown.css';
	import './assets/chessground.cburnett.css';

	import { onMount } from 'svelte';

	/** @type {import('chessground/config').Config} */
	export let config = {};

	/** @type {import('chessground/api').Api} */
	let cg;

	/** @type {HTMLDivElement} */
	let container;

	onMount(async () => {
		cg = Chessground( container, config );
	});
</script>

<div id="chessground" bind:this={container}></div>

<style>
	#chessground {
		width:100%;
		height:100%;
	}
</style>
