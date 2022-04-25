import cookie from 'cookie';

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ request }) {
	return cookie.parse(request.headers.get('cookie')).session || null;
}
