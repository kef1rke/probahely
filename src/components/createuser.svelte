<script>
	import supabase from '$lib/db';
	import { createClient } from '@supabase/supabase-js';

	let email, password, name;
	async function signUp() {
		const supbaseAdmin = createClient(
			process.env.SUPABASE_URL,
			process.env.SUPABASE_SERVICE_ROLE_KEY
		);

		const { data: user, error } = await supabase.auth.api.createUser({
			email: email,
			password: password,
			data: { zenesz_nev: name }
		});
		if (error) {
			alert(error.message);
		} else {
			alert('User successfully created');
		}
	}
</script>

<div class="h-full flex  px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full items-center justify-center">
		<div class="rounded-md shadow-sm -space-y-px">
			<div>
				<label for="email-address" class="sr-only">Email address</label>
				<input
					type="email"
					id="email"
					name="Email"
					bind:value={email}
					required
					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-700 focus:border-gray-500 focus:z-10 sm:text-sm"
					placeholder="Email address"
				/>
			</div>
			<div>
				<label for="password" class="sr-only">Password</label>
				<input
					type="password"
					id="password"
					label="Password"
					bind:value={password}
					required
					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
					placeholder="Password"
				/>
			</div>
			<div>
				<label for="name" class="sr-only">Name</label>
				<input
					type="name"
					id="name"
					label="Name"
					bind:value={name}
					required
					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
					placeholder="Name"
				/>
			</div>
		</div>

		<div>
			<button
				on:click={signUp}
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
				Create user!
			</button>
		</div>
	</div>
</div>
