import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';

export type TemplateStep = {
	id?: number | string;
	name: string;
	position: number | string;
	description: string;
}

export type TemplateStepSubmission = {
	description: string,
	position: string | number
	name: string
	sectionTemplateId: number
}

export class TemplateStepModel {

	public static async patch(
		templateStep: TemplateStep,
		token: string,
		source: CancelTokenSource
	) {
		const body = {
			description: templateStep.description,
			position: templateStep.position,
			name: templateStep.name,
		};
		const config = getConfig(token, source);
		const endpoint = 'step/template/update/' + templateStep.id;
		const response = await client.patch(endpoint, body, config);
		return response;
	}

	public static async create(
		newTemplateStep: TemplateStepSubmission,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const response = await client.post('step/template/create', newTemplateStep, config);
		return response;
	}

	public static async delete(
		templateStep: TemplateStep,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const endpoint = 'step/template/delete/' + templateStep.id;
		const response = await client.delete(endpoint, config);
		return response;
	}
}


export default TemplateStepModel;