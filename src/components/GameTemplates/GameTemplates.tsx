import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';

import GameModel, { Game } from '../../api/models/Game/Game';
import TemplateModel, { Template } from '../../api/models/Template/Template';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';

import TemplateList from '../TemplateList/TemplateList';
import GameSummaryCard from '../Layout/GameSummary/GameSummaryCard';

import useApi from '../../hooks/useApi';

import classes from './GameTemplates.module.css';

const GameTemplates: React.FC<{ gameId: string }> = ({
	gameId: gameIdProp,
}) => {

	const gameTemplatesListOptions = {
		showCover: false,
		showFavoriteStar: true,
		templateGuideUrl: '/guides/',
		allowDelete: false,
	};

	const [templateList, setTemplateList] = useState<null | Template[]>(null);
	const [game, setGame] = useState<Game>();
	const [loading, setLoading] = useState<boolean>(false);
	const { apiGetRequest } = useApi();

	const applyTemplateResponseData = (responseData: ResponseDataModel<Template>) => {
		setTemplateList(responseData.items);
	} 

	useEffect(() => {

		setLoading(true);

		let source = axios.CancelToken.source();

		(async function () {

			apiGetRequest([gameIdProp, source], TemplateModel.list, applyTemplateResponseData)

			apiGetRequest([gameIdProp, source], GameModel.read, setGame);

		})().then(() => setLoading(false));


		//todo add real error handling
	}, [gameIdProp]);

	if (templateList && game) {
		//get Game and templates in here. If we don't have both, show loading. Remove loading from below children.
		return (
			<div className={classes.gameTemplatesBackground}>
				<div className={classes.gameTemplatesContainer}>
					<GameSummaryCard game={game} />
					<TemplateList
						templates={templateList}
						templateListOptions={gameTemplatesListOptions}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.gameTemplatesBackground}>
			<div className={classes.gameTemplatesContainer}>
				<Spinner className={classes.spinner} />
			</div>
		</div>
	);
};

export default GameTemplates;
