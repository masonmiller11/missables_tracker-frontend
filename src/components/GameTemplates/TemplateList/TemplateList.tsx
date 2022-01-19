import React from 'react';

import TemplateModel from '../../../api/models/Template/Template';
import classes from './TemplateList.module.css';
import TemplateCard from './TemplateCard/TemplateCard';
import TemplateListOptions from '../../../interfaces/templateListOptions.interface';

const TemplateList: React.FC<{
    templates: TemplateModel[] | null;
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
