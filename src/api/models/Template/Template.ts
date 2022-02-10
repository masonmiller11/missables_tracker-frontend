import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';
import { TemplateSection } from './TemplateSection';
import PageInfo from '../../../interfaces/PageInfo.interface';

export type Template = {

	title: string;
	description: string;
	id: number | string;
	visibility: boolean;
	owner: {
		ownerID: number,
		owner: string
	};
	game: {
		gameID: number | string,
		gameTitle: string,
		cover: string;
	};
	stepPositions: number[];
	sectionPositions: number[];
	likes: number;
	playthroughs: number;
	sections: TemplateSection[];

}

export type TemplateSubmission = {
	description: string,
	gameId: number | string,
	name: string,
	visibility: boolean
}

export class TemplateModel {

	public static async list(
		gameId: string,
		source: CancelTokenSource,
		PageInfo: PageInfo
	) {
		const endpoint = 'templates/bygame/' + gameId + '/' +  + PageInfo.page + '/' + PageInfo.itemsPerPage;
		const response = await client.get(endpoint, { cancelToken: source.token });
		return response;
	}

	public static async listThisUsers(
		source: CancelTokenSource, 
		PageInfo: PageInfo
	) {
		const config = getConfig(source);
		const response = await client.get('templates/' + PageInfo.page + '/' + PageInfo.itemsPerPage, config);
		return response;
	}

	public static async read(
		id: string,
		source: CancelTokenSource
	) {
		const endpoint = 'templates/read/' + id;
		const response = await client.get(endpoint, { cancelToken: source.token });
		return response;
	}

	public static async update(
		template: Template,
		source: CancelTokenSource
	) {
		const body = {
			description: template.description,
			name: template.title,
			visibility: template.visibility
		};
		const config = getConfig(source);
		const endpoint = 'templates/update/' + template.id;
		const response = await client.patch(endpoint, body, config);
		return response;
	}

	public static async create(
		newTemplate: TemplateSubmission,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const response = await client.post('templates/create', newTemplate, config);
		return response;
	}

	public static async delete(
		template: Template,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'templates/delete/' + template.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

}

export default TemplateModel;