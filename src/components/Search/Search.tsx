import React, { useState, useEffect, useRef } from 'react';
import {
	InputGroup,
	Button,
	Switch,
	Spinner,
	SpinnerSize,
} from '@blueprintjs/core';
import axios from 'axios';
import GamesList from '../GameList/GameList';
import GameModel, { Game } from '../../api/models/Game/Game';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import PageInfo from '../../interfaces/PageInfo.interface';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import Pagination from '../Layout/Pagintation/Pagination'
import ErrorMessage from '../Message/ErrorMessage';
import ResourceNotFoundMessage from '../Message/ResourceNotFoundMessage';
import SearchOptions from './SearchOptions/SearchOptions';
import classes from './Search.module.css';

const Search: React.FC<{ searchTerm: string | null }> = ({ searchTerm: searchTermProp }) => {

	const [hideGamesWithoutGuides, setHideGamesWithoutGuides] = useState<boolean>(false);
	const [games, setGames] = useState<Game[] | null>([]);
	const [error, setError] = useState<string | null>(null);
	const { apiReadRequest, loading } = useApi();
	const searchRef = useRef<HTMLInputElement>(null);

	const hideGamesWithoutGuidesSwitchHandler = () => {
		setHideGamesWithoutGuides(!hideGamesWithoutGuides);
	};

	const applyGamesResponseData = (responseData: ResponseDataModel<Game>) => {
		setGames(responseData.items);
		setCountOfTotalItems(responseData.totalItems);
	}

	let {
		countOfTotalItems,
		pageNumber,
		pageSize,
		setCountOfTotalItems,
		setPageSize,
		pageChangeHandler
	} = usePagination(1, 9);


	let PageInfo: PageInfo = {
		itemsPerPage: pageSize,
		page: pageNumber
	};

	const searchSubmitHandler = (event: React.FormEvent) => {
		setError(null);
		setGames(null);
		event.preventDefault();
		const searchTerm = searchRef.current?.value;
		let source = axios.CancelToken.source();
		apiReadRequest(GameModel.search(searchTerm!, source, {
			itemsPerPage: pageSize,
			page: 1
		}), applyGamesResponseData);
		pageChangeHandler(1);
	};

	useEffect(() => {

		const searchTerm = searchRef.current?.value;

		if (searchTerm) {

			let source = axios.CancelToken.source();

			apiReadRequest(GameModel.search(searchTerm, source, PageInfo), applyGamesResponseData);

		}
	}, [pageNumber]);

	//So that when we open this page, the initial search term (the one in the URL) will be the default value in the search field.
	useEffect(() => {
		console.log('this should only happen once')
		if (searchTermProp && searchRef.current)
			searchRef.current.value = searchTermProp;
		let source = axios.CancelToken.source();

		apiReadRequest(GameModel.search(searchTermProp!, source, PageInfo), applyGamesResponseData);

	}, []);

	const button = (
		<Button
			icon="arrow-right"
			small={true}
			onClick={searchSubmitHandler}
			type="submit"
		/>
	);

	return (
		<React.Fragment>
			<div className={classes.searchContainer}>
				<h1>Search Results</h1>
				<SearchOptions
					showButton={!!(games || error)}
					onSearch={searchSubmitHandler}
					searchRef={searchRef}
					hideGamesWithoutGuides={hideGamesWithoutGuides}
					hideGamesWithoutGuidesSwitchHandler={hideGamesWithoutGuidesSwitchHandler}
				/>
			</div>
			{!loading && games!.length == 0 &&
				<div className={classes.searchResultsContainer}>
					<ResourceNotFoundMessage messageText="Your search did not return any games" />
				</div>
			}
			<div className={classes.searchResultsContainer}>
				{loading || !games ? (
					<Spinner className={classes.spinner} />
				) : (
					<GamesList
						games={games}
						hideGamesWithoutGuides={hideGamesWithoutGuides}
					/>
				)}
				<div className={classes.paginationContainer}>
					<Pagination
						page={pageNumber}
						totalItems={countOfTotalItems}
						itemsPerPage={pageSize}
						onPageChange={pageChangeHandler}
					/>
				</div>
			</div>

		</React.Fragment>
	);
};

export default Search;
