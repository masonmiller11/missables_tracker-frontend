import React, { useState, useEffect } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import classes from './Template.module.css';
import Template from '../../api/models/Template/Template';
import TemplateSummary from './TemplateSummary/TemplateSummary';
import TemplateSection from './TemplateSection/TemplateSectionComponent';
import TemplateSectionModel from '../../api/models/Template/TemplateSection';

const TemplateComponent: React.FC<{ templateId: string, editingAllowed: boolean }> = ({
	templateId: templateIdProp,
	editingAllowed
}) => {

	const [template, setTemplate] = useState<Template>();

	const [showEditOption, setShowEditOption] = useState<boolean>(editingAllowed);

	useEffect(() => {


		let fakeTemplate = {
			"title": "test update3",
			"description": "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			"id": 1,
			"visibility": true,
			"image": 'https://images.igdb.com/igdb/image/upload/t_cover_big/co272w.jpg',
			"owner": {
				"ownerID": 3,
				"owner": "testuser@example.com"
			},
			"game": {
				"gameID": 3,
				"gameTitle": "Yakuza 0"
			},
			"stepPositions": [
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12
			],
			"sectionPositions": [
				1,
				2,
				3
			],
			"likes": 0,
			"sections": [
				{
					"id": 1,
					"name": "Test Name1",
					"description": "Test Description1",
					"position": 1,
					"steps": [
						{
							"id": 1,
							"name": "Test Name1",
							"position": 1,
							"description": "Test Description1"
						},
						{
							"id": 2,
							"name": "Test Name2",
							"position": 2,
							"description": "Test Description2"
						},
						{
							"id": 3,
							"name": "Test Name3",
							"position": 3,
							"description": "Test Description3"
						},
						{
							"id": 4,
							"name": "Test Name4",
							"position": 4,
							"description": "Test Description4"
						}
					]
				},
				{
					"id": 2,
					"name": "Test Name2",
					"description": "Test Description2",
					"position": 2,
					"steps": [
						{
							"id": 5,
							"name": "Test Name1",
							"position": 5,
							"description": "Test Description1"
						},
						{
							"id": 6,
							"name": "Test Name2",
							"position": 6,
							"description": "Test Description2"
						},
						{
							"id": 7,
							"name": "Test Name3",
							"position": 7,
							"description": "Test Description3"
						},
						{
							"id": 8,
							"name": "Test Name4",
							"position": 8,
							"description": "Test Description4"
						}
					]
				},
				{
					"id": 3,
					"name": "Test Name3",
					"description": "Test Description3",
					"position": 1,
					"steps": [
						{
							"id": 9,
							"name": "Test Name1",
							"position": 9,
							"description": "Test Description1"
						},
						{
							"id": 10,
							"name": "Test Name2",
							"position": 10,
							"description": "Test Description2"
						},
						{
							"id": 11,
							"name": "Test Name3",
							"position": 11,
							"description": "Test Description3"
						},
						{
							"id": 12,
							"name": "Test Name4",
							"position": 2,
							"description": "Test Description4"
						}
					]
				}
			]
		};

		setTemplate(fakeTemplate);

	}, []);

	useEffect(() => { console.log('template has changed')}, [template])

	const updateSectionHandler = (editedSection: TemplateSectionModel) => {

		if (template) {

			console.log('in updateSectionHandler');

			//find index of section we're updating
			let indexOfSection = template.sections.findIndex(section => section.id === editedSection.id);


			//create newStepsArray, removing the original values of the editedSection
			let newSectionsArray = template.sections.filter((section) => { return section.id !== editedSection.id; });


			//splice in the new editedTemplate
			newSectionsArray?.splice(indexOfSection, 0, editedSection);

			//reset the state property
			setTemplate({ ...template, sections: newSectionsArray })

		}

	}


	if (template) {
		return (

			<div className={classes.templateBackground}>

				<div className={classes.templatesContainer}>
					<TemplateSummary template={template} showEditOption={showEditOption} />

					<div className={classes.sectionsContainer}>
						{template.sections.sort((a, b) => (a.position > b.position) ? 1 : -1)
							.map((section) => (
								<TemplateSection
									key={section.id}
									templateSection={section}
									showEditOption={showEditOption}
									onSectionUpdate={updateSectionHandler}
								/>
							))}
					</div>

				</div>
			</div>

		)
	}

	{
		return <Spinner className={classes.spinner} />;
	}

}

export default TemplateComponent;