import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import classes from './Template.module.css';
import TemplateModel from '../../api/models/Template/Template';
import TemplateSummary from './TemplateSummary/TemplateSummary';
import TemplateSection from './TemplateSection/TemplateSectionComponent';
import TemplateSectionModel from '../../api/models/Template/TemplateSection';
import AddNewButton from '../Button/AddNewButton/AddNewButton';
import Defaults from '../../api/DefaultValues';
import { apiReadTemplate, apiCreateTemplateSection, apiDeleteTemplateSection, apiPatchTemplateSection, apiPatchTemplate } from '../../api';
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';

const TemplateComponent: React.FC<{
	templateId: string;
	editingAllowed: boolean;
}> = ({ templateId: templateIdProp, editingAllowed }) => {

	const AuthCtx = useContext(AuthContext);

	//set the default data used for new Sections
	const defaults = new Defaults();
	let defaultNewSection: TemplateSectionModel = defaults.newTemplateSection;

	const [showEditOption, setShowEditOption] = useState<boolean>(editingAllowed);
	const [template, setTemplate] = useState<TemplateModel>();
	const { apiGetRequest, apiPatchRequest, apiCreateRequest, apiDeleteRequest, addingNew: addingNewSection } = useApi();

	useEffect(() => {

		let source = axios.CancelToken.source();

		apiGetRequest<TemplateModel | undefined>(setTemplate, apiReadTemplate, [templateIdProp, source]);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [templateIdProp]);

	const editTemplateHandler = (templateObject: TemplateModel) => {
		setTemplate(templateObject);
	};

	const updateSectionHandler = (editedSection: TemplateSectionModel) => {
		if (template) {

			let source = axios.CancelToken.source();

			if (AuthCtx.token) {
				apiPatchRequest<TemplateSectionModel>(editedSection, AuthCtx.token, source, apiPatchTemplateSection)
			}

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

			const applyNewTemplateSection = (newSection: TemplateSectionModel) => {

				let newSectionArray = template.sections;
				newSectionArray.push(newSection);
				setTemplate({ ...template, sections: newSectionArray });
			}

			if (AuthCtx.token) {

				let source = axios.CancelToken.source();

				apiCreateRequest<TemplateSectionModel>(
					defaultNewSection,
					template.id,
					AuthCtx.token,
					source,
					apiCreateTemplateSection,
					applyNewTemplateSection);
			}

		}

	};

	const deleteSectionHandler = (sectionToDelete: TemplateSectionModel) => {
		if (template) {

			let source = axios.CancelToken.source();

			if (AuthCtx.token && sectionToDelete.id)
				apiDeleteRequest(sectionToDelete.id, apiDeleteTemplateSection, AuthCtx.token, source)

			let newSectionArray = template.sections.filter((section) => {
				return section.id !== sectionToDelete.id;
			});

			setTemplate({ ...template, sections: newSectionArray });
		}
	};

	const updateTemplateHandler = () => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiPatchRequest<TemplateModel>(template!, AuthCtx.token, source, apiPatchTemplate);

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
