import { CancelTokenSource } from 'axios';

import { client } from '../..';
import PageInfo from '../../../interfaces/PageInfo.interface';

export type Game = {
	title: string;
	cover: string;
	templateCount: number;
	playthroughCount: number;
	id: number;
	summary: string;
	storyline: string;
	rating: number;
	slug: string;
	screenshots: number[];
	artworks: number[];
	internetGameDatabaseId: number;
	releaseDate: Date;
}

export class GameModel {

	public static async listPopular(
		source: CancelTokenSource,
		pageInfo: PageInfo = {
			itemsPerPage: 6,
			page: 1
		}
	) {
		const endpoint = 'games/popular/' + pageInfo.page + '/' + pageInfo.itemsPerPage;
		const response = await client.get(endpoint, { cancelToken: source.token });
		return response;
	}

	public static async search(
		searchTerm: string,
		source: CancelTokenSource,
		pageInfo: PageInfo
	) {
		const endpoint = 'games/search/' + searchTerm + '/' + pageInfo.page + '/' + pageInfo.itemsPerPage;;
		const response = await client.get(endpoint, { cancelToken: source.token });
		return response;
	}

	public static async read(
		id: string | number,
		source: CancelTokenSource
	) {
		const endpoint = 'games/read/' + id;
		const response = await client.get(endpoint, { cancelToken: source.token });
		return response;
	}

}

export default GameModel;
