import React, { useEffect, useContext, useState } from 'react';
import { Button, Card, Classes, Elevation, H5 } from '@blueprintjs/core';

import Game from '../../../api/models/Game/Game';
import classes from './GameSummaryCard.module.css';


const GameSummaryCard: React.FC<{ gameId: string }> = ({
    gameId: gameIdProp,
}) => {
    const [game, setGame] = useState<null | Game>(null);

    //set fake game
    //TODO replace this with API call.
    useEffect(() => {
        let fakeGame = {
            title: 'Shadow of the Colossus',
            cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co272w.jpg',
            templateCount: 0,
            playthroughCount: 0,
            id: 557,
            summary:
                'Tales speak of an ancient land where creatures the size of mountains, roam the majestic landscape. Bound to the land, these creatures hold a key to a mystical power of revival - a power you must obtain to waken a loved one.   Shadow of the Colossus is a majestic journey through ancient lands to seek out and destroy gigantic mythical beasts. With your trusty horse at your side, explore the spacious lands and unearth each Colossi. Armed with your wits, a sword and a bow, use cunning and strategy to topple each behemoth.   A remake of the critically-claimed game of the same title. Also from the minds that brought you The Last Guardian & ICO',
            storyline:
                'The story of Shadow of the Colossus begins as Wander enters the forbidden land, traveling across a long bridge on his horse, Agro. Unknown to the player, prior to entering, Wander had stolen an ancient sword, which is the only weapon capable of slaying the colossi. Led to the massive Shrine of Worship at the center of the region, Wander carries with him the body of a maiden named Mono. A moment later, several humanoid shadow creatures appear and approach Wander before he easily dismisses them with a wave of the ancient sword in his possession. After vanquishing the shadow creatures, the voice of the disembodied entity known as "Dormin" echoes from above, expressing surprise that Wander possesses the weapon. Wander requests that Dormin return Mono\'s soul to her body, which Dormin states may be possible on the condition that Wander can destroy the sixteen idols lining the temple\'s hall by using the ancient sword to kill each colossus the idols represent located throughout the land. Despite being warned by Dormin that he may have to pay a great price to revive Mono, Wander sets out to search the land for the colossi and destroy them.',
            rating: 85,
            slug: 'shadow-of-the-colossus--1',
            screenshots: [1, 2],
            artworks: [1, 2],
            internetGameDatabaseId: 37094,
            releaseDate: new Date(2 / 6 / 18),
        };

        setGame(fakeGame);
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
                        <div className={classes.cardImageAndStatsContainer}> 
                            <img src={game.cover}></img>
                            <div className={classes.cardStatsContainer}>
                                {/* <p>Total Playthroughs: {game.playthroughCount}</p>
                                <p>Total Templates: {game.templateCount}</p> */}
                                <Button
                                    text='Create Template'
                                    type="submit"
                                    large
                                    className={classes.button}
                                />
                            </div>
                        </div>                       
                    
                    <div className = {classes.cardDescriptionContainer}>
                        <H5>
                            <a href="#">{game.title}</a>
                        </H5>
                    </div>

                </div>
            </Card>
        );
    }
    {
        return <p>'loading'</p>;
    }
};

export default GameSummaryCard;
