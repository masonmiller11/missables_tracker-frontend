import React, { useState } from "react";
import { Button, Intent } from '@blueprintjs/core';

import classes from './DeleteButton.module.css';

const DeleteButton: React.FC<{ onDelete: (() => void) }> = ({
	onDelete
}) => {

	const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

	return <div className={classes.deleteButtonContainer}>
		<Button
			icon={confirmDelete ? "trash" : "delete"}
			onClick={!confirmDelete ? () => setConfirmDelete(true) : () => onDelete()}
			text={confirmDelete ? "Confirm" : "Delete"}
			intent={confirmDelete ? Intent.DANGER : Intent.NONE}
			className={classes.button}
		/>
		{confirmDelete &&
			<Button
				icon="undo"
				onClick={() => setConfirmDelete(false)}
				text="Cancel"
				intent={Intent.NONE}
				className={classes.button}

			/>}
	</div>
}

export default DeleteButton;
