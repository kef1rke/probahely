<script context="module">
	export async function load({ url, fetch, session, context, params }) {
		return {
			props: {
				session
			}
		};
	}
</script>

<script>
	import '../app.css';
	import 'flowbite/dist/flowbite.css';
	import Header from '../components/header.svelte';
	import Header2 from '../components/header2.svelte';

	export let session;
</script>

<div class="min-h-screen bg-gray-200">
	<Header2 bind:session />

	<slot />
</div>
