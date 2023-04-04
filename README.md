# Svelte Chessground

A Svelte chessboard component for playing chess, displaying positions and games, and more.
Svelte-chessground is a wrapper around [Chessground](https://github.com/lichess-org/chessground), the open source chess UI developed for Lichess.
Take a look at the [live demos](https://gtim.github.io/svelte-chessground-examples/watch-ai).

## Installation

    npm install svelte-chessground

## Usage

Display a chessboard where any pieces can be moved:

    <script>
        import {Chessground} from 'svelte-chessground';
    </script>    
    <div style="width:256px;height:256px;">
        <Chessground />
    </div>
    
Chessground is extensively configurable through the `config` prop. Parameters and descriptions can be found in the original Chessground's [config.ts](https://github.com/lichess-org/chessground/blob/master/src/config.ts). For instance, to display a specific position and flip the board:

    <script>
        import {Chessground} from 'svelte-chessground';
        let config = {
            fen: 'rnb1k1nr/p2p1ppp/3B4/1pbN1N1P/4P1P1/3P1Q2/PqP5/R4KR1 b kq - 1 18',
            orientation: 'black'
	};
    </script>    
    <div style="width:256px;height:256px;">
        <Chessground {config}/>
    </div>
    
You can find more examples in the [svelte-chessground-examples](https://github.com/gtim/svelte-chessground-examples/), including:
* [allowing only legal moves](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/legal/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/legal))
* [playing against random AI](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/vs-ai/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/vs-ai))
* [watching random AI's play](https://github.com/gtim/svelte-chessground-examples/blob/main/src/routes/watch-ai/%2Bpage.svelte) ([demo](https://gtim.github.io/svelte-chessground-examples/watch-ai))

Chessground contains no chess logic, and as such can be used for chess variations. The examples import [chess.js](https://github.com/jhlywa/chess.js) for chess logic. 
