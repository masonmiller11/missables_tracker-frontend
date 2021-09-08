import React, { useState, useEffect, useRef } from 'react';
import {
    InputGroup,
    Button,
    FormGroup,
    Switch,
    Elevation,
    Spinner,
    SpinnerSize
} from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

import { apiSearchGames, apiSearchIGDB } from '../../api';
import classes from './Search.module.css';
import GamesList from '../Layout/GameList/GameList';
import Game from '../../api/models/Game/Game';

const Search: React.FC<{ searchTerm: string | null }> = ({
    searchTerm: searchTermProp,
}) => {


    const [searchTerm, setSearchTerm] = useState<null | string>(
        searchTermProp ?? null
    );

    const [searchWithGuides, setSearchWithGuides] = useState<boolean>(true);

    const [games, setGames] = useState<Game[]|null>(null);

    const searchRef = useRef<HTMLInputElement>(null);

    const location = useLocation();

    const searchTypeSwitchHandler = () => {
        setSearchWithGuides(!searchWithGuides);
    }

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

            apiSearchIGDB(searchTerm)
                .then((response) => {
                    console.log('IGDB search: ', response);
                    console.log('in second search',games);
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
        <Button icon="arrow-right" small={true} type="submit" />
    );

    return (
        <div>
            <div className={classes.searchContainer}>
                <h1>Search Results</h1>
                <div className={classes.searchOptionsContainer}>
                    <InputGroup
                        className={classes.search}
                        leftIcon="search"
                        placeholder="Search Games"
                        inputRef={searchRef}
                        large={true}
                        rightElement={games ? button  : <Spinner size={SpinnerSize.SMALL}/> }
                    ></InputGroup>
                    <FormGroup
                        label={
                            "Don't see what you're looking for? The game you're looking for may need a guide."
                        }
                    >
                        <Switch
                            checked = {searchWithGuides} //gotta put some logic behind this, lol
                            onChange = {searchTypeSwitchHandler}
                            labelElement={
                                <em>Only Show Games That Have Guides</em>
                            }
                        />
                    </FormGroup>
                </div>
            </div>
            <div className={classes.searchResultsContainer}>
                {games ? (
                    <GamesList games={games} />
                ) : (
                    <Spinner className={classes.spinner} />
                )}
            </div>
        </div>
    );
};

export default Search;
