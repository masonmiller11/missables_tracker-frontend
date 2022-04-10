import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import TemplateModel, { Template } from '../../api/models/Template/Template';
import TemplateSectionModel, { TemplateSection, TemplateSectionSubmission } from '../../api/models/Template/TemplateSection';
import CreateResponseData from '../../api/models/ResponseData/CreateResponseData';

import TemplateSummary from './TemplateSummary/TemplateSummary';
import TemplateSectionComponent from './TemplateSection/TemplateSectionComponent';
import AddNewButton from '../Button/AddNewButton/AddNewButton';
import Defaults from '../../api/DefaultValues';
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';
import classes from './Template.module.css';


const TemplateComponent: React.FC<{ templateId: string; editingAllowed: boolean }> = ({ templateId: templateIdProp, editingAllowed }) => {

	const AuthCtx = useContext(AuthContext);

	//set the default data used for new Sections
	const defaults = new Defaults();
	let defaultNewSection: TemplateSectionSubmission = { ...defaults.newTemplateSection, templateId: parseInt(templateIdProp) };

	const [showEditOption, setShowEditOption] = useState<boolean>(editingAllowed);
	const [template, setTemplate] = useState<Template>();
	const { apiReadRequest, apiUpdateRequest, apiCreateRequest, apiDeleteRequest, addingNew: addingNewSection } = useApi();

	useEffect(() => {

		let source = axios.CancelToken.source();

		apiReadRequest<Template>(TemplateModel.get(templateIdProp, source), setTemplate);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [templateIdProp]);

	const editTemplateHandler = (templateObject: Template) => {
		setTemplate(templateObject);
	};

	const updateSectionHandler = (editedSection: TemplateSection) => {
		if (template) {

			let source = axios.CancelToken.source();

			apiUpdateRequest<TemplateSection>(editedSection, source, TemplateSectionModel.update)

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

			//Change the the defaultNewSection's position to one more than the last step in the array.
			//If sections.length is 0, then position is 1. 
			defaultNewSection.position  = template.sections.length > 0 ? parseInt(template.sections[template.sections.length - 1].position.toString()) +1 : 1;

			const applyNewTemplateSectionId = (responseData: CreateResponseData) => {

				let newSectionArray = template.sections;
				newSectionArray.push({ ...defaultNewSection, steps: [], id: responseData.id });
				setTemplate({ ...template, sections: newSectionArray });
			}

			let source = axios.CancelToken.source();

			apiCreateRequest<TemplateSectionSubmission>(
				defaultNewSection,
				source,
				TemplateSectionModel.create,
				applyNewTemplateSectionId);
		}
	};

	const deleteSectionHandler = (sectionToDelete: TemplateSection) => {
		if (template) {

			let source = axios.CancelToken.source();

			if (sectionToDelete.id)
				apiDeleteRequest<TemplateSection>(
					sectionToDelete,
					source,
					TemplateSectionModel.delete);

			let newSectionArray = template.sections.filter((section) => {
				return section.id !== sectionToDelete.id;
			});

			setTemplate({ ...template, sections: newSectionArray });
		}
	};

	const updateTemplateHandler = () => {
		let source = axios.CancelToken.source();
		apiUpdateRequest<Template>(template!, source, TemplateModel.update);
	};

	if (template) {
		return (
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
							<TemplateSectionComponent
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
