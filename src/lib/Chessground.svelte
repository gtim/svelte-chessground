<script>
	import { Chessground } from 'chessground';

	import './assets/chessground.base.css';
	import './assets/chessground.brown.css';
	import './assets/chessground.cburnett.css';

	import { onMount } from 'svelte';

	/** @type {import('chessground/config').Config} */
	export let config = {};

	/** @type {HTMLDivElement} */
	let container;

	/** @type {import('chessground/api').Api} */
	let chessground;

	onMount(async () => {
		chessground = Chessground( container, config );
	});

	/*
	 *
	 * Methods passed through to Chessground
	 *
	 */

	/**
	 * @param {import('chessground/config').Config} config
	 * @return void
	 */
	export function set(config) {
		chessground.set(config);
	}

	/** @return {import('chessground/state').State} */
	export function getState() {
		return chessground.state;
	}

	/** @return {import('chessground/types').FEN} */
	export function getFen() {
		return chessground.getFen();
	}

	/** @return void */
	export function toggleOrientation() {
		return chessground.toggleOrientation();
	}

	/**
	 * @param {import('chessground/types').Key} orig
	 * @param {import('chessground/types').Key} dest
	 * @return void
	 */
	export function move( orig, dest ) {
		return chessground.move( orig, dest );
	}

	/**
	 * @param {import('chessground/types').PiecesDiff} pieces
	 * @return void
	 */
	export function setPieces( pieces ) {
		return chessground.setPieces( pieces );
	}

	/**
	 * @param {import('chessground/types').Key | null } key
	 * @param {boolean} [force]
	 * @return void
	 */
	export function selectSquare( key, force ) {
		return chessground.selectSquare( key, force );
	}

	/**
	 * @param {import('chessground/types').Piece } piece
	 * @param {import('chessground/types').Key } key
	 * @return void
	 */
	export function newPiece( piece, key ) {
		return chessground.newPiece( piece, key );
	}

	/** @return boolean */
	export function playPremove() {
		return chessground.playPremove();
	}

	/** @return void */
	export function cancelPremove() {
		chessground.cancelPremove();
	}

	/**
	 * @param {(drop: import('chessground/types').Drop) => boolean } validate
	 * @return boolean 
	 */
	export function playPredrop( validate ) {
		return chessground.playPredrop( validate );
	}
	
	/** @return void */
	export function cancelPredrop() {
		chessground.cancelPredrop();
	}

	/** @return void */
	export function cancelMove() {
		chessground.cancelMove();
	}

	/** @return void */
	export function stop() {
		chessground.stop();
	}

	/**
	 * @param {import('chessground/types').Key[] } keys
	 * @return void
	 */
	export function explode( keys ) {
		chessground.explode( keys );
	}

	/**
	 * @param {import('chessground/draw').DrawShape[] } shapes
	 * @return void
	 */
	export function setShapes( shapes ) {
		chessground.setShapes( shapes );
	}

	/**
	 * @param {import('chessground/draw').DrawShape[] } shapes
	 * @return void
	 */
	export function setAutoShapes( shapes ) {
		chessground.setAutoShapes( shapes );
	}

	/** @return void */
	export function redrawAll() {
		return chessground.redrawAll();
	}

	/**
	 * @param {import('chessground/types').Piece } piece
	 * @param {import('chessground/types').MouchEvent } event
	 * @param {boolean} [force]
	 * @return void
	 */
	export function dragNewPiece( piece, event, force ) {
		chessground.dragNewPiece( piece, event, force );
	}

	/** @return void */
	export function destroy() {
		return chessground.destroy();
	}

</script>

<div id="chessground" bind:this={container}></div>

<style>
	#chessground {
		width:100%;
		height:100%;
	}
</style>
