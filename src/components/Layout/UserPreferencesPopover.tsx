import React from 'react';
import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2'; //gave visual error 8/20/21
import { Popover } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

const UserPreferencesPopover: React.FC<{ onLogout: () => void }> = ({
    onLogout,
}) => {

    let history = useHistory();

    const menu = (
        <Menu>
            <MenuItem icon="graph" text="Preferences" onClick={() => history.push('/preferences')}/>
            <MenuDivider />
            <MenuItem icon="log-out" text="Log Out" onClick={onLogout} />
        </Menu>
    );

    return (
        <Popover content={menu} placement="right-end">
            <Button icon="person" text="Profile" />
        </Popover>
    );
};

export default UserPreferencesPopover;
