import {Action} from '.';

export class MoveObjectAction extends Action {
	constructor (/*private objects: Entity[], private vector: Vector3*/) {
		super();
		console.log(this.toString());
		/*
		super();
		const initialPositions = objects.map((object) => object.getPosition());
		*/
	}

	cancel(): void {
		/*
		objects.forEach((object, index) => {
			object.move(initialPositions[index]);
		});
		*/
	}

	execute(): void {
		/*
		objects.forEach((object, index) => {
			object.move(ml.v3.add(ml.v3.init(), vector, initialPositions[index]));
		});
		*/
	}

	toString(): string {
		return 'Move object';
	}
}
