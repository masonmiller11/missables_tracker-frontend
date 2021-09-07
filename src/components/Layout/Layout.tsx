import MainNavigation from './MainNavigation//MainNavigation';
import { useLocation } from 'react-router-dom';

const Layout: React.FC = (props) => {
    const location = useLocation();

    return (
        <div>
            <MainNavigation
                showSearch={location.pathname.includes('search') ? false : true}
            />
            <main>{props.children}</main>
        </div>
    );
};

export default Layout;
