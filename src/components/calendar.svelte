<script>
	import { onMount } from 'svelte';
	import FullCalendar, { getEventClassNames } from 'svelte-fullcalendar';
	import supabase from '$lib/db';
	import Modal from '../components/modal.svelte';

	let modal;
	let isOpen = false;
	// data from database
	async function getJson(fetchInfo, successCallback, errorCallback) {
		const { data, error } = await supabase
			.from('Foglalasok')
			.select('date:foglalas_date, title:zenekar_id')
			.order('foglalas_tol', { ascending: true });
		return data;
	}

	export let selectedDate;
	let eventsInColumn = null;

	// fullcalendar options
	let options;
	let date;
	onMount(async () => {
		const common = (await import('@fullcalendar/common')).default;
		options = {
			initialView: 'dayGridMonth',
			plugins: [],
			locale: 'hun',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay'
			},
			firstDay: 1,
			buttonText: {
				today: 'Ma',
				month: 'Hónap',
				week: 'Hét',
				day: 'Nap'
			},
			eventClick: async (event) => {
				foglalas(event);
			},
			dateClick: async (event) => {
				foglalas(event);
			},
			selectable: true,
			events: getJson,
			plugins: [
				(await import('@fullcalendar/daygrid')).default,
				(await import('@fullcalendar/timegrid')).default,
				(await import('@fullcalendar/interaction')).default
			]
		};
	});

	//foglalás
	async function foglalas(event) {
		selectedDate = await event.dateStr;
		const { data, error } = await supabase
			.from('Foglalasok')
			.select('foglalas_tol, foglalas_ig')
			.eq('foglalas_date', selectedDate)
			.order('foglalas_tol', { ascending: true });
		eventsInColumn = data;
		isOpen = true;
		date = selectedDate;
	}
	let foglalas_tol;
	let foglalas_ig;
	let zenekari_foglalas = false;
	let foglalasError = null;

	const user = supabase.auth.user();
	async function createFoglalas() {
		foglalasError = null;
		if (!(foglalas_tol < foglalas_ig)) {
			foglalasError = 'Érvényes időintervallumot adjon meg!';
		}
		if (foglalasError == null) {
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
			isOpen = false;
		}
	}

	async function getZenesz() {
		const { data, error } = await supabase.from('users').select('zenekar_id');
		return data[0].zenekar_id;
	}
</script>

<section class="py-8">
	<div class="container px-4 mx-auto">
		<div class="relative px-6 pb-6 py-4 bg-white rounded-xl">
			<div class="mb-6">
				<h3 class="text-xl font-bold" data-config-id="header2">Task Calendar</h3>
				<p class="text-sm text-gray-500">Your Subtitle here</p>
			</div>
			<div class="relative h-3/4">
				<div class="relative ">
					<FullCalendar {options} />
				</div>
			</div>
		</div>
	</div>
</section>

<Modal bind:isOpen>
	{#if foglalasError}
		<h2 class="text-center mb-5 text-lg font-normal text-red-500">{foglalasError}</h2>
	{/if}
	{#if eventsInColumn.length != 0}
		<h2 class="text-center mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Foglalások erre a napra:
		</h2>
	{:else}
		<h2 class="text-center mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Nincs foglalás erre a napra
		</h2>
	{/if}

	{#each eventsInColumn as data}
		<h3 class="text-center mb-1 font-normal text-gray-700 ">
			{data.foglalas_tol} - {data.foglalas_ig}
		</h3>
	{/each}

	<h2 class="mb-5 mt-10 text-xl font-normal text-gray-500 dark:text-gray-400">Időpontfoglalás:</h2>

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
			<label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault"
				>Zenekari foglalás</label
			>
		</div>
		<button
			on:click={() => (isOpen = false)}
			type="button"
			class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
			>Cancel</button
		>
		<button
			on:click={createFoglalas}
			type="button"
			class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
		>
			Lefoglalom az időpontot!
		</button>
	</form>
</Modal>
