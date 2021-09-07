import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Button, FormGroup, Switch } from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';

import { apiSearchGames, apiSearchIGDB } from '../../api';
import classes from './Search.module.css';

const Search: React.FC<{ searchTerm: string | null }> = ({
    searchTerm: searchTermProp,
}) => {
    const [searchTerm, setSearchTerm] = useState<null | string>(
        searchTermProp ?? null
    );

    const searchRef = useRef<HTMLInputElement>(null);

    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
            console.log('in searchTerm useEffect');
            apiSearchGames(searchTerm)
                .then((response) => {
                    console.log('database search: ', response);
                    console.log(location.pathname);
                })
                .catch((err) => {
                    console.log(err.response?.data.message ?? 'unknown error');
                });

            apiSearchIGDB(searchTerm)
                .then((response) => {
                    console.log('IGDB search: ', response);
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
                    ></InputGroup>
                    <FormGroup
                        label={
                            "Don't see what you're looking for? The game you\'re looking for may need a guide."
                        }
                    >
                        <Switch
                            checked
                            className={classes.switch}
                            labelElement={<em>Only Show Games That Have Guides</em>}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className={classes.searchResultsContainer}></div>
        </div>
    );
};

export default Search;
