import React from "react";
import {
	Spinner,
	SpinnerSize
} from '@blueprintjs/core';

import classes from './SavingMessage.module.css';

const SavingMessage: React.FC = ({

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
