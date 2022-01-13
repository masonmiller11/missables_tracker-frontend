import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';

import TemplateModel from '../../api/models/Template/Template';
import TemplateList from '../GameTemplates//TemplateList/TemplateList';
import classes from './MyTemplates.module.css';
import AuthContext from '../../store/auth-context';

import { apiListThisUsersTemplates, apiDeleteTemplate } from '../../api';

const MyTemplates: React.FC = () => {

	const [templateList, setTemplateList] = useState<null | TemplateModel[]>(
        null
    );

	const AuthCtx = useContext(AuthContext);

	const deleteStepHandler = (templateToDelete: TemplateModel) => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token) {

			apiDeleteTemplate(templateToDelete.id, AuthCtx.token, source)
				.then((response) => {
					console.log(response);
					//todo add a way for delete successfully message
				})
				
		}

		let newTemplatesArray = templateList!.filter((template) => {
			return template.id !== templateToDelete.id;
		});

		setTemplateList(newTemplatesArray);
	};

	
    const myTemplatesListOptions = {
        showCover: true,
        showFavoriteStar: false,
		templateGuideUrl: '/myguides/',
		allowDelete: true,
		onDelete: deleteStepHandler
    };

    //todo bring in authctx so we can get at the token to send over with the api call.
    //todo: replace with api call to fetch this user's templates.
    useEffect(() => {
        let source = axios.CancelToken.source();

        if (AuthCtx.token) {
            apiListThisUsersTemplates(AuthCtx.token, source)
                .then((response) => {
                    setTemplateList(response.data);
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        console.log('api request cancelled');
                    } else {
                        console.log(
                            err.response?.data.message ?? 'unknown error'
                        );
                    }
                });
        }

        //todo add real error handling
    }, [AuthCtx]);

    if (templateList) {
        return (
            <div className={classes.myTemplatesBackground}>
                <div className={classes.myTemplatesContainer}>
                    <TemplateList
                        templates={templateList}
                        templateListOptions={myTemplatesListOptions}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={classes.myTemplatesBackground}>
            <div className={classes.myTemplatesContainer}>
                <Spinner className={classes.spinner} />
            </div>
        </div>
    );
};

export default MyTemplates;
