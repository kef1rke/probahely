<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import supabase from '$lib/db';

	export let session;

	let user;
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

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-xl dark:bg-gray-800">
	<div class="container flex flex-wrap justify-between items-center mx-auto">
		<a href="/" class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				class="w-10 h-10 text-white p-2 bg-gray-500 rounded-full"
				viewBox="0 0 24 24"
			>
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>Próbaterem</span
			>
		</a>
		{#if session != null}
			<div class="flex items-center md:order-2">
				<button
					class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
					id="user-menu-button"
					aria-expanded="false"
					type="button"
					data-dropdown-toggle="dropdown"
				>
					<span class="sr-only">Open user menu</span>
					<img
						class="w-8 h-8 rounded-full"
						src="https://avatars.githubusercontent.com/u/67946056?v=4"
						alt="user photo"
					/>
				</button>
				<!-- Dropdown menu -->
				<div
					class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
					id="dropdown"
				>
					<div class="py-3 px-4">
						<span class="block text-sm text-gray-900 dark:text-white">{user?.zenesz_nev}</span>
						<span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
							>{user?.email}</span
						>
					</div>
					<ul class="py-1" aria-labelledby="dropdown">
						<li>
							<a
								href="/profile"
								class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Profil</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Settings</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>Earnings</a
							>
						</li>
						<li>
							<form action="/logout" method="get">
								<a
									href="/logout"
									method="get"
									class="block float-left w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>Sign out</a
								>
							</form>
						</li>
					</ul>
				</div>
				<button
					data-collapse-toggle="mobile-menu-2"
					type="button"
					class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="mobile-menu-2"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						/></svg
					>
					<svg
						class="hidden w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>
		{:else}
			<div class="flex md:order-2">
				<button
					type="button"
					class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					><a class:active={$page.url.path === '/login'} href="/login">Bejelentkezés</a></button
				>
				<button
					data-collapse-toggle="mobile-menu-2"
					type="button"
					class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="mobile-menu-2"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						/></svg
					>
					<svg
						class="hidden w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>
		{/if}
		<div
			class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
			id="mobile-menu-2"
		>
			<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
				<li>
					<a
						class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						class:active={$page.url.path === '/'}
						href="/">Home</a
					>
				</li>
				<li>
					<a
						class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						class:active={$page.url.path === '/about'}
						href="/">Rólunk</a
					>
				</li>
				<li>
					<a
						class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						class:active={$page.url.path === '/idopontfoglalas'}
						href="/idopontfoglalas">Időpontfoglalás</a
					>
				</li>

				<li>
					<a
						class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
						class:active={$page.url.path === '/contact'}
						href="/">Elérhetőség</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
