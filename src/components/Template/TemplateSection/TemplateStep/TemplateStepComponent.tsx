import React, { useEffect } from "react";

import TemplateStepModel from '../../../../api/models/Template/TemplateStep';
import TemplateStepLayout from './TemplateStepLayout/TemplateStepLayout';
import useTemplateObject from '../../../../hooks/useTemplateObject';

const TemplateStep: React.FC<{
	templateStep: TemplateStepModel,
	onUpdateStep: (step: TemplateStepModel) => void,
	onDeleteStep: (step: TemplateStepModel) => void,
	editing: boolean,
}> = ({
	templateStep,
	onUpdateStep,
	onDeleteStep,
	editing
}) => {

		const {
			object: step,
			editObjectHandler: editStepHandler,
			setObjectHandler: setStep
		} = useTemplateObject<TemplateStepModel>(templateStep);

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
			//send post request to API
		}

		return (
			<TemplateStepLayout
				onChangeStepPosition={changeStepPositionHandler}
				onSaveStep={saveStepHandler}
				onDeleteStep={onDeleteStep}
				onEditStep={editStepHandler}
				editing={editing}
				step={step}
			/>
		);
	}

export default TemplateStep;