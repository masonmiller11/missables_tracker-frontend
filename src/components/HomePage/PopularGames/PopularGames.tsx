import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';

import GameModel, { Game } from '../../../api/models/Game/Game';
import ResponseDataModel from '../../../api/models/ResponseData/ReadResponseData';

import useApi from '../../../hooks/useApi';
import GamesList from '../../Layout/GameList/GameList';

import classes from './PopularGames.module.css';


const PopularGames: React.FC = (props: any) => {

	const [games, setGames] = useState<null | Game[]>(null);
	const { apiGetRequest, loading } = useApi();

	const applyGamesResponseData = (responseData: ResponseDataModel<Game>) => {
		setGames(responseData.items);
	}

	useEffect(() => {
		let source = axios.CancelToken.source();

		apiGetRequest([source], GameModel.listPopular, applyGamesResponseData);

	}, []);

	return (
		<div className={classes.popularGamesContainer}>
			<h2>Popular Games</h2>
			{loading ? (
				<Spinner className={classes.spinner} />
			) : (
				<GamesList games={games} hideGamesWithoutGuides={true} />
			)}
		</div>
	);
};

export default PopularGames;
