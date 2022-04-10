import React from 'react';
import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

import User from '../../../api/models/User';

const MobileNavMenu: React.FC<{ isLoggedIn: boolean, user: User | null, onLogout: () => void }> = ({
	isLoggedIn,
	onLogout,
	user
}) => {

	let history = useHistory();

	console.log('user:' + user?.username);

	const menu = (
		<Menu large>
			<MenuItem icon="home" text="Home" onClick={() => history.push('/')} />
			{isLoggedIn ?
				<React.Fragment>
					<MenuItem icon="star" text="Favorites" onClick={() => history.push('/favorites')} />
					<MenuItem icon="manual" text="My Guides" onClick={() => history.push('/myguides')} />
					<MenuItem icon="send-to-map" text="My Playthroughs" onClick={() => history.push('/myplaythroughs')} />
					<MenuItem icon="log-out" text="Log Out" onClick={onLogout} />
				</React.Fragment>
				:
				<MenuItem icon="log-in" text="Log In" onClick={() => history.push('/login')} />
			}
		</Menu>
	);

	return (
		<Popover content={menu}>
			<Button icon="menu" />
		</Popover>
	);
};

export default MobileNavMenu;
