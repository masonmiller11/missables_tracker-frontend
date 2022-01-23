import React, { useEffect, useState } from "react";
import { EditableText, Checkbox } from '@blueprintjs/core';

import { Step } from '../../../../api/models/Playthrough/Step';
import useTemplateObject from '../../../../hooks/useTemplateObject';
import DeleteButton from '../../../Button/DeleteButton/DeleteButton';

import classes from './Step.module.css';

const StepComponent: React.FC<{
	step: Step,
	onUpdateStep: (step: Step) => void,
	onDeleteStep: (step: Step) => void,
	editing: boolean,
}> = ({ step: propStep, onUpdateStep, onDeleteStep, editing }) => {

	let [isCompleted, setisCompleted] = useState<boolean>(propStep.isCompleted);

	const {
		object: step,
		editObjectHandler: editStepHandler,
		setObjectHandler: setStep
	} = useTemplateObject<Step>(propStep);

	useEffect(() => {
		setStep(propStep);
	}, [propStep]);

	const changeStepCompletion = (isCompleted: boolean) => {
		setisCompleted(isCompleted);
		onUpdateStep({ ...step, isCompleted: isCompleted });
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
		onUpdateStep(step);
	}

	return (
		<div className={isCompleted ? `${classes.stepContainer} ${classes.completed}` : classes.stepContainer}>
			<div className={classes.postionNameDeleteContainer}>
				<div>
					<Checkbox
						className={classes.tick}
						onChange={(e) => changeStepCompletion(e.currentTarget.checked)}
						defaultChecked={propStep.isCompleted}
					/>
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

				{editing && <DeleteButton danger={false} onDelete={() => onDeleteStep(step)} />}

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

export default StepComponent;