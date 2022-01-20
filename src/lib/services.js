import supabase from '$lib/db';
export async function signOut() {
	const { error } = await supabase.auth.signOut();
	if (error) alert(error.message);
	location.reload();
}
