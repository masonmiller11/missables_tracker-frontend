import React, { useEffect, useContext, useState } from 'react';

import Game from '../../../api/models/Game/Game';

const GameSummary: React.FC<{gameId: string}>  = ({
    gameId: gameIdProp
}) => {
    
    const [game, setGame] = useState<null | Game>(null);

    //set fake game, get from PostMan. Do we need other art assets? Like something as a background? Artwork? Screenshots?
    useEffect(() => {

        let fakeGame = {
            title: 'string',
            cover: 'string',
            templateCount: 0,
            playthroughCount: 0,
            id: 0,
            summary: 'string',
            storyline: 'string',
            rating:  0,
            slug: 'string',
            screenshots: [1,2],
            artworks: [1,2],
            internetGameDatabaseId: 1,
            releaseDate: new Date(1/2/21)
        }

        setGame(fakeGame);

    },[]);

  return (
    <React.Fragment>
        <p>Game Id To Pull Ganme Summary: {gameIdProp}</p>
        <p>Current Game's title is set to: {game ? game.title : 'null'}</p>
    </React.Fragment>
  );
}

export default GameSummary;