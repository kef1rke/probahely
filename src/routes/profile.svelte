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
	import supabase from '$lib/db';
	import { onMount } from 'svelte';

	export let session;

	let user;
	let zenekarNev;

	async function getUserData() {
		const { data: dat, error: err } = await supabase.from('users').select('*').eq('email', session);
		let userId = dat[0].id;

		const { data, error } = await supabase
			.from('users')
			.select('id, email, zenesz_nev, profile_picture_url, Zenekarok(zenekar_nev)')
			.order('zenesz_nev')
			.eq('id', await userId);
		user = await data[0];
	}

	onMount(() => {
		getUserData();
	});
</script>

<!-- component -->
<div class="font-sans h-screen w-full flex flex-row justify-center items-center">
	<div class="card rounded-xl w-96 mx-auto bg-white  shadow-xl hover:shadow">
		<img
			class="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
			src="https://avatars.githubusercontent.com/u/67946056?v=4"
			alt=""
		/>

		<div class="text-center mt-2 text-3xl font-medium">{user?.zenesz_nev}</div>

		<div class="text-center font-normal text-lg">{user?.Zenekarok.zenekar_nev}</div>
		<div class="px-6 text-center mt-2 font-light text-sm">
			<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
		</div>
		<hr class="mt-8" />
		<div class="flex p-4">
			<div class="w-1/2 text-center">
				<span class="font-bold">1.8 k</span> Followers
			</div>
			<div class="w-0 border border-gray-300" />
			<div class="w-1/2 text-center">
				<span class="font-bold">2.0 k</span> Following
			</div>
		</div>
	</div>
</div>
