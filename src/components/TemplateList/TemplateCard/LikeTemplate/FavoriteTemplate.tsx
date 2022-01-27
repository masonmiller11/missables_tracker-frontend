import React from 'react';
import {
	Button,
	Classes,
	Intent
} from '@blueprintjs/core';

import classes from './FavoriteTemplate.module.css';


const LikeTemplate: React.FC<{ likeCount: number, liked: boolean, onDelete: () => void, onCreate: ()=> void }> = ({
	likeCount,
	liked,
	onCreate,
	onDelete }) => {
	return (
		<div className={classes.likeTemplateContainer}>
			<Button
				onClick={liked ? () => onDelete() : () => onCreate() }
				className={Classes.MINIMAL}
				large
				icon="star"
				text={likeCount}
				intent={liked ? Intent.WARNING : Intent.NONE}
			/>
		</div>
	);
};

export default LikeTemplate;
