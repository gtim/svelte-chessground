<script>
	import { Chessground } from 'chessground';

	import './assets/chessground.base.css';
	import './assets/chessground.brown.css';
	import './assets/chessground.cburnett.css';

	import { onMount } from 'svelte';

	let config = {};
	let cg;
	let div;

	onMount(async () => {
		cg = Chessground( div, config );
	});
</script>

<div id="chessground" bind:this={div}>
</div>

<style>
	#chessground {
		width:100%;
		height:100%;
	}
</style>
