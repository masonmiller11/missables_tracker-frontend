import { useEffect, useContext, useState } from 'react';
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

import { apiListPopularGames } from '../../../api';
import AuthContext from '../../../store/auth-context';
import classes from './PopularGames.module.css';
import Game from '../../../api/models/Game';

const PopularGames: React.FC = (props: any) => {
    const authCtx = useContext(AuthContext);

    const [games, setGames] = useState<null | [Game]>(null);
    //todo create Games data model

    useEffect(() => {
        apiListPopularGames(6, 1)
            .then((response) => {
                setGames(response.data.games);
            })
            .catch((err) => {
                console.log(
                    err.response?.data.message ?? 'unknown login error'
                );
            });
    });

    return (
        <div className={classes.popularGamesContainer}>
            <h2>Popular Games</h2>
            {games ? (
                <div className={classes.gamesContainer}>
                    {games!.map((game) => (
                        <Card
                            className={classes.gamesCard}
                            elevation={Elevation.ONE}
                            interactive={true}
                        >
                            <img src={game.cover}></img>
                            <div className={classes.gamesCardTextContainer}>
                                <H5>
                                    <a href="#">{game.title}</a>
                                </H5>

                                <p>
                                    Total Playthroughs: {game.playthroughCount}
                                </p>
                                <p>Total Templates: {game.templateCount}</p>

                                <Button
                                    text="See Checklists"
                                    className={Classes.BUTTON}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default PopularGames;
