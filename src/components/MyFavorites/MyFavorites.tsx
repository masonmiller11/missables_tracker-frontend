import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';
import TemplateModel, { Template } from '../../api/models/Template/Template';
import LikeModel, { Like } from '../../api/models/Like/Like';
import PageInfo from '../../interfaces/PageInfo.interface';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import TemplateList from '../TemplateList/TemplateList';
import MyFavoritesList from './MyFavoritesList/MyFavoritesList';
import Pagination from '../Layout/Pagintation/Pagination'
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import ResourceNotFoundMessage from '../Message/ResourceNotFoundMessage';
import classes from './MyFavorites.module.css';

const MyFavorites: React.FC = () => {

	const [likeList, setLikeList] = useState<null | Like[]>(null);
	const { apiGetRequest, apiDeleteRequest, loading, error } = useApi();
	const AuthCtx = useContext(AuthContext);
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

		if (AuthCtx.token)
			apiGetRequest<ResponseDataModel<Like>>([source, PageInfo], LikeModel.listThisUsers, applyLikeResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [AuthCtx, pageNumber]);

	const deleteLikeHandler = (likeToDelete: Like) => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiDeleteRequest<Like>(likeToDelete, AuthCtx.token, source, LikeModel.delete);

		const newLikesArray = likeList!.filter((like) => {
			return like.id !== likeToDelete.id
		})

		setLikeList(newLikesArray);

	}

	if (error == "No favorites were found.") {
		console.log('check out error:')
		console.log(error);

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
							initialPage={pageNumber}
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
