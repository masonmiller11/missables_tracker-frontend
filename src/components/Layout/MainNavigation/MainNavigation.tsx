import { useHistory } from 'react-router-dom';
import {
	Alignment,
	Button,
	Classes,
	Navbar,
	NavbarDivider,
	NavbarGroup,
	NavbarHeading,
} from '@blueprintjs/core';
import React, { useContext } from 'react';

import AuthContext from '../../../store/auth-context';
import UserPreferencesPopover from '../UserPreferencesPopover';
import NavSearchGames from './NavSearchGames';
import Wrapper from '../../Helpers/Wrapper';

const MainNavigation: React.FC<{ showSearch: boolean }> = ({ showSearch }) => {
	let history = useHistory();

	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.isLoggedIn;

	const searchHandler = (term: string | undefined) => {
		history.replace('/search/' + term);
	};

	const logoutHandler = () => {
		authCtx.logout();
		history.replace('/login');
	};

	return (
		<Navbar>
			<NavbarGroup align={Alignment.LEFT}>
				<NavbarHeading>NMA Tracker</NavbarHeading>
				<NavbarDivider />
				<Button
					onClick={() => history.push('/')}
					className={Classes.MINIMAL}
					icon="home"
					text="Home"
				/>
				{isLoggedIn &&
					<React.Fragment>
					<Button
						onClick={() => history.push('/favorites')}
						className={Classes.MINIMAL}
						icon="star"
						text="Favorites"
					/>
					<Button
						onClick={() => history.push('/myguides')}
						className={Classes.MINIMAL}
						icon="manual"
						text="My Guides"
					/>
					<Button
						onClick={() => history.push('/myplaythroughs')}
						className={Classes.MINIMAL}
						icon="send-to-map"
						text="My Playthroughs"
					/>
					</React.Fragment>
				}
				{showSearch ? (
					<Wrapper>
						<NavbarDivider />{' '}
						<NavSearchGames onSearch={searchHandler} />
					</Wrapper>
				) : null}
			</NavbarGroup>
			<NavbarGroup align={Alignment.RIGHT}>
				{!isLoggedIn ? (
					<Button
						onClick={() => history.push('/login')}
						className={Classes.MINIMAL}
						icon="log-in"
						text="Login"
					/>
				) : (
					<UserPreferencesPopover onLogout={logoutHandler} user={authCtx.user} />
				)}
			</NavbarGroup>
		</Navbar>
	);
};

export default MainNavigation;
