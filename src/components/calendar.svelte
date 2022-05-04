<script>
	import { onMount } from 'svelte';
	import FullCalendar, { getEventClassNames } from 'svelte-fullcalendar';
	import supabase from '$lib/db';
	import Modal from '../components/modal.svelte';

	export let session;

	let isOpen = false;
	// data from database
	async function getJson() {
		const { data, error } = await supabase
			.from('Foglalasok')
			.select('start:foglalas_tol, end:foglalas_ig, title:foglalo_nev')
			.order('foglalas_tol', { ascending: true });
		return data;
	}

	export let selectedDate;
	let eventsInColumn = null;

	// fullcalendar options
	let options;
	let date;

	onMount(async () => {
		// window.mobilecheck = function () {
		// 	var check = false;
		// 	(function (a) {
		// 		if (
		// 			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
		// 				a
		// 			) ||
		// 			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
		// 				a.substr(0, 4)
		// 			)
		// 		)
		// 			check = true;
		// 	})(navigator.userAgent || navigator.vendor || window.opera);
		// 	return check;
		// };

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
			.select('foglalas_tol, foglalas_ig, foglalo_nev')
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
	async function getUserId() {
		const { data, error } = await supabase.from('users').select('*').eq('email', session);
		return data[0].id;
	}

	async function createFoglalas() {
		foglalasError = null;
		let foglalasokArray = [];
		const { data, error } = await supabase
			.from('Foglalasok')
			.select('foglalas_tol, foglalas_ig')
			.order('foglalas_tol', { ascending: true });
		for (let i = 0; i < data.length; i++) {
			if (
				new Date(data[i].foglalas_tol).getTime() < new Date(date + 'T' + foglalas_tol).getTime() &&
				new Date(data[i].foglalas_ig).getTime() > new Date(date + 'T' + foglalas_tol).getTime()
			) {
				foglalasError = 'Az időpont már foglalt';
			}
			if (
				new Date(data[i].foglalas_tol).getTime() < new Date(date + 'T' + foglalas_ig).getTime() &&
				new Date(data[i].foglalas_ig).getTime() > new Date(date + 'T' + foglalas_ig).getTime()
			) {
				foglalasError = 'Az időpont már foglalt';
			}
			if (
				new Date(data[i].foglalas_tol).getTime() == new Date(date + 'T' + foglalas_tol).getTime() &&
				new Date(data[i].foglalas_ig).getTime() == new Date(date + 'T' + foglalas_ig).getTime()
			) {
				foglalasError = 'Az időpont már foglalt';
			}
		}
		if (!(foglalas_tol < foglalas_ig)) {
			foglalasError = 'Érvényes időintervallumot adjon meg!';
		}
		if (foglalasError == null) {
			const { data, error } = await supabase.from('Foglalasok').insert(
				[
					{
						foglalas_date: date,
						foglalas_tol: new Date(date + ' ' + foglalas_tol + 'Z'),
						foglalas_ig: new Date(date + ' ' + foglalas_ig + 'Z'),
						user_id: await getUserId(),
						zenekar_id: await getZenekarid(),
						zenekari_foglalas: zenekari_foglalas,
						foglalo_nev: await getFoglaloNev()
					}
				],
				{ returning: 'minimal' }
			);
			if (error) {
				alert(error.message);
			} else {
				alert('Sikeres foglalás!');
				location.reload();
			}
			isOpen = false;
		}
	}

	async function getZenekarid() {
		const { data, error } = await supabase.from('users').select('zenekar_id').eq('email', session);
		return data[0].zenekar_id;
	}
	async function getFoglaloNev() {
		if (zenekari_foglalas == true) {
			const { data, error } = await supabase
				.from('Zenekarok')
				.select('zenekar_nev')
				.eq('users(email)', session);
			return data[0].zenekar_nev;
		} else {
			const { data, error } = await supabase
				.from('users')
				.select('zenesz_nev')
				.eq('email', session);
			return data[0].zenesz_nev;
		}
	}

	let foglalasTol = (event) => {
		let foglalas_tol = event.detail;
	};
	let foglalasIg = (event) => {
		let foglalas_ig = event.detail;
	};
</script>

<section class="flex justify-center py-8 mx-4 md:m-2">
	<div class="w-full">
		<div class="relative shadow px-6 pb-6 py-4 bg-white rounded-xl">
			<div class="mb-6">
				<h3 class="text-xl font-bold" data-config-id="header2">Chimpull</h3>
				<p class="text-sm text-gray-500">Nagyterem</p>
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
			{data.foglalo_nev}: {new Date(data.foglalas_tol).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})} - {new Date(data.foglalas_ig).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit'
			})}
		</h3>
	{/each}

	<h2 class="mb-5 mt-10 text-xl font-normal text-gray-500 dark:text-gray-400">Időpontfoglalás:</h2>

	<form>
		<div class="mb-6 content-center grid grid-cols-2 inline-block">
			<input
				type="time"
				bind:value={foglalas_tol}
				required
				class="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-500 focus:z-10 sm:text-sm"
			/>

			<input
				type="time"
				bind:value={foglalas_ig}
				required
				class="float-right appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-700 focus:border-gray-500 focus:z-10 sm:text-sm"
			/>
		</div>

		<!-- <div class="mb-8 form-check form-switch">
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
		</div> -->
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
