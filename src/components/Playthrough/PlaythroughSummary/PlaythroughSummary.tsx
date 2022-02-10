import React from "react";
import {
	Button,
	Card,
	Elevation,
	Intent,
	EditableText
} from '@blueprintjs/core';

import { Playthrough } from '../../../api/models/Playthrough/Playthrough';
import EditButton from '../../Button/EditButton/EditButton';
import useEditing from '../../../hooks/useEditing';
import classes from './PlaythroughSummary.module.css';

const PlaythroughSummary: React.FC<{
	onPlaythroughChange: (template: Playthrough) => void,
	showEditOption: boolean,
	playthrough: Playthrough,
	onPlaythroughConfirm: () => void
}> = ({ showEditOption, playthrough, onPlaythroughChange, onPlaythroughConfirm }) => {

	const { editing, editingStateHandler } = useEditing();

	return (

		<Card
			className={classes.playthroughSummaryCard}
			elevation={Elevation.ONE}
			interactive={true}
			key={playthrough.id}
		>
			<div className={classes.cardContentContainer}>
				<div className={classes.cardImageAndButtonContainer}>
					<img src={playthrough.game.cover}></img>

					<div className={classes.cardButtonContainer}>
						<Button
							text="Stats"
							large
							className={classes.button}
						/>
						<Button
							onClick={() => console.log("clicked")}
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
								onChange={newValueString => {
									onPlaythroughChange({ ...playthrough, title: newValueString })
								}}
								disabled={!editing}
								value={playthrough.title}
								maxLength={45}
								onConfirm={() => onPlaythroughConfirm()}
							/>
						</h2>
						{showEditOption && <EditButton
							isEditing={editing}
							onClick={editingStateHandler}
						/>}
					</div>

					<hr />
					<div className={classes.cardStatsContainer}>
						<p>
							<strong>Author:</strong> {playthrough.owner.owner}
						</p>
						<p>
							<strong>Placeholder:</strong> We will put something here. Stay tuned!
						</p>
					</div>
					<hr />
					<p className={classes.cardSummaryTextContainer}>

						{/* <strong>Guide Summary:</strong>  */}
						<EditableText
							onChange={newValueString => {
								onPlaythroughChange({ ...playthrough, description: newValueString })
							}}
							disabled={!editing}
							value={playthrough.description}
							multiline={true}
							// maxLines={14}
							// maxLength={1391}
							onConfirm={() => onPlaythroughConfirm()}
						/>

					</p>
				</div>
			</div>
		</Card>
	);
};

export default PlaythroughSummary;
