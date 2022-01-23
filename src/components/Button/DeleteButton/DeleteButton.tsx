import React from "react";
import { Button, Intent } from '@blueprintjs/core';

import classes from './DeleteButton.module.css';

const DeleteButton: React.FC<{ onDelete: (() => void), danger: boolean }> = ({
	onDelete,
	danger
}) => {

	return <Button
		icon="delete"
		onClick={() => onDelete()}
		text="Delete"
		intent={danger ? Intent.DANGER : Intent.NONE}
		className={classes.editButton}
	/>
}

export default DeleteButton;
