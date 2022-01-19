import TemplateSection from './TemplateSection';

class Template {

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
    stepPositions: number[];
    sectionPositions: number[];
    likes: number;
    sections: TemplateSection[];

    constructor(template: Template) {
        this.title = template.title;
        this.description = template.description;
        this.id = template.id;
        this.visibility = template.visibility;
        this.owner = template.owner;
        this.game = template.game;
        this.stepPositions = template.stepPositions;
        this.sectionPositions = template.sectionPositions;
        this.likes = template.likes;
        this.sections = template.sections;
    }
}

export default Template;
