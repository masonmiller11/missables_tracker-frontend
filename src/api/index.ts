import axios, { CancelTokenSource } from 'axios';

import { endpoints } from './endpoints';
import GameModel from '../api/models/Game/Game';
import StepModel from '../api/models/Template/TemplateStep';

export const client = axios.create({
    baseURL: 'http://localhost:8000/',
});

function getConfig(token: string, source: CancelTokenSource) {
    let config = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
        cancelToken: source.token,
    };

    return config;
}

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

export async function apiReadGame(gameId: string, source: CancelTokenSource) {
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

export async function apiGetGameAndTemplateList(
    gameId: string,
    source: CancelTokenSource
) {
    const templatesEndpoint = endpoints.listTemplates(gameId);
    const gameEndpoint = endpoints.readGame(gameId);

    const axiosTemplatesRequest = client.get(templatesEndpoint, {
        cancelToken: source.token,
    });
    const axiosGameRequest = client.get(gameEndpoint, {
        cancelToken: source.token,
    });

    const response = await axios.all([axiosTemplatesRequest, axiosGameRequest]);

    return response as any;
}

export async function apiListThisUsersTemplates(
    token: string,
    source: CancelTokenSource
) {
    const config = getConfig(token, source);

    const endpoint = endpoints.listMyTemplate;

    const response = await client.get(endpoint, config);

    return response;
}

export async function apiPatchTemplateStep(
    templateStep: StepModel,
    token: string,
    source: CancelTokenSource
) {
    const body = {
        description: templateStep.description,
        position: templateStep.position,
        name: templateStep.name,
    };

    const config = getConfig(token, source);

    if (templateStep.id) {

        const endpoint = endpoints.patchTemplateStep(templateStep.id);
        const response = await client.patch(endpoint, body, config);
        return response;

    } else {
        throw new Error('TemplateStep needs an ID to save.');
    }
}

export async function apiCreateTemplateStep(
	templateStep: StepModel,
	templateSectionId: number|null,
    token: string,
    source: CancelTokenSource,
) {
	const body = {
        description: templateStep.description,
        position: templateStep.position,
        name: templateStep.name,
		sectionTemplateId: templateSectionId
    };

	if (templateSectionId) {

	const config = getConfig(token, source);

	const endpoint = endpoints.createTemplateStep;

	const response = await client.post(endpoint,body,config);

	return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

// static update(setError, employee) {
// 	let editedEmployee = {
// 		"name" : employee.name,
// 		"email" : employee.email
// 	}
// 	Client.patch(setError, endpoints.employee + employee.id, editedEmployee);
// }
