import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';
import PageInfo from '../../../interfaces/PageInfo.interface';

export type Like = {
	id: number|string,
	template : {
		name?: string,
		description?: string,
		id: number|string,
		game?: {
			title: string,
			id: string|number
		}
	}
}

export type LikeSubmission = {
	templateId: number|string
}

class LikeModel {

	public static async listThisUsers(
		source: CancelTokenSource,
		PageInfo: PageInfo
	) {
		const config = getConfig(source);
		const response = await client.get('like/' + PageInfo.page + '/' + PageInfo.itemsPerPage, config);

		return response;
	}

	public static async delete(
		like: Like,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const endpoint = 'like/delete/' + like.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

	public static async create(
		newLike: LikeSubmission,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(source);
		const response = await client.post('like/create', newLike, config);
		return response;
	}
}

export default LikeModel;