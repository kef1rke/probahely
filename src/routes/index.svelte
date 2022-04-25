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

<h1>Home</h1>
<form action="/logout" method="get">
	<button> Log out </button>
</form>
