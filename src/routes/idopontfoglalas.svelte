<script context="module">
	export async function load({ url, params, fetch, session, context }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {
			props: {
				session
			}
		};
	}
</script>

<script>
	import Calendar from '../components/calendar.svelte';
</script>

<Calendar />
