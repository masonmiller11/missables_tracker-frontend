import Template from "../api/models/Template/Template";
import TemplateList from "../components/GameTemplates/TemplateList/TemplateList";

export interface TemplateListOptions {
	showCover: boolean,
	showFavoriteStar: boolean,
	templateGuideUrl: string
}


export default TemplateListOptions;