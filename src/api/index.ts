import axios, { CancelToken, CancelTokenSource } from 'axios';

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

    const response = await client.get(endpoint,{cancelToken: source.token});

    return response;
}

export async function apiSearch(searchTerm: string) {
    const searchIGDBRequest = client.get(endpoints.searchIGDB(searchTerm));
    const searchGamesRequest = client.get(endpoints.searchGames(searchTerm));

    const response = await axios.all([searchIGDBRequest, searchGamesRequest]);

    return response;
}

export async function apiSearchIGDB(searchTerm: string) {
    const endpoint = endpoints.searchIGDB(searchTerm);

    const response = await client.get(endpoint);

    return response;
}

export async function apiSearchGames(searchTerm: string) {
    const endpoint = endpoints.searchGames(searchTerm);

    const response = await client.get(endpoint);

    return response;
}
