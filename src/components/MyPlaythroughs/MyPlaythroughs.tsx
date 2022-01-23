import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import PlaythroughModel, { Playthrough } from '../../api/models/Playthrough/Playthrough';
import ResponseDataModel from '../../api/models/ResponseData/ReadResponseData';
import PlaythroughList from '../GamePlaythroughs/PlaythroughList/PlaythroughList';
import useApi from '../../hooks/useApi';
import AuthContext from '../../store/auth-context';

import classes from './MyPlaythroughs.module.css';

const MyPlaythroughs: React.FC = () => {

	const [playthroughList, setPlaythroughList] = useState<Playthrough[] | null>(null);
	const { apiGetRequest, apiDeleteRequest } = useApi();
	const AuthCtx = useContext(AuthContext);

	const applyPlaythroughResponseData = (responseData: ResponseDataModel<Playthrough>) => {
		setPlaythroughList(responseData.items);
	}

	useEffect(() => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiGetRequest<ResponseDataModel<Playthrough>>([AuthCtx.token, source], PlaythroughModel.listThisUsers, applyPlaythroughResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		}

	}, [AuthCtx]);

	const deletePlaythroughHandler = (playthroughToDelete: Playthrough) => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiDeleteRequest<Playthrough>(playthroughToDelete, AuthCtx.token, source, PlaythroughModel.delete);

		let newPlaythroughArray = playthroughList!.filter((playthrough) => {
			return playthrough.id != playthroughToDelete.id
		});

		setPlaythroughList(newPlaythroughArray);

	}

	const playthroughListOptions = {
		onDelete: deletePlaythroughHandler,
		playthroughUrl: '/myplaythroughs/'
	}

	if (playthroughList) {
		console.log('playthroughList:' + playthroughList)
		return (
			<div className={classes.myPlaythroughsBackground}>
				<div className={classes.myPlaythroughsContainer}>
					<PlaythroughList
						playthroughs={playthroughList}
						playthroughListOptions={playthroughListOptions}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.myPlaythroughsBackground}>
			<div className={classes.myPlaythroughsContainer}>
				<Spinner className={classes.spinner} />
			</div>
		</div>
	);
}

export default MyPlaythroughs;