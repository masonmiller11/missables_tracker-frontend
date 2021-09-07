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

import { apiListPopularGames } from '../../../api';
import AuthContext from '../../../store/auth-context';
import classes from './PopularGames.module.css';
import Game from '../../../api/models/Game';

const PopularGames: React.FC = (props: any) => {
    const authCtx = useContext(AuthContext);

    const [games, setGames] = useState<null | [Game]>(null);
    //todo create Games data model

    useEffect(() => {
        
        let source = axios.CancelToken.source();

        apiListPopularGames(6, 1, source)
            .then((response) => {
                setGames(response.data.games);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('api request cancelled');
                } else {
                    console.log(err.response?.data.message ?? 'unknown error');
                }
            });

        return function () {
            source.cancel('cancelling in cleanup');
        };
    }, []);

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
                            key={game.id}
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
                <Spinner className={classes.spinner} />
            )}
        </div>
    );
};

export default PopularGames;
