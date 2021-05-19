

export async function apiService<T = any>(uri: string, method: string = 'GET', data?: {}) {
	// retreive token from storage
	const TOKEN = localStorage.getItem('token');
	// prepare a headers object to build
	const headers: HeadersInit = {};
	// prepare out fetch options to build
	const fetchOptions: IFetchOptions = {
		method,
		headers
	};

	// if the token is found, attach it to headers
	// using the Authorization Bearer scheme
	if (TOKEN) {
		headers['Authorization'] = `Bearer ${TOKEN}`;
	}

	// we only need { 'Content-Type': 'application/json' }
	// and { body: JSON.stringify(data) }
	// on POST and PUT methods
	if (method === 'POST' || method === 'PUT') {
		headers['Content-Type'] = 'application/json';
		fetchOptions.body = JSON.stringify(data);
	}

	try {
		// make that fetch like usual
		const res = await fetch(uri, fetchOptions);

		// custom error handling is useful when you're learning
		if (res.status === 400) {
			throw new Error('check fetch options for any errors');
		}

		if (res.status === 401) {
			throw new Error('no token, expired token, or server could not validate token');
		}

		if (res.status === 404) {
			throw new Error('the server endpoint path was not found');
		}

		if (res.status === 500) {
			throw new Error('server blew up, check the terminal logs');
		}

		// only attempt to parse the response json
		// if the fetch gets a good status code e.g. 200/201
		if (res.ok) {
			return <T>await res.json();
		}
	} catch (error) {
		console.error('[error]', error.message);
		// some choices here:
		// throw error to chain up to the next catch block
		// use history object to push a navigate to error page
		throw error;
	}
}

interface IFetchOptions {
	method: string;
	headers?: HeadersInit;
	body?: string;
};