import React from 'react';
import { useParams } from 'react-router-dom';

import Templatelist from '../Templates/TemplateList';
import GameSummaryCard from '../Layout/GameSummary/GameSummaryCard';
import classes from './GameTemplates.module.css';

const GameTemplates: React.FC<{ gameId: string }> = ({
    gameId: gameIdProp,
}) => {
    return (
        <div className={classes.gameTemplatesBackground}>
            <div className={classes.gameTemplatesContainer}>
                <GameSummaryCard gameId={gameIdProp} />
                <Templatelist gameId={gameIdProp} />
            </div>
        </div>
    );
};

export default GameTemplates;
