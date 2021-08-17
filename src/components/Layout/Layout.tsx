import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props: any) => {
    return (
      <div>
        <MainNavigation />
            <main>{props.children}</main>
      </div>
    );
  };

export default Layout;