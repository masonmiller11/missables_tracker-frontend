import React from 'react';
import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

import User from '../../../api/models/User';

const MobileNavMenu: React.FC<{ isLoggedIn: boolean, user: User|null, onLogout: () => void }> = ({
	isLoggedIn, 
	onLogout,
	user
}) => {

	let history = useHistory();
	
	console.log('user:' + user?.username);

    const menu = (
        <Menu>
            {/* <MenuItem icon="graph" text="Preferences" onClick={() => history.push('/preferences')}/> */}
            {/* <MenuDivider /> */}
            <MenuItem icon="log-out" text="Log Out" onClick={onLogout} />
        </Menu>
    );

    return (
        <Popover content={menu}>
            <Button icon="menu"/>
        </Popover>
    );
};

export default MobileNavMenu;
