import { useHistory } from 'react-router-dom';
import { Alignment, Button, Classes, H5, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";

const MainNavigation = () => {

    let history = useHistory();

    return (
        <Navbar className = 'bp3-navbar bp3-dark'>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>NMA Tracker</NavbarHeading>
                <NavbarDivider />
                <Button onClick={() => history.push('/')} className={Classes.MINIMAL} icon="home" text="Home" />
                <Button onClick={() => history.push('/favorites')} className={Classes.MINIMAL} icon="document" text="Favorites" />
                <Button onClick={() => history.push('/auth')} className={Classes.MINIMAL} icon="document" text="Login"/>
            </NavbarGroup>
        </Navbar>
    )
}

export default MainNavigation;