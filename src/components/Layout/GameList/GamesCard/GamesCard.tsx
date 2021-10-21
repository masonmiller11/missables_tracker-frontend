import React from 'react';
import {
    Button,
    Card,
    Classes,
    Elevation,
    H5
} from '@blueprintjs/core';

import Game from '../../../../api/models/Game/Game';
import classes from './GamesCard.module.css';

const GamesCard: React.FC<{ game: Game }> = ({ game }) => {
    return (
        <Card
            className={classes.gamesCard}
            elevation={Elevation.ONE}
            interactive={true}
            key={game.id}
        >
            <img src={game.cover}></img>
            <div className={classes.gamesCardTextContainer}>
                <H5>
                    <a href="#">{game.title}</a>
                </H5>

                <p>Total Playthroughs: {game.playthroughCount}</p>
                <p>Total Templates: {game.templateCount}</p>

                <Button text="See Checklists" className={Classes.BUTTON} />
            </div>
        </Card>
    );
};

export default GamesCard;
