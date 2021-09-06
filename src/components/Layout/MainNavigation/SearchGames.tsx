import React from 'react';
import { InputGroup, Spinner, Button, IconSize } from '@blueprintjs/core';

import classes from './SearchGames.module.css';

const button  = <Button icon="arrow-right" small={true}/>

const onClickHandler = () => {
    console.log('clicked');
}

const SearchGames: React.FC  = () => {
    return (
        <InputGroup
            className={classes.search}
            leftIcon="search"
            placeholder="Search Games"
            rightElement={button}
            onClick={onClickHandler}
        >
        </InputGroup>
    );
};

export default SearchGames;
