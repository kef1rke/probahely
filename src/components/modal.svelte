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
		on:click={() => (isOpen = false)}
		class="fixed flex justify-center top-0 bg-gray-300 content-center bg-opacity-50 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
	>
		<div class="relative self-center w-full h-full max-w-lg p-4 md:h-auto">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white">Nagyterem</h3>
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
