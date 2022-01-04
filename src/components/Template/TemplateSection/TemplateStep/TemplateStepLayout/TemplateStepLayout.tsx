import React from "react";
import {
	Icon,
	EditableText
} from '@blueprintjs/core';

import TemplateStepModel from '../../../../../api/models/Template/TemplateStep';
import classes from './TemplateStepLayout.module.css';
import DeleteButton from '../../../../Button/DeleteButton/DeleteButton';

const TemplatePage: React.FC<{
	onChangeStepPosition: (newValueString: string)=>void,
	onEditStep: (newStep: TemplateStepModel)=>void,
	onDeleteStep: (deleteStep: TemplateStepModel)=>void,
	onSaveStep: ()=>void,
	editing: boolean,
	step: TemplateStepModel
}> = ({
	onChangeStepPosition,
	editing,
	step,
	onSaveStep,
	onEditStep,
	onDeleteStep
}) => {

	
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
										onChangeStepPosition(newValueString);
									}}
									disabled={!editing}
									value={step.position.toString()}
									maxLength={2}
									onConfirm={() => onSaveStep()}
								/></strong></p>
							</div>

							<strong><EditableText
								onChange={newValueString => {
									onEditStep({ ...step, name: newValueString })
								}}
								disabled={!editing}
								value={step.name}
								onConfirm={() => onSaveStep()}
							/></strong>

						</div>
					</div>

					{editing && <DeleteButton danger={false} onDelete={() => onDeleteStep(step)} />}

				</div>
				<p className={classes.stepDescription}>

					<EditableText
						onChange={newValueString => {
							onEditStep({ ...step, description: newValueString })
						}}
						disabled={!editing}
						value={step.description}
						onConfirm={() => onSaveStep()}
						multiline={true}

					/></p>
			</div>
		);
	}

export default TemplatePage;