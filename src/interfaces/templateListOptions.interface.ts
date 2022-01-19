import TemplateModel from "../api/models/Template/Template";

export interface TemplateListOptions {
	showCover: boolean,
	showFavoriteStar: boolean,
	templateGuideUrl: string,
	allowDelete: boolean,
	onDelete?: (template: TemplateModel)=> void
}


export default TemplateListOptions;