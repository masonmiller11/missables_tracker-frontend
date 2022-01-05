import React, { useEffect, useState } from "react";
import {
	Card,
	EditableText
} from '@blueprintjs/core';

import TemplateSectionModel from '../../../api/models/Template/TemplateSection';
import classes from './TemplateSection.module.css';
import TemplateStep from './TemplateStep/TemplateStepComponent';
import EditButton from '../../Button/EditButton/EditButton';
import TemplateStepModel from "../../../api/models/Template/TemplateStep";
import AddNewButton from '../../Button/AddNewButton/AddNewButton';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import SavingMessage from "../../Message/SavingMessage";
import Defaults from '../../../api/DefaultValues';
import useEditing from '../../../hooks/useEditing';
import useTemplateObject from '../../../hooks/useTemplateObject';

const TemplateSectionComponent: React.FC<{
	templateSection: TemplateSectionModel,
	showEditOption: boolean,
	onSectionUpdate: (section: TemplateSectionModel) => void
	onSectionDelete: (section: TemplateSectionModel) => void
}> = ({
	templateSection,
	showEditOption,
	onSectionUpdate,
	onSectionDelete }) => {

		//set the default data used for new Sections
		const defaults = new Defaults();
		let defaultNewStep: TemplateStepModel = defaults.newStep;

		const { editing, editingStateHandler } = useEditing();
		const [addingNewStep, setAddingNewStep] = useState<boolean>(false);
		const [saving, setSaving] = useState<boolean>(false);
		const {
			object: section,
			editObjectHandler: editSectionHandler,
			setObjectHandler: setSection
		} = useTemplateObject<TemplateSectionModel>(templateSection);


		useEffect(() => {
			setSection(templateSection);
		}, [templateSection]);

		const saveSectionHandler = () => {
			onSectionUpdate(section);
			//set saving(true)
			//send post request to API
			//set saving(false)
		}


		const changeSectionPositionHandler = (event: string) => {

			if (event === "") {

				editSectionHandler({ ...section, position: "" });

			} else {

				let positionNumber = (parseInt(event)) ?? setSection(section);

				editSectionHandler({ ...section, position: positionNumber });

			}

		}

		const deleteSectionHandler = () => {
			onSectionDelete(section);
		}

		const deleteStepHandler = (stepToDelete: TemplateStepModel) => {

			//Send call to api

			let newStepArray = section.steps.filter((step) => { return step.id !== stepToDelete.id });

			setSection({ ...section, steps: newStepArray });

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
