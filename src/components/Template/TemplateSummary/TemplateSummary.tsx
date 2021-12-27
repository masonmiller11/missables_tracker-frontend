import React from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Intent,
	Icon
} from '@blueprintjs/core';

import Template from "../../../api/models/Template/Template";
import classes from './TemplateSummary.module.css';

//todo add total playthroughts to Template payload

const TemplateSummary: React.FC<{ template: Template }> = ({ template }) => {
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
					<h2>
						{template.title} (by {template.owner.owner})
					</h2>
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
						<p>
							<strong>Game Summary:</strong> {template.description}
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default TemplateSummary;
