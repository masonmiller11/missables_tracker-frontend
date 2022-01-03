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

const TemplateSectionComponent: React.FC<{
	templateSection: TemplateSection,
	showEditOption: boolean,
	onSectionUpdate: (section: TemplateSection) => void
}> = ({ templateSection, showEditOption, onSectionUpdate }) => {

	let defaultNewStep = {
		"id": null,
		"name": "New Step",
		"position": 1,
		"description": "New Step Description."
	}

	const [editing, setEditing] = useState<boolean>(false);
	const [section, setSection] = useState<TemplateSection>(templateSection);
	const [creatingNewStep, setCreatingNewStep] = useState<boolean>(false);
	const [saving, setSaving] = useState<boolean>(false);
	const [newStep, setNewStep] = useState<TemplateStepModel>(defaultNewStep);

	useEffect(() => {
		setSection(templateSection);
	}, [templateSection]);

	const editingStateHandler = () => {

		if (creatingNewStep) {
			saveNewStepHandler(newStep)
			setEditing(!editing);

		} else {
			setEditing(!editing);
		}

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

	const updateNewStepHandler = (newStep: TemplateStepModel) => {

		setNewStep(newStep);

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

	const newStepHandler = () => {
		setCreatingNewStep(!creatingNewStep);
		console.log('in newStepHandler')
		//set so this shows a NewStepComponent
	}

	async function saveNewStepHandler(newStep: TemplateStepModel) {

		setSaving(true);

		//save to api.
		//get return id
		//return newStep state and combine with new id to newStepsArray.

		let newStepsArray = section.steps;

		newStepsArray.push(newStep);

		setSection({...section, steps: newStepsArray});

		//reset the newStep state.
		setNewStep(defaultNewStep);

		setCreatingNewStep(false); 		// turn off creating new step

		//when we start actually using the API, get rid of the setTimeout but still setSaving(false)
		setTimeout(function () {
			setSaving(false);
		}, 2000);

	}

	const deleteStepHandler = (stepToDelete: TemplateStepModel) => {
		
		//Send call to api

		let newStepArray = section.steps.filter((step) => {return step.id !== stepToDelete.id});

		setSection({...section, steps: newStepArray});
		
	}



	// const onDeleteUser = (userId) => {

    //     UserModel.delete(setError, userId);
        
    //     let newUsersArray = users.filter((user) => { return user.id !== userId; });

    //     setUsers(newUsersArray);
    // }
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
						{showEditOption && !saving &&
							<EditButton
								isEditing={editing}
								onClick={editingStateHandler}
							/>
						}
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
								isNew={false}
								onStepUpdate={updateStepHandler}
								onStepDelete={deleteStepHandler}
							/>
						))}


					{creatingNewStep && <TemplateStep
						editing={editing}
						templateStep={newStep}
						isNew={true}
						onStepUpdate={updateNewStepHandler}
						onStepDelete={newStepHandler}
					/>
					}
					{editing &&
						<AddNewButton
							displaySaveFirstMessage={creatingNewStep}
							onClick={newStepHandler}
							savingNewObject={saving}
						/>}
					{/* </Collapse> */}
					{saving &&
						<div
							className={classes.saveMessage}
						>
							<Spinner
								size={SpinnerSize.SMALL}
							/>
							Saving...
						</div>
					}
				</div>
			</div>
		</Card >

	);

};

export default TemplateSectionComponent;
