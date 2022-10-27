import {Vector2} from '@core/type/math';

export const Vector2Math = {
	length(a: Vector2): number {
		const x = a[0];
		const y = a[1];
		return Math.sqrt(x * x + y * y);
	},

	of(x: number, y: number): Vector2 {
		const out = new Float32Array(2);
		out[0] = x;
		out[1] = y;

		return out;
	},

	subtract(out: Vector2, a: Vector2, b: Vector2): void {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
	},
};