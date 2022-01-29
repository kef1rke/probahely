<script>
	import Header from '../components/header.svelte';
	import { signOut } from '$lib/services';
	import { session } from '$app/stores';
	import Modal from '../components/modal.svelte';
</script>

<Header />
<h2>U r logged in as {$session.user?.email}</h2>
<button on:click={signOut}>Log Out</button>
<Modal />
