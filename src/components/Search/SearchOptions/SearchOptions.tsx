import React, { useState, useEffect, useRef } from 'react';
import {
	InputGroup,
	Button,
	Switch,
	Spinner,
	SpinnerSize,
	IRef,
} from '@blueprintjs/core';
import axios from 'axios';
import classes from './SearchOptions.module.css';

const Search: React.FC<{
	onSearch: (event: React.FormEvent) => void,
	searchRef: IRef<HTMLInputElement> | undefined,
	showButton: boolean,
	hideGamesWithoutGuides: boolean,
	hideGamesWithoutGuidesSwitchHandler: () => void
}> = ({ onSearch, searchRef, showButton, hideGamesWithoutGuides, hideGamesWithoutGuidesSwitchHandler }) => {

	const button = (
		<Button
			icon="arrow-right"
			small={true}
			onClick={onSearch}
			type="submit"
		/>
	);

	return (

		<div className={classes.searchOptionsContainer}>
			<form>
				<InputGroup
					className={classes.search}
					leftIcon="search"
					placeholder="Search Games"
					inputRef={searchRef}
					large={true}
					rightElement={
						showButton ? (
							button
						) : (
							<Spinner size={SpinnerSize.SMALL} />
						)
					}
				></InputGroup>
			</form>
			{/* We should break this out into its own component SearchOptions */}
			<Switch
				checked={hideGamesWithoutGuides}
				onChange={hideGamesWithoutGuidesSwitchHandler}
				labelElement={
					<em>Hide Games That Do Not Have Guides</em>
				}
			/>
		</div>

	);
};

export default Search;
