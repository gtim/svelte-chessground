# Svelte Chessground

A Svelte chessboard component.
Svelte-chessground is a wrapper around the full-featured [Chessground](https://github.com/lichess-org/chessground), the open source chess UI developed for Lichess.

![Chessground screenshots in 2D and 3D](https://github.com/gtim/svelte-chessground/blob/main/static/chessground-screenshot.jpg?raw=true)

Take a look at the [live demos](https://gtim.github.io/svelte-chessground-examples/watch-ai).

Note: Chessground does not contain chess logic. If you want a chessboard with legal moves and pawn promotion without additional code, you're looking for [svelte-chess](https://github.com/gtim/svelte-chess).

## Usage

Install:

    npm install svelte-chessground

Display a chessboard where any pieces can be moved:

    <script>
        import {Chessground} from 'svelte-chessground';
    </script>    

    <Chessground />
    
The component expands to maximum width.
Chessground is extensively configurable through props. Parameters and descriptions can be found in the original Chessground's [config.ts](https://github.com/lichess-org/chessground/blob/master/src/config.ts). For instance, to display a specific position and flip the board:

    <script>
        import {Chessground} from 'svelte-chessground';
        let fen = '7k/5K2/7P/6pP/8/8/8/8 w - - 0 1'; // Forsyth-Edwards Notation
        let orientation = 'black';
    </script>    

    <Chessground {fen} {orientation}/>
    
These props enjoy the usual svelte reactivity magic: changing `orientation` or `fen` at any time will change the board.
You can find more examples in the [svelte-chessground-examples](https://github.com/gtim/svelte-chessground-examples/), including:
* [allowing only legal moves](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/legal/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/legal))
* [reactive position and orientation](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/reactive/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/reactive))
* [playing against random AI](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/vs-ai/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/vs-ai))
* [watching random AI's play](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/watch-ai/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/watch-ai))
* [custom CSS](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/style/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/style))

Chessground contains no chess logic, and as such can be used for chess variations. Examples that require chess logic import [chess.js](https://github.com/jhlywa/chess.js).
    
### Styling

Chessground can be completely restyled through CSS. The component imports default stylesheets. To apply your own, you have two options:

1. Override specific CSS commands with a scoped `:global` and `!important`:

        <div class="override_background">
            <Chessground />
        </div>
        <style>
            div.override_background :global(.cg-wrap cg-board) {
                background-image:url("/my-board.jpg") !important; /* replace chessboard image */
            }
        </style>

2. Apply your own full chessground stylesheet instead of the defaults by setting the `class` prop and importing your own stylesheet.
By changing the class name from the default, none of the default stylesheets will apply, not even the piece SVGs.
Additionally, you can use the provided `ChessgroundUnstyled` component, which is completely unstyled.

        <script>
            import {ChessgroundUnstyled} from 'svelte-chessground';
            import '$lib/my-chessboard.css';
        </script>
        <ChessgroundUnstyled class="my-chessboard" />

You can find working code for both approaches in the [custom styles examples](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/style/%2Bpage.svelte).

## Building the package

To build the package yourself:

    $ git clone https://github.com/gtim/svelte-chessground.git
    $ cd svelte-chessground
    $ npm run build
