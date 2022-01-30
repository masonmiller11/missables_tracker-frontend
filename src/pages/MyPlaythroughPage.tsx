import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import NoAccess from '../components/NoAccess/NoAccess';
import Playthrough from '../components/Playthrough/PlaythroughComponent';


const MyPlaythroughPage: React.FC = () => {

	const authCtx = useContext(AuthContext);

	type Params = {
		playthroughId: string;
	}

	let { playthroughId } = useParams<Params>();

	if (authCtx.isLoggedIn)
		return (
			<Playthrough playthroughId={playthroughId} editingAllowed={true} />
		);
		
	return <NoAccess />

}

export default MyPlaythroughPage;