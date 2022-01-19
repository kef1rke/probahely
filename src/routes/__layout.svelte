<script>
	import '../app.css';
	import 'tw-elements';
	import {session} from '$app/stores'
	import supabase from '$lib/db'
	import {browser} from '$app/env'
	import { goto } from '$app/navigation';

	if(browser) {
		$session = supabase.auth.session()
		if($session == null){
			goto('/login')
		}
		
		supabase.auth.onAuthStateChange((event, sesh) => {
		$session = sesh
		setTimeout(() => $session ? goto('/home') : goto('/login'))
	})
	}
	
</script>

<slot />
