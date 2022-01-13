import TemplateModel from "../api/models/Template/Template";
import TemplateList from "../components/GameTemplates/TemplateList/TemplateList";

export interface TemplateListOptions {
	showCover: boolean,
	showFavoriteStar: boolean,
	templateGuideUrl: string,
	allowDelete: boolean,
	onDelete?: (template: TemplateModel)=> void
}


export default TemplateListOptions;