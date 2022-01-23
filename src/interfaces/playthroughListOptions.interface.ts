import {Playthrough} from "../api/models/Playthrough/Playthrough";

export interface TemplateListOptions {
	playthroughUrl: string,
	onDelete: (playthrough: Playthrough)=> void
}


export default TemplateListOptions;