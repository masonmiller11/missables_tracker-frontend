import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Classes, Elevation, H5, Intent } from '@blueprintjs/core';
import axios from 'axios';

import { Game } from '../../../api/models/Game/Game';
import TemplateModel, { TemplateSubmission } from '../../../api/models/Template/Template';
import { AppToaster } from '../../Layout/Toaster';
import AuthContext from '../../../store/auth-context';
import useApi from '../../../hooks/useApi';
import classes from './GamesCard.module.css';

const GamesCard: React.FC<{ game: Game }> = ({ game }) => {
	let history = useHistory();

	const errorHandler = (message: string, intent: Intent) => {
		AppToaster.show({ message: message, intent: intent });
	};

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
			console.log('errorHandler running')
			errorHandler('You have to be logged in to create guides.', Intent.DANGER);
		}
	}

	const GamesCardButton = () => {

		if (game.templateCount > 0) {
			return (
				<Button
					text='See Templates'
					onClick={() => history.push('/guides/game/' + game.id)}
					className={Classes.BUTTON}
				/>
			);
		}

		return (
			<Button
				text={saving ? "Creating Guide" : "Create Guide"}
				disabled={saving}
				onClick={() => createTemplateHandler()}
				className={Classes.BUTTON}
			/>
		);
	};


	return (
		<Card
			className={classes.gamesCard}
			elevation={Elevation.ONE}
			interactive={game.templateCount > 0}
			key={game.id}
		>
			<img src={game.cover} alt={"This is an image of " + game.title + "'s cover"}></img>
			<div className={classes.gamesCardTextContainer}>
				<H5>{game.templateCount > 0 ?
					<a onClick={() => history.push('/guides/game/' + game.id)}>{game.title}</a>
					: game.title
				}
				</H5>

				<p>Total Playthroughs: {game.playthroughCount}</p>
				<p>Total Templates: {game.templateCount}</p>

				<GamesCardButton />
			</div>
		</Card>
	);
};

export default GamesCard;
