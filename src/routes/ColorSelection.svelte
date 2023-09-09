<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

    export let colors = ["#999999", "#454545",  "#17202a"];
    export let colorAlternatives = ["#999999", "#454545",  "#17202a"];
	export let title = "Viivojen väri";
    let selected: string[] = [...colors];

    const toggleColor = (color: string) => {
        const index = selected.indexOf(color);
        if (index === -1 ) {
            selected.push(color)
        }
        else if (selected.length === 1) {
            return;
        }
        else if (index === 0) {
            selected.shift()
        }
        else {
            selected.splice(index, index);
        }
        selected=selected;

		dispatch('colorSelection', {
			selected: selected
		});
		return true;
	}

</script>

    <h3>{title}</h3>
	{#each colorAlternatives as color, i}
		<button
			aria-current={selected.includes(color)}
			aria-label={color}
			style="background: {color}"
			on:click={(e) => toggleColor(color)}
		>{selected.indexOf(color) === -1 ? "X" : ""}</button>
	{/each}

<style>

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

