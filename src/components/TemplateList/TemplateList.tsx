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
	const { apiGetRequest, apiCreateRequest } = useApi();

	const applyLikeResponseData = (responseData: ResponseDataModel<Like>) => {
		setLikes(responseData.items);
	}

	useEffect(() => {
		let source = axios.CancelToken.source();

		if (AuthCtx.isLoggedIn) {
			apiGetRequest<ResponseDataModel<Like>>([AuthCtx.token, source], LikeModel.listThisUsers, applyLikeResponseData);
		}

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [AuthCtx])

	// const deleteLikeHandler = (templateId: number | string) => {
	// 	if (likes) {
	// 		let newLikesArray = likes.filter((like) => like.template.id != templateId);
	// 		setLikes(newLikesArray);


	// 	}

	// }

	// const createLikeHandler = (templateId: number | string) => {



		return (
			<div className={classes.templateListContainer}>
				{likes && templates!.map((template) => (
					<TemplateCard
						key={template.id}
						likes={likes!}
						templateCardOptions={templateListOptions}
						template={template}
						// likeHandlers={{ onDelete: deleteLikeHandler, onCreate: createLikeHandler }}
					/>
				))}
			</div>
		);
	};

	export default TemplateList;
