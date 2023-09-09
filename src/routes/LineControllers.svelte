<script lang="ts">
	import Slider from './Slider.svelte';
	import type { Line } from './types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let line: Line;
	export let maxLineHeight: number;
    export let maxLineDistance: number; 

	let { minWidth, maxWidth, maxDistance, minDistance, wantedLines, minHeight, maxHeight, colors } = line;

    const colorAlternatives = ["#999999", "#454545",  "#17202a"];
	let selected: string[] = [...colors];

    const toggleColor = (color: string) => {
        const index = selected.indexOf(color);
        if (index === -1 ) {
            selected.push(color)
        }
        else if (index === 0) {
            selected.shift()
        }
        else {
            selected.splice(index, index);
        }
        selected=selected;

        console.log(selected)

    }

	function settingsChange(
		minWidth: number,
		maxWidth: number,
		minDistance: number,
		maxDistance: number,
        wantedLines: number,
        minHeight: number,
        maxHeight: number,
        selected: string[]
	) {
		line.minWidth = minWidth;
		line.maxWidth = maxWidth;
		line.minDistance = minDistance;
		line.maxDistance = maxDistance;
        line.wantedLines = wantedLines;
        line.minHeight = minHeight;
        line.maxHeight = maxHeight;
        line.colors = selected;
		console.log('line changed event');
		dispatch('lineChanged', {
			line: line
		});
		return true;
	}

    //can I use just an object here?
	$: clear = settingsChange(minWidth, maxWidth, minDistance, maxDistance, wantedLines, minHeight, maxHeight, selected);
</script>


<div class="slider">
<h3>Viivan leveys:</h3>
<Slider bind:min={minWidth} bind:max={maxWidth} scaleBottom={1} scaleTop={100} />
</div>

<div class="slider">
<h3>Viivan korkeus:</h3>
<Slider bind:min={minHeight} bind:max={maxHeight} scaleBottom={0} scaleTop={maxLineHeight} />
</div>

<!--><h3>Viivojen etäisyys toisistaan</h3>
<Slider bind:min={minDistance} bind:max={maxDistance} scaleBottom={2} scaleTop={maxLineDistance} />-->

<div class="small">
    <h3> Viivojen määrä</h3>
    <input type="number" bind:value={wantedLines} min=1 />
</div>

<div class="small">
    <h3> Viivojen väri</h3>
	{#each colorAlternatives as color, i}
		<button
			aria-current={selected.includes(color)}
			aria-label={color}
			style="background: {color}"
			on:click={(e) => toggleColor(color)}
		>{selected.indexOf(color) === -1 ? "X" : ""}</button>
	{/each}
</div>

<style>
    .slider {
        width: 100%;
    }
    .small {
        width:40%;
        display: inline-block;
    }

	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px,-2px);
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
        height: auto;
	}

	button[aria-current="true"] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}
</style>