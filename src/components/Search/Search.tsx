import React, { useState, useEffect, useRef } from 'react';
import {
	InputGroup,
	Button,
	Switch,
	Spinner,
	SpinnerSize,
} from '@blueprintjs/core';
import axios from 'axios';

import GamesList from '../Layout/GameList/GameList';
import GameModel, { Game } from '../../api/models/Game/Game';
import useApi from '../../hooks/useApi';
import ErrorMessage from '../Error/ErrorMessage';
import classes from './Search.module.css';

const Search: React.FC<{ searchTerm: string | null }> = ({ searchTerm: searchTermProp }) => {

	const [searchTerm, setSearchTerm] = useState<null | string | undefined>(
		searchTermProp ?? null
	);

	const [hideGamesWithoutGuides, setHideGamesWithoutGuides] = useState<boolean>(false);
	const [games, setGames] = useState<Game[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { apiGetRequest } = useApi();
	const searchRef = useRef<HTMLInputElement>(null);

	const hideGamesWithoutGuidesSwitchHandler = () => {
		setHideGamesWithoutGuides(!hideGamesWithoutGuides);
	};

	const searchSubmitHandler = (event: React.FormEvent) => {
		setError(null);
		setGames(null);
		event.preventDefault();
		const searchTerm = searchRef.current?.value;
		setSearchTerm(searchTerm);
	};

	useEffect(() => {
		if (searchTerm) {

			let source = axios.CancelToken.source();

			apiGetRequest([searchTerm, source], GameModel.search, setGames);

		}
	}, [searchTerm]);

	//So that when we open this page, the initial search term (the one in the URL) will be the default value in the search field.
	useEffect(() => {
		if (searchTermProp && searchRef.current)
			searchRef.current.value = searchTermProp;
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
				<div className={classes.searchOptionsContainer}>
					{/* We should break this out into its own component SearchField with a property that takes a boolean for showing search or not. */}
					<form>
						<InputGroup
							className={classes.search}
							leftIcon="search"
							placeholder="Search Games"
							inputRef={searchRef}
							large={true}
							rightElement={
								games || error ? (
									button
								) : (
									<Spinner size={SpinnerSize.SMALL} />
								)
							}
						></InputGroup>
					</form>
					{/* We should break this out into its own component SearchOptions */}
					{/* <FormGroup> */}
					<Switch
						checked={hideGamesWithoutGuides} //gotta put some logic behind this, lol
						onChange={hideGamesWithoutGuidesSwitchHandler}
						labelElement={
							<em>Hide Games That Do Not Have Guides</em>
						}
					/>
					{/* </FormGroup> */}
				</div>
			</div>
			{/* TODO: create error component */}
			<div className={classes.searchResultsContainer}>
				{error ? (
					<ErrorMessage messageText={error} />
				) : (
					<GamesList
						games={games}
						hideGamesWithoutGuides={hideGamesWithoutGuides}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

export default Search;
