import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';
import PlaythroughModel, { Playthrough } from '../../api/models/Playthrough/Playthrough';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import PageInfo from '../../interfaces/PageInfo.interface';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import PlaythroughList from '../PlaythroughList/PlaythroughList';
import Pagination from '../Layout/Pagintation/Pagination';
import ResourceNotFoundMessage from '../Message/ResourceNotFoundMessage';
import classes from './MyPlaythroughs.module.css';

const MyPlaythroughs: React.FC = () => {

	const [playthroughList, setPlaythroughList] = useState<Playthrough[] | null>(null);
	const { apiGetRequest, apiDeleteRequest, loading, error } = useApi();
	let {
		countOfTotalItems,
		pageNumber,
		pageSize,
		setCountOfTotalItems,
		setPageSize,
		pageChangeHandler
	} = usePagination(1, 5);

	const applyPlaythroughResponseData = (responseData: ResponseDataModel<Playthrough>) => {
		setPlaythroughList(responseData.items);
		setCountOfTotalItems(responseData.totalItems);
	}

	useEffect(() => {

		let source = axios.CancelToken.source();
		let PageInfo: PageInfo = {
			itemsPerPage: pageSize,
			page: pageNumber
		}

			apiGetRequest<ResponseDataModel<Playthrough>>(PlaythroughModel.listThisUsers(source, PageInfo), applyPlaythroughResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		}

	}, [pageNumber]);

	const deletePlaythroughHandler = (playthroughToDelete: Playthrough) => {

		let source = axios.CancelToken.source();

		apiDeleteRequest<Playthrough>(playthroughToDelete, source, PlaythroughModel.delete);

		let newPlaythroughArray = playthroughList!.filter((playthrough) => {
			return playthrough.id != playthroughToDelete.id
		});

		setPlaythroughList(newPlaythroughArray);

	}

	const playthroughListOptions = {
		onDelete: deletePlaythroughHandler,
		playthroughUrl: '/myplaythroughs/'
	}

	if (error == "No playthroughs were found.")
		return (
			<div className={classes.myPlaythroughsBackground}>
				<div className={classes.myPlaythroughsContainer}>
					<ResourceNotFoundMessage messageText="You haven't started any playthroughs yet. What are you waiting for?" />
				</div>
			</div>
		)


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