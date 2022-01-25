<script>
	import Header from '../components/header.svelte';
	import supabase from '$lib/db';

	let userData;
	let date;
	let foglalas_ig;
	let foglalas_tol;

	async function getData(e) {
		const { data, error } = await supabase.from('users').select(e);
	}

	async function createFoglalas() {
		const { data, error } = await supabase.from('Foglalasok').insert([
			{
				foglalas_date: date,
				foglalas_tol: foglalas_tol,
				foglalas_ig: foglalas_ig
			}
		]);
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

<button on:click={getData}>Get data</button>
