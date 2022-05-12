<script context="module">
	import supabase from '$lib/db';
	export async function load({ url, params, fetch, session, context }) {
		async function getUserData() {
			const { data: dat, error: err } = await supabase
				.from('users')
				.select('*')
				.eq('email', session);
			let userId = dat[0].id;

			const { data, error } = await supabase
				.from('users')
				.select('id, email, zenesz_nev, profile_picture_url, Zenekarok(zenekar_nev), user_lvl')
				.order('zenesz_nev')
				.eq('id', await userId);
			return await data[0].user_lvl;
		}

		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		} else {
			if ((await getUserData()) != 3) {
				return {
					status: 302,
					redirect: '/login'
				};
			}
		}
		return {
			props: {
				session
			}
		};
	}
</script>

<div>Admin page</div>
