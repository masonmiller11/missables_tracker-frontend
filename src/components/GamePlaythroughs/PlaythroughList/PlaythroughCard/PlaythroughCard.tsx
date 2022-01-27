import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '@blueprintjs/core';

import { Playthrough } from '../../../../api/models/Playthrough/Playthrough';
import PlaythroughListOptions from '../../../../interfaces/PlaythroughListOptions.interface';
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';
import classes from './PlaythroughCard.module.css';

const PlaythroughCard: React.FC<{ playthrough: Playthrough, playthroughCardOptions: PlaythroughListOptions }> = ({ playthrough, playthroughCardOptions }) => {

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

						<DeleteButton onDelete={() => onDelete(playthrough)} danger={false}
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
