import React, { useContext, } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Card,
    Elevation,
    Intent,
    EditableText,
} from '@blueprintjs/core';
import axios from 'axios';

import TemplateModel from '../../../api/models/Template/Template';
import PlaythroughModel from '../../../api/models/Playthrough/Playthrough';
import classes from './TemplateSummary.module.css';
import EditButton from '../../Button/EditButton/EditButton';
import useEditing from '../../../hooks/useEditing';
import { apiCreatePlaythrough } from '../../../api/index';
import useApi from '../../../hooks/useApi';
import AuthContext from '../../../store/auth-context';
import { PlaythroughSubmissionModel } from '../../../api/models/Playthrough/PlaythroughModel';

//todo add total playthroughts to Template payload

const TemplateSummary: React.FC<{
    onTemplateChange: (template: TemplateModel) => void;
    showEditOption: boolean;
    template: TemplateModel;
    onTemplateConfirm: () => void;
}> = ({ showEditOption, template, onTemplateChange, onTemplateConfirm }) => {
    const AuthCtx = useContext(AuthContext);
    const { editing, editingStateHandler } = useEditing();
    const { apiCreateRequest, saving } = useApi();
	let history = useHistory();

    let newPlaythrough: PlaythroughSubmissionModel = {
        name: 'My New Playthrough',
        description: 'New Description',
        gameId: template.game.gameID,
        templateId: template.id,
        visibility: false,
    };

    const createPlaythroughHandler = () => {
        const redirectToNewPlaythrough = (data: {status: string, id: string|number}) => {

			history.push('/myplaythroughs/' + data.id);

		};

        if (AuthCtx.token) {
            let source = axios.CancelToken.source();

            apiCreateRequest<PlaythroughSubmissionModel>(
                newPlaythrough,
                template.game.gameID,
                AuthCtx.token,
                source,
                apiCreatePlaythrough,
                redirectToNewPlaythrough
            );
        }
    };

    return (
        <Card
            className={classes.templateSummaryCard}
            elevation={Elevation.ONE}
            interactive={false}
            key={template.id}
        >
            <div className={classes.cardContentContainer}>
                <div className={classes.cardImageAndButtonContainer}>
                    <img src={template.game.cover}></img>

                    <div className={classes.cardButtonContainer}>
                        <Button
                            text={saving ? "Saving" : "Start Playthrough"} 
                            type="submit"
							onClick={()=>createPlaythroughHandler()}
                            large
                            className={classes.button}
                        />
                        <Button
                            onClick={() => console.log('clicked')}
                            large
                            icon="star"
                            text="Add To Favorites"
                            intent={Intent.NONE}
                            className={classes.button}
                        />
                    </div>
                </div>
                <div className={classes.cardDescriptionContainer}>
                    <div className={classes.titleAndEditButtonContainer}>
                        <h2>
                            <EditableText
                                onChange={(newValueString) => {
                                    onTemplateChange({
                                        ...template,
                                        title: newValueString,
                                    });
                                }}
                                disabled={!editing}
                                value={template.title}
                                maxLength={45}
                                onConfirm={() => onTemplateConfirm()}
                            />
                        </h2>
                        {showEditOption && (
                            <EditButton
                                isEditing={editing}
                                onClick={editingStateHandler}
                            />
                        )}
                    </div>

                    <hr />
                    <div className={classes.cardStatsContainer}>
                        <p>
                            <strong>Author:</strong> {template.owner.owner}
                        </p>
                        <p>
                            <strong>Total Playthroughs:</strong> We meet have to
                            add this as to-do
                        </p>
                    </div>
                    <hr />
                    <p className={classes.cardSummaryTextContainer}>
                        {/* <strong>Guide Summary:</strong>  */}
                        <EditableText
                            onChange={(newValueString) => {
                                onTemplateChange({
                                    ...template,
                                    description: newValueString,
                                });
                            }}
                            disabled={!editing}
                            value={template.description}
                            multiline={true}
                            // maxLines={14}
                            // maxLength={1391}
                            onConfirm={() => onTemplateConfirm()}
                        />
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default TemplateSummary;
