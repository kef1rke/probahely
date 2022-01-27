<script>
	import Header from '../components/header.svelte';
	import supabase from '$lib/db';
	import { session } from '$app/stores';

	let userData;
	let date;
	let foglalas_ig;
	let foglalas_tol;

	const user = supabase.auth.user();
	//const zenekar_id = supabase.from('users').select('id, zenekar_id(zenekar_nev)');

	async function getZenesz() {
		const { data, error } = await supabase.from('users').select('zenekar_id');
		return data[0].zenekar_id;
	}

	////////////////

	//////////////
	async function createFoglalas() {
		const { data, error } = await supabase.from('Foglalasok').insert([
			{
				foglalas_date: date,
				foglalas_tol: foglalas_tol,
				foglalas_ig: foglalas_ig,
				user_id: user.id,
				zenekar_id: await getZenesz(),
				foglalas_tipus: true
			}
		]);
		//console.log(date, foglalas_tol, foglalas_ig, user.id, await getZenesz());
	}
</script>

<Header />

<input type="date" bind:value={date} />
<h3>tol</h3>
<input type="time" bind:value={foglalas_tol} />
<h3>ig</h3>
<input type="time" bind:value={foglalas_ig} />
<button on:click={createFoglalas}>Foglalás</button>
