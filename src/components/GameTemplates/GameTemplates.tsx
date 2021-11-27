import React from 'react';
import { useParams } from 'react-router-dom';

import Templatelist from '../TemplateList/TemplateList';
import GameSummaryCard from '../Layout/GameSummary/GameSummaryCard';
import classes from './GameTemplates.module.css';

const GameTemplates: React.FC<{ gameId: string }> = ({
    gameId: gameIdProp,
}) => {

    //TODO grab Game and Templates here and pass into components as props.

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
