import PlaythroughModel from "../api/models/Playthrough/Playthrough";

export interface TemplateListOptions {
	playthroughUrl: string,
	onDelete: (playthrough: PlaythroughModel)=> void
}


export default TemplateListOptions;