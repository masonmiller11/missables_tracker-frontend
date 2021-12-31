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

import TemplateStep from '../../../../api/models/Template/TemplateStep';
import classes from './TemplateStep.module.css';

const TemplatePage: React.FC<{
	templateStep: TemplateStep,
	onStepUpdate: (step: TemplateStep) => void,
	editing: boolean
}> = ({ templateStep, onStepUpdate, editing }) => {

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
				</div>
			</div>
			<p className={classes.stepDescription}>
				<EditableText
					onChange={newValueString => {
						editStepHandler({ ...step, description: newValueString })
					}}
					disabled={editing ? false : true}
					value={step.description}
					onConfirm={() => saveStepHandler()}
					multiline = {true}
					minLines={5}
					maxLines={5}
				/></p>
		</div>
	);
}

export default TemplatePage;