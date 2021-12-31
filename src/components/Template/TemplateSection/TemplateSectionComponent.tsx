import React, { useEffect, useState } from "react";
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
import EditButton from '../../Button/EditButton/EditButton';
import TemplateStepModel from "../../../api/models/Template/TemplateStep";

const TemplateSectionComponent: React.FC<{ templateSection: TemplateSection, showEditOption: boolean }> = ({
	templateSection,
	showEditOption
}) => {

	const [editing, setEditing] = useState<boolean>(false);
	const [section, setSection] = useState<TemplateSection>(templateSection);

	useEffect(() => {
		setSection(templateSection);
	}, [templateSection]);

	const editingStateHandler = () => {
		setEditing(!editing);
	}

	const editSectionHandler = (section: TemplateSection) => {
		setSection(section);
	}

	const updateStepHandler = (editedStep: TemplateStepModel) => {


		//find index of step we're updating
		let indexOfStep = section.steps.findIndex(step => step.id === editedStep.id);


		//create newStepsArray, removing the original values of the editedStep
		let newStepsArray = section.steps.filter((step) => { return step.id !== editedStep.id; });


		//splice in the new editedUser
		newStepsArray.splice(indexOfStep, 0, editedStep);

		//reset the state property
		setSection({ ...section, steps: newStepsArray });
	}

	return (
		<Card className={classes.sectionCard}>
			<div className={classes.sectionTileCardContainer}>
				<div className={classes.sectionCardTitleAndAuthorContainer}>
					<div className={classes.sectionCardTitleAndButtonContainer}>
						<h2 className={classes.sectionCardTitle}>
							Part {templateSection.position}: {templateSection.name}
						</h2>
						{showEditOption ?
							<EditButton
								isEditing={editing}
								onClick={editingStateHandler}
							/> :
							<div></div>
						}
					</div>
					{/* <Collapse isOpen> */}

					<hr />
					<p>
						<strong>Summary: </strong>{templateSection.description}
					</p>
					<hr />
					{section.steps.sort((a, b) => (a.position > b.position) ? 1 : -1)
						.map((step) => (
							<TemplateStep editing={editing} templateStep={step} onStepUpdate={updateStepHandler} />
						))}
					{/* </Collapse> */}
				</div>
			</div>
		</Card>

	);

};

export default TemplateSectionComponent;
