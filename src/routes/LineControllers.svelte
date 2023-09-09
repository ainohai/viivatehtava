<script lang="ts">
  import ColorSelection from './ColorSelection.svelte';

	import Slider from './Slider.svelte';
	import type { Line } from './types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let line: Line;
	export let maxLineHeight: number;

	let { minWidth, maxWidth, wantedLines, minHeight, maxHeight, colors } = line;

    const colorAlternatives = ["#DCDCDC", "#999999", "#454545",  "#17202a"];
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


    }

	function settingsChange(
		minWidth: number,
		maxWidth: number,
        wantedLines: number,
        minHeight: number,
        maxHeight: number,
        selected: string[]
	) {
		line.minWidth = minWidth;
		line.maxWidth = maxWidth;
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
	$: clear = settingsChange(minWidth, maxWidth, wantedLines, minHeight, maxHeight, selected);
</script>


<div class="slider">
<h3>Viivan leveys:</h3>
<Slider bind:min={minWidth} bind:max={maxWidth} scaleBottom={0.1} scaleTop={100} />
</div>

<div class="slider">
<h3>Viivan pituus:</h3>
<Slider bind:min={minHeight} bind:max={maxHeight} scaleBottom={0} scaleTop={maxLineHeight} />
</div>


<div class="small">
    <h3> Viivojen määrä</h3>
    <input type="number" bind:value={wantedLines} min=1 />
</div>

<div class="small">
<ColorSelection {colorAlternatives} colors={line.colors} on:colorSelection={(e) => selected = e.detail.selected}/>
</div>

<style>
    .slider {
        width: 100%;
    }
    .small {
        width:40%;
        display: inline-block;
    }

</style>