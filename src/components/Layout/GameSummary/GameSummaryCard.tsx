import React, { useEffect, useContext, useState } from 'react';
import { Button, Card, Divider, Classes, ButtonGroup, Elevation, H5, Spinner } from '@blueprintjs/core';
import axios from 'axios';

import Game from '../../../api/models/Game/Game';
import classes from './GameSummaryCard.module.css';
import {apiReadGame} from '../../../api';


const GameSummaryCard: React.FC<{ gameId: string }> = ({
    gameId: gameIdProp,
}) => {
    
    const [game, setGame] = useState<null | Game>(null);

    useEffect(() => {

        let source = axios.CancelToken.source();

        apiReadGame(gameIdProp, source)
            .then((response) => {
                setGame(response.data.game);
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

            //todo add real error handling

        // let fakeGame = {
        //     title: 'Shadow of the Colossus',
        //     cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co272w.jpg',
        //     templateCount: 0,
        //     playthroughCount: 0,
        //     id: 557,
        //     summary:
        //         'Tales speak of an ancient land where creatures the size of mountains, roam the majestic landscape. Bound to the land, these creatures hold a key to a mystical power of revival - a power you must obtain to waken a loved one.   Shadow of the Colossus is a majestic journey through ancient lands to seek out and destroy gigantic mythical beasts. With your trusty horse at your side, explore the spacious lands and unearth each Colossi. Armed with your wits, a sword and a bow, use cunning and strategy to topple each behemoth.   A remake of the critically-claimed game of the same title. Also from the minds that brought you The Last Guardian & ICO',
        //     storyline:
        //         'The story of Shadow of the Colossus begins as Wander enters the forbidden land, traveling across a long bridge on his horse, Agro. Unknown to the player, prior to entering, Wander had stolen an ancient sword, which is the only weapon capable of slaying the colossi. Led to the massive Shrine of Worship at the center of the region, Wander carries with him the body of a maiden named Mono. A moment later, several humanoid shadow creatures appear and approach Wander before he easily dismisses them with a wave of the ancient sword in his possession. After vanquishing the shadow creatures, the voice of the disembodied entity known as "Dormin" echoes from above, expressing surprise that Wander possesses the weapon. Wander requests that Dormin return Mono\'s soul to her body, which Dormin states may be possible on the condition that Wander can destroy the sixteen idols lining the temple\'s hall by using the ancient sword to kill each colossus the idols represent located throughout the land. Despite being warned by Dormin that he may have to pay a great price to revive Mono, Wander sets out to search the land for the colossi and destroy them.',
        //     rating: 85,
        //     slug: 'shadow-of-the-colossus--1',
        //     screenshots: [1, 2],
        //     artworks: [1, 2],
        //     internetGameDatabaseId: 37094,
        //     releaseDate: new Date('December 17, 2018'),
        // };

        // setGame(fakeGame);
    }, []);

    //Create banner
    //Create stats component
    //Publisher
    //Developer
    //This should all live on a card like GameCard

    if (game) {
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
                                    text='Create Template'
                                    type="submit"
                                    large
                                    className={classes.button}
                                />
                            </div>
                        </div>                       
                    
                    <div className = {classes.cardDescriptionContainer}>
                        <h2>{game.title} (id: {gameIdProp}) ({game.releaseDate.getFullYear()})</h2>
                        <hr/>
                        <div className = {classes.cardStatsContainer}>
                                <p><strong>Total Playthroughs:</strong> {game.playthroughCount}</p>
                                <p><strong>Total Templates:</strong> {game.templateCount}</p> 
                        </div>
                        <hr/>
                        <div className = {classes.cardSummaryTextContainer}>
                            <p><strong>Game Summary:</strong> {game.summary}</p>
                        </div>
                    </div>

                </div>
            </Card>
        );
    }
    {
        return <Spinner className={classes.spinner} />;
    }
};

export default GameSummaryCard;
