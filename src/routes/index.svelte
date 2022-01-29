<script>
	import supabase from '$lib/db';
	import Header from '../components/header.svelte';
	import { signOut } from '$lib/services';
	import { session } from '$app/stores';
	import ModalClock from '../components/modalClock.svelte';
	let showModal = true; // toggles the hide/show modal mode
</script>

<Header />
