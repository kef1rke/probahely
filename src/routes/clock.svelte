<script>
	import TimePicker from 'svelte-time-picker';

	let shown = false;

	export function show() {
		shown = true;
	}
	export function hide() {
		shown = false;
	}
	let myOptions = {
		is24h: true,
		bgColor: '#9b2c2c',
		hasButtons: true,
		timeClassName: ' bg-gray-500 rounded-t-lg justify-around',
		buttonBarClassName: 'rounded-b-lg'
	};
</script>

{#if shown}
	<div class="">
		<div class="">
			<TimePicker options={myOptions} />
		</div>
	</div>
{/if}
