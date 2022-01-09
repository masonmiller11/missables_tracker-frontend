import React, { useState, useEffect } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import classes from './Template.module.css';
import TemplateModel from '../../api/models/Template/Template';
import TemplateSummary from './TemplateSummary/TemplateSummary';
import TemplateSection from './TemplateSection/TemplateSectionComponent';
import TemplateSectionModel from '../../api/models/Template/TemplateSection';
import AddNewButton from '../Button/AddNewButton/AddNewButton';
import Defaults from '../../api/DefaultValues';
import useTemplateObject from '../../hooks/useTemplateObject';
import { apiReadTemplate } from '../../api';

const TemplateComponent: React.FC<{
    templateId: string;
    editingAllowed: boolean;
}> = ({ templateId: templateIdProp, editingAllowed }) => {
    //set the default data used for new Sections
    const defaults = new Defaults();
    let defaultNewSection: TemplateSectionModel = defaults.newSection;
    const [showEditOption, setShowEditOption] =
        useState<boolean>(editingAllowed);
    const [addingNewSection, setAddingNewSection] = useState<boolean>(false);
    const [template, setTemplate] = useState<TemplateModel>();

    useEffect(() => {
        let source = axios.CancelToken.source();

        //todo create custom hook for api calls
        apiReadTemplate(templateIdProp, source)
            .then((response) => {
                setTemplate(response.data);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('api request cancelled');
                } else {
                    console.log(err.response?.data.message ?? 'unknown error');
                }
            });

        return function () {
            source.cancel('cancelling in cleanup');
        };

        //todo add real error handling
    }, [templateIdProp]);

    const editTemplateHandler = (templateObject: TemplateModel) => {
        setTemplate(templateObject);
    };

    const updateSectionHandler = (editedSection: TemplateSectionModel) => {
        if (template) {
            console.log('in updateSectionHandler');

            //find index of section we're updating
            let indexOfSection = template.sections.findIndex(
                (section) => section.id === editedSection.id
            );

            //create newStepsArray, removing the original values of the editedSection
            let newSectionsArray = template.sections.filter((section) => {
                return section.id !== editedSection.id;
            });

            //splice in the new editedTemplate
            newSectionsArray?.splice(indexOfSection, 0, editedSection);

            //reset the state property
            setTemplate({ ...template, sections: newSectionsArray });
        }
    };

    const addNewSectionHandler = () => {
        if (template) {
            setAddingNewSection(true);

            //save to api, get id from api back;

            //when we start actually using the API, get rid of the setTimeout but still setAddingNewSection(false)
            setTimeout(function () {
                setAddingNewSection(false);
                let newSectionArray = template.sections;

                let newSection = defaultNewSection;
                //this will be replaced by the id returned by the api.
                newSection.id = Math.random() * 100;

                newSectionArray.push(newSection);

                setTemplate({ ...template, sections: newSectionArray });
            }, 2000);
        }
    };

    const deleteSectionHandler = (sectionToDelete: TemplateSectionModel) => {
        if (template) {
            //Send call to api
            let newSectionArray = template.sections.filter((section) => {
                return section.id !== sectionToDelete.id;
            });

            setTemplate({ ...template, sections: newSectionArray });
        }
    };

    const updateTemplateHandler = () => {
        console.log('updating Template...');

        //send to api
    };

    if (template) {
        return (
            <div className={classes.templateBackground}>
                <div className={classes.templatesContainer}>
                    <TemplateSummary
                        template={template}
                        showEditOption={showEditOption}
                        onTemplateChange={editTemplateHandler}
                        onTemplateConfirm={updateTemplateHandler}
                    />

                    <div className={classes.sectionsContainer}>
                        {template.sections
                            .sort((a, b) => (a.position > b.position ? 1 : -1))
                            .map((section) => (
                                <TemplateSection
                                    key={section.id}
                                    templateSection={section}
                                    showEditOption={showEditOption}
                                    onUpdateSection={updateSectionHandler}
                                    onDeleteSection={deleteSectionHandler}
                                />
                            ))}
                    </div>
                    <div className={classes.addNewSectionButton}>
                        {showEditOption && (
                            <AddNewButton
                                objectName="Section"
                                savingNewObject={addingNewSection}
                                onClick={addNewSectionHandler}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    {
        return (
            <div className={classes.templateBackground}>
                <Spinner className={classes.spinner} />
            </div>
        );
    }
};

export default TemplateComponent;
