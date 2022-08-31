import {Engine} from '@engine';
import {Model, Vector3} from '@engine/type';

export class Geometry {
	constructor(private engine: Engine){}

	ray(dir: Vector3): Model {
		return this.engine.createModel(
			[
				0, 0, 0,
				dir[0], dir[1], dir[2],
			],
			[0, 1],
			{
				stride: 12,
				position: 0,
			},
			'LINES'
		);
	}

	square(size: number, mode: 'LINES' | 'TRIANGLES' = 'LINES'): Model {
		return this.engine.createModel(
			[
				-size / 2, 0, -size / 2,
				-size / 2, 0, size / 2,
				size / 2, 0, size / 2,
				size / 2, 0, -size / 2,
			],
			[0, 1, 1, 2, 2, 3, 3, 0],
			{
				stride: 12,
				position: 0,
			},
			mode
		);
	}

	origin(): Model {
		return this.engine.createModel(
			[
				0, 0, 0, 255, 0, 0,
				1, 0, 0, 255, 0, 0,
				0, 0, 0, 0, 255, 0,
				0, 1, 0, 0, 255, 0,
				0, 0, 0, 0, 0, 255,
				0, 0, 1, 0, 0, 255,
			],
			[0, 1, 2, 3, 4, 5],
			{
				stride: 24,
				position: 0,
				color: 12,
			},
			'LINES'
		);
	}

	grid(size = 10, step = 1): Model {
		const v = [];
		const i = [];

		for (let i = -size / 2; i <= size / 2; i += step) {
			v.push(-size / 2, 0, i, size / 2, 0, i);
			v.push(i, 0, -size / 2, i, 0, size / 2);
		}

		for (let j = 0; j < v.length / 3; j++) i.push(j);
		return this.engine
			.createModel(v, i, {stride: 0, position: 0}, 'LINES');
	}
}

