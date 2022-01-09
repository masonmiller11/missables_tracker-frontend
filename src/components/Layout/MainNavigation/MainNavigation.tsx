import { useHistory } from 'react-router-dom';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    InputGroup,
} from '@blueprintjs/core';
import { useContext } from 'react';

import AuthContext from '../../../store/auth-context';
import UserPreferencesPopover from '../UserPreferencesPopover';
import NavSearchGames from './NavSearchGames';
import Wrapper from '../../Helpers/Wrapper';

const MainNavigation: React.FC<{ showSearch: boolean }> = ({ showSearch }) => {
    let history = useHistory();

    const authCtx = useContext(AuthContext);
    const isLoggedIn: boolean = authCtx.isLoggedIn;

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
                <Button
                    onClick={() => history.push('/favorites')}
                    className={Classes.MINIMAL}
                    icon="star"
                    text="Favorites"
                />

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
                    <UserPreferencesPopover onLogout={logoutHandler} />
                )}
            </NavbarGroup>
        </Navbar>
    );
};

export default MainNavigation;
