import supabase from '$lib/db';

// Sign out
export async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) alert(error.message);
	location.reload();
}

// Add zenekar as admin
export async function createZenekarAsAdmin() {
	const { data, error } = await supabase.from('Zenekarok').insert([{ zenekar_nev: 'asd' }]);
	if (error) {
		alert(error.message, data);
	}
}

// What is my band's name
export async function whatIsMyBandsName() {
	const { data, error } = await supabase.from('users').select('id, zenekar_id(zenekar_nev)');
	return data, error.message;
}
