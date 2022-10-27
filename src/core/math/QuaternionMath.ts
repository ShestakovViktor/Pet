import {Quaternion, Vector3} from '@core/type/math';

export const QuaternionMath = {

	init(): Quaternion {
		const out = new Float32Array(4);
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 1;
		return out;
	},

	initFromValues(x: number, y: number, z: number, w: number): Quaternion {
		const out = new Float32Array(4);
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;
		return out;
	},

	initFromVector(a: Vector3): Quaternion {
		const out = new Float32Array(4);
		out[0] = a[0];
		out[1] = a[1];
		out[2] = a[2];
		out[3] = 1;
		return out;
	},

	initFromAxisAngle(axis: Vector3, rad: number): Quaternion {
		const out = new Float32Array(4);
		rad = rad * 0.5;

		const s = Math.sin(rad);
		out[0] = s * axis[0];
		out[1] = s * axis[1];
		out[2] = s * axis[2];
		out[3] = Math.cos(rad);
		return out;
	},

	multiply(out: Quaternion, a: Quaternion, b: Quaternion): void {
		const ax = a[0];
		const ay = a[1];
		const az = a[2];
		const aw = a[3];
		const bx = b[0];
		const by = b[1];
		const bz = b[2];
		const bw = b[3];

		out[0] = ax * bw + aw * bx + ay * bz - az * by;
		out[1] = ay * bw + aw * by + az * bx - ax * bz;
		out[2] = az * bw + aw * bz + ax * by - ay * bx;
		out[3] = aw * bw - ax * bx - ay * by - az * bz;
	},
};