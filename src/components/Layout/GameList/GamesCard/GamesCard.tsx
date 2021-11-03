import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Classes, Elevation, H5 } from '@blueprintjs/core';

import Game from '../../../../api/models/Game/Game';
import classes from './GamesCard.module.css';

const GamesCard: React.FC<{ game: Game }> = ({ game }) => {
    
    let history = useHistory();

    const createButton = (
        onClick: (gameId: number) => void,
        gameId: number,
        buttonText: string
    ): React.HTMLProps<HTMLButtonElement> => {
        const onClickHandler = () => onClick(gameId);

        return (
            <Button
                text={buttonText}
                onClick={onClickHandler}
                className={Classes.BUTTON}
            />
        );
    };

    const onSeeChecklists = (gameId: number) => {
        history.replace('/guides/game/' + gameId);
    };

    const onCreateTemplate = (gameId: number) => {
        history.replace('/guides/create/' + gameId);
    };

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

                {game.templateCount > 0
                    ? createButton(onSeeChecklists, game.id, 'See Templates')
                    : createButton(onCreateTemplate, game.id, 'Create Guide')}
            </div>
        </Card>
    );
};

export default GamesCard;
