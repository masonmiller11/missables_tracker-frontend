import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../../../api'
import { TemplateStep } from './TemplateStep';

export type TemplateSection = {
	id?: number | string;
	name: string;
	description: string;
	position: number | string;
	steps: TemplateStep[];
}

export type TemplateSectionSubmission = {
	description: string,
	position: string | number,
	name: string,
	templateId: number
}

export class TemplateStepModel {

	public static async patch(
		templateSection: TemplateSection,
		token: string,
		source: CancelTokenSource
	) {
		const body = {
			description: templateSection.description,
			position: templateSection.position,
			name: templateSection.name,
		};
		const config = getConfig(source);
		const endpoint = 'section/template/update/' + templateSection.id;
		const response = await client.patch(endpoint, body, config);
		return response;
	}

	public static async create(
		newTemplateSection: TemplateSectionSubmission,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const response = await client.post('section/template/create', newTemplateSection, config);
		return response;
	}

	public static async delete(
		templateSection: TemplateSection,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'section/template/delete/' + templateSection.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

}

export default TemplateStepModel;