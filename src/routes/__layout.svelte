<script>
	import '../app.css';
	import { session } from '$app/stores';
	import supabase from '$lib/db';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Header from '../components/header.svelte';

	if (browser) {
		$session = supabase.auth.session();
		if ($session == null) {
			goto('/login');
		}
		supabase.auth.onAuthStateChange((event, sesh) => {
			$session = sesh;
			setTimeout(() => ($session ? goto('/home') : goto('/login')));
		});
	}
</script>

<div class="h-screen bg-gray-200">
	{#if $page.url.pathname != '/admin'}
		<Header />
	{/if}
	<slot />
</div>
