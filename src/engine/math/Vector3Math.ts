/* eslint-disable prefer-const */
import {Matrix3, Matrix4, Quaternion, Vector3} from '@engine/type';

export const Vector3Math = {
	init(x = 0, y = 0, z = 0): Vector3 {
		const out = new Float32Array(3);
		out[0] = x;
		out[1] = y;
		out[2] = z;

		return out;
	},

	initFromValues(x = 0, y = 0, z = 0): Vector3 {
		const out = new Float32Array(3);
		out[0] = x;
		out[1] = y;
		out[2] = z;

		return out;
	},

	initFromVector(a: Vector3): Vector3 {
		const out = new Float32Array(3);
		out[0] = a[0];
		out[1] = a[1];
		out[2] = a[2];
		return out;
	},

	length(a: Vector3): number {
		const x = a[0];
		const y = a[1];
		const z = a[2];

		return Math.sqrt(x * x + y * y + z * z);
	},

	scale(out: Vector3, a: Vector3, b: number): Vector3 {
		out[0] = a[0] * b;
		out[1] = a[1] * b;
		out[2] = a[2] * b;

		return out;
	},

	normalize(out: Vector3, a: Vector3): Vector3 {
		const x = a[0];
		const y = a[1];
		const z = a[2];

		let len = x * x + y * y + z * z;

		if (len > 0) {
			len = 1 / Math.sqrt(len);
			out[0] = a[0] * len;
			out[1] = a[1] * len;
			out[2] = a[2] * len;
		}

		return out;
	},

	add(out: Vector3, a: Vector3, b: Vector3): Vector3 {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];

		return out;
	},

	subtract(out: Vector3, a: Vector3, b: Vector3): Vector3 {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];

		return out;
	},

	cross(out: Vector3, a: Vector3, b: Vector3): Vector3 {
		const ax = a[0];
		const ay = a[1];
		const az = a[2];
		const bx = b[0];
		const by = b[1];
		const bz = b[2];

		out[0] = ay * bz - az * by;
		out[1] = az * bx - ax * bz;
		out[2] = ax * by - ay * bx;

		return out;
	},

	dot(a: Vector3, b: Vector3): number {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	},

	transform(out: Vector3, a: Vector3, m: Matrix4): Vector3 {
		const x = a[0];
		const y = a[1];
		const z = a[2];
		let w = m[3] * x + m[7] * y + m[11] * z + m[15];

		w = w || 1.0;

		out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
		out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
		out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;

		return out;
	},

	transformMat3(out: Vector3, a: Vector3, m: Matrix3): Vector3 {
		const x = a[0];
		const y = a[1];
		const z = a[2];

		out[0] = x * m[0] + y * m[3] + z * m[6];
		out[1] = x * m[1] + y * m[4] + z * m[7];
		out[2] = x * m[2] + y * m[5] + z * m[8];

		return out;
	},

	transformQuat(out: Vector3, a: Vector3, q: Quaternion): Vector3 {
		// benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
		let qx = q[0];
		let qy = q[1];
		let qz = q[2];
		let qw = q[3];
		let x = a[0];
		let y = a[1];
		let z = a[2];


		let uvx = qy * z - qz * y;
		let uvy = qz * x - qx * z;
		let uvz = qx * y - qy * x;

		let uuvx = qy * uvz - qz * uvy;
		let uuvy = qz * uvx - qx * uvz;
		let uuvz = qx * uvy - qy * uvx;

		let w2 = qw * 2;
		uvx *= w2;
		uvy *= w2;
		uvz *= w2;

		uuvx *= 2;
		uuvy *= 2;
		uuvz *= 2;

		out[0] = x + uvx + uuvx;
		out[1] = y + uvy + uuvy;
		out[2] = z + uvz + uuvz;
		return out;
	},
};