<script>
	import '../app.css';
	import { session } from '$app/stores';
	import supabase from '$lib/db';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import Appbar from '../components/appbar.svelte';

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

	export let darkTheme;
</script>

<svelte:head>
	{#if darkTheme === undefined}
		<!-- SMUI Styles -->
		<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if darkTheme}
		<link rel="stylesheet" href="/smui.css" />
		<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
		<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<Appbar bind:darkTheme />
<slot />
