import { Cancel, CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';
import { Section } from './Section';
import PageInfo from '../../../interfaces/PageInfo.interface';

export type PlaythroughSubmission = {
	visibility: boolean,
	gameId: number,
	name: string,
	description: string,
	templateId: number | string
}

export type Playthrough = {
	title: string;
	description: string;
	id?: number | string;
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
	templateId: number | string;
	sections: Section[];
}

class PlaythroughModel {

	public static async listThisUsers(
		source: CancelTokenSource,
		PageInfo: PageInfo
	) {
		const config = {
			cancelToken: source.token,
		};
		
		const response = await client.get('playthroughs/' + PageInfo.page + '/' + PageInfo.itemsPerPage, config);

		return response;
	}

	public static async patch(
		playthrough: Playthrough,
		source: CancelTokenSource
	) {
		const body = {
			description: playthrough.description,
			name: playthrough.title,
			visibility: playthrough.visibility,
		};
		const config = getConfig(source);
		const endpoint = 'playthroughs/update/' + playthrough.id;
		const response = await client.patch(endpoint, body, config);
		return response;
	}

	public static async create(
		newPlaythrough: PlaythroughSubmission,
		source: CancelTokenSource,
	) {
		const config = getConfig(source);
		const response = await client.post('playthroughs/create', newPlaythrough, config);
		return response;
	}

	public static async delete(
		playthrough: Playthrough,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'playthroughs/delete/' + playthrough.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

	public static async read(
		id: string | number,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'playthroughs/read/' + id;
		const response = await client.get(endpoint, config);
		return response;
	}

}

export default PlaythroughModel;