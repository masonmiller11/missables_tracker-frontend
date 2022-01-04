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
	Callout,
	EditableText,
	SpinnerSize
} from '@blueprintjs/core';

import TemplateSection from '../../../api/models/Template/TemplateSection';
import classes from './TemplateSection.module.css';
import TemplateStep from './TemplateStep/TemplateStepComponent';
import EditButton from '../../Button/EditButton/EditButton';
import TemplateStepModel from "../../../api/models/Template/TemplateStep";
import AddNewButton from '../../Button/AddNewButton/AddNewButton';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import SavingMessage from "../../Message/SavingMessage";
import Defaults from '../../../api/DefaultValues';

const TemplateSectionComponent: React.FC<{
	templateSection: TemplateSection,
	showEditOption: boolean,
	onSectionUpdate: (section: TemplateSection) => void
	onSectionDelete: (section: TemplateSection) => void
}> = ({
	templateSection,
	showEditOption,
	onSectionUpdate,
	onSectionDelete }) => {

		//set the default data used for new Sections
		const defaults = new Defaults();
		let defaultNewStep: TemplateStepModel = defaults.newStep;

		const [editing, setEditing] = useState<boolean>(false);
		const [section, setSection] = useState<TemplateSection>(templateSection);
		const [addingNewStep, setAddingNewStep] = useState<boolean>(false);
		const [saving, setSaving] = useState<boolean>(false);
		// const [newStep, setNewStep] = useState<TemplateStepModel>(defaultNewStep);

		useEffect(() => {
			setSection(templateSection);
		}, [templateSection]);

		const editingStateHandler = () => {
			setEditing(!editing);
		}

		const editSectionHandler = (section: TemplateSection) => {
			setSection(section);
		}

		const saveSectionHandler = () => {
			onSectionUpdate(section);
			//send post request to API
			//set saving(true)
		}

		const deleteStepHandler = (stepToDelete: TemplateStepModel) => {

			//Send call to api

			let newStepArray = section.steps.filter((step) => { return step.id !== stepToDelete.id });

			setSection({ ...section, steps: newStepArray });

		}

		const deleteSectionHandler = () => {
			onSectionDelete(section);
		}

		const updateStepHandler = (editedStep: TemplateStepModel) => {

			console.log('in section updateStepHandler');
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

		const addNewStepHandler = () => {

			setAddingNewStep(true);
			// setSaving(true);

			//just disabling the SaveMessage component for now until we implement in other places.

			//save to api, get id from api back;
			//when we start actually using the API, get rid of the setTimeout but still setAddingNewSection(false)

			setTimeout(function () {
				setAddingNewStep(false);
				// setSaving(false);

				let newStepsArray = section.steps;

				let newStep = defaultNewStep;
				//this will be replaced by the id returned by the api.
				newStep.id = Math.random() * 100;

				newStepsArray.push(newStep);

				setSection({ ...section, steps: newStepsArray })

			}, 2000)

		}

		return (
			<Card className={classes.sectionCard}>
				<div className={classes.sectionTileCardContainer}>
					<div className={classes.sectionCardTitleAndAuthorContainer}>
						<div className={classes.sectionCardTitleAndButtonContainer}>
							<div className={classes.positionAndNameContainer}>
								<h2 className={classes.sectionCardTitle}>
									Part #</h2>
								<div className={classes.position}><h2>
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
										disabled={!editing}
										value={section.name}
										onConfirm={() => saveSectionHandler()}
									/>
								</h2>
							</div>
							<div>
								{showEditOption && editing && <DeleteButton danger={true} onDelete={deleteSectionHandler} />}
								{showEditOption && !saving &&
									<EditButton
										isEditing={editing}
										onClick={editingStateHandler}
									/>
								}
							</div>
						</div>
						{/* <Collapse isOpen> */}

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
							/>

						</p>
						<hr />
						{section.steps.sort((a, b) => (a.position > b.position) ? 1 : -1)
							.map((step) => (
								<TemplateStep
									key={step.id}
									editing={editing}
									templateStep={step}
									onUpdateStep={updateStepHandler}
									onDeleteStep={deleteStepHandler}
								/>
							))}
						{editing &&
							<AddNewButton
								onClick={addNewStepHandler}
								savingNewObject={addingNewStep}
								objectName="Step"
							/>}
						{/* </Collapse> */}
						{saving && < SavingMessage />}
					</div>
				</div>
			</Card >

		);

	};

export default TemplateSectionComponent;
