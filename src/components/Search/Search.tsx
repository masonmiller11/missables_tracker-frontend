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

const Search: React.FC<{ searchTerm: string | null }> = ({
    searchTerm: searchTermProp,
}) => {
    const [searchTerm, setSearchTerm] = useState<null | string | undefined>(
        searchTermProp ?? null
    );

    const [showOnlyGuides, setShowOnlyGuides] = useState<boolean>(false);

    const [games, setGames] = useState<Game[] | null>(null);

    const searchRef = useRef<HTMLInputElement>(null);

    const location = useLocation();

    const searchTypeSwitchHandler = () => {
        setShowOnlyGuides(!showOnlyGuides);
    };

    const searchSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setGames(null);
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
                    console.log(err.response?.data.message ?? 'unknown error');
                });
        }
    }, [searchTerm]);

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
                                games ? (
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
                            checked={showOnlyGuides} //gotta put some logic behind this, lol
                            onChange={searchTypeSwitchHandler}
                            labelElement={
                                <em>Only Show Games That Have Guides</em>
                            }
                        />
                    {/* </FormGroup> */}
                </div>
            </div>
            <div className={classes.searchResultsContainer}>
                <GamesList games={games} />
            </div>
        </React.Fragment>
    );
};

export default Search;
