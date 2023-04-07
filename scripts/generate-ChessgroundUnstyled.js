/**
 *
 * Generate ChessgroundUnstyled.svelte,
 * identical to Chessground.svelte but without CSS imports.
 *
 * As Svelte does not support component inheritance or seamless dynamically 
 * imported CSS assets, this is the most approprate solution I've come across.
 *
 **/

import { readFileSync, writeFileSync } from 'fs';

const styledComponent = readFileSync('src/lib/Chessground.svelte', 'utf8');
const unstyledComponent = styledComponent.split('\n')
                          .filter( (line) => ! line.includes( 'Default styling, use ChessgroundUnstyled to substitute your own' ) )
                          .join('\n');
writeFileSync( 'src/lib/ChessgroundUnstyled.svelte', unstyledComponent, 'utf8');

// Script should remove three CSS import lines
if ( unstyledComponent.split('\n').length != styledComponent.split('\n').length - 3 ) {
	console.error('Assertion failed: unexpected number of lines in ChessgroundUnstyled.svelte.');
	process.exit(-1);
}

