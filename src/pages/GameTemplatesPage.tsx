import React from 'react';
import { useParams } from 'react-router-dom';

import Templatelist from '../components/Templates/TemplateList';
import GameSummary from '../components/Layout/GameSummary/GameSummary';


const GameTemplatesPage: React.FC  = () => {

    type Params = {
        gameId: string;
    }

    let {gameId} = useParams<Params>();

  return (
    <React.Fragment>
      <GameSummary gameId={gameId}/>
      <Templatelist gameId={gameId}/>
    </React.Fragment>
  );
}

export default GameTemplatesPage;