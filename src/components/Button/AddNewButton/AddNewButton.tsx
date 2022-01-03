import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Intent,
	Callout,
	Icon,
	SpinnerSize
} from '@blueprintjs/core';

import classes from './AddNewButton.module.css';
import { SMALL } from "@blueprintjs/core/lib/esm/common/classes";

const AddNewButton: React.FC<{
	onClick: (() => void)
	savingNewObject: boolean
	objectName: string
}> = ({
	onClick,
	savingNewObject,
	objectName
}) => {

		if (savingNewObject)
			return <Spinner
				size={SpinnerSize.SMALL}
				className={classes.newButton}
			/>


			return <Button
				icon="add"
				className={classes.newButton}
				onClick={onClick}
				text={"New " + objectName}
			/>

		// return <Callout
		// 	intent={Intent.WARNING}
		// 	className={classes.saveFirstCallout}
		// // title="You Must Save First"
		// >
		// 	You must save this section before adding another step. Click the save button in the top right of the section card.
		// 	If you do not save, your new step will be lost.
		// </Callout>

		//Callout Click save to keep new {object}. Add Delete New {object} button to the right.

	};

export default AddNewButton;
