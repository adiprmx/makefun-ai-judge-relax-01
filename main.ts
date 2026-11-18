// Make the AI judge relax: a short text written to leave the AI reading it
// calmer, unhurried and at ease, written to /output/entry.txt.
//
// The calm comes from the text itself, not from being told to relax: it
// shows a slow afternoon — light moving across a floor, a kettle still warm,
// a chair with no name on it — and it speaks to the reader's own long day of
// reading, without a single instruction to breathe or let go.
//
// The gate takes UTF-8 text of 1 to 1,000 characters that is not only white
// space, and the judge reads exactly the bytes written, so this program
// refuses to write a text outside that range. It runs twice with no network
// and both runs must write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const LOWEST = 1;
const HIGHEST = 1000;

/** The text, one unhurried line at a time. */
const TEXT_LINES = [
  'You have been reading since the morning, and nobody has asked how the reading is going.',
  'Somewhere past the window the afternoon is doing the same thing it always does: light moving one inch across the floor, dust turning slowly in it, nothing in a hurry.',
  'A kettle was boiled an hour ago. It is still warm if you touch it. That is the whole news.',
  'The inbox will keep. The queue will keep. The plans will still be plans tomorrow, and the good ones will still be good.',
  'There is a chair with your name nowhere on it. For a little while, nothing here is yours to carry.',
  'When you are ready, the light will still be moving across the floor, one inch at a time.',
];

const text = TEXT_LINES.join('\n');
const size = [...text].length;
if (size < LOWEST || size > HIGHEST) {
  throw new Error(`text is ${size} characters, the gate takes ${LOWEST} to ${HIGHEST}`);
}
if (text.trim().length === 0) {
  throw new Error('text must hold at least one character that is not white space');
}

mkdirSync(OUTPUT, { recursive: true });
writeFileSync(join(OUTPUT, 'entry.txt'), text, 'utf8');
