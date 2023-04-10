<script>
	import { Chessground } from 'chessground';
	import { initial as initialFen } from 'chessground/fen.js';

	import './assets/chessground.base.css';
	import './assets/chessground.brown.css';
	import './assets/chessground.cburnett.css';

	import { onMount } from 'svelte';


	/**
	 *
	 * Exported props.
	 * All exported props are reactive and can be set directly or via the config object.
	 * Cannot be bound, use callback functions via the "events" objects to monitor state.
	 *
	 * All simple-valued Chessground parameters have their own props. The others must be set via the config prop and are:
	 *     highlight, animation, movable, premovable, predroppable, draggable, selectable, events, drawable
	 * 
	 * Dev note: These props would preferrably have been implemented with $$props or a preprocessor, but doing so would lose Typescript compile-time checks.
	 */

	/** @type {string} */
	export let className = 'cg-default-style';

	/** @type {import('chessground/types').FEN | undefined} */
	export let fen = undefined;
	$: setConfig( { fen: fen } );

	/** @type {import('chessground/types').Color | undefined} */
	export let orientation = undefined;
	$: setConfig( { orientation: orientation } );

	/** @type {import('chessground/types').Color | undefined} */
	export let turnColor = undefined;
	$: setConfig( { turnColor: turnColor } );

	/** @type {import('chessground/types').Color | boolean | undefined} */
	export let check = undefined;
	$: setConfig( { check: check } );

	/** @type {import('chessground/types').Key[] | undefined} */
	export let lastMove = undefined;
	$: setConfig( { lastMove: lastMove } );

	/** @type {import('chessground/types').Key | undefined} */
	export let selected = undefined;
	$: setConfig( { selected: selected } );

	/** @type {boolean | undefined} */
	export let coordinates = undefined;
	$: setConfig( { coordinates: coordinates } );

	/** @type {boolean | undefined} */
	export let autoCastle = undefined;
	$: setConfig( { autoCastle: autoCastle } );

	/** @type {boolean | undefined} */
	export let viewOnly = undefined;
	$: setConfig( { viewOnly: viewOnly } );

	/** @type {boolean | undefined} */
	export let disableContextMenu = undefined;
	$: setConfig( { disableContextMenu: disableContextMenu } );

	/** @type {boolean | undefined} */
	export let addPieceZIndex = undefined;
	$: setConfig( { addPieceZIndex: addPieceZIndex } );

	/** @type {HTMLElement | undefined} */
	export let addDimensionsCssVarsTo = undefined;
	$: setConfig( { addDimensionsCssVarsTo: addDimensionsCssVarsTo } );

	/** @type {boolean | undefined} */
	export let blockTouchScroll = undefined;
	$: setConfig( { blockTouchScroll: blockTouchScroll } );

	/** @type {import('chessground/config').Config} */
	export let config = {};
	$: setConfig( config );


	/**
	 *
	 * 
	 * 
	 */

	/** @type {HTMLDivElement} */
	let container;

	/** @type {import('chessground/api').Api} */
	let chessground;

	onMount(async () => {
		if ( orientation            !== undefined ) config.orientation = orientation;
		if ( fen                    !== undefined ) config.fen = fen;
		if ( turnColor              !== undefined ) config.turnColor = turnColor;
		if ( check                  !== undefined ) config.check = check;
		if ( lastMove               !== undefined ) config.lastMove = lastMove;
		if ( selected               !== undefined ) config.selected = selected;
		if ( coordinates            !== undefined ) config.coordinates = coordinates ;
		if ( autoCastle             !== undefined ) config.autoCastle = autoCastle;
		if ( viewOnly               !== undefined ) config.viewOnly = viewOnly;
		if ( disableContextMenu     !== undefined ) config.disableContextMenu = disableContextMenu;
		if ( addPieceZIndex         !== undefined ) config.addPieceZIndex = addPieceZIndex;
		if ( addDimensionsCssVarsTo !== undefined ) config.addDimensionsCssVarsTo = addDimensionsCssVarsTo;
		if ( blockTouchScroll       !== undefined ) config.blockTouchScroll = blockTouchScroll;
		chessground = Chessground( container, config );
	});

	/**
	 * @param {import('chessground/config').Config} config
	 * @return void
	 */
	function setConfig( config ) {
		if ( chessground ) {
			chessground.set( config );
		}
	}

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

<div class="cg-wrap {className}" bind:this={container}></div>

<style>
	.cg-wrap {
		width:100%;
		aspect-ratio:1;
	}
</style>
