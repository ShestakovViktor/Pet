import {Action} from '.';

export class ScaleObjectAction extends Action {
	constructor(/*{ object, vector }*/) {
		super();
		console.log(this.toString());
		//const initial = Float32Array.from(object.transform);
	}

	cancel(): void {
		//initial.forEach((value, index) => (object.transform[index] = value));
	}

	execute(): void {
		//ml.m4.scale(object.transform, object.transform, vector);
	}

	toString(): string {
		return 'Scale object';
	}
}
