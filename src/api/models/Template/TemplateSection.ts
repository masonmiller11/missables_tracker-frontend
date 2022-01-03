import TemplateStep from './TemplateStep';

class TemplateSection {

    id: number|null;
    name: string;
    description: string;
    position: number|string;
    steps: TemplateStep[];

    constructor(templateSection: TemplateSection) {
        this.id = templateSection.id;
        this.name = templateSection.name;
        this.description = templateSection.description;
        this.position = templateSection.position;
        this.steps = templateSection.steps;
    }
}

export default TemplateSection;