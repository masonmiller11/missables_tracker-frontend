import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

import TemplateModel from '../../../../api/models/Template/Template';
import classes from './TemplateCard.module.css';
import TemplateListOptions from '../../../../interfaces/templateListOptions.interface';

const TemplateCard: React.FC<{ template: TemplateModel, templateCardOptions: TemplateListOptions }> = ({ template, templateCardOptions }) => {

	let { showCover, showFavoriteStar, templateGuideUrl } = templateCardOptions;

	let history = useHistory();

	return (
		<Card className={classes.templateCard}>
			<div className={classes.templateTileCardContainer}>
				{showFavoriteStar &&
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
				}
				{showCover &&
					<img className={classes.cover}  src={template.game.cover}></img>
				}
				<div className={classes.templateCardTitleAndAuthorContainer}>
					<h2 className={classes.templateCardTitle}>
						<a onClick={() => history.push(templateGuideUrl + template.id)}>{template.title}</a>
					</h2>
					<p>Template Created by {template.owner.owner}</p>
					<p>{template.description}</p>
				</div>
			</div>
		</Card>
	);
};

export default TemplateCard;
