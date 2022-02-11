import React, { useContext } from 'react';
import { Button, Card, Elevation, Intent } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Game } from '../../api/models/Game/Game';
import TemplateModel, { TemplateSubmission } from '../../api/models/Template/Template';
import useApi from '../../hooks/useApi';
import AuthContext from '../../store/auth-context';
import { AppToaster } from '../Layout/Toaster';
import classes from './GameSummaryCard.module.css';

const GameSummaryCard: React.FC<{ game: Game; }> = ({ game }) => {
	//todo Create banner, Create stats component, Publisher, Developer

	game.releaseDate = new Date(game.releaseDate);

	const errorHandler = (message: string, intent: Intent) => {
		AppToaster.show({ message: message, intent: intent });
	};

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

		if (AuthCtx.isLoggedIn) {
			let source = axios.CancelToken.source();
			apiCreateRequest<TemplateSubmission>(
				newTemplate,
				source,
				TemplateModel.create,
				redirectToNewTemplate
			)
		} else {
			errorHandler('You have to be logged in to do that.', Intent.DANGER);
		}
	}

	return (
		<Card
			className={classes.gameSummaryCard}
			elevation={Elevation.ONE}
			interactive={true}
			key={game.id}
		>
			<div className={classes.cardContentContainer}>
				<div>
					<img src={game.cover}></img>
					<Button
						text={saving ? "Creating Guide" : "Create Guide"}
						type="submit"
						large
						disabled={saving}
						className={classes.button}
						onClick={() => createTemplateHandler()}
					/>
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
