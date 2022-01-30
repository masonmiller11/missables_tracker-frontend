import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Collapse, Button } from '@blueprintjs/core';

import { Playthrough } from '../../../../api/models/Playthrough/Playthrough';
import PlaythroughListOptions from '../../../../interfaces/PlaythroughListOptions.interface';
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';
import classes from './PlaythroughCard.module.css';

const PlaythroughCard: React.FC<{ playthrough: Playthrough, playthroughCardOptions: PlaythroughListOptions }> = ({ playthrough, playthroughCardOptions }) => {

	let { onDelete, playthroughUrl } = playthroughCardOptions;
	const [collapsed, setCollapsed] = useState<boolean>(true);

	let history = useHistory();

	return (
		<Card className={classes.playthroughCard}>
			<div className={classes.playthroughCardContainer}>
				<div className={classes.titleAndShowInfoButtonContainer}>
					<h3 className={classes.playthroughName}>
						<a onClick={() => history.push(playthroughUrl + playthrough.id)}>{playthrough.title} </a>
						({playthrough.game.gameTitle} Playthrough)
					</h3>
					<div className={classes.buttonsContainer}>
					<DeleteButton onDelete={() => onDelete(playthrough)} />
					<Button
						icon={collapsed ? "arrow-down" : "arrow-up"}
						onClick={() => setCollapsed(!collapsed)}
						text={collapsed ? "Show Details" : "Hide Details"}
					/>
					</div>
				</div>
				<Collapse isOpen={!collapsed} keepChildrenMounted={true}>
					<hr />
					<div className={classes.imageAndInfoContainer}>
						<img className={classes.cover} src={playthrough.game.cover}></img>

						<div className={classes.playthroughDetailsContainer}>
								<p>Template Created by {playthrough.owner.owner}</p>
							<p>{playthrough.description}</p>
						</div>
					</div>
				</Collapse>
			</div>
		</Card >
	);
};

export default PlaythroughCard;
