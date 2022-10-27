import {Vector3} from '@math';
import {Data} from '@core/type';


export class Geometry {
	ray(dir: Vector3): Data {
		return {
			vertices: [
				0, 0, 0,
				dir[0], dir[1], dir[2],
			],
			indices: [0, 1],
			layout: {
				stride: 12,
				position: 0,
			},
			mode: 'LINES',
		};
	}

	square(size: number, mode: 'LINES' | 'TRIANGLES' = 'LINES'): Data {
		return {
			vertices: [
				-size / 2, 0, -size / 2,
				-size / 2, 0, size / 2,
				size / 2, 0, size / 2,
				size / 2, 0, -size / 2,
			],
			indices: [0, 1, 1, 2, 2, 3, 3, 0],
			layout: {
				stride: 12,
				position: 0,
			},
			mode,
		};
	}

	origin(): Data {
		return {
			vertices: [
				0, 0, 0, 255, 0, 0,
				1, 0, 0, 255, 0, 0,
				0, 0, 0, 0, 255, 0,
				0, 1, 0, 0, 255, 0,
				0, 0, 0, 0, 0, 255,
				0, 0, 1, 0, 0, 255,
			],
			indices: [0, 1, 2, 3, 4, 5],
			layout: {
				stride: 24,
				position: 0,
				color: 12,
			},
			mode: 'LINES',
		};
	}

	grid(size = 10, step = 1): Data {
		const v = [];
		const i = [];

		for (let i = -size / 2; i <= size / 2; i += step) {
			v.push(-size / 2, 0, i, size / 2, 0, i);
			v.push(i, 0, -size / 2, i, 0, size / 2);
		}

		for (let j = 0; j < v.length / 3; j++) i.push(j);
		return {
			vertices: v,
			indices: i,
			layout: {stride: 0, position: 0},
			mode: 'LINES',
		};
	}
}