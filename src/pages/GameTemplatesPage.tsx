import React from 'react';
import { useParams } from 'react-router-dom';

import Templates from '../components/Templates/Templates';


const GameTemplatesPage: React.FC  = () => {

    type Params = {
        gameId: string;
    }

    let {gameId} = useParams<Params>();

  return (
    <Templates gameId={gameId}/>
  );
}

export default GameTemplatesPage;