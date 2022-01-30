import axios, { CancelTokenSource } from 'axios';

export const client = axios.create({
	baseURL: 'http://localhost:8000/',
});

client.interceptors.request.use( config => {

	const token = localStorage.getItem('token')
	config.headers['Authorization'] = 'Bearer ' + token;
	return config; 
})


export function getConfig(token: string, source: CancelTokenSource) {
	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
		},
		cancelToken: source.token,
	};

	return config;
}


export async function apiLogin(email: string, password: string) {
	const response = await client.post('login', {
		username: email,
		password: password,
	});

	return response;
}

export async function apiSignUp(
	email: string,
	password: string,
	username: string
) {
	const response = await client.post('signup', {
		username: username,
		password: password,
		email: email,
	});

	return response;
}

export async function apiRefresh() {
	const response = await client.get('login/refresh');
	return response;
}

