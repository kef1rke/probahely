<script>
	import TimePicker from 'svelte-time-picker';

	let myOptions = {
		is24h: true,
		bgColor: '#9b2c2c',
		hasButtons: true,
		timeClassName: ' bg-gray-500 rounded-t-lg justify-around'
	};
</script>

<TimePicker options={myOptions} />
