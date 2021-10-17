import React, { useState, useEffect, useRef } from 'react';
import {
    InputGroup,
    Button,
    FormGroup,
    Switch,
    Spinner,
    SpinnerSize,
} from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

import { apiSearchGames } from '../../api';
import classes from './Search.module.css';
import GamesList from '../Layout/GameList/GameList';
import Game from '../../api/models/Game/Game';
import ErrorMessage from '../Error/ErrorMessage';

const Search: React.FC<{ searchTerm: string | null }> = ({
    searchTerm: searchTermProp,
}) => {
    const [searchTerm, setSearchTerm] = useState<null | string | undefined>(
        searchTermProp ?? null
    );

    const [hideGamesWithoutGuides, setHideGamesWithoutGuides] =
        useState<boolean>(false);

    const [games, setGames] = useState<Game[] | null>(null);

    const [error, setError] = useState<string | null>(null);

    const searchRef = useRef<HTMLInputElement>(null);

    const location = useLocation();

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
            console.log('in searchTerm useEffect');
            apiSearchGames(searchTerm)
                .then((response) => {
                    console.log('database search: ', response);
                    console.log(location.pathname);
                    setGames(response.data);
                })
                .catch((err) => {
                    let error = err.response?.data.message ?? 'unknown error';
                    if (error === 'resource not found')
                        error =
                            'Search for "' +
                            searchTerm +
                            '" did not return any results.';
                    setError(error);
                });
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
