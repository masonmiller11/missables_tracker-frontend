import { Template } from "../api/models/Template/Template";

export interface TemplateListOptions {
	showCover: boolean,
	showFavoriteStar: boolean,
	templateGuideUrl: string,
	allowDelete: boolean,
	onDelete?: (template: Template) => void
}


export default TemplateListOptions;