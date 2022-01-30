import React, { useContext } from 'react';

import AuthContext from '../store/auth-context';
import NoAccess from '../components/NoAccess/NoAccess';

const FavoritesPage: React.FC = () => {

	const authCtx = useContext(AuthContext);

	if (authCtx.isLoggedIn)

		return (
			<div>
				<header>
					<p>Favorites</p>
				</header>
			</div>
		);

	return <NoAccess />

}

export default FavoritesPage;
