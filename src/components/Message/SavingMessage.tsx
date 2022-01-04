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

import classes from './SavingMessage.module.css';
import { SMALL } from "@blueprintjs/core/lib/esm/common/classes";

const SavingMessage: React.FC<{

}> = ({

}) => {
		return <div
			className={classes.saveMessage}
		>
			<Spinner
				size={SpinnerSize.SMALL}
			/>
			Saving...
		</div>


	};

export default SavingMessage;
