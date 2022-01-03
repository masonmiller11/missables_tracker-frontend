import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Intent,
	Callout,
	Icon
} from '@blueprintjs/core';

import classes from './AddNewButton.module.css';

const EditButton: React.FC<{
	displaySaveFirstMessage: boolean
	onClick: (() => void)
	savingNewObject: boolean
}> = ({
	displaySaveFirstMessage,
	onClick,
	savingNewObject
}) => {

		if (savingNewObject)
			return <Spinner />

		if (!displaySaveFirstMessage)
			return <Button
				icon="add"
				className={classes.newButton}
				onClick={onClick}
				text="New Step"
			/>

		return <Callout
			intent={Intent.WARNING} 
			className={classes.saveFirstCallout}
			// title="You Must Save First"
			>
				You must save this section before adding another step. Click the save button in the top right of the section card.
				If you do not save, your new step will be lost.
			</Callout>

		//Callout Click save to keep new {object}. Add Delete New {object} button to the right.

	};

export default EditButton;
