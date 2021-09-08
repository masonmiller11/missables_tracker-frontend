import React from 'react';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    Classes,
    Elevation,
    H5,
    Label,
    Slider,
    Spinner,
    SpinnerSize,
    Switch,
} from '@blueprintjs/core';

import classes from './GameList.module.css';
import Game from '../../../api/models/Game/Game';

const GamesList: React.FC<{games: Game[]}> = ({games}) => {
    return (
        <div className={classes.gamesContainer}>
            {games!.map((game) => (
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

                        <Button
                            text="See Checklists"
                            className={Classes.BUTTON}
                        />
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default GamesList;
