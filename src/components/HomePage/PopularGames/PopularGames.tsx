import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import {
    Spinner
} from '@blueprintjs/core';

import { apiListPopularGames } from '../../../api';
import AuthContext from '../../../store/auth-context';
import classes from './PopularGames.module.css';
import Game from '../../../api/models/Game/Game';
import GamesList from '../../Layout/GameList/GameList';

const PopularGames: React.FC = (props: any) => {

    const [games, setGames] = useState<null | [Game]>(null);
    //todo create Games data model

    useEffect(() => {
        let source = axios.CancelToken.source();

        apiListPopularGames(6, 1, source)
            .then((response) => {
                setGames(response.data.items);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('api request cancelled');
                } else {
                    console.log(err.response?.data.message ?? 'unknown error');
                }
            });

        //todo add real error handling

        return function () {
            source.cancel('cancelling in cleanup');
        };
    }, []);

    return (
        <div className={classes.popularGamesContainer}>
            <h2>Popular Games</h2>
            {games ? (
                <GamesList games={games} hideGamesWithoutGuides={true} />
            ) : (
                <Spinner className={classes.spinner} />
            )}
        </div>
    );
};

export default PopularGames;
