import React, { useEffect, useState } from "react";

import TemplateStep from '../../../../api/models/Template/TemplateStep';
import TemplateStepLayout from './TemplateStepLayout/TemplateStepLayout';

const TemplatePage: React.FC<{
	templateStep: TemplateStep,
	onUpdateStep: (step: TemplateStep) => void,
	onDeleteStep: (step: TemplateStep) => void,
	editing: boolean,
}> = ({
	templateStep,
	onUpdateStep,
	onDeleteStep,
	editing
}) => {

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
			onUpdateStep(step);
			//send post request to API
		}


		//logic here for which version to return. One for edits, another for playthroughs.
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

export default TemplatePage;