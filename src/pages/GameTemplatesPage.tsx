import React from 'react';
import { useParams } from 'react-router-dom';

import GameTemplates from '../components/GameTemplates/GameTemplates';

const GameTemplatesPage: React.FC = () => {
    type Params = {
        gameId: string;
    };

    let { gameId } = useParams<Params>();

    return (
        <React.Fragment>
            <GameTemplates gameId={gameId} />
        </React.Fragment>
    );
};

export default GameTemplatesPage;
