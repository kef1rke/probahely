
<script>
    import supabase from '$lib/db'
    import Header from '../components/header.svelte'
    import {signOut} from '$lib/services'
    import { session } from '$app/stores';

    
</script>

<Header />
<h1>Logged in as {$session.user.email}</h1>
<button on:click={signOut}>Log Out</button>
