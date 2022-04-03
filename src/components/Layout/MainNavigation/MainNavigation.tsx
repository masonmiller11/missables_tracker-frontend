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
import UserPreferencesPopover from './UserPreferencesPopover';
import NavSearchGames from './NavSearchGames';
import MobileNavMenu from './MobileNavMenu';

import classes from './MainNavigation.module.css';

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
				<NavbarHeading className={classes.desktopOnly}>NMA Tracker</NavbarHeading>
				<NavbarDivider className={classes.desktopOnly} />
				<div className={classes.desktopOnly}>
					<Button
						onClick={() => history.push('/')}
						className={Classes.MINIMAL}
						icon="home"
						text="Home"
					/>
				</div>
				{isLoggedIn &&
					<div className={classes.desktopOnly}>
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
					</div>
				}
				{showSearch ? (
					<React.Fragment>
						<NavbarDivider className={classes.desktopOnly} />{' '}
						<NavSearchGames onSearch={searchHandler} />
					</React.Fragment>
				) : null}
			</NavbarGroup>
			<NavbarGroup align={Alignment.RIGHT}>
				<div className={classes.mobileNavMenu}>
				<MobileNavMenu isLoggedIn={isLoggedIn} onLogout={logoutHandler} user={authCtx.user} />
				</div>
				{!isLoggedIn ? (
					<div className={classes.hideOnMobile}>
						<Button
							onClick={() => history.push('/login')}
							className={Classes.MINIMAL}
							icon="log-in"
							text="Login"
						/>
					</div>
				) : (
					<div className={classes.hideOnMobile}>
						<UserPreferencesPopover onLogout={logoutHandler} user={authCtx.user} />
					</div>
				)}
			</NavbarGroup>
		</Navbar>
	);
};

export default MainNavigation;
