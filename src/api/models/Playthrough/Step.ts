class Step {

    id: number|string|null;
    name: string;
    position: number|string;
	description: string;
	isCompleted: boolean;

    constructor(step: Step) {
        this.id = step.id;
        this.name = step.name;
        this.position = step.position;
		this.description = step.description;
		this.isCompleted = step.isCompleted;
    }
}

export default Step;
