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
import Game from '../../../api/models/Game/Game';
import GamesList from '../../Layout/GameList/GameList';

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
                <GamesList games={games} />
            ) : (
                <Spinner className={classes.spinner} />
            )}
        </div>
    );
};

export default PopularGames;
