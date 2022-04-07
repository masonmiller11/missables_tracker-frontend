import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { Template } from '../../api/models/Template/Template';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import LikeModel, { Like, LikeSubmission } from '../../api/models/Like/Like';
import TemplateListOptions from '../../interfaces/TemplateListOptions.interface';
import CreateResponseData from '../../api/models/ResponseData/CreateResponseData';

import TemplateCard from './TemplateCard/TemplateCard';
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';

import classes from './TemplateList.module.css';

const TemplateList: React.FC<{
	templates: Template[] | null;
	templateListOptions: TemplateListOptions;
}> = ({ templates, templateListOptions }) => {

	const AuthCtx = useContext(AuthContext);
	let [likes, setLikes] = useState<Like[] | null>([]);
	const { apiReadRequest } = useApi(false);

	const applyLikeResponseData = (responseData: ResponseDataModel<Like>) => {
		setLikes(responseData.items);
	}

	useEffect(() => {
		let source = axios.CancelToken.source();

		if (AuthCtx.isLoggedIn) {
			apiReadRequest<ResponseDataModel<Like>>(LikeModel.listThisUsers(source, { page: 1, itemsPerPage: 1000000 }), applyLikeResponseData);
		}

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [AuthCtx.isLoggedIn]);

	return (
		<div className={classes.templateListContainer}>
			{likes && templates!.map((template) => (
				<TemplateCard
					key={template.id}
					likes={likes!}
					templateCardOptions={templateListOptions}
					template={template}
				/>
			))}
		</div>
	);
};

export default TemplateList;
