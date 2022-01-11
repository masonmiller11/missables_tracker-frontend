import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation, Spinner } from '@blueprintjs/core';
import axios from 'axios';

import GameModel from '../../../api/models/Game/Game';
import classes from './GameSummaryCard.module.css';
import { apiReadGame } from '../../../api';

const GameSummaryCard: React.FC<{
    game: GameModel;
}> = ({ game }) => {
    //todo Create banner, Create stats component, Publisher, Developer

    game.releaseDate = new Date(game.releaseDate);

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
                            text="Create Template"
                            type="submit"
                            large
                            className={classes.button}
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
