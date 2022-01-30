import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import NoAccess from '../components/NoAccess/NoAccess';
import Template from '../components/Template/TemplateComponent';


const MyTemplatePage: React.FC = () => {

	const authCtx = useContext(AuthContext);

	type Params = {
		templateId: string;
	}

	let { templateId } = useParams<Params>();

	if (authCtx.isLoggedIn)
		return (
			<Template templateId={templateId} editingAllowed={true} />
		);

	return <NoAccess />

}

export default MyTemplatePage;