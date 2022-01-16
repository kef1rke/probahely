<script>
	import { Calendar } from '@fullcalendar/core';
	import { onMount } from 'svelte';
	onMount(() => {
		var calendarEl = document.getElementById('calendar');
		var calendar = new Calendar.Calendar(calendarEl, {
			initialView: 'dayGridMonth'
		});
		calendar.render();
	});
</script>

<div id="calendar" />
