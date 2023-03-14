<script>
	import { navOptions } from '../components/nav.svelte'; // import application navigation
	let selected = navOptions[0]; // keep track of the selected 'page' object (default to the about component since we must have local db connection established first)
	let intSelected = 0; // selected page index

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

<div class="flex min-h-full">
	<div class="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-1/4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="inline w-8 h-8 text-white lg:hidden"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
		<div class="hidden lg:block">
			<div class="my-2 mb-6">
				<h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
			</div>
			<ul>
				{#each navOptions as option, i}
					<li
						class={intSelected == i
							? 'mb-2 bg-gray-800 rounded shadow'
							: 'mb-2 rounded hover:shadow hover:bg-gray-800'}
					>
						<button
							class="w-full text-left px-3 py-2 font-bold text-white"
							on:click={changeComponent}
							id={i}
							role="tab">{option.page}</button
						>
					</li>
				{/each}
				<li class="mb-2 rounded hover:shadow hover:bg-gray-800">
					<a role="tab" href="/">
						<button class="w-full text-left px-3 py-2 font-bold text-white"
							>Go back to website</button
						></a
					>
				</li>
			</ul>
		</div>
	</div>

	<div class="row">
		<div class="col-sm-12">
			<div class="p-2">
				<!-- this is where our main content is placed -->
				<svelte:component this={selected.component} />
			</div>
		</div>
	</div>
</div>
