import React from 'react';
import { useParams } from 'react-router-dom';


const GameTemplatePage: React.FC  = () => {

    type Params = {
        gameId: string;
    }

    let {gameId} = useParams<Params>();

  return (
    <p>Game Id To Pull Templates: {}</p>
  );
}

export default GameTemplatePage;