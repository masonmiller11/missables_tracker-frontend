import TemplateSectionModel from './models/Template/TemplateSection';
import TemplateStepModel from './models/Template/TemplateStep';

class Defaults {

	newStep: TemplateStepModel;
	newSection: TemplateSectionModel;

	constructor() {
		this.newStep = {
			"id": null,
			"name": "New Step",
			"position": 100,
			"description": "New Step Description."
		}

		this.newSection = {
			"id": null,
			"name": "New Section",
			"description": "New Section Description",
			"position": 100,
			"steps": []
		}
	}


}

export default Defaults;