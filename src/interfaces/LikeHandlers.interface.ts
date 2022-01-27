import { Like } from "../api/models/Like/Like";

export interface LikeHandlers {
	onDelete: (templateId: number | string) => void,
	onCreate: (templateId: number | string) => void
}


export default LikeHandlers;