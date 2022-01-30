<script>
	import { onMount } from 'svelte';
	import FullCalendar, { getEventClassNames } from 'svelte-fullcalendar';
	import supabase from '$lib/db';
	import Modal from '../components/modal.svelte';

	let modal;
	// data from database
	async function getJson(fetchInfo, successCallback, errorCallback) {
		const { data, error } = await supabase
			.from('Foglalasok')
			.select('date:foglalas_date, title:zenekar_id')
			.order('foglalas_tol', { ascending: true });
		return data;
	}
	async function getJsonData() {
		console.log(await selectedDate);
	}

	export let selectedDate;
	let eventsInColumn = null;
	// fullcalendar options
	let options;
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
			eventClick: function () {
				modal.show();
			},

			//function(mouseEnterInfo) {},
			dateClick: async (event) => {
				selectedDate = await event.dateStr;
				const { data, error } = await supabase
					.from('Foglalasok')
					.select('foglalas_tol, foglalas_ig')
					.eq('foglalas_date', selectedDate)
					.order('foglalas_tol', { ascending: true });
				eventsInColumn = data;
				modal.show(selectedDate);
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
</script>

<!-- <button on:click={getEvents}>Get events</button> -->
<button on:click={getJsonData}>Get json</button>
<!-- <button on:click={getOptions}>Get options</button> -->

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

<Modal bind:this={modal}>
	{#if eventsInColumn.length != 0}
		<h2 class="text-center mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Foglalások erre a napra:
		</h2>
	{:else}
		<h2 class="text-center mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Nincs foglalás {selectedDate}
		</h2>
	{/if}

	{#each eventsInColumn as data}
		<h3 class="text-center mb-1 font-normal text-gray-700 ">
			{data.foglalas_tol} - {data.foglalas_ig}
		</h3>
	{/each}
</Modal>
