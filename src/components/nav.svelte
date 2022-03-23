<script context="module">
	// main navigation for the application
	import Createuser from '../components/admin/createuser.svelte';
	import Adminhome from './admin/adminHome.svelte';
	import Page2 from '../components/admin/page2.svelte';

	// these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
	export const navOptions = [
		{ page: 'Home', component: Adminhome },
		{ page: 'Create a user', component: Createuser },
		{ page: 'Second Page', component: Page2 }
		// other navigation pages can go here
	];
</script>
