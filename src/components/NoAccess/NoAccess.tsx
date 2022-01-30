import React from 'react';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../Message/ErrorMessage';
import classes from './NoAccess.module.css';

const NoAccess: React.FC = () => {

	return (
		<div className={classes.noAccessContainer}>
			<ErrorMessage messageText={
				'You need to be logged in to view this page'
			} />
		</div>
	);
}

export default NoAccess;