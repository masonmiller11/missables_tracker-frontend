import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';

import { apiListTemplates } from '../../../api';
import Template from '../../../api/models/Template/Template';
import classes from './TemplateList.module.css';
import TemplateCard from './TemplateCard/TemplateCard';

const TemplateList: React.FC<{ gameId: string }> = ({ gameId: gameIdProp }) => {

    const [templateList, setTemplateList] = useState<null | Template[]>(null);

    useEffect(() => {
        
        let source = axios.CancelToken.source();

        apiListTemplates(gameIdProp, source)
            .then((response) => {
                setTemplateList(response.data.templates);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('api request cancelled');
                } else {
                    console.log(err.response?.data.message ?? 'unknown error');
                }
            });

        //todo add real error handling
 
    }, []);


    if (templateList) {
        return (
            <div className={classes.templateListContainer}>
                {/* <p>Game Id To Pull Templates: {gameIdProp}</p> */}
                {templateList!.map((template) => (
                    <TemplateCard template={template} />
                ))}
            </div>
        );
    }
    {
        return <p className={classes.spinner}> Loading Templates... </p>;
    }
};

export default TemplateList;