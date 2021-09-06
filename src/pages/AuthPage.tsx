import React from 'react';

import Auth from '../components/Auth/Auth';

const AuthPage: React.FC<{ isLogin: boolean}>  = ({isLogin}) => {
    return <div>
        <Auth isLogin={isLogin}/>
    </div>;
};

export default AuthPage;
