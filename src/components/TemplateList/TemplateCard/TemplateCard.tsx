import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Card, Spinner, SpinnerSize } from '@blueprintjs/core';

import { Template } from '../../../api/models/Template/Template';
import LikeModel, { Like, LikeSubmission } from '../../../api/models/Like/Like';
import LikeHandlers from '../../../interfaces/LikeHandlers.interface';
import TemplateListOptions from '../../../interfaces/TemplateListOptions.interface';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';
import LikeTemplate from './LikeTemplate/FavoriteTemplate';
import AuthContext from '../../../store/auth-context';
import useApi from '../../../hooks/useApi';


import classes from './TemplateCard.module.css';
import CreateResponseData from '../../../api/models/ResponseData/CreateResponseData';
import { SMALL } from '@blueprintjs/core/lib/esm/common/classes';

const TemplateCard: React.FC<{ likes: Like[], template: Template, templateCardOptions: TemplateListOptions }> = ({
	template,
	templateCardOptions,
	likes,
}) => {

	let { showCover, showFavoriteStar, templateGuideUrl } = templateCardOptions;
	let [like, setLike] = useState<Like | null>(null);
	const { apiDeleteRequest, apiGetRequest, apiCreateRequest, saving } = useApi();
	const AuthCtx = useContext(AuthContext);

	useEffect(() => {
		
		let likeIfExists = likes.filter((like) => like.template.id == template.id);
		!!likeIfExists ? setLike(likeIfExists[0]) : setLike(null);

	}, [likes, template]);

	let history = useHistory();

	const deleteTemplateHandler = () => {
		templateCardOptions.onDelete && templateCardOptions.onDelete(template);
	}

	const createLikeHandler = () => {

		const likeCreateResponseHandler = (responseData: CreateResponseData) => {
			setLike({ id: responseData.id, template: { id: template.id } });
		}

		template.likes++;

		let source = axios.CancelToken.source();

		if (likes && AuthCtx.token) {
			apiCreateRequest<LikeSubmission>({ templateId: template.id }, AuthCtx.token, source, LikeModel.create, likeCreateResponseHandler);
		}
	}

	const deleteLikeHandler = () => {

		let source = axios.CancelToken.source();

		if (like && AuthCtx.token) {
			apiDeleteRequest<Like>(like, AuthCtx.token, source, LikeModel.delete);
			setLike(null);
			template.likes--;
		}

	}

	let FavoriteStar = () => {

		if (saving) {
			return <Spinner className={classes.spinner} size = {SpinnerSize.SMALL} />
		} else {
			return <LikeTemplate
				likeCount={template.likes}
				liked={!!like}
				onCreate={createLikeHandler}
				onDelete={deleteLikeHandler} />
		}
	}

	return (
		<Card className={classes.templateCard}>
			<div className={classes.templateTileCardContainer}>
				{showFavoriteStar &&
					<FavoriteStar />
				}
				{showCover &&
					<img className={classes.cover} src={template.game.cover}></img>
				}
				<div className={classes.templateCardTitleAndAuthorContainer}>
					{templateCardOptions.allowDelete ?
						<div className={classes.templateCardTitleAndDeleteContainer}>
							<h2>
								<a onClick={() => history.push(templateGuideUrl + template.id)}>{template.title}</a>
							</h2>
							<DeleteButton onDelete={deleteTemplateHandler}/>
						</div>
						:
						<h2>
							<a onClick={() => history.push(templateGuideUrl + template.id)}>{template.title}</a>
						</h2>
					}
					<p>Template Created by {template.owner.owner}</p>
					<p>{template.description}</p>
				</div>
			</div>
		</Card>
	);
};

export default TemplateCard;
