import React, { useState } from "react";
import { Button, Intent, Dialog, Classes } from '@blueprintjs/core';

import classes from './MobileDeleteButton.module.css';

type props = {
	onDelete: (() => void),
	buttonText?: string
}
const MobileDeleteButton: React.FC<props> = ({
	onDelete,
}) => {

	const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

	const deleteHandler = () => {
		setDialogIsOpen(false);
		onDelete();
	}


	function DialogBody() {
		return (
			<div className={Classes.DIALOG_BODY}>
				<p>
					<strong>
						Are you sure you want to continue with deleting this guide?
					</strong>
				</p>
				<p>
					Deleted guides cannot be recovered. This action is irreversible.
				</p>
				<div className={classes.buttonContainer}>
					<Button intent={Intent.DANGER} text="Delete" onClick={deleteHandler} />
					<Button text="Go Back" onClick={() => setDialogIsOpen(false)} />
				</div>
			</div>
		);
	}


	return <div className={classes.deleteButtonContainer}>
		<Dialog className={classes.dialog} isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
			<DialogBody />
		</Dialog>
		<Button
			icon="trash"
			onClick={() => setDialogIsOpen(true)}
			intent={Intent.NONE}
			className={classes.button}
		/>
	</div>
}

export default MobileDeleteButton;
