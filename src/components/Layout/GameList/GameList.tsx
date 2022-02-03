import React from 'react';
import { Spinner } from '@blueprintjs/core';

import classes from './GameList.module.css';
import { Game } from '../../../api/models/Game/Game';
import GamesCard from './GamesCard/GamesCard';

const GamesList: React.FC<{
	games: Game[] | null;
	hideGamesWithoutGuides: boolean;
}> = ({ games, hideGamesWithoutGuides }) => {
	function isGameArray(arg: any): arg is Game[] {
		return arg[0].id !== undefined;
	}

	if (games === null) {
		return null
	}

	if (hideGamesWithoutGuides) {
		return (
			<div className={classes.gamesContainer}>
				{games!
					.filter((game) => game.templateCount > 0)
					.map((game) => (
						<GamesCard key={game.id} game={game} />
					))}
			</div>
		);
	}

	return (
		<div className={classes.gamesContainer}>
			{games!.map((game) => (
				<GamesCard game={game} />
			))}
		</div>
	);
};

export default GamesList;
