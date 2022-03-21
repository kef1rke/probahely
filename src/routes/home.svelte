<script>
	import { signOut } from '$lib/services';
	import Header from '../components/header.svelte';
	import Calendar from '../components/calendar.svelte';

	let selection;
	function setSelection(res) {
		selection = res;
	}
</script>

<Calendar />
