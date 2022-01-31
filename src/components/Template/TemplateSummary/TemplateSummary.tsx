import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Card,
	Elevation,
	Intent,
	EditableText,
} from '@blueprintjs/core';
import axios from 'axios';

import { Template } from '../../../api/models/Template/Template';
import PlaythroughModel, { PlaythroughSubmission } from '../../../api/models/Playthrough/Playthrough';
import LikeModel, { Like, LikeSubmission } from '../../../api/models/Like/Like';
import CreateResponseData from '../../../api/models/ResponseData/CreateResponseData';
import ResponseDataModel from '../../../api/models/ResponseData/ListResponseData'
import AuthContext from '../../../store/auth-context';
import EditButton from '../../Button/EditButton/EditButton';
import useEditing from '../../../hooks/useEditing';
import useApi from '../../../hooks/useApi';
import classes from './TemplateSummary.module.css';

//todo add total playthroughts to Template payload

const TemplateSummary: React.FC<{
	onTemplateChange: (template: Template) => void;
	showEditOption: boolean;
	template: Template;
	onTemplateConfirm: () => void;
}> = ({ showEditOption, template, onTemplateChange, onTemplateConfirm }) => {

	const AuthCtx = useContext(AuthContext);
	const { editing, editingStateHandler } = useEditing();
	const { apiGetRequest, apiCreateRequest, apiDeleteRequest, saving } = useApi();
	let [like, setLike] = useState<Like | null>(null);
	let [creatingNewPlaythrough, setCreatingNewPlaythrough] = useState(false);
	let history = useHistory();

	const applyLikeResponseData = (responseData: ResponseDataModel<Like>) => {
		let likeIfExists = responseData.items.filter((like) => like.template.id == template.id);
		!!likeIfExists ? setLike(likeIfExists[0]) : setLike(null);
	}

	useEffect(() => {

		let source = axios.CancelToken.source();

		if (AuthCtx.isLoggedIn) {
			apiGetRequest<ResponseDataModel<Like>>([source, {page: 1, itemsPerPage: 1000000}], LikeModel.listThisUsers, applyLikeResponseData);
		}


	}, [AuthCtx.isLoggedIn])

	const createLikeHandler = () => {

		if (AuthCtx.isLoggedIn) {
			setLike({ id: 'temp_id', template: { id: template.id } });

			const likeCreateResponseHandler = (responseData: CreateResponseData) => {
				setLike({ id: responseData.id, template: { id: template.id } });
			}

			let source = axios.CancelToken.source();

			if (AuthCtx.token) {
				apiCreateRequest<LikeSubmission>({ templateId: template.id }, AuthCtx.token, source, LikeModel.create, likeCreateResponseHandler);
			}
		} else {
			console.log('you must be logged in for that');
		}
	}

	const deleteLikeHandler = () => {

		let source = axios.CancelToken.source();

		if (like && AuthCtx.token) {
			apiDeleteRequest<Like>(like, AuthCtx.token, source, LikeModel.delete);
			setLike(null);
		}

	}

	const createPlaythroughHandler = () => {

		const redirectToNewPlaythrough = (data: CreateResponseData) => {

			history.push('/myplaythroughs/' + data.id);

		};

		const newPlaythrough: PlaythroughSubmission = {
			name: 'My New Playthrough',
			description: 'New Description',
			gameId: parseInt(template.game.gameID as string),
			templateId: template.id,
			visibility: false,
		};


		if (AuthCtx.token && AuthCtx.isLoggedIn) {
			
			setCreatingNewPlaythrough(true);

			let source = axios.CancelToken.source();

			apiCreateRequest<PlaythroughSubmission>(
				newPlaythrough,
				AuthCtx.token,
				source,
				PlaythroughModel.create,
				redirectToNewPlaythrough
			);
		} else {
			console.log('You must be logged in for that');
		}

	};

	return (
		<Card
			className={classes.templateSummaryCard}
			elevation={Elevation.ONE}
			interactive={true}
			key={template.id}
		>
			<div className={classes.cardContentContainer}>
				<div className={classes.cardImageAndButtonContainer}>
					<img src={template.game.cover}></img>

					<div className={classes.cardButtonContainer}>
						<Button
							text={creatingNewPlaythrough ? "Starting Playthrough" : "Start Playthrough"}
							type="submit"
							onClick={() => createPlaythroughHandler()}
							large
							disabled={creatingNewPlaythrough}
							className={classes.button}
						/>
						<Button
							onClick={!!like ? () => deleteLikeHandler() : () => createLikeHandler()}
							large
							icon="star"
							text={!!like ? "Added To Favorites" : "Add To Favorites"}
							intent={!!like ? Intent.WARNING : Intent.NONE}
							className={classes.button}
						/>
					</div>
				</div>
				<div className={classes.cardDescriptionContainer}>
					<div className={classes.titleAndEditButtonContainer}>
						<h2>
							<EditableText
								onChange={(newValueString) => {
									onTemplateChange({
										...template,
										title: newValueString,
									});
								}}
								disabled={!editing}
								value={template.title}
								maxLength={45}
								onConfirm={() => onTemplateConfirm()}
							/>
						</h2>
						{showEditOption && (
							<EditButton
								isEditing={editing}
								onClick={editingStateHandler}
							/>
						)}
					</div>

					<hr />
					<div className={classes.cardStatsContainer}>
						<p>
							<strong>Author:</strong> {template.owner.owner}
						</p>
						<p>
							<strong>Total Playthroughs:</strong> We meet have to
							add this as to-do
						</p>
					</div>
					<hr />
					<p className={classes.cardSummaryTextContainer}>
						{/* <strong>Guide Summary:</strong>  */}
						<EditableText
							onChange={(newValueString) => {
								onTemplateChange({
									...template,
									description: newValueString,
								});
							}}
							disabled={!editing}
							value={template.description}
							multiline={true}
							// maxLines={14}
							// maxLength={1391}
							onConfirm={() => onTemplateConfirm()}
						/>
					</p>
				</div>
			</div>
		</Card>
	);
};

export default TemplateSummary;
