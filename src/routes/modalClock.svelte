<script>
	import { TimePickerModal } from 'svelte-time-picker'; // the modal including the TimePicker component
	import { fade } from 'svelte/transition';

	export let showModal; // bound by the App

	/* Callbacks */
	let cancelCallback = (event) => {
		let date = event.detail;
		// ...
	};
	let changeCallback = (event) => {
		let date = event.detail;
		// ...
	};
	let okCallback = (event) => {
		let date = event.detail;
		// ...
	};

	/* Closes this modal */
	function close() {
		showModal = false; // will be closed by the App
	}

	/* The TimePicker options */
	let options = {
		zIndex: 200 // this option is important to avoid mouse event capture conflicts
	};
</script>

<div transition:fade={{ duration: 300 }}>
	<TimePickerModal
		{options}
		on:cancel={cancelCallback}
		on:change={changeCallback}
		on:ok={okCallback}
		on:close={close}
	/>
</div>
