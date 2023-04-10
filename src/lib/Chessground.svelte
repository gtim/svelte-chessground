<script>
	import { Chessground } from 'chessground';

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

	/**
	 * Chessground configuration. The config prop can be used to set any 
	 *     config keys, and is needed to set config keys that lack own
	 *     props: highlight, animation, movable, premovable, predroppable,
	 *     draggable, selectable, events and drawable.
	 *     https://github.com/lichess-org/chessground/blob/master/src/api.ts
	 *
	 * @type {import('chessground/config').Config}
	 */
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
	 * Set config values if component is mounted. Used for reactive props.
	 *
	 * @param {import('chessground/config').Config} config - object of key(s) and value(s) to set.
	 * @returns {void}
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
	 * Set config values. Alternative to using the config prop.
	 *
	 * @param {import('chessground/config').Config} config - object of key(s) and value(s) to set.
	 * @returns {void}
	 */
	export function set(config) {
		chessground.set(config);
	}

	/** 
	 * Internal Chessground state, described at
	 *     https://github.com/lichess-org/chessground/blob/master/src/state.ts
	 *
	 * @returns {import('chessground/state').State} - Chessground state
	 */
	export function getState() {
		return chessground.state;
	}

	/** 
	 * Current position as a FEN string. Contains only pieces, no flags.
	 *     e.g. "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
	 *
	 * @returns {import('chessground/types').FEN} - FEN string
	 */
	export function getFen() {
		return chessground.getFen();
	}

	/** 
	 * Toggle chessboard orientation between white and black. Can also be
	 *     handled via the orientation prop.
	 *
	 * @returns {void}
	 */
	export function toggleOrientation() {
		return chessground.toggleOrientation();
	}

	/**
	 * Perform a move programmatically.
	 *
	 * @param {import('chessground/types').Key} orig - Origin square.
	 * @param {import('chessground/types').Key} dest - Destination square.
	 * @returns {void}
	 */
	export function move( orig, dest ) {
		return chessground.move( orig, dest );
	}

	/**
	 * Add and/or remove arbitrary pieces on the board.
	 * 
	 * @param {import('chessground/types').PiecesDiff} pieces - Pieces to add/remove.
	 * @returns {void}
	 */
	export function setPieces( pieces ) {
		return chessground.setPieces( pieces );
	}

	/**
	 * Click a square programmatically. 
	 *
	 * @param {import('chessground/types').Key | null } key - Square to click.
	 * @param {boolean} [force] - Click even if the squares are not selectable (config.selectable).
	 * @returns {void}
	 */
	export function selectSquare( key, force ) {
		return chessground.selectSquare( key, force );
	}

	/**
	 * Put a new piece on the board.
	 * 
	 * @param {import('chessground/types').Piece } piece - Piece to place.
	 * @param {import('chessground/types').Key } key - Square to place the piece.
	 * @returns {void}
	 */
	export function newPiece( piece, key ) {
		return chessground.newPiece( piece, key );
	}

	/**
	 * Play the current premove, if any.
	 * 
	 * @returns {boolean} - True if a premove was played.
	 */
	export function playPremove() {
		return chessground.playPremove();
	}

	/**
	 * Cancel the current premove, if any.
	 * 
	 * @returns {void}
	 */
	export function cancelPremove() {
		chessground.cancelPremove();
	}

	/**
	 * Play the current predrop, if any.
	 *
	 * @param {(drop: import('chessground/types').Drop) => boolean } validate - Predicate to decide whether a drop is valid.
	 * @returns {boolean} - True if a predrop was played.
	 */
	export function playPredrop( validate ) {
		return chessground.playPredrop( validate );
	}
	
	/**
	 * Cancel the current predrop, if any.
	 * 
	 * @returns {void}
	 */
	export function cancelPredrop() {
		chessground.cancelPredrop();
	}

	/**
	 * Cancel the current move being made.
	 *
	 * @returns {void}
	 */
	export function cancelMove() {
		chessground.cancelMove();
	}

	/**
	 * Cancel the current move and prevent further ones.
	 * 
	 * @returns {void}
	 */
	export function stop() {
		chessground.stop();
	}

	/**
	 * Make squares explode (for atomic chess).
	 * 
	 * @param {import('chessground/types').Key[] } keys - Squares to explode.
	 * @returns {void}
	 */
	export function explode( keys ) {
		chessground.explode( keys );
	}

	/**
	 * Programmatically draw user shapes.
	 *
	 * @param {import('chessground/draw').DrawShape[] } shapes - Shapes to draw.
	 * @returns {void}
	 */
	export function setShapes( shapes ) {
		chessground.setShapes( shapes );
	}

	/**
	 * Programmatically draw auto shapes.
	 * 
	 * @param {import('chessground/draw').DrawShape[] } shapes - Shapes to draw.
	 * @returns {void}
	 */
	export function setAutoShapes( shapes ) {
		chessground.setAutoShapes( shapes );
	}

	/** 
	 * Redraw. Only useful when CSS changes the board width/height ratio (for 3D).
	 *
	 * @returns {void}
	 */
	export function redrawAll() {
		return chessground.redrawAll();
	}

	/**
	 * Drag new piece, for crazyhouse and board editors.
	 *
	 * @param {import('chessground/types').Piece } piece - Piece to drop
	 * @param {import('chessground/types').MouchEvent } event - The mouse/touch event identifying a target.
	 * @param {boolean} [force] - True if the new piece can replace an existing one.
	 * @returns {void}
	 */
	export function dragNewPiece( piece, event, force ) {
		chessground.dragNewPiece( piece, event, force );
	}

	/** @returns {void} */
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
