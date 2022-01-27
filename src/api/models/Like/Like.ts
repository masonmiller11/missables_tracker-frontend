import { CancelTokenSource } from 'axios';

import { client, getConfig } from '../..';

export type Like = {
	id: number|string,
	template : {
		id: number|string
	}
}

export type LikeSubmission = {
	templateId: number|string
}

class LikeModel {

	public static async listThisUsers(
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const response = await client.get('like/', config);

		return response;
	}

	public static async delete(
		like: Like,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const endpoint = 'like/delete/' + like.id;
		const response = await client.delete(endpoint, config);
		return response;
	}

	public static async create(
		newLike: LikeSubmission,
		token: string,
		source: CancelTokenSource
	) {
		const config = getConfig(token, source);
		const response = await client.post('like/create', newLike, config);
		return response;
	}
}

export default LikeModel;