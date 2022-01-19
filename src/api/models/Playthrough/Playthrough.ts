import Section from './Section';

class Playthrough {

    title: string;
    description: string;
    id: number;
    visibility: boolean;
    owner: {
        ownerID: number,
        owner: string
    };
    game: {
        gameID: number|string,
        gameTitle: string,
        cover: string;
	};
	templateId: number|string;
    sections: Section[];

    constructor(playthrough: Playthrough) {
        this.title = playthrough.title;
        this.description = playthrough.description;
        this.id = playthrough.id;
        this.visibility = playthrough.visibility;
        this.owner = playthrough.owner;
        this.game = playthrough.game;
        this.templateId = playthrough.templateId;
        this.sections = playthrough.sections;
    }
}

export default Playthrough;
