import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Elevation,
	Spinner,
	Classes,
	Intent,
	Icon
} from '@blueprintjs/core';

import classes from './EditButton.module.css';

const EditButton: React.FC<{
	isEditing: boolean, onClick: (() => void)
}> = ({
	isEditing, onClick
}) => {

		const [editing, setEditing] = useState<Boolean>(isEditing);

		useEffect(() => {
			setEditing(isEditing);
		}, [isEditing]);

		if (editing) return <Button
			icon="floppy-disk"
			intent={Intent.SUCCESS}
			className={classes.editButton}
			onClick={onClick}
			text="Save"
		/>

		return <Button
			icon="edit"
			// intent={Intent.WARNING}
			className={classes.editButton}
			onClick={onClick}
			text="Edit"
		/>

	};

export default EditButton;
