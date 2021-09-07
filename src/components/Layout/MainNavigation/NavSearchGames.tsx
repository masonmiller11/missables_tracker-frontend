import React, { useRef } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';

import classes from './NavSearchGames.module.css';

const SearchGames: React.FC<{ onSearch: (term: string | undefined) => void }> =
    ({ onSearch }) => {
        const searchRef = useRef<HTMLInputElement>(null);

        const submitHandler = () => {
            const searchTerm = searchRef.current?.value;

            onSearch(searchTerm);
        };

        const button = (
            <Button icon="arrow-right" small={true} type="submit" />
        );

        return (
            <form onSubmit={submitHandler}>
                <InputGroup
                    className={classes.search}
                    leftIcon="search"
                    placeholder="Search Games"
                    rightElement={button}
                    inputRef={searchRef}
                ></InputGroup>
            </form>
        );
    };

export default SearchGames;
