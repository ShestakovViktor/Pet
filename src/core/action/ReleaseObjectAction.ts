import {Action} from '.';

export class ReleaseObjectAction extends Action {
	constructor(/*{ objects }*/) {
		super();
		console.log(this.toString());
		//const type = 'system';
	}

	cancel(): void {
		//objects.forEach((object) => object.occupy());
	}

	execute(): void {
		//objects.forEach((object) => object.release());
	}

	toString(): string {
		return 'Release object';
	}
}
