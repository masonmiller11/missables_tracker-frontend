import React, { useEffect } from "react";
import { Icon, EditableText } from '@blueprintjs/core';

import {TemplateStep} from '../../../../api/models/Template/TemplateStep';
import useTemplateObject from '../../../../hooks/useTemplateObject';
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';

import classes from './TemplateStep.module.css';


const TemplateStepComponent: React.FC<{
	templateStep: TemplateStep,
	onUpdateStep: (step: TemplateStep) => void,
	onDeleteStep: (step: TemplateStep) => void,
	editing: boolean,
}> = ({ templateStep, onUpdateStep, onDeleteStep, editing }) => {

	const {
		object: step,
		editObjectHandler: editStepHandler,
		setObjectHandler: setStep
	} = useTemplateObject<TemplateStep>(templateStep);

	useEffect(() => {
		setStep(templateStep);
	}, [templateStep]);

	const changeStepPositionHandler = (event: string) => {

		if (event === "") {

			editStepHandler({ ...step, position: "" });

		} else {

			let positionNumber = (parseInt(event)) ?? setStep(step);

			editStepHandler({ ...step, position: positionNumber });

		}
	}

	const saveStepHandler = () => {
		onUpdateStep(step);
	}

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
								disabled={!editing}
								value={step.position.toString()}
								maxLength={2}
								onConfirm={() => saveStepHandler()}
							/></strong></p>
						</div>

						<strong><EditableText
							onChange={newValueString => {
								editStepHandler({ ...step, name: newValueString })
							}}
							disabled={!editing}
							value={step.name}
							onConfirm={() => saveStepHandler()}
						/></strong>

					</div>
				</div>

				{editing && <div className={classes.deleteButton}><DeleteButton onDelete={() => onDeleteStep(step)} /></div>}

			</div>
			<p className={classes.stepDescription}>

				<EditableText
					onChange={newValueString => {
						editStepHandler({ ...step, description: newValueString })
					}}
					disabled={!editing}
					value={step.description}
					onConfirm={() => saveStepHandler()}
					multiline={true}

				/></p>
		</div>
	);
}

export default TemplateStepComponent;