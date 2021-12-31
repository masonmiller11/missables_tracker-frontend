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

const TemplateSectionComponent: React.FC<{
	templateSection: TemplateSection,
	showEditOption: boolean,
	onSectionUpdate: (section: TemplateSection) => void
}> = ({ templateSection, showEditOption, onSectionUpdate }) => {

	const [editing, setEditing] = useState<boolean>(false);
	const [section, setSection] = useState<TemplateSection>(templateSection);
	const [canCreateNewStep, setCanCreateNewStep] = useState<boolean>(true);

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


		//splice in the new editedStep
		newStepsArray.splice(indexOfStep, 0, editedStep);

		//reset the state property
		setSection({ ...section, steps: newStepsArray });
	}

	const changeSectionPositionHandler = (event: string) => {

		if (event === "") {

			editSectionHandler({ ...section, position: "" });

		} else {

			let positionNumber = (parseInt(event)) ?? setSection(section);

			editSectionHandler({ ...section, position: positionNumber });

		}

	}

	const saveSectionHandler = () => {
		onSectionUpdate(section);
		//send post request to API
	}

	return (
		<Card className={classes.sectionCard}>
			<div className={classes.sectionTileCardContainer}>
				<div className={classes.sectionCardTitleAndAuthorContainer}>
					<div className={classes.sectionCardTitleAndButtonContainer}>
						<div className={classes.positionAndNameContainer}>
							<h2 className={classes.sectionCardTitle}>
								Part #</h2> <div className={classes.position}><h2>
									<EditableText
										onChange={newValueString => {
											changeSectionPositionHandler(newValueString);
										}}
										disabled={editing ? false : true}
										value={section.position.toString()}
										maxLength={2}
										onConfirm={() => saveSectionHandler()}

									/>
								</h2>
							</div>

							<h2>
								<EditableText
									onChange={newValueString => {
										editSectionHandler({ ...section, name: newValueString })
									}}
									disabled={editing ? false : true}
									value={section.name}
									onConfirm={() => saveSectionHandler()}
								/>
							</h2>
						</div>
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
					<p><strong>Section Summary: </strong></p>
					<p>

						<EditableText
							onChange={newValueString => {
								editSectionHandler({ ...section, description: newValueString })
							}}
							disabled={editing ? false : true}
							value={section.description}
							onConfirm={() => saveSectionHandler()}
							multiline={true}
							minLines={5}
							maxLines={5}
						/>

					</p>
					<hr />
					{section.steps.sort((a, b) => (a.position > b.position) ? 1 : -1)
						.map((step) => (
							<TemplateStep
								key={step.id}
								editing={editing}
								templateStep={step}
								onStepUpdate={updateStepHandler}
							/>
						))}
					{editing && <Button
						icon="add"
						// intent={Intent.WARNING}
						className={classes.editButton}
						text="New Step"
					/>}
					{/* </Collapse> */}
				</div>
			</div>
		</Card >

	);

};

export default TemplateSectionComponent;
