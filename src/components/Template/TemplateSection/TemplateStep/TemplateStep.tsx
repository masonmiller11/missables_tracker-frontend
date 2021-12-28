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

import TemplateStep from '../../../../api/models/Template/TemplateStep';
import classes from './TemplateStep.module.css';


const TemplatePage: React.FC<{ templateStep: TemplateStep }> = ({ templateStep }) => {

	return (
		<div className={classes.stepContainer}>
			<div><Icon icon="tick" className={classes.tick} /><p><strong>Step #{templateStep.position}:</strong> {templateStep.name} </p></div>
			<p className={classes.stepDescription}>{templateStep.description}</p>
		</div>
	);
}

export default TemplatePage;