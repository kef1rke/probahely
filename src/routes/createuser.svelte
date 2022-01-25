<script>
	import supabase from '$lib/db';

	let email, password;
	async function signUp() {
		const { user, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});
		console.log(user, error);
	}
</script>

<input type="email" bind:value={email} />
<input type="password" bind:value={password} />
<button on:click={signUp}>Create user!</button>
