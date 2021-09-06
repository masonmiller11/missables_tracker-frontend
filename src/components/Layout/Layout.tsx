import MainNavigation from './MainNavigation//MainNavigation';


const Layout: React.FC = (props) => {
    return (
      <div>
        <MainNavigation />
            <main>{props.children}</main>
      </div>
    );
  };

export default Layout;