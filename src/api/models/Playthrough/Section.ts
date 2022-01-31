import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';
import { Step } from './Step';

export type Section = {
	id?: number | string;
	name: string;
	description: string;
	position: number | string;
	steps: Step[];
}

export type SectionSubmission = {
	description: string,
	position: number | string,
	name: string,
	playthroughId: number
}

export class SectionModel {

	public static async patch(
		section: Section,
		token: string,
		source: CancelTokenSource
	) {
		const body = {
			description: section.description,
			position: section.position,
			name: section.name
		};
		const config = getConfig(source);
		const endpoint = 'section/update/' + section.id;
		const response = await client.patch(endpoint, body, config);
		return response;
	}

	public static async create(
		newSection: SectionSubmission,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'section/create';
		const response = await client.post(endpoint, newSection, config);

		return response;
	}

	public static async delete(
		section: Section,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'section/delete/' + section.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

}

export default SectionModel;