import React, { useEffect, useState } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';
import LikeModel, { Like } from '../../api/models/Like/Like';
import PageInfo from '../../interfaces/PageInfo.interface';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import MyFavoritesList from './MyFavoritesList/MyFavoritesList';
import Pagination from '../Layout/Pagintation/Pagination'
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import ResourceNotFoundMessage from '../Message/ResourceNotFoundMessage';
import classes from './MyFavorites.module.css';

const MyFavorites: React.FC = () => {

	const [likeList, setLikeList] = useState<null | Like[]>(null);
	const { apiReadRequest, apiDeleteRequest, loading, error } = useApi();
	let {
		countOfTotalItems,
		pageNumber,
		pageSize,
		setCountOfTotalItems,
		setPageSize,
		pageChangeHandler
	} = usePagination(1, 10);


	const applyLikeResponseData = (responseData: ResponseDataModel<Like>) => {
		setLikeList(responseData.items);
		setCountOfTotalItems(responseData.totalItems);
	}

	useEffect(() => {

		let source = axios.CancelToken.source();
		let PageInfo: PageInfo = {
			itemsPerPage: pageSize,
			page: pageNumber
		};

		apiReadRequest<ResponseDataModel<Like>>(LikeModel.listThisUsers(source, PageInfo), applyLikeResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [pageNumber]);

	const deleteLikeHandler = (likeToDelete: Like) => {

		let source = axios.CancelToken.source();

		apiDeleteRequest<Like>(likeToDelete, source, LikeModel.delete);

		const newLikesArray = likeList!.filter((like) => {
			return like.id !== likeToDelete.id
		})

		setLikeList(newLikesArray);

	}

	if (error == "No favorites were found." || likeList?.length === 0) {
		return (
			<div className={classes.myFavoritesBackground}>
				<div className={classes.myFavoritesContainer}>
					<ResourceNotFoundMessage messageText="Add some guides to your favorites, and they will show up here." />
				</div>
			</div>
		)
	}

	if (likeList && !loading) {
		return (
			<div className={classes.myFavoritesBackground}>
				<div className={classes.myFavoritesContainer}>
					<MyFavoritesList
						onDelete={deleteLikeHandler}
						likes={likeList}
					/>
					<div className={classes.paginationContainer}>
						<Pagination
							page={pageNumber}
							totalItems={countOfTotalItems}
							itemsPerPage={pageSize}
							onPageChange={pageChangeHandler}
						/>
					</div>
				</div>

			</div>
		);
	}

	return (
		<div className={classes.myFavoritesBackground}>
			<div className={classes.myFavoritesContainer}>
				<Spinner className={classes.spinner} />
			</div>
		</div>
	);
};

export default MyFavorites;
