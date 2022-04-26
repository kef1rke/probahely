<script>
	import Button from '../components/button.svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference

	import { page } from '$app/stores';
	export let session;

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});

	async function logout(e) {
		const response = await fetch('/logout', {
			method: 'post',
			body: new FormData(e.target)
		});
		if (response.ok) window.location = '/';
		else alert(await response.text());
	}
</script>

<header class="text-gray-600 body-font">
	<div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
		<a href="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
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
			<span class="ml-3 text-xl">Próbaterem</span>
		</a>
		<nav
			class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center"
		>
			<a class="mr-5 hover:text-gray-900" class:active={$page.url.path === '/'} href="/">Home</a>
			<a class="mr-5 hover:text-gray-900" class:active={$page.url.path === '/about'} href="/about"
				>Rólunk</a
			>
			<a
				class="mr-5 hover:text-gray-900"
				class:active={$page.url.path === '/idopontfoglalas'}
				href="/idopontfoglalas">Időpontfoglalás</a
			>
		</nav>
		{#if session != null}
			<div class="relative z-10" bind:this={menu}>
				<div>
					<button
						on:click={() => (show = !show)}
						class="menu focus:outline-none focus:shadow-solid"
					>
						<img
							class="w-10 rounded-full"
							src="https://avatars.githubusercontent.com/u/67946056?v=4"
							alt=""
						/></button
					>

					{#if show}
						<div
							in:scale={{ duration: 100, start: 0.95 }}
							out:scale={{ duration: 75, start: 0.95 }}
							class="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-800
          rounded shadow-md"
						>
							<button class="block w-full text-white px-4 py-2 hover:bg-gray-500 "
								><a href="/profile">Profile</a></button
							>
							<form action="/logout" method="get">
								<button class="block w-full px-4 py-2 text-white hover:bg-gray-500 ">Logout</button>
							</form>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<button
				class="text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-400 rounded text-lg"
			>
				<a class:active={$page.url.path === '/login'} href="/login">Bejelentkezés</a>
			</button>
		{/if}
	</div>
</header>
