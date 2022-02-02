import React, { useEffect, useContext } from 'react';
import { Card, EditableText } from '@blueprintjs/core';
import axios from 'axios';

import { Section } from '../../../api/models/Playthrough/Section';
import StepModel, { Step, StepSubmission } from '../../../api/models/Playthrough/Step';
import CreateResponseData from '../../../api/models/ResponseData/CreateResponseData';

import StepComponent from './Step/StepComponent';
import EditButton from '../../Button/EditButton/EditButton';
import AddNewButton from '../../Button/AddNewButton/AddNewButton';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import SavingMessage from '../../Message/SavingMessage';
import Defaults from '../../../api/DefaultValues';
import useEditing from '../../../hooks/useEditing';
import useApi from '../../../hooks/useApi';
import useTemplateObject from '../../../hooks/useTemplateObject';
import classes from './Section.module.css';

const SectionComponent: React.FC<{
	section: Section;
	showEditOption: boolean;
	onUpdateSection: (section: Section) => void;
	onDeleteSection: (section: Section) => void;
}> = ({ section: sectionProp, showEditOption, onUpdateSection, onDeleteSection }) => {

	const defaults = new Defaults();
	const defaultNewStep: StepSubmission = { ...defaults.newStep, sectionId: parseInt(sectionProp.id as string) };

	const { editing, editingStateHandler } = useEditing();
	const { object: section, editObjectHandler: editSectionHandler, setObjectHandler: setSection } = useTemplateObject<Section>(sectionProp);
	const { saving, addingNew: addingNewStep, apiDeleteRequest, apiUpdateRequest, apiCreateRequest } = useApi();

	useEffect(() => {
		setSection(sectionProp);
	}, [sectionProp]);

	const saveSectionHandler = () => {
		onUpdateSection(section);
	};

	const deleteSectionHandler = () => {
		onDeleteSection(section);
	};

	const changeSectionPositionHandler = (event: string) => {
		if (event === '') {
			editSectionHandler({ ...section, position: '' });
		} else {
			let positionNumber = parseInt(event) ?? setSection(section);

			editSectionHandler({ ...section, position: positionNumber });
		}
	};

	const deleteStepHandler = (stepToDelete: Step) => {

		let source = axios.CancelToken.source();

		if (stepToDelete.id)
			apiDeleteRequest<Step>(stepToDelete, source, StepModel.delete);

		let newStepArray = section.steps.filter((step) => {
			return step.id !== stepToDelete.id;
		});

		setSection({ ...section, steps: newStepArray });
	};

	const updateStepHandler = (editedTemplateStep: Step) => {
		//save new step to database

		let source = axios.CancelToken.source();

		apiUpdateRequest<Step>(editedTemplateStep, source, StepModel.patch);

		//find index of step we're updating.
		let indexOfStep = section.steps.findIndex(
			(step) => step.id === editedTemplateStep.id
		);

		//create newStepsArray, removing the original values of the editedStep
		let newStepsArray = section.steps.filter((step) => {
			return step.id !== editedTemplateStep.id;
		});

		//splice in the new editedStep
		newStepsArray.splice(indexOfStep, 0, editedTemplateStep);

		//reset the state property
		setSection({ ...section, steps: newStepsArray });
	};

	const addNewStepHandler = () => {

		const applyNewTemplateStep = (responseData: CreateResponseData) => {
			let newStepsArray = section.steps;
			newStepsArray.push({ ...defaultNewStep, id: responseData.id });
			setSection({ ...section, steps: newStepsArray });
		}

		if (section.id) {

			let source = axios.CancelToken.source();

			apiCreateRequest<StepSubmission>(
				defaultNewStep,
				source,
				StepModel.create,
				applyNewTemplateStep
			);
		}
	};

	return (
		<Card className={classes.sectionCard} interactive={true}>
			<div className={classes.sectionTileCardContainer}>
				<div className={classes.sectionCardTitleAndAuthorContainer}>
					<div className={classes.sectionCardTitleAndButtonContainer}>
						<div className={classes.positionAndNameContainer}>
							<h2 className={classes.sectionCardTitle}>Part #</h2>
							<div className={classes.position}>
								<h2>
									<EditableText
										onChange={(newValueString) => {
											changeSectionPositionHandler(
												newValueString
											);
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
									onChange={(newValueString) => {
										editSectionHandler({
											...section,
											name: newValueString,
										});
									}}
									disabled={!editing}
									value={section.name}
									onConfirm={() => saveSectionHandler()}
								/>
							</h2>
						</div>
						<div className={classes.deleteAndEditButton}>
							{showEditOption && editing && (
								<DeleteButton
									onDelete={deleteSectionHandler}
								/>
							)}
							{showEditOption && !saving && (
								<EditButton
									isEditing={editing}
									onClick={editingStateHandler}
								/>
							)}
						</div>
					</div>
					{/* <Collapse isOpen> */}

					<p>
						<strong>Section Summary: </strong>
					</p>
					<p>
						<EditableText
							onChange={(newValueString) => {
								editSectionHandler({
									...section,
									description: newValueString,
								});
							}}
							disabled={editing ? false : true}
							value={section.description}
							onConfirm={() => saveSectionHandler()}
							multiline={true}
						/>
					</p>
					<hr />
					{section.steps
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((step) => (
							<StepComponent
								key={step.id}
								editing={editing}
								step={step}
								onUpdateStep={updateStepHandler}
								onDeleteStep={deleteStepHandler}
							/>
						))}
					{editing && (
						<AddNewButton
							onClick={addNewStepHandler}
							savingNewObject={addingNewStep}
							objectName="Step"
						/>
					)}
					{/* </Collapse> */}
					{saving && <SavingMessage />}
				</div>
			</div>
		</Card>
	);
};

export default SectionComponent;
