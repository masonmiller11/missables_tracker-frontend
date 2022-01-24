import React from 'react';

import {Template} from '../../api/models/Template/Template';
import TemplateListOptions from '../../interfaces/templateListOptions.interface';

import TemplateCard from './TemplateCard/TemplateCard';

import classes from './TemplateList.module.css';


const TemplateList: React.FC<{
    templates: Template[] | null;
    templateListOptions: TemplateListOptions;
}> = ({ templates, templateListOptions }) => {
    return (
        <div className={classes.templateListContainer}>
            {templates!.map((template) => (
                <TemplateCard
                    templateCardOptions={templateListOptions}
                    template={template}
                />
            ))}
        </div>
    );
};

export default TemplateList;
