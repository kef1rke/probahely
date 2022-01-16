<script>
    import Button from '../components/button.svelte'
    import Input from '../components/input.svelte'
    import supabase from '$lib/db'
    
    let email, password

    async function signIn() {
        const { user, error } = await supabase.auth.signIn({
            email,
            password
        })
        if(error) alert(error.message)
    }
    
    
</script>

<main>
    <h1 class="text-4xl flex justify-center">Login</h1>
    
    <div class="inline-block flex justify-center">
        <form on:submit|preventDefault={signIn}>
            <Input label="Email" id="email" bind:value={email} type="email" />
            <Input label="Password" id="password" bind:value={password} type="password" />
            <Button on:click={signIn}>Sign In</Button>
        </form>
    </div>
    
</main>
