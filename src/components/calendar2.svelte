<script>
	const date = new Date();

	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear()
	};

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	let monthIndex = date.getMonth();
	// const currentMonth = date.toLocaleString('en-US', { month: 'long' })
	$: month = monthNames[monthIndex];

	let year = date.getFullYear();

	$: firstDayIndex = new Date(year, monthIndex, 0).getDay();
	// const currentDay = date.getDate();
	$: numberOfDays = new Date(year, monthIndex + 1, 0).getDate();

	$: calendarCellsQty = numberOfDays + firstDayIndex;

	//////////////////////////////////////////////////////
	$: s = 0;
	$: sf = 0;

	//////////////////////////////////////////////////////

	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return (monthIndex = 0);
		}
		return (monthIndex += 1);
	};

	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return (monthIndex = 11);
		}
		return (monthIndex -= 1);
	};

	$: console.log(
		`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`
	);
</script>

<div class="flex items-center justify-center py-8 px-4">
	<div class="max-w-sm w-full shadow-lg">
		<div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
			<div class="px-4 flex items-center justify-between">
				<span
					tabindex="0"
					class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
					>{month} {year}</span
				>
				<div class="flex items-center">
					<button
						aria-label="calendar backward"
						class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-chevron-left"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<polyline points="15 6 9 12 15 18" />
						</svg>
					</button>
					<button
						aria-label="calendar forward"
						class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler  icon-tabler-chevron-right"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<polyline points="9 6 15 12 9 18" />
						</svg>
					</button>
				</div>
			</div>
			<div class="flex items-center justify-between pt-12 overflow-x-auto">
				<table class="w-full">
					<thead>
						<ul>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										Mo
									</p>
								</div>
							</li>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										Tu
									</p>
								</div>
							</li>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										We
									</p>
								</div>
							</li>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										Th
									</p>
								</div>
							</li>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										Fr
									</p>
								</div>
							</li>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										Sa
									</p>
								</div>
							</li>
							<li>
								<div class="w-full flex justify-center">
									<p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
										Su
									</p>
								</div>
							</li>
						</ul>
					</thead>
					<tbody>
						{#each Array.from(Array(5 + 1).keys()).slice(0) as i}
							<ul>
								{#if s < firstDayIndex}
									{#each Array.from(Array(firstDayIndex).keys()).slice(s) as j}
										{#if sf < numberOfDays}
											<li class="pt-6">
												<div class="px-2 py-2 cursor-pointer flex w-full justify-center" />
											</li>
										{/if}
										{s++}
										{#if firstDayIndex <= s}
											{#each Array.from(Array(7 - firstDayIndex + 1).keys()).slice(1) as k}
												{#if sf < numberOfDays}
													<li class="pt-6">
														<div class="px-2 py-2 cursor-pointer flex w-full justify-center">
															<p class="text-base text-gray-500 dark:text-gray-100 font-medium">
																{k}
															</p>
														</div>
													</li>
												{/if}
												{s++}
												{sf++}
											{/each}
										{/if}
									{/each}
								{:else}
									{#each Array.from(Array(7 * i + (7 - firstDayIndex) + 1).keys()).slice(sf + 1) as j}
										{#if sf < numberOfDays}
											<li class="pt-6">
												<div class="px-2 py-2 cursor-pointer flex w-full justify-center">
													<p class="text-base text-gray-500 dark:text-gray-100 font-medium">{j}</p>
												</div>
											</li>
										{/if}
										{s++}
										{sf++}
									{/each}
								{/if}
							</ul>
						{/each}
						<ul>
							<il class="pt-6">
								<div class="px-2 py-2 cursor-pointer flex w-full justify-center" />
							</il>
							<il class="pt-6">
								<div class="px-2 py-2 cursor-pointer flex w-full justify-center" />
							</il>
							<il>
								<div class="px-2 py-2 cursor-pointer flex w-full justify-center" />
							</il>
							<il class="pt-6">
								<div class="px-2 py-2 cursor-pointer flex w-full justify-center">
									<p class="text-base text-gray-500 dark:text-gray-100 font-medium">1</p>
								</div>
							</il>
						</ul>
					</tbody>
				</table>
			</div>
		</div>
		<div class="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
			<div class="px-4">
				<div class="border-b pb-4 border-gray-400 border-dashed">
					<p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
					<a
						tabindex="0"
						class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
						>Zoom call with design team</a
					>
					<p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">
						Discussion on UX sprint and Wireframe review
					</p>
				</div>
				<div class="border-b pb-4 border-gray-400 border-dashed pt-5">
					<p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">10:00 AM</p>
					<a
						tabindex="0"
						class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
						>Orientation session with new hires</a
					>
				</div>
				<div class="border-b pb-4 border-gray-400 border-dashed pt-5">
					<p class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
					<a
						tabindex="0"
						class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
						>Zoom call with design team</a
					>
					<p class="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">
						Discussion on UX sprint and Wireframe review
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	li {
	}
</style>
