<script>
	import supabase from '$lib/db';
	import Header from '../components/header.svelte';
	import { signOut } from '$lib/services';
	import { session } from '$app/stores';
</script>

<Header />
<h2>U r logged in as {$session.user?.email}</h2>
<button on:click={signOut}>Log Out</button>
