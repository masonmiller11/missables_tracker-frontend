import axios, { CancelTokenSource } from 'axios';

import { endpoints } from './endpoints';
import GameModel from '../api/models/Game/Game';
import TemplateStepModel from '../api/models/Template/TemplateStep';
import TemplateSectionModel from '../api/models/Template/TemplateSection'
import TemplateModel from '../api/models/Template/Template';
import PlaythroughModel from '../api/models/Playthrough/Playthrough';
import StepModel from '../api/models/Playthrough/Step';
import SectionModel from '../api/models/Playthrough/Section';
import {PlaythroughSubmissionModel} from '../api/models/Playthrough/PlaythroughModel';

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
	//try disabling searchIGDB call. It should not matter any longer.
	
	const response = client.get(endpoints.searchGames(searchTerm));

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

	const endpoint = endpoints.listMyTemplates;

	const response = await client.get(endpoint, config);

	return response;
}

export async function apiListThisUsersPlaythroughs(
	token: string,
	source: CancelTokenSource
) {

	const config = getConfig(token, source);

	const endpoint = endpoints.listMyPlaythroughs;

	const response = await client.get(endpoint, config);

	return response;

}

export async function apiPatchTemplateStep(
	templateStep: TemplateStepModel,
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
	templateStep: TemplateStepModel,
	templateSectionId: number | null | string,
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

		const response = await client.post(endpoint, body, config);

		return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

export async function apiDeleteTemplateStep(
	templateStepId: number | string | null,
	token: string,
	source: CancelTokenSource
) {

	if (templateStepId) {

		const config = getConfig(token, source);

		const endpoint = endpoints.deleteTemplateStep(templateStepId);

		const response = await client.delete(endpoint, config);

		return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

export async function apiPatchTemplateSection(
	templateSection: TemplateSectionModel,
	token: string,
	source: CancelTokenSource
) {
	const body = {
		description: templateSection.description,
		position: templateSection.position,
		name: templateSection.name,
	};

	const config = getConfig(token, source);

	if (templateSection.id) {

		const endpoint = endpoints.patchTemplateSection(templateSection.id);
		const response = await client.patch(endpoint, body, config);
		return response;

	} else {
		throw new Error('TemplateSection needs an ID to save.');
	}
}

export async function apiCreateTemplateSection(
	TemplateSection: TemplateSectionModel,
	templateId: number | string | null,
	token: string,
	source: CancelTokenSource,
) {
	const body = {
		description: TemplateSection.description,
		position: TemplateSection.position,
		name: TemplateSection.name,
		templateId: templateId
	};

	if (templateId) {

		const config = getConfig(token, source);

		const endpoint = endpoints.createTemplateSection;

		const response = await client.post(endpoint, body, config);

		return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

export async function apiDeleteTemplateSection(
	templateSectionId: number | string | null,
	token: string,
	source: CancelTokenSource
) {

	if (templateSectionId) {

		const config = getConfig(token, source);

		const endpoint = endpoints.deleteTemplateSection(templateSectionId);

		const response = await client.delete(endpoint, config);

		return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

export async function apiPatchTemplate(
	template: TemplateModel,
	token: string,
	source: CancelTokenSource
) {
	const body = {
		description: template.description,
		name: template.title,
		visibility: template.visibility
	};

	const config = getConfig(token, source);

	const endpoint = endpoints.patchTemplate(template.id);
	const response = await client.patch(endpoint, body, config);
	return response;

}

export async function apiCreateTemplate(
	template: TemplateModel,
	gameId: string | number,
	token: string,
	source: CancelTokenSource,
) {
	const body = {
		description: template.description,
		gameId: gameId,
		name: template.title,
		visibility: template.visibility
	};

	const config = getConfig(token, source);

	const endpoint = endpoints.createTemplate;

	const response = await client.post(endpoint, body, config);

	return response;

}

export async function apiDeleteTemplate(
	templateId: number | string | null,
	token: string,
	source: CancelTokenSource
) {

	if (templateId) {

		const config = getConfig(token, source);

		const endpoint = endpoints.deleteTemplate(templateId);

		const response = await client.delete(endpoint, config);

		return response;

	} else {
		throw new Error('We need an id in order to delete the template.');
	}

}

export async function apiPatchPlaythrough(
	playthrough: PlaythroughModel,
	token: string,
	source: CancelTokenSource
) {
	const body = {
		description: playthrough.description,
		name: playthrough.title,
		visibility: playthrough.visibility,
		gameId: playthrough.game.gameID,
		templateId: playthrough.templateId
	};

	const config = getConfig(token, source);

	const endpoint = endpoints.patchPlaythrough(playthrough.id);
	const response = await client.patch(endpoint, body, config);
	return response;

}

export async function apiCreatePlaythrough(
	playthrough: PlaythroughSubmissionModel,
	gameId: string | number|null,
	token: string,
	source: CancelTokenSource,
) {
	const body = {
		description: playthrough.description,
		gameId: gameId,
		name: playthrough.name,
		visibility: playthrough.visibility,
		templateId: playthrough.templateId
	};

	const config = getConfig(token, source);

	const endpoint = endpoints.createPlaythrough;
	const response = await client.post(endpoint, body, config);
	return response;

}

export async function apiDeletePlaythrough(
	playthroughId: number | string | null,
	token: string,
	source: CancelTokenSource
) {

	if (playthroughId) {

		const config = getConfig(token, source);

		const endpoint = endpoints.deletePlaythrough(playthroughId);
		const response = await client.delete(endpoint, config);
		return response;

	} else {
		throw new Error('We need an id in order to delete the playthrough.');
	}

}

export async function apiPatchStep(
	step: StepModel,
	token: string,
	source: CancelTokenSource
) {
	const body = {
		description: step.description,
		position: step.position,
		name: step.name,
		isCompleted: step.isCompleted
	};

	const config = getConfig(token, source);

	if (step.id) {

		const endpoint = endpoints.patchStep(step.id);
		const response = await client.patch(endpoint, body, config);
		return response;

	} else {
		throw new Error('TemplateStep needs an ID to save.');
	}
}

export async function apiCreateStep(
	step: StepModel,
	sectionId: number | null | string,
	token: string,
	source: CancelTokenSource,
) {
	if (sectionId) {
		
	const body = {
		description: step.description,
		position: step.position,
		name: step.name,
		sectionId: sectionId,
		isCompleted: step.isCompleted
	};

		if (typeof sectionId === 'string') {

			body.sectionId = parseInt(sectionId);

		}

		const config = getConfig(token, source);
		const endpoint = endpoints.createStep;
		const response = await client.post(endpoint, body, config);

		return response;

	} else {
		throw new Error('Step needs a section ID to save.');
	}

}

export async function apiDeleteStep(
	stepId: number | string | null,
	token: string,
	source: CancelTokenSource
) {

	if (stepId) {

		const config = getConfig(token, source);
		const endpoint = endpoints.deleteStep(stepId);
		const response = await client.delete(endpoint, config);

		return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

export async function apiPatchSection(
	section: SectionModel,
	token: string,
	source: CancelTokenSource
) {
	const body = {
		description: section.description,
		position: section.position,
		name: section.name
	};

	const config = getConfig(token, source);

	if (section.id) {

		const endpoint = endpoints.patchSection(section.id);
		const response = await client.patch(endpoint, body, config);
		return response;

	} else {
		throw new Error('Section needs an ID to save.');
	}
}

export async function apiCreateSection(
	section: SectionModel,
	playthroughId: number | string | null,
	token: string,
	source: CancelTokenSource,
) {
	const body = {
		description: section.description,
		position: section.position,
		name: section.name,
		playthroughId: playthroughId
	};

	if (playthroughId) {

		const config = getConfig(token, source);
		const endpoint = endpoints.createSection;
		const response = await client.post(endpoint, body, config);

		return response;

	} else {
		throw new Error('Section needs a playthrough ID to save.');
	}

}

export async function apiDeleteSection(
	sectionId: number | string | null,
	token: string,
	source: CancelTokenSource
) {

	if (sectionId) {

		const config = getConfig(token, source);

		const endpoint = endpoints.deleteSection(sectionId);

		const response = await client.delete(endpoint, config);

		return response;

	} else {
		throw new Error('TemplateStep needs a section ID to save.');
	}

}

export async function apiReadPlaythrough(
	playthroughId: string,
	token: string,
	source: CancelTokenSource
) {

	const config = getConfig(token, source);
	const endpoint = endpoints.readPlaythrough(playthroughId);
	const response = await client.get(endpoint, config);

	return response;
}