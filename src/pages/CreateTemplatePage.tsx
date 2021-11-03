import React from 'react';
import { useParams } from 'react-router-dom';


const CreateTemplatePage: React.FC  = () => {

    type Params = {
        gameId: string;
    }

    let {gameId} = useParams<Params>();

  return (
    <p>Game Id: {gameId}</p>
  );
}

export default CreateTemplatePage;