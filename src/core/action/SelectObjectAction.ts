import {Action} from '.';

export class SelectObjectAction extends Action {
	constructor(/*{ storage, objects }*/) {
		super();
		console.log(this.toString());
		//const initialStorage = Array.from(storage);
	}

	cancel(): void {
		/*
		storage.forEach((object) => object.deselect());
		storage.length = 0;
		initialStorage.forEach((object) => {
			object.select();
			storage.push(object);
		});
		*/
	}

	execute(): void {
		/*
		storage.forEach((object) => object.deselect());
		storage.length = 0;
		objects.forEach((object) => {
			object.select();
			storage.push(object);
		});
		*/
	}

	toString(): string {
		return 'Selectiong object';
	}
}
