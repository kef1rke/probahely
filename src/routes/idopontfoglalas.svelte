<script>
	import 'tw-elements';
	import Header from '../components/header.svelte';
</script>

<Header />

<div class="flex ">
	<div class="flex justify-center">
		<div class="timepicker relative form-floating mb-3 xl:w-96">
			<input
				type="time"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Select a date"
			/>
			<label for="floatingInput" class="text-gray-700">Select a time</label>
			<button
				tabindex=""
				type="button"
				class="timepicker-toggle-button"
				data-mdb-toggle="timepicker"
			>
				<i class="fas fa-clock timepicker-icon" />
			</button>
		</div>
	</div>

	<div class="flex justify-center">
		<div class="timepicker relative form-floating mb-3 xl:w-96">
			<input
				type="text"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				placeholder="Select a date"
			/>
			<label for="floatingInput" class="text-gray-700">Select a time</label>
			<button
				tabindex=""
				type="button"
				class="timepicker-toggle-button"
				data-mdb-toggle="timepicker"
			>
				<i class="fas fa-clock timepicker-icon" />
			</button>
		</div>
	</div>
</div>
