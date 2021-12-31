class TemplateStep {

    id: number;
    name: string;
    position: number|string;
    description: string;

    constructor(templateStep: TemplateStep) {
        this.id = templateStep.id;
        this.name = templateStep.name;
        this.position = templateStep.position;
        this.description = templateStep.description;
    }
}

export default TemplateStep;
