import React from "react";
import { Button, Intent } from '@blueprintjs/core';

import classes from './EditButton.module.css';

const EditButton: React.FC<{ isEditing: boolean, onClick: (() => void) }> = ({
	isEditing, onClick
}) => {

	if (isEditing) return <Button
		icon="cross"
		intent={Intent.NONE}
		className={classes.button}
		onClick={onClick}
		text="Stop Editing"
	/>

	return <Button
		icon="edit"
		// intent={Intent.WARNING}
		className={classes.button}
		onClick={onClick}
		// text="Edit"
	/>

};

export default EditButton;
