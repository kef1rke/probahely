<script>
	import Header from '../components/header.svelte';
	import supabase from '$lib/db';
	let date;
	let foglalas_ig;
	let foglalas_tol;

	async function createFoglalas() {
		const newRoom = await supabase.from('Foglalasok').insert({
			foglalas_date: date,
			foglalas_tol: foglalas_tol,
			foglalas_ig: foglalas_ig,
			zenekar_id: 1,
			zenesz_id: 1
		});
	}

	async function wahtIsMyId() {
		const publicRooms = await supabase
			.from('Zeneszek')
			.select(
				`
				name,
				messages ( text )
			`
			)
			.eq('public', true);
	}
</script>

<Header />

<input type="date" bind:value={date} />
<h3>tol</h3>
<input type="time" bind:value={foglalas_tol} />
<h3>ig</h3>
<input type="time" bind:value={foglalas_ig} />
<button on:click={createFoglalas}>Foglalás</button>

<h2>{date}, {foglalas_tol}, {foglalas_ig}</h2>
