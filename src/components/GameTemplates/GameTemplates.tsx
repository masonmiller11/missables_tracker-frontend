import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';

import TemplateList from './TemplateList/TemplateList';
import GameSummaryCard from '../Layout/GameSummary/GameSummaryCard';
import classes from './GameTemplates.module.css';
import TemplateModel from '../../api/models/Template/Template';
import { apiGetGameAndTemplateList } from '../../api';
import TemplateListOptions from '../../interfaces/templateListOptions.interface';
import GameModel from '../../api/models/Game/Game';

const GameTemplates: React.FC<{ gameId: string }> = ({
    gameId: gameIdProp,
}) => {
    //TODO grab Game here and pass into component as props like what we're doing with templates.

    const gameTemplatesListOptions = {
        showCover: false,
        showFavoriteStar: true,
		templateGuideUrl: '/guides/',
		allowDelete: false,
    };

    const [templateList, setTemplateList] = useState<null | TemplateModel[]>(
        null
    );
    const [game, setGame] = useState<null | GameModel>(null);

    useEffect(() => {
        let source = axios.CancelToken.source();

        apiGetGameAndTemplateList(gameIdProp, source)
            .then((responses) => {
                setTemplateList(responses[0].data.templates);
                setGame(responses[1].data);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('api request cancelled');
                } else {
                    console.log(err.response?.data.message ?? 'unknown error');
                }
            });

        //todo add real error handling
    }, [gameIdProp]);

    if (game && templateList) {
        //get Game and templates in here. If we don't have both, show loading. Remove loading from below children.
        return (
            <div className={classes.gameTemplatesBackground}>
                <div className={classes.gameTemplatesContainer}>
                    <GameSummaryCard game={game} />
                    <TemplateList
                        templates={templateList}
                        templateListOptions={gameTemplatesListOptions}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={classes.gameTemplatesBackground}>
            <div className={classes.gameTemplatesContainer}>
                <Spinner className={classes.spinner} />
            </div>
        </div>
    );
};

export default GameTemplates;
