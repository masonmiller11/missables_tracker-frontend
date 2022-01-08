import axios, { Cancel, CancelTokenSource } from 'axios';

import { endpoints } from './endpoints';

export const client = axios.create({
	baseURL: 'http://localhost:8000/',
});

export async function apiLogin(email: string, password: string) {
	const response = await client.post(endpoints.authentication, {
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
	const response = await client.post(endpoints.signup, {
		username: username,
		password: password,
		email: email,
	});

	return response;
}

export async function apiListPopularGames(
	itemsPerPage: number | null = null,
	page: number | null = null,
	source: CancelTokenSource,
	token: string | null = null
) {
	const endpoint = endpoints.listPopularGames(itemsPerPage, page);

	const response = await client.get(endpoint, { cancelToken: source.token });

	return response;
}

export async function apiSearch(searchTerm: string) {
	const searchIGDBRequest = client.get(endpoints.searchIGDB(searchTerm));
	const searchGamesRequest = client.get(endpoints.searchGames(searchTerm));

	const response = await axios.all([searchIGDBRequest, searchGamesRequest]);

	return response;
}

export async function apiSearchGames(searchTerm: string) {
	const endpoint = endpoints.searchGames(searchTerm);

	const response = await client.get(endpoint);

	return response;
}

export async function apiReadGame(
	gameId: string,
	source: CancelTokenSource
) {
	const endpoint = endpoints.readGame(gameId);

	const response = await client.get(endpoint, { cancelToken: source.token });

	return response;
}

export async function apiListTemplates(
	gameId: string,
	source: CancelTokenSource
) {
	const endpoint = endpoints.listTemplates(gameId);

	const response = await client.get(endpoint, { cancelToken: source.token });

	return response;
}

//todo consolidate these functions
export async function apiReadTemplate(
	templateId: string,
	source: CancelTokenSource
) {

	const endpoint = endpoints.readTemplate(templateId);

	const response = await client.get(endpoint, { cancelToken: source.token });

	return response;

}


    //     let config = {
	// headers : {
	// 	'Authorization': 'Bearer ' + localStorage.token,
	// 	'Content-Type': 'application/json'
	// 	}
	// }

	// axios.post(endpoint, postContent, config).then(response => {
	// 	setResponse ? setResponse(response.data) : console.log(response.data);
	// })
	// .catch(error => {
	// 	if (error) {
	// 		setError(error.response.statusText);
	// 	} else {
	// 		setError('unknown error.response');
	// 	}
	// });