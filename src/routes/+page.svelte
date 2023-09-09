<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import Slider from './Slider.svelte';
	import LineControllers from './LineControllers.svelte';
	import type { Line } from './types';
	import { createSketch } from './sketch';
	import 'milligram/dist/milligram.min.css';

	export const ssr = false;
	
	const CANVAS_WIDTH = 350;
	const CANVAS_HEIGHT = 200;

	const NUM_OF_DRAWINGS = 3;

	let vertical: Line = {
		minWidth: 0,
		maxWidth: 12,
		minHeight: CANVAS_HEIGHT - 5,
		maxHeight: CANVAS_HEIGHT,
		wantedLines: 3,
		minDistance: 0,
		maxDistance: CANVAS_WIDTH,
		angles: [0],
		id: 'vertical',
		colors: ['#17202a']
	};

	type Sketchy = {
		id: number;
		sketch: (p5: any) => void;
	};

	let lines: Line[] = [];
	let sketches: Sketchy[] = [];

	function settingsChange(line: Line) {
		console.log('vertical settingsChange');
		line = { ...line };
		lines = [line];
		let newSketches = [];

		for (let i = 0; i < NUM_OF_DRAWINGS; i++) {
			newSketches.push({
				id: Date.now() + Math.random(),
				sketch: createSketch([line], CANVAS_WIDTH, CANVAS_HEIGHT)
			});
		}
		sketches = newSketches;
		return true;
	}
</script>

<h1>Tulitikkulaatikkotehdas</h1>

<div class="sketchWrap">
	{#each sketches as sketch (sketch.id)}
	    <div class="sketch">
		    <P5 sketch={sketch.sketch} />
	    </div>
	{/each}
</div>

<button on:click={(e) => settingsChange(vertical)}>Piirrä</button>
<LineControllers
	line={vertical}
	maxLineDistance={CANVAS_WIDTH}
	maxLineHeight={CANVAS_HEIGHT}
	on:lineChanged={(e) => settingsChange(e.detail.line)}
/>

<style>
	h1 {
		font-size: 2.6rem;
	}
	:global(h3) {
		font-size: 1.5rem;
	}
	:global(p) {
		font-size: 1rem;
	}
	.sketch {
		display: inline-block;
		margin: 24px 12px;
	}
	.sketchWrap {
		height: 250px;
	}
</style>
