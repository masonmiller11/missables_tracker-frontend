import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import TemplateModel from '../../api/models/Template/Template';
import TemplateList from '../GameTemplates//TemplateList/TemplateList';
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';
import { apiListThisUsersTemplates, apiDeleteTemplate, apiDeleteTemplateSection } from '../../api';


import classes from './MyTemplates.module.css';


const MyTemplates: React.FC = () => {

	const [templateList, setTemplateList] = useState<null | TemplateModel[]>(null);
	const {apiGetRequest, apiDeleteRequest } = useApi();
	const AuthCtx = useContext(AuthContext);

	useEffect(() => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiGetRequest<TemplateModel[] | null>(setTemplateList, apiListThisUsersTemplates, [AuthCtx.token, source]);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [AuthCtx]);

	const deleteTemplateHandler = (templateToDelete: TemplateModel) => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiDeleteRequest(templateToDelete.id, apiDeleteTemplate, AuthCtx.token, source);


		let newTemplatesArray = templateList!.filter((template) => {
			return template.id !== templateToDelete.id;
		});

		setTemplateList(newTemplatesArray);
	};

	const myTemplatesListOptions = {
		showCover: true,
		showFavoriteStar: false,
		templateGuideUrl: '/myguides/',
		allowDelete: true,
		onDelete: deleteTemplateHandler
	};

	if (templateList) {
		return (
			<div className={classes.myTemplatesBackground}>
				<div className={classes.myTemplatesContainer}>
					<TemplateList
						templates={templateList}
						templateListOptions={myTemplatesListOptions}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.myTemplatesBackground}>
			<div className={classes.myTemplatesContainer}>
				<Spinner className={classes.spinner} />
			</div>
		</div>
	);
};

export default MyTemplates;
