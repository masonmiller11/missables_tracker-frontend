import React, { useContext } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Game } from '../../../api/models/Game/Game';
import TemplateModel, { TemplateSubmission } from '../../../api/models/Template/Template';
import CreateResponseData from '../../../api/models/ResponseData/CreateResponseData';
import useApi from '../../../hooks/useApi';
import classes from './GameSummaryCard.module.css';
import AuthContext from '../../../store/auth-context';
import { create } from 'domain';


const GameSummaryCard: React.FC<{ game: Game; }> = ({ game }) => {
	//todo Create banner, Create stats component, Publisher, Developer

	game.releaseDate = new Date(game.releaseDate);

	let history = useHistory();
	const { apiCreateRequest, saving } = useApi();
	const AuthCtx = useContext(AuthContext);

	const createTemplateHandler = () => {

		const redirectToNewTemplate = (data: { status: string, id: string | number }) => {

			history.push('/myguides/' + data.id);

		};

		const newTemplate: TemplateSubmission = {
			name: 'New Template',
			gameId: game.id,
			description: 'New Description',
			visibility: true
		}

		if (AuthCtx.isLoggedIn && AuthCtx.token) {
			let source = axios.CancelToken.source();
			apiCreateRequest<TemplateSubmission>(
				newTemplate,
				AuthCtx.token,
				source,
				TemplateModel.create,
				redirectToNewTemplate
			)
		} else {

			console.log('you have to be logged in to do that')

		}

	}

	return (
		<Card
			className={classes.gameSummaryCard}
			elevation={Elevation.ONE}
			interactive={false}
			key={game.id}
		>
			<div className={classes.cardContentContainer}>
				<div className={classes.cardImageAndButtonContainer}>
					<img src={game.cover}></img>
					<div className={classes.cardButtonContainer}>
						<Button
							text={saving ? "Creating Template" : "Create Template"}
							type="submit"
							large
							disabled={saving}
							className={classes.button}
							onClick={()=> createTemplateHandler()}
						/>
					</div>
				</div>

				<div className={classes.cardDescriptionContainer}>
					<h2>
						{game.title} ({game.releaseDate.getFullYear()})
					</h2>
					<hr />
					<div className={classes.cardStatsContainer}>
						<p>
							<strong>Total Playthroughs:</strong>{' '}
							{game.playthroughCount}
						</p>
						<p>
							<strong>Total Templates:</strong>{' '}
							{game.templateCount}
						</p>
					</div>
					<hr />
					<div className={classes.cardSummaryTextContainer}>
						<p>
							<strong>Game Summary:</strong> {game.summary}
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default GameSummaryCard;
