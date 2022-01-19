import Step from './Step';

class Section {

    id: number|null;
    name: string;
    description: string;
    position: number|string;
    steps: Step[];

    constructor(section: Section) {
        this.id = section.id;
        this.name = section.name;
        this.description = section.description;
        this.position = section.position;
        this.steps = section.steps;
    }
}

export default Section;