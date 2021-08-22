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
import { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import UserPreferencesPopover from './UserPreferencesPopover';

const MainNavigation: React.FC = () => {
    let history = useHistory();

    const authCtx = useContext(AuthContext);
    const isLoggedIn: boolean = authCtx.isLoggedIn;

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
                <Button
                    onClick={() => history.push('/favorites')}
                    className={Classes.MINIMAL}
                    icon="document"
                    text="Favorites"
                />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                {!isLoggedIn && (
                    <Button
                        onClick={() => history.push('/login')}
                        className={Classes.MINIMAL}
                        icon="log-in"
                        text="Login"
                    />
                )}
                {isLoggedIn && (
                    // <Button
                    //     onClick={logoutHandler}
                    //     className={Classes.MINIMAL}
                    //     icon="person"
                    //     text="Profile"
                    // />
                    <UserPreferencesPopover onLogout={logoutHandler}/>
                )}
            </NavbarGroup>
        </Navbar>
    );
};

export default MainNavigation;
