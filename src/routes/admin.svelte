<script>
	import { navOptions } from '../components/nav.svelte'; // import application navigation
	let selected = navOptions[0]; // keep track of the selected 'page' object (default to the about component since we must have local db connection established first)
	let intSelected = 0; // selected page index

	// change the selected component (the event.originalTarget.id is not accessible in Chrome so switched to event.srcElement.id)
	function changeComponent(event) {
		selected = navOptions[event.srcElement.id];
		intSelected = event.srcElement.id;
	}
</script>

<div class="flex h-full">
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
			</ul>
		</div>
	</div>

	<div class="row">
		<div class="col-sm-12">
			<div class="p-2">
				<h1>{selected.page}</h1>
				<!-- this is where our main content is placed -->
				<svelte:component this={selected.component} />
			</div>
		</div>
	</div>
</div>
