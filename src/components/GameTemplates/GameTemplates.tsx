import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


import TemplateList from './TemplateList/TemplateList';
import GameSummaryCard from '../Layout/GameSummary/GameSummaryCard';
import classes from './GameTemplates.module.css';
import TemplateModel from '../../api/models/Template/Template'
import { apiListTemplates } from '../../api';
import TemplateListOptions from '../../interfaces/templateListOptions.interface';



const GameTemplates: React.FC<{ gameId: string }> = ({
	gameId: gameIdProp,
}) => {
	//TODO grab Game here and pass into component as props like what we're doing with templates.

	const gameTemplatesListOptions = {
		showCover: false,
		showFavoriteStar: true,
		templateGuideUrl: '/guides/'
	}

	const [templateList, setTemplateList] = useState<null | TemplateModel[]>(null);

	useEffect(() => {

		let source = axios.CancelToken.source();

		apiListTemplates(gameIdProp, source)
			.then((response) => {
				setTemplateList(response.data.templates);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					console.log(err.response?.data.message ?? 'unknown error');
				}
			});

		//todo add real error handling

	}, []);


	//get Game and templates in here. If we don't have both, show loading. Remove loading from below children.
	return (
		<div className={classes.gameTemplatesBackground}>
			<div className={classes.gameTemplatesContainer}>
				<GameSummaryCard gameId={gameIdProp} />
				<TemplateList templates={templateList} templateListOptions={gameTemplatesListOptions} />
			</div>
		</div>
	);
};

export default GameTemplates;
