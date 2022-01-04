import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Callout,
	Intent,
	Icon,
	Collapse,
	EditableText
} from '@blueprintjs/core';

import TemplateStep from '../../../../api/models/Template/TemplateStep';
import classes from './TemplateStep.module.css';
import { intentClass } from "@blueprintjs/core/lib/esm/common/classes";
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';

const TemplatePage: React.FC<{
	templateStep: TemplateStep,
	onStepUpdate: (step: TemplateStep) => void,
	onStepDelete: (step: TemplateStep) => void,
	editing: boolean,
	isNew: boolean
}> = ({ templateStep, onStepUpdate, onStepDelete, editing, isNew }) => {

	const [step, setStep] = useState<TemplateStep>(templateStep);

	useEffect(() => {
		setStep(templateStep);
	}, [templateStep]);

	const editStepHandler = (step: TemplateStep) => {
		setStep(step);
	}

	const changeStepPositionHandler = (event: string) => {

		if (event === "") {

			editStepHandler({ ...step, position: "" });

		} else {

			let positionNumber = (parseInt(event)) ?? setStep(step);

			editStepHandler({ ...step, position: positionNumber });

		}

	}

	const saveStepHandler = () => {
		onStepUpdate(step);
		//send post request to API
	}

	//{templateStep.name}
	return (
		<div className={classes.stepContainer}>
			<div className={classes.postionNameDeleteContainer}>
				<div>
					<Icon icon="tick" className={classes.tick} />
					<div className={classes.positionAndNameContainer}>

						<p><strong>Step #</strong> </p>
						<div className={classes.position}>
							<p><strong><EditableText
								onChange={newValueString => {
									changeStepPositionHandler(newValueString);
								}}
								disabled={editing ? false : true}
								value={step.position.toString()}
								maxLength={2}
								onConfirm={() => saveStepHandler()}
							/></strong></p>
						</div>
						<strong><EditableText
							onChange={newValueString => {
								editStepHandler({ ...step, name: newValueString })
							}}
							disabled={editing ? false : true}
							value={step.name}
							onConfirm={() => saveStepHandler()}
						/></strong>
						{isNew && <p> &nbsp;(New Step)</p>}
					</div>
				</div>
				{editing && <DeleteButton danger = {false} onDelete={() => onStepDelete(templateStep)} />}
			</div>
			<p className={classes.stepDescription}>
				<EditableText
					onChange={newValueString => {
						editStepHandler({ ...step, description: newValueString })
					}}
					disabled={editing ? false : true}
					value={step.description}
					onConfirm={() => saveStepHandler()}
					multiline={true}
				// minLines={5}
				// maxLines={5}
				/></p>
		</div>
	);
}

export default TemplatePage;