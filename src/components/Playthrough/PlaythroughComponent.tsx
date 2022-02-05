import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import PlaythroughModel, { Playthrough } from '../../api/models/Playthrough/Playthrough';
import SectionModel, { Section, SectionSubmission } from '../../api/models/Playthrough/Section';
import CreateResponseData from '../../api/models/ResponseData/CreateResponseData';

import PlaythroughSummary from './PlaythroughSummary/PlaythroughSummary';
import SectionComponent from './Section/SectionComponent';
import AddNewButton from '../Button/AddNewButton/AddNewButton';
import Defaults from '../../api/DefaultValues';
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';

import classes from './Playthrough.module.css';

const PlaythroughComponent: React.FC<{
	playthroughId: string;
	editingAllowed: boolean;
}> = ({ playthroughId: playthroughIdProp, editingAllowed }) => {

	const AuthCtx = useContext(AuthContext);

	//set the default data used for new Sections
	const defaults = new Defaults();
	let defaultNewSection: SectionSubmission = { ...defaults.newSection, playthroughId: parseInt(playthroughIdProp) };

	const [playthrough, setPlaythrough] = useState<Playthrough>();
	const { apiReadRequest, apiUpdateRequest, apiCreateRequest, apiDeleteRequest, addingNew: addingNewSection } = useApi();

	useEffect(() => {

		let source = axios.CancelToken.source();

		apiReadRequest<Playthrough | undefined>(PlaythroughModel.read(playthroughIdProp, source), setPlaythrough);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [playthroughIdProp]);

	const editPlaythroughHandler = (playthroughObject: Playthrough) => {
		setPlaythrough(playthroughObject);
	};

	const updateSectionHandler = (editedSection: Section) => {
		if (playthrough) {

			let source = axios.CancelToken.source();

			apiUpdateRequest<Section>(editedSection, source, SectionModel.update);

			//find index of section we're updating
			let indexOfSection = playthrough.sections.findIndex(
				(section) => section.id === editedSection.id
			);

			//create newStepsArray, removing the original values of the editedSection
			let newSectionsArray = playthrough.sections.filter((section) => {
				return section.id !== editedSection.id;
			});

			//splice in the new editedTemplate
			newSectionsArray?.splice(indexOfSection, 0, editedSection);

			//reset the state property
			setPlaythrough({ ...playthrough, sections: newSectionsArray });
		}
	};

	const addNewSectionHandler = () => {
		if (playthrough) {

			const applyNewSectionId = (responseData: CreateResponseData) => {

				let newSectionArray = playthrough.sections;
				newSectionArray.push({ ...defaultNewSection, id: responseData.id, steps: [] });
				setPlaythrough({ ...playthrough, sections: newSectionArray });
			}

			let source = axios.CancelToken.source();

			apiCreateRequest<SectionSubmission>(
				defaultNewSection,
				source,
				SectionModel.create,
				applyNewSectionId);

		}

	};

	const deleteSectionHandler = (sectionToDelete: Section) => {
		if (playthrough) {

			let source = axios.CancelToken.source();

			if (sectionToDelete.id)
				apiDeleteRequest(sectionToDelete, source, SectionModel.delete)

			let newSectionArray = playthrough.sections.filter((section) => {
				return section.id !== sectionToDelete.id;
			});

			setPlaythrough({ ...playthrough, sections: newSectionArray });
		}
	};

	const updatePlaythroughHandler = () => {
		let source = axios.CancelToken.source();
		apiUpdateRequest<Playthrough>(playthrough!, source, PlaythroughModel.update);
	};

	if (playthrough) {
		return (
			<div className={classes.playthroughBackground}>
				<div className={classes.playthroughContainer}>
					<PlaythroughSummary
						playthrough={playthrough}
						showEditOption={editingAllowed}
						onPlaythroughChange={editPlaythroughHandler}
						onPlaythroughConfirm={updatePlaythroughHandler}
					/>

					<div className={classes.sectionsContainer}>
						{playthrough.sections
							.sort((a, b) => (a.position > b.position ? 1 : -1))
							.map((section) => (
								<SectionComponent
									key={section.id}
									section={section}
									showEditOption={editingAllowed}
									onUpdateSection={updateSectionHandler}
									onDeleteSection={deleteSectionHandler}
								/>
							))}
					</div>
					<div className={classes.addNewSectionButton}>
						{editingAllowed && (
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

export default PlaythroughComponent;
