import React from 'react';
import { useParams } from 'react-router-dom';

import GameTemplates from '../components/GameTemplates/GameTemplates';

const GameTemplatesPage: React.FC = () => {
    type Params = {
        gameId: string;
    };

    let { gameId } = useParams<Params>();

    return (
        <GameTemplates gameId={gameId} />
    );
};

export default GameTemplatesPage;
