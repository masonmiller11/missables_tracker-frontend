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

import classes from './DeleteButton.module.css';
import TemplateStepModel from "../../../api/models/Template/TemplateStep";

const DeleteButton: React.FC<{
	onDelete: (() => void)
	danger: boolean
}> = ({
	onDelete,
	danger
}) => {

		return <Button
			icon="delete"
			onClick={() => onDelete()}
			text="Delete"
			intent= {danger ? Intent.DANGER : Intent.NONE}
			className={classes.editButton}
		/>
	}

export default DeleteButton;
