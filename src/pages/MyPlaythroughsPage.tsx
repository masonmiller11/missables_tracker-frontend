import React, { useContext } from 'react';

import AuthContext from '../store/auth-context';
import NoAccess from '../components/NoAccess/NoAccess';
import MyPlaythroughs from '../components/MyPlaythroughs/MyPlaythroughs'

const MyPlaythroughsPage: React.FC = () => {

	const authCtx = useContext(AuthContext);

	if (authCtx.isLoggedIn)
		return (
			<MyPlaythroughs />
		);

	return <NoAccess />
}

export default MyPlaythroughsPage;