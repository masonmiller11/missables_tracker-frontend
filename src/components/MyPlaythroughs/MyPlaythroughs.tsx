import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import PlaythroughModel, { Playthrough } from '../../api/models/Playthrough/Playthrough';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import PageInfo from '../../interfaces/PageInfo.interface';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import AuthContext from '../../store/auth-context';

import PlaythroughList from '../GamePlaythroughs/PlaythroughList/PlaythroughList';
import Pagination from '../Layout/Pagintation/Pagination'

import classes from './MyPlaythroughs.module.css';

const MyPlaythroughs: React.FC = () => {

	const [playthroughList, setPlaythroughList] = useState<Playthrough[] | null>(null);
	const { apiGetRequest, apiDeleteRequest, loading } = useApi();
	const AuthCtx = useContext(AuthContext);
	let {
		countOfTotalItems,
		pageNumber,
		pageSize,
		setCountOfTotalItems,
		setPageSize,
		pageChangeHandler
	} = usePagination(1, 10);

	const applyPlaythroughResponseData = (responseData: ResponseDataModel<Playthrough>) => {
		setPlaythroughList(responseData.items);
		setCountOfTotalItems(responseData.totalItems);
		console.log('setOfTotalItems:' + responseData.totalItems);
	}

	useEffect(() => {

		let source = axios.CancelToken.source();
		let PageInfo: PageInfo = {
			itemsPerPage: pageSize,
			page: pageNumber
		}

		if (AuthCtx.token)
			apiGetRequest<ResponseDataModel<Playthrough>>([AuthCtx.token, source, PageInfo], PlaythroughModel.listThisUsers, applyPlaythroughResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		}

	}, [AuthCtx, pageNumber]);

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

	return (
		<div className={classes.myPlaythroughsBackground}>
			<div className={classes.myPlaythroughsContainer}>
				{playthroughList && !loading ?
					<PlaythroughList
						playthroughs={playthroughList}
						playthroughListOptions={playthroughListOptions}
					/>
					: <Spinner className={classes.spinner} />
				} {!loading && playthroughList &&
					<div className={classes.paginationContainer}>
						<Pagination
							initialPage={pageNumber}
							totalItems={countOfTotalItems}
							itemsPerPage={pageSize}
							onPageChange={pageChangeHandler}
						/>
					</div>
				}
			</div>
		</div>
	);

}

export default MyPlaythroughs;