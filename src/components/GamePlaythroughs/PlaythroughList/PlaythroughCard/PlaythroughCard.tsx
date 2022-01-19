import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Card,
	Classes,
	Intent
} from '@blueprintjs/core';

import classes from './PlaythroughCard.module.css';
import PlaythroughModel from '../../../../api/models/Playthrough/Playthrough';
import PlaythroughListOptions from '../../../../interfaces/playthroughListOptions.interface';
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';

const PlaythroughCard: React.FC<{ playthrough: PlaythroughModel, playthroughCardOptions: PlaythroughListOptions }> = ({ playthrough, playthroughCardOptions }) => {

	let { onDelete, playthroughUrl } = playthroughCardOptions;

	let history = useHistory();

	return (
		<Card className={classes.playthroughCard}>
			<div className={classes.playthroughCardContainer}>

				<img className={classes.cover} src={playthrough.game.cover}></img>

				<div className={classes.playthroughCardTitleAndAuthorContainer}>

						<div className={classes.playthroughCardTitleAndDeleteContainer}>
							<h2>
								<a onClick={() => history.push(playthroughUrl + playthrough.id)}>{playthrough.title}</a>
							</h2>

							<DeleteButton onDelete={()=>onDelete(playthrough)} danger={false}
							/>
						</div>
					<p>Template Created by {playthrough.owner.owner}</p>
					<p>{playthrough.description}</p>
				</div>
			</div>
		</Card>
	);
};

export default PlaythroughCard;
