//import { Entity } from '.';

export class Project{
	private name = 'default';
	//private scene: Entity = [];
	private snapshots = [];


	/*
	constructor() {
		//let carret = snapshots.length;
	}

	dump(): string {
		return JSON.stringify({
			name: this.name,
			scene: this.scene.map((entity) =>
				Object.assign({}, entity, {
					transform: Array.from(entity.transform),
					color: Array.from(entity.color),
					model: entity.model.uid,
				})
			),
		});
	}

	load(str: string): void {
		const project = JSON.parse(str);

		scene.length = 0;
		project.scene.forEach(async (entity) => {
			await palette.test(entity.model);
			entity.color = Float32Array.from(entity.color);
			entity.transform = Float32Array.from(entity.transform);
			scene.push(
				Entity({ ...entity, model: palette.identityMap[entity.model] })
			);
		});
	}

	snapshot() {
		snapshots.splice(carret + 1);
		snapshots.push({
			name,
			scene: scene.map((ent) => {
				return Object.keys(ent).reduce((acc, key) => {
					if (key === 'transform') acc[key] = Float32Array.from(ent[key]);
					else acc[key] = ent[key];
					return acc;
				}, {});
			}),
		});

		carret = snapshots.length - 1;
	}
	*/
}

/*
if (Array.isArray(object)) return object.map((el) => snapshot(el));
else if (typeof object === 'object')
	return Object.keys(object).reduce((acc, key) => {
		if (key === 'position') acc[key] = Float32Array.from(object[key]);
		else if (key === 'model') acc[key] = object[key];
		else acc[key] = snapshot(object[key]);
		return acc;
	}, {});
else return object;
*/
