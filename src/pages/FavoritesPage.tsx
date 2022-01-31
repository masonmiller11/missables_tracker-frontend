import React, { useContext } from 'react';

import AuthContext from '../store/auth-context';
import NoAccess from '../components/NoAccess/NoAccess';
import MyFavorites from '../components/MyFavorites/MyFavorites'

const FavoritesPage: React.FC = () => {

	const authCtx = useContext(AuthContext);

	if (authCtx.isLoggedIn)

		return (
			<MyFavorites />
		);

	return <NoAccess />

}

export default FavoritesPage;
