<script>
	import supabase from '$lib/db';
	import selectedDate from '../components/calendar.svelte';
	let shown = false;
	let event;
	let date;

	export function getEvent() {}
	export function show(selectedDate) {
		shown = true;
		date = selectedDate;
	}
	export function hide() {
		shown = false;
	}

	//foglalás

	let foglalas_tol;
	let foglalas_ig;
	let zenekari_foglalas = false;
	let foglalasError;

	const user = supabase.auth.user();
	async function createFoglalas(selectedDate) {
		const { data, error } = await supabase.from('Foglalasok').insert([
			{
				foglalas_date: date,
				foglalas_tol: foglalas_tol,
				foglalas_ig: foglalas_ig,
				user_id: user.id,
				zenekar_id: await getZenesz(),
				zenekari_foglalas: zenekari_foglalas
			}
		]);
		if (error) {
			error.message = foglalasError;
		}
	}

	async function getZenesz() {
		const { data, error } = await supabase.from('users').select('zenekar_id');
		return data[0].zenekar_id;
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.keyCode == 27) {
		}
		hide();
	}}
/>
{#if shown}
	<div
		class="bg-gray-500 bg-opacity-60 fixed right-0 left-0  z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
	>
		<div class="flex h-screen mx-auto w-full max-w-md h-full md:h-auto ">
			<!-- Modal content -->
			<div class="m-auto container bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex justify-end p-2">
					<button
						on:click={() => hide()}
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

					<h2 class="mb-5 mt-10 text-xl font-normal text-gray-500 dark:text-gray-400">
						Időpontfoglalás:
					</h2>
					<form>
						<div class="mb-6 content-center grid grid-cols-2 inline-block">
							<input
								type="time"
								bind:value={foglalas_tol}
								required
								class=" appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-500 focus:z-10 sm:text-sm"
							/>

							<input
								type="time"
								bind:value={foglalas_ig}
								required
								class=" float-right appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-500 focus:z-10 sm:text-sm"
							/>
						</div>

						<div class="mb-8 form-check form-switch">
							<input
								class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
								bind:checked={zenekari_foglalas}
							/>
							<label
								class="form-check-label inline-block text-gray-800"
								for="flexSwitchCheckDefault">Zenekari foglalás</label
							>
						</div>
						<button
							on:click={createFoglalas}
							type="button"
							class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
						>
							Lefoglalom az időpontot!
						</button>
					</form>

					<button
						type="button"
						class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
						>No, cancel</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
