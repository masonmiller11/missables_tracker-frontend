import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import TemplateModel from '../../api/models/Template/Template';
import TemplateList from '../GameTemplates//TemplateList/TemplateList';
import classes from './MyTemplates.module.css';


import { apiListTemplates } from '../../api';

const MyTemplates: React.FC = () => {

	const myTemplatesListOptions = {
		showCover: false,
		showFavoriteStar: true,
		templateGuideUrl: '/myguides/'
	}

	const [templateList, setTemplateList] = useState<null | TemplateModel[]>(null);

	//todo: replace with api call to fetch this user's templates.
	useEffect(() => {

		let source = axios.CancelToken.source();

		apiListTemplates('11', source)
			.then((response) => {
				setTemplateList(response.data.templates);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					console.log(err.response?.data.message ?? 'unknown error');
				}
			});

		//todo add real error handling

	}, []);




	return (
		<div className={classes.myTemplatesBackground}>
			<div className={classes.myTemplatesContainer}>
				<TemplateList templates={templateList} templateListOptions={myTemplatesListOptions} />
			</div>
		</div>
	);
}

export default MyTemplates;