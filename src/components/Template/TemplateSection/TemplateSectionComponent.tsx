import React, { useEffect, useState, useContext } from 'react';
import { Card, EditableText } from '@blueprintjs/core';
import axios from 'axios';

import TemplateSectionModel from '../../../api/models/Template/TemplateSection';
import classes from './TemplateSection.module.css';
import TemplateStep from './TemplateStep/TemplateStepComponent';
import EditButton from '../../Button/EditButton/EditButton';
import TemplateStepModel from '../../../api/models/Template/TemplateStep';
import AddNewButton from '../../Button/AddNewButton/AddNewButton';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import SavingMessage from '../../Message/SavingMessage';
import Defaults from '../../../api/DefaultValues';
import useEditing from '../../../hooks/useEditing';
import useApi from '../../../hooks/useApi';
import useTemplateObject from '../../../hooks/useTemplateObject';
import { apiPatchTemplateStep, apiCreateTemplateStep, apiDeleteTemplateStep } from '../../../api';
import AuthContext from '../../../store/auth-context';

const TemplateSectionComponent: React.FC<{
	templateSection: TemplateSectionModel;
	showEditOption: boolean;
	onUpdateSection: (section: TemplateSectionModel) => void;
	onDeleteSection: (section: TemplateSectionModel) => void;
}> = ({
	templateSection,
	showEditOption,
	onUpdateSection,
	onDeleteSection,
}) => {
		const AuthCtx = useContext(AuthContext);

		//set the default data used for new Sections
		const defaults = new Defaults();
		const defaultNewStep = defaults.newStep;

		const { editing, editingStateHandler } = useEditing();
		const {
			object: section,
			editObjectHandler: editSectionHandler,
			setObjectHandler: setSection,
		} = useTemplateObject<TemplateSectionModel>(templateSection);
		const { saving, addingNew: addingNewStep, apiDeleteRequest, apiPatchRequest, apiCreateRequest } = useApi();

		//TODO move all of these handlers to template component, pass them down in a single object prop.

		useEffect(() => {
			setSection(templateSection);
		}, [templateSection]);

		const saveSectionHandler = () => {
			onUpdateSection(section);
			//set saving(true)
			//send post request to API
			//set saving(false)
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

		const deleteStepHandler = (stepToDelete: TemplateStepModel) => {

			let source = axios.CancelToken.source();

			if (AuthCtx.token && stepToDelete.id)
				apiDeleteRequest(stepToDelete.id, apiDeleteTemplateStep, AuthCtx.token, source);

			let newStepArray = section.steps.filter((step) => {
				return step.id !== stepToDelete.id;
			});

			setSection({ ...section, steps: newStepArray });
		};

		const updateStepHandler = (editedTemplateStep: TemplateStepModel) => {
			//save new step to database

			let source = axios.CancelToken.source();

			if (AuthCtx.token)
				apiPatchRequest<TemplateStepModel>(editedTemplateStep, AuthCtx.token, source, apiPatchTemplateStep);

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

			const applyNewTemplateStep = (newStep: TemplateStepModel) => {
				let newStepsArray = section.steps;
				newStepsArray.push(newStep);
				setSection({ ...section, steps: newStepsArray });
			}

			if (AuthCtx.token && section.id) {

				let source = axios.CancelToken.source();

				apiCreateRequest<TemplateStepModel>(
					defaultNewStep,
					section.id,
					AuthCtx.token,
					source,
					apiCreateTemplateStep,
					applyNewTemplateStep
				);
			}
		};

		return (
			<Card className={classes.sectionCard}>
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
							<div>
								{showEditOption && editing && (
									<DeleteButton
										danger={true}
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
								<TemplateStep
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
				</div>
			</Card>
		);
	};

export default TemplateSectionComponent;
