import React from 'react';
import Playthrough from '../../../api/models/Playthrough/Playthrough';

import PlaythroughModel from '../../../api/models/Playthrough/Playthrough';
import PlaythroughListOptions from '../../../interfaces/playthroughListOptions.interface';
import PlaythroughCard from './PlaythroughCard/PlaythroughCard';

import classes from './PlaythroughList.module.css';

const TemplateList: React.FC<{
	playthroughs: PlaythroughModel[] | null;
	playthroughListOptions: PlaythroughListOptions;
}> = ({ playthroughs, playthroughListOptions }) => {
	return (
		<div className={classes.playthroughListContainer}>
			{playthroughs!.map((playthrough) => (
				<PlaythroughCard
					playthrough={playthrough}
					playthroughCardOptions={playthroughListOptions}
				/>
			))}
		</div>
	);
};

export default TemplateList;