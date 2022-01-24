<script>
	import supabase from '$lib/db';
	async function signUp() {
		const { user, error } = await supabase.auth.signUp({
			email: 'kocsisbarnabas2@gmail.com',
			password: 'b1b2b3b4b5'
		});
		console.log(user, error);
	}
</script>

<button on:click={signUp}>Create user!</button>
