<script>
	import { onMount } from 'svelte';
	import FullCalendar from 'svelte-fullcalendar';
	import supabase from '$lib/db';

	async function getJson(fetchInfo, successCallback, errorCallback) {
		console.log(fetchInfo);
		const { data, error } = await supabase
			.from('Foglalasok')
			.select('date:foglalas_date,title:foglalas_tol');
		return data;
	}

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

			//dateClick: (event) => alert('se le dio click', event.dateStr),
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

<!-- <button on:click={getEvents}>Get events</button>
<button on:click={getJsonLog}>Get json</button>
<button on:click={getOptions}>Get options</button> -->

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
