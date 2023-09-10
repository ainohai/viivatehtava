<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
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

	let hasReadInstructions = false;
	let buttonText = "Piirrä"

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

	function settingsChange(line: Line) {
		lines.forEach((obj) => {
			if (obj.id === line.id) {
				obj = { ...line };
			}
		});
		lines = lines;
        createSketches()
	}

	function createSketches() {
		let newSketches = [];

		for (let i = 0; i < NUM_OF_DRAWINGS; i++) {
			newSketches.push({
				id: Date.now() + Math.random(),
				sketch: createSketch([...lines], CANVAS_WIDTH, CANVAS_HEIGHT, selectedBackgroundColors)
			});
		}
		sketches = newSketches;
		buttonText = "Piirrä uudestaan"
		return true;
	}
</script>

<svelte:head>
	<title>Tulitikkulaatikkotehdas</title>
</svelte:head>

<div class="buttonContainer">
    <h1 style="display:inline-block; margin-right: 2rem">Tulitikkulaatikkotehdas</h1>
	{#if hasReadInstructions}
	    <button on:click={(e) => createSketches()}>{buttonText}</button>
	{/if}
</div>

{#if hasReadInstructions}

	<div class="sketchWrap">
		{#each sketches as sketch (sketch.id)}
			<div class="sketch">
				<P5 sketch={sketch.sketch} />
			</div>
		{/each}
	</div>

	<div style="margin-bottom:2rem">

		<LineControllers
			line={lines[0]}
			maxLineHeight={CANVAS_HEIGHT}
			on:lineChanged={(e) => settingsChange(e.detail.line)}
		/>

		<h2>Vaakaviivat</h2>
		<LineControllers
			line={lines[1]}
			maxLineHeight={CANVAS_WIDTH}
			on:lineChanged={(e) => settingsChange(e.detail.line)}
		/>

		<div style="width:50%; display:inline-block; margin-left:12px;">
			<ColorSelection
				title={'Taustaväri'}
				colorAlternatives={backgroundColors}
				colors={selectedBackgroundColors}
				on:colorSelection={(e) => {
					selectedBackgroundColors = e.detail.selected;
					createSketches();
				}}
			/>
		</div>
	</div>
{/if}
<div>
	<h2>Käyttöohjeet</h2>
	<ul>
		<li>Tulitikkulaatikkotehtaan tarkoitus on havainnollistaa kuinka erilaisia kuvia saa luotua vain rajatulla määrillä pysty- ja vaakasuoria viivoja.</li>
		<li>Viivojen määrää, sallittuja värejä, sallittuja pituuksia ja sallittua leveyttä voi säätää. Samoin taustaväriä.</li>
		<li>Viivat piirretään joko painamalla "Piirrä"-nappia tai muuttamalla asetuksia. Viivat voivat mennä toistensa päälle tai niin lähelle reunaa, että ne eivät näy kunnolla.</li>
		<li>Tulitikkulaatikkotehdas piirtää viivat käytännössä katsoen satunnaisesti. Se ei ymmärrä mitään estetiikasta tai sommittelusta.</li>
		<li>Tehdas toimii täysikokoisilla näytöillä. Se toimii huonosti mobiililaitteilla. Testattu firefox-selaimella.</li>
	</ul>
	{#if !hasReadInstructions}
    	<button on:click={(e) =>hasReadInstructions = true}>Jatka</button>
	{/if}
</div>

<style>
	:global(html){
		font-size: 10px;
	}
	:global(body){
		background-color: #f3f4f7;
		margin-right: 1.5rem;
	}
	.buttonContainer {
		height:100%;
	    display: flex;
        align-items: center;
	}
	.sketch {
		display: inline-block;
		margin: 24px 12px;
	}
	.sketchWrap {
		min-height: 250px;
	}
</style>
