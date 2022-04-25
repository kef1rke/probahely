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
	import Header from '../components/header.svelte';

	export let session;
</script>

<div class="min-h-screen bg-gray-200">
	<Header />

	<slot />
</div>
<pre>
	session = {session}
</pre>
