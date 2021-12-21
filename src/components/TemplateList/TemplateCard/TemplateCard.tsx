import React, { useEffect, useContext, useState } from 'react';
import {
    Button,
    Card,
    Divider,
    Classes,
    ButtonGroup,
    Icon,
    Intent,
    Elevation,
    H5,
} from '@blueprintjs/core';

import Template from '../../../api/models/Template/Template';
import classes from './TemplateCard.module.css';

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => {
    const [templateList, setTemplateList] = useState<null | Template[]>(null);

    return (
        <Card className={classes.templateCard}>
            <div className={classes.templateTileCardContainer}>
                <div className={classes.templateCardRating}>
                    <Button
                        onClick={() => console.log('clicked')}
                        className={Classes.MINIMAL}
                        large
                        icon="star"
                        text={template.likes}
                        intent={Intent.NONE}
                    />
                </div>
                <div className={classes.templateCardTitleAndAuthorContainer}>
                    <h2 className={classes.templateCardTitle}>
                        <a href="#">{template.title}</a>
                    </h2>
                    <p>Template Created by {template.owner.owner}</p>
                </div>
            </div>
        </Card>
    );
};

export default TemplateCard;
