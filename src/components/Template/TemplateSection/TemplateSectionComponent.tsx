import React, { useEffect, useContext } from 'react';
import { Card, EditableText } from '@blueprintjs/core';
import axios from 'axios';

import { TemplateSection } from '../../../api/models/Template/TemplateSection';
import TemplateStepModel, { TemplateStep, TemplateStepSubmission } from '../../../api/models/Template/TemplateStep';
import CreateResponseData from '../../../api/models/ResponseData/CreateResponseData';

import TemplateStepComponent from './TemplateStep/TemplateStepComponent';
import EditButton from '../../Button/EditButton/EditButton';
import AddNewButton from '../../Button/AddNewButton/AddNewButton';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import SavingMessage from '../../Message/SavingMessage';
import Defaults from '../../../api/DefaultValues';
import useEditing from '../../../hooks/useEditing';
import useApi from '../../../hooks/useApi';
import useTemplateObject from '../../../hooks/useTemplateObject';
import classes from './TemplateSection.module.css';


const TemplateSectionComponent: React.FC<{
	templateSection: TemplateSection;
	showEditOption: boolean;
	onUpdateSection: (section: TemplateSection) => void;
	onDeleteSection: (section: TemplateSection) => void;
}> = ({ templateSection: templateSectionProp, showEditOption, onUpdateSection, onDeleteSection }) => {

	const defaults = new Defaults();
	const defaultNewStep: TemplateStepSubmission = { ...defaults.newTemplateStep, sectionTemplateId: parseInt(templateSectionProp.id as string) };

	const { editing, editingStateHandler } = useEditing();
	const {
		object: templateSection,
		editObjectHandler: editTemplateSectionHandler,
		setObjectHandler: setSection,
	} = useTemplateObject<TemplateSection>(templateSectionProp);
	const { saving, addingNew: addingNewStep, apiDeleteRequest, apiUpdateRequest, apiCreateRequest } = useApi();

	useEffect(() => {
		setSection(templateSectionProp);
	}, [templateSectionProp]);

	const saveSectionHandler = () => {
		onUpdateSection(templateSection);
	};

	const deleteSectionHandler = () => {
		onDeleteSection(templateSection);
	};

	const changeSectionPositionHandler = (event: string) => {
		if (event === '') {
			editTemplateSectionHandler({ ...templateSection, position: '' });
		} else {
			let positionNumber = parseInt(event) ?? setSection(templateSection);

			editTemplateSectionHandler({ ...templateSection, position: positionNumber });
		}
	};

	const deleteStepHandler = (stepToDelete: TemplateStep) => {

		let source = axios.CancelToken.source();

		if (stepToDelete.id)
			apiDeleteRequest<TemplateStep>(stepToDelete, source, TemplateStepModel.delete);

		let newStepArray = templateSection.steps.filter((step) => {
			return step.id !== stepToDelete.id;
		});

		setSection({ ...templateSection, steps: newStepArray });
	};

	const updateStepHandler = (editedTemplateStep: TemplateStep) => {
		//save new step to database

		let source = axios.CancelToken.source();

		apiUpdateRequest<TemplateStep>(editedTemplateStep, source, TemplateStepModel.update);

		//find index of step we're updating.
		let indexOfStep = templateSection.steps.findIndex(
			(step) => step.id === editedTemplateStep.id
		);

		//create newStepsArray, removing the original values of the editedStep
		let newStepsArray = templateSection.steps.filter((step) => {
			return step.id !== editedTemplateStep.id;
		});

		//splice in the new editedStep
		newStepsArray.splice(indexOfStep, 0, editedTemplateStep);

		//reset the state property
		setSection({ ...templateSection, steps: newStepsArray });
	};

	const addNewStepHandler = () => {

		const applyNewTemplateStep = (responseData: CreateResponseData) => {
			let newStepsArray = templateSection.steps;
			newStepsArray.push({ ...defaultNewStep, id: responseData.id });
			setSection({ ...templateSection, steps: newStepsArray });
		}

		if (templateSection.id) {

			let source = axios.CancelToken.source();

			apiCreateRequest<TemplateStepSubmission>(
				defaultNewStep,
				source,
				TemplateStepModel.create,
				applyNewTemplateStep
			);
		}
	};

	return (
		<Card className={classes.sectionCard} interactive={true}>
			<div style={{width:'100%'}}>
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
									value={templateSection.position.toString()}
									maxLength={2}
									onConfirm={() => saveSectionHandler()}
								/>
							</h2>
						</div>

						<h2>
							<EditableText
								onChange={(newValueString) => {
									editTemplateSectionHandler({
										...templateSection,
										name: newValueString,
									});
								}}
								disabled={!editing}
								value={templateSection.name}
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
							editTemplateSectionHandler({
								...templateSection,
								description: newValueString,
							});
						}}
						disabled={editing ? false : true}
						value={templateSection.description}
						onConfirm={() => saveSectionHandler()}
						multiline={true}
					/>
				</p>
				<hr />
				{templateSection.steps
					.sort((a, b) => (a.position > b.position ? 1 : -1))
					.map((step) => (
						<TemplateStepComponent
							key={step.id}
							editing={editing}
							templateStep={step}
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
		</Card>
	);
};

export default TemplateSectionComponent;
