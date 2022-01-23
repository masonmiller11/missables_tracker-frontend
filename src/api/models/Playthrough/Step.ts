import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';

export type Step = {
	id?: number | string;
	name: string;
	position: number | string;
	description: string;
	isCompleted: boolean;
}


export type StepSubmission = {
	description: string,
	position: string | number,
	name: string,
	sectionId: number,
	isCompleted: boolean
}

export class StepModel {

	public static async patch(
		step: Step,
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
		const endpoint = 'step/update/' + step.id;
		const response = await client.patch(endpoint, body, config);
		return response;
	}

	public static async create(
		newStep: StepSubmission,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const response = await client.post('step/create', newStep, config);
		return response;
	}

	public static async delete(
		step: Step,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const endpoint = 'step/delete/' + step.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

}

export default StepModel;