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

import TemplateSection from '../../../api/models/Template/TemplateSection';
import classes from './TemplateSection.module.css';

const TemplateSectionComponent: React.FC<{ templateSection: TemplateSection }> = ({ templateSection }) => {

	return (
		<Card className={classes.sectionCard}>
			<div className={classes.sectionTileCardContainer}>
				<div className={classes.sectionCardTitleAndAuthorContainer}>
					<h2 className={classes.sectionCardTitle}>
						{templateSection.name}
					</h2>
				</div>
			</div>
		</Card>

	);

};

export default TemplateSectionComponent;
