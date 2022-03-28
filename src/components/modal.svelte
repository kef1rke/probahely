<script>
	export let isOpen;
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.keyCode == 27) {
			isOpen = false;
		}
	}}
/>
{#if isOpen}
	<div
		class="bg-gray-500 bg-opacity-60 fixed right-0 left-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
	>
		<div class="absolute inset-1/4 h-screen mx-auto w-full max-w-md h-full md:h-auto ">
			<!-- Modal content -->
			<div class=" m-auto container bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex justify-end p-2">
					<button
						on:click={() => (isOpen = false)}
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
					>
						<svg
							class="w-5 h-5"
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
				<!-- Modal body -->
				<div class="p-6 pt-0 ">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
