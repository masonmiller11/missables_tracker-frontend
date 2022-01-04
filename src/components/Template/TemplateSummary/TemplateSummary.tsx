import React, { useState, useEffect } from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Intent,
	Icon,
	EditableText
} from '@blueprintjs/core';

import TemplateModel from "../../../api/models/Template/Template";
import classes from './TemplateSummary.module.css';
import EditButton from '../../Button/EditButton/EditButton';

//todo add total playthroughts to Template payload

const TemplateSummary: React.FC<{
	onTemplateChange: (template: TemplateModel) => void,
	showEditOption: boolean,
	template: TemplateModel,
	onTemplateConfirm: () => void
}> = ({
	showEditOption,
	template,
	onTemplateChange,
	onTemplateConfirm
}) => {

		const [editing, setEditing] = useState<boolean>(false);

		const editingStateHandler = () => {
			setEditing(!editing);
		}

		return (

			<Card
				className={classes.templateSummaryCard}
				elevation={Elevation.ONE}
				interactive={false}
				key={template.id}
			>

				<div className={classes.cardContentContainer}>
					<div className={classes.cardImageAndButtonContainer}>
						<img src={template.image}></img>

						<div className={classes.cardButtonContainer}>
							<Button
								text="Start Playthrough"
								type="submit"
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
										onTemplateChange({ ...template, title: newValueString })
									}}
									disabled={!editing}
									value={template.title}
									onConfirm={() => onTemplateConfirm()}
								/>
								(by {template.owner.owner})
							</h2>
							{showEditOption && <EditButton
								isEditing={editing}
								onClick={editingStateHandler}
							/>}
						</div>

						<hr />
						<div className={classes.cardStatsContainer}>
							<p>
								<strong>Game:</strong> {template.game.gameTitle}
							</p>
							<p>
								<strong>Total Playthroughs:</strong> We meet have to add this as to-do
							</p>
						</div>
						<hr />
						<div className={classes.cardSummaryTextContainer}>
							{/* <p> */}
								{/* <strong>Guide Summary:</strong>  */}
								<EditableText
									onChange={newValueString => {
										onTemplateChange({ ...template, description: newValueString })
									}}
									disabled={!editing}
									value={template.description}
									multiline={true}
									onConfirm={() => onTemplateConfirm()}
								/>
							{/* </p> */}
						</div>
					</div>
				</div>


			</Card>
		);
	};

export default TemplateSummary;
