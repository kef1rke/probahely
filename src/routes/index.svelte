<script>
	export async function load({ url, params, fetch, session, context }) {
		if (!session) {
			return {};
		}
		return {
			props: {
				session
			}
		};
	}
</script>

<h1>Főoldal</h1>
