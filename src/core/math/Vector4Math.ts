import {Matrix4, Vector4} from '@core/type/math';

export const Vector4Math = {
	fromValues(x: number, y: number, z: number, w: number): Vector4 {
		const out = new Float32Array(4);
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;
		return out;
	},

	transformMat4(out: Vector4, a: Vector4, m: Matrix4): void {
		const x = a[0];
		const y = a[1];
		const z = a[2];
		const w = a[3];

		out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
		out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
		out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
		out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
	},
};