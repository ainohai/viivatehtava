<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import Slider from './Slider.svelte';
	import LineControllers from './LineControllers.svelte';
	import type { Line } from './types';
	import { createSketch } from './sketch';
	import 'milligram/dist/milligram.min.css';
	import ColorSelection from './ColorSelection.svelte';

	const CANVAS_WIDTH = 350;
	const CANVAS_HEIGHT = 200;

	const NUM_OF_DRAWINGS = 3;

	let backgroundColors = ['#f3f4f7', '#e0dbd1', '#ccd9cb', '#b0c4de', '#f2e6c8'];
	let selectedBackgroundColors = [backgroundColors[0]];

	let vertical: Line = {
		minWidth: 0,
		maxWidth: 12,
		minHeight: CANVAS_HEIGHT - 2,
		maxHeight: CANVAS_HEIGHT,
		wantedLines: 3,
		id: 'vertical',
		colors: ['#17202a']
	};

	let horizontal: Line = {
		minWidth: 0,
		maxWidth: 12,
		minHeight: CANVAS_WIDTH - 2,
		maxHeight: CANVAS_WIDTH,
		wantedLines: 0,
		id: 'horizontal',
		colors: ['#17202a']
	};

	type Sketchy = {
		id: number;
		sketch: (p5: any) => void;
	};

	let lines: Line[] = [vertical, horizontal];
	let sketches: Sketchy[] = [];

	//TODO: Separate change method and drawing, and use it correctly.
	function settingsChange(line: Line) {
		lines.forEach((obj) => {
			if (obj.id === line.id) {
				obj = { ...line };
			}
		});
		lines = lines;
		let newSketches = [];

		for (let i = 0; i < NUM_OF_DRAWINGS; i++) {
			newSketches.push({
				id: Date.now() + Math.random(),
				sketch: createSketch([...lines], CANVAS_WIDTH, CANVAS_HEIGHT, selectedBackgroundColors)
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

<div>
	<button on:click={(e) => settingsChange(lines[0])}>Piirrä</button>

	<LineControllers
		line={lines[0]}
		maxLineHeight={CANVAS_HEIGHT}
		on:lineChanged={(e) => settingsChange(e.detail.line)}
	/>

	<h2>Vaakaviivat</h2>
	<LineControllers
		line={lines[1]}
		maxLineHeight={CANVAS_HEIGHT}
		on:lineChanged={(e) => settingsChange(e.detail.line)}
	/>

	<div style="width:50%; display:inline-block; margin-left:12px;">
		<ColorSelection
			title={'Taustaväri'}
			colorAlternatives={backgroundColors}
			colors={selectedBackgroundColors}
			on:colorSelection={(e) => {
				selectedBackgroundColors = e.detail.selected;
				settingsChange(lines[0]);
			}}
		/>
	</div>
</div>

<style>
	:global(body){
		background-color: #f3f4f7;
	}
	h1 {
		font-size: 2.6rem;
	}
	:global(h2) {
		font-size: 1.8em;
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
