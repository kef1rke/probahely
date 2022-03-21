<script>
	import { signOut } from '$lib/services';
	import Header from '../components/header.svelte';
	import Calendar from '../components/calendar.svelte';
	import Appbar from '../components/appbar.svelte';

	let selection;
	function setSelection(res) {
		selection = res;
	}
</script>

<Appbar />
<Header />

<Calendar />
