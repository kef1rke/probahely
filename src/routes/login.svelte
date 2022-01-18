<script>
    import supabase from '$lib/db'
    import Input from '../components/input.svelte'
    import {session} from '$app/stores'
    import Header from '../components/header.svelte'

    let email, password

    async function signIn() {
        const { user, session: sesh, error } = await supabase.auth.signIn({
            email,
            password,
        })
        if (error) alert(error.message)
    }
</script>

<Header />
<form on:submit|preventDefault={signIn}>
    <input type="email" id="email" name="Email" bind:value={email} />
    <input type="password" id="password" label="Password" bind:value={password} />
    <button>Sign In</button>
</form>
