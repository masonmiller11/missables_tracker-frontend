import React from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Intent,
	Icon,
	Collapse,
	EditableText
} from '@blueprintjs/core';

import TemplateSection from '../../../api/models/Template/TemplateSection';
import classes from './TemplateSection.module.css';
import TemplateStep from './TemplateStep/TemplateStep';

const TemplateSectionComponent: React.FC<{ templateSection: TemplateSection, editing :boolean }> = ({ 
	templateSection,
	editing 
}) => {

	return (
		<Card className={classes.sectionCard}>
			<div className={classes.sectionTileCardContainer}>
				<div className={classes.sectionCardTitleAndAuthorContainer}>
					<h2 className={classes.sectionCardTitle}>
						Part {templateSection.position}: {templateSection.name}
					</h2>
					{/* <Collapse isOpen> */}

					<hr />
					<p>
						<strong>Summary: </strong>{templateSection.description}
					</p>
					<hr />
					{templateSection.steps.map((step) => (
						<TemplateStep templateStep = {step} />
					))}
					{/* </Collapse> */}
				</div>
			</div>
		</Card>

	);

};

export default TemplateSectionComponent;
