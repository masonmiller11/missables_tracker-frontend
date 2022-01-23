import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Card,
	Classes,
	Intent
} from '@blueprintjs/core';

import { Template } from '../../../../api/models/Template/Template';
import TemplateListOptions from '../../../../interfaces/templateListOptions.interface';
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';

import classes from './TemplateCard.module.css';

const TemplateCard: React.FC<{ template: Template, templateCardOptions: TemplateListOptions }> = ({ template, templateCardOptions }) => {

	let { showCover, showFavoriteStar, templateGuideUrl } = templateCardOptions;

	let history = useHistory();

	const deleteTemplateHandler = () => {
		templateCardOptions.onDelete && templateCardOptions.onDelete(template);
	}

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
					<img className={classes.cover} src={template.game.cover}></img>
				}
				<div className={classes.templateCardTitleAndAuthorContainer}>
					{templateCardOptions.allowDelete ?
						<div className={classes.templateCardTitleAndDeleteContainer}>
							<h2>
								<a onClick={() => history.push(templateGuideUrl + template.id)}>{template.title}</a>
							</h2>

							<DeleteButton onDelete={deleteTemplateHandler} danger={false}
							/>
						</div>
						:
						<h2>
							<a onClick={() => history.push(templateGuideUrl + template.id)}>{template.title}</a>
						</h2>
					}
					<p>Template Created by {template.owner.owner}</p>
					<p>{template.description}</p>
				</div>
			</div>
		</Card>
	);
};

export default TemplateCard;
