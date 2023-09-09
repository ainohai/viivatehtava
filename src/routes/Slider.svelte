<script lang="ts">
    import RangeSlider from 'svelte-range-slider-pips'

    export let min = 1;
    export let max = 5;
    export let scaleBottom = 0;
    export let scaleTop = 10;

    let values = [min,max,scaleBottom,scaleTop];

    let minVal = min;
    let maxVal = max;

    const onChange = (e:  CustomEvent<RangeSlider.OnChange>) => {
        minVal = e.detail.values[0]; 
        maxVal = e.detail.values[1]; 
    }
    const onStop = (e:  CustomEvent<RangeSlider.OnStop>) => {
        min = e.detail.values[0]; 
        max = e.detail.values[1]; 

    }
    
  </script>
  
  <RangeSlider range pips step={0.1} min={scaleBottom} max={scaleTop} first=label last=label bind:values on:change={(e) => {onChange(e)}} on:stop={(e) => {onStop(e)}}/>

  <p style="margin-bottom:5px;"> Minimi: {min} ja maksimi: {max} </p>
  