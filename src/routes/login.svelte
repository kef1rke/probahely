<script context="module">
	export async function load({ url, params, session, context }) {
		if (session) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
	async function signIn(e) {
		const data = new FormData(e.target);
		const json = JSON.stringify(Object.fromEntries(data));
		const response = await fetch('/signin', {
			method: 'post',
			body: json
		});

		if (response.ok) window.location = '/';
		else alert(await response.text());
	}
</script>

<div class="h-screen w-full  flex items-center justify-center px-4 sm:px-6 lg:px-8">
	<div class="max-w-md bg-white card p-5 rounded-xl shadow w-full space-y-8">
		<div>
			<img
				class="mx-auto h-12 w-auto"
				src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
				alt="Workflow"
			/>
			<h2 class="mt-6 mb-15 text-center text-3xl font-extrabold text-gray-900">Bejelentkezés</h2>
		</div>
		<form on:submit|preventDefault={signIn} class="mt-8 space-y-6" action="#" method="POST">
			<div class="rounded-md shadow-sm -space-y-px">
				<label for="email" class="sr-only">Email address</label>
				<input
					id="email"
					name="email"
					type="email"
					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-700 focus:border-gray-500 focus:z-10 sm:text-sm"
					placeholder="Email address"
				/>

				<label for="password" class="sr-only">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
					placeholder="Password"
				/>
			</div>

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-gray-1000 "
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Bejelentkezés
				</button>
			</div>
		</form>
	</div>
</div>
