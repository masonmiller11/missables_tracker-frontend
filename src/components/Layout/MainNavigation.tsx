import { useHistory } from "react-router-dom";
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import { useContext } from "react";

import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
  let history = useHistory();

  const authCtx = useContext(AuthContext); 
  const isLoggedIn: boolean = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/auth');
  }

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>NMA Tracker</NavbarHeading>
        <NavbarDivider />
        <Button
          onClick={() => history.push("/")}
          className={Classes.MINIMAL}
          icon="home"
          text="Home"
        />
        <Button
          onClick={() => history.push("/favorites")}
          className={Classes.MINIMAL}
          icon="document"
          text="Favorites"
        />
        {!isLoggedIn && <Button
          onClick={() => history.push("/auth")}
          className={Classes.MINIMAL}
          icon="document"
          text="Login"
        />}
        {isLoggedIn && <Button
          onClick={logoutHandler}
          className={Classes.MINIMAL}
          icon="document"
          text="Log Out"
        />}
      </NavbarGroup>
    </Navbar>
  );
};

export default MainNavigation;
