import {Action} from '.';

export class RotateObjectAction extends Action {
	constructor(/*{ object, axis, angle }*/) {
		super();
		console.log(this.toString());
		//const initialState = ml.m4.from(object.transform);
	}

	execute(): void {
		//ml.m4.rotate(object.transform, object.transform, axis, angle);
	}

	cancel(): void {
		//initialState.forEach((value, index) => (object.transform[index] = value));
	}

	toString(): string {
		return 'Rotate object';
	}
}
