import {Action} from '.';

export class OccupyObjectAction extends Action {
	constructor(/*{ objects }*/) {
		super();
		console.log(this.toString());
		//const type = 'system';
	}

	cancel(): void {
		//objects.forEach((object) => object.release());
	}

	execute(): void {
		//objects.forEach((object) => object.occupy());
	}

	toString(): string {
		return 'Occupy object';
	}
}
