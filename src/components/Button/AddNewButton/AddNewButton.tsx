import React from "react";
import { Button, Spinner, SpinnerSize } from '@blueprintjs/core';

import classes from './AddNewButton.module.css';

const AddNewButton: React.FC<{ onClick: (() => void), savingNewObject: boolean, objectName: string }> = ({
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

};

export default AddNewButton;
