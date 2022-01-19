import React from 'react';
import { useParams } from 'react-router-dom';

import Playthrough from '../components/Playthrough/PlaythroughComponent';


const PlaythroughPage: React.FC<{editingAllowed: boolean}>  = ({editingAllowed}) => {

    type Params = {
        playthroughId: string;
    }

    let {playthroughId} = useParams<Params>();

  return (
    <Playthrough playthroughId = {playthroughId} editingAllowed = {editingAllowed}/>
  );
}

export default PlaythroughPage;