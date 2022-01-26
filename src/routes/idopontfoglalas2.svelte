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

	async function getData() {
		const { data, error } = await supabase.from('users').select('id');
		return data[0].id;
	}

	////////////////
	async function test() {
		const { data, error } = await supabase.from('users').select('id');
		let e = data[0].id;
		return e;
	}

	async function enter() {
		console.log(await test());
	}
	//////////////
	async function createFoglalas() {
		const { data, error } = await supabase.from('Foglalasok').insert([
			{
				foglalas_date: date,
				foglalas_tol: foglalas_tol,
				foglalas_ig: foglalas_ig,
				user_id: user.id,
				zenekar_id: 1
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
<h2>{user}</h2>
<button on:click={enter}>Get current user</button>
