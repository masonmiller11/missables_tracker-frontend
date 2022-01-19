import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';

import PlaythroughModel from '../../api/models/Playthrough/Playthrough';
import PlaythroughSummary from './PlaythroughSummary/PlaythroughSummary';
import Section from './Section/SectionComponent';
import SectionModel from '../../api/models/Playthrough/Section';
import AddNewButton from '../Button/AddNewButton/AddNewButton';
import Defaults from '../../api/DefaultValues';
import { apiReadPlaythrough, apiCreateSection, apiDeleteSection, apiPatchSection, apiPatchPlaythrough } from '../../api';
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
	let defaultNewSection: SectionModel = defaults.newSection;

	const [playthrough, setPlaythrough] = useState<PlaythroughModel>();
	const { apiGetReq, apiGetRequest, apiPatchRequest, apiCreateRequest, apiDeleteRequest, addingNew: addingNewSection } = useApi();

	useEffect(() => {

		let source = axios.CancelToken.source();

		apiGetReq<PlaythroughModel | undefined>(setPlaythrough, apiReadPlaythrough, [playthroughIdProp, AuthCtx.token, source]);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [playthroughIdProp]);

	const editPlaythroughHandler = (playthroughObject: PlaythroughModel) => {
		setPlaythrough(playthroughObject);
	};

	const updateSectionHandler = (editedSection: SectionModel) => {
		if (playthrough) {

			let source = axios.CancelToken.source();

			if (AuthCtx.token) {
				apiPatchRequest<SectionModel>(editedSection, AuthCtx.token, source, apiPatchSection)
			}

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

			const applyNewSection = (newSection: SectionModel) => {

				let newSectionArray = playthrough.sections;
				newSectionArray.push(newSection);
				setPlaythrough({ ...playthrough, sections: newSectionArray });
			}

			if (AuthCtx.token) {

				let source = axios.CancelToken.source();

				apiCreateRequest<SectionModel>(
					defaultNewSection,
					playthrough.id,
					AuthCtx.token,
					source,
					apiCreateSection,
					applyNewSection);
			}

		}

	};

	const deleteSectionHandler = (sectionToDelete: SectionModel) => {
		if (playthrough) {

			let source = axios.CancelToken.source();

			if (AuthCtx.token && sectionToDelete.id)
				apiDeleteRequest(sectionToDelete.id, apiDeleteSection, AuthCtx.token, source)

			let newSectionArray = playthrough.sections.filter((section) => {
				return section.id !== sectionToDelete.id;
			});

			setPlaythrough({ ...playthrough, sections: newSectionArray });
		}
	};

	const updatePlaythroughHandler = () => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiPatchRequest<PlaythroughModel>(playthrough!, AuthCtx.token, source, apiPatchPlaythrough);

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
								<Section
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
