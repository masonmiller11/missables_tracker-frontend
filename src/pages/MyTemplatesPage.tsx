import React, { useContext } from 'react';

import AuthContext from '../store/auth-context';
import NoAccess from '../components/NoAccess/NoAccess';
import MyTemplates from '../components/MyTemplates/MyTemplates'

const MyTemplatesPage: React.FC = () => {

	const authCtx = useContext(AuthContext);
	if (authCtx.isLoggedIn)
		return (
			<MyTemplates />
		);
		
	return <NoAccess />

}

export default MyTemplatesPage;