import {Action} from '.';

export class AddObjectAction extends Action {
	/*
	constructor({
		project,
		palette,
		engine,
		modelHash,
	}) {
		super();
		let object;
	}
	*/

	execute(): void {
		/*
		if (!object) {
			object = Entity({
				model: palette.identityMap[modelHash],
				position: engine.viewController.target,
			});
		}
		project.scene.push(object);
		*/
	}

	cancel(): void {
		//project.scene.pop();
	}

	toString(): void {
		//return 'Add object to scene';
	}
}
