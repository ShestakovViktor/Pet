import {Matrix3, Matrix4, Quaternion} from '@engine/type';

export const Matrix3Math = {

	invert(out: Matrix3, a: Matrix3): Matrix3 | undefined {
		const a00 = a[0];
		const a01 = a[1];
		const a02 = a[2];
		const a10 = a[3];
		const a11 = a[4];
		const a12 = a[5];
		const a20 = a[6];
		const a21 = a[7];
		const a22 = a[8];

		const b01 = a22 * a11 - a12 * a21;
		const b11 = -a22 * a10 + a12 * a20;
		const b21 = a21 * a10 - a11 * a20;

		// Calculate the determinant
		let det = a00 * b01 + a01 * b11 + a02 * b21;

		if (!det) {
			return;
		}
		det = 1.0 / det;

		out[0] = b01 * det;
		out[1] = (-a22 * a01 + a02 * a21) * det;
		out[2] = (a12 * a01 - a02 * a11) * det;
		out[3] = b11 * det;
		out[4] = (a22 * a00 - a02 * a20) * det;
		out[5] = (-a12 * a00 + a02 * a10) * det;
		out[6] = b21 * det;
		out[7] = (-a21 * a00 + a01 * a20) * det;
		out[8] = (a11 * a00 - a01 * a10) * det;
		return out;
	},

	init(): Matrix3 {
		const out = new Float32Array(9);
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[5] = 0;
		out[6] = 0;
		out[7] = 0;
		out[0] = 1;
		out[4] = 1;
		out[8] = 1;
		return out;
	},

	fromMat4(a: Matrix4): Matrix3 {
		const out = new Float32Array(9);
		out[0] = a[0];
		out[1] = a[1];
		out[2] = a[2];
		out[3] = a[4];
		out[4] = a[5];
		out[5] = a[6];
		out[6] = a[8];
		out[7] = a[9];
		out[8] = a[10];
		return out;
	},

	initFromValues(
		m00: number,
		m01: number,
		m02: number,
		m10: number,
		m11: number,
		m12: number,
		m20: number,
		m21: number,
		m22: number
	): Matrix3 {
		const out = new Float32Array(9);
		out[0] = m00;
		out[1] = m01;
		out[2] = m02;
		out[3] = m10;
		out[4] = m11;
		out[5] = m12;
		out[6] = m20;
		out[7] = m21;
		out[8] = m22;
		return out;
	},

	fromQuat(q: Quaternion): Matrix3 {
		const out = new Float32Array(9);

		const x = q[0];
		const y = q[1];
		const z = q[2];
		const w = q[3];

		const x2 = x + x;
		const y2 = y + y;
		const z2 = z + z;

		const xx = x * x2;
		const yx = y * x2;
		const yy = y * y2;
		const zx = z * x2;
		const zy = z * y2;
		const zz = z * z2;
		const wx = w * x2;
		const wy = w * y2;
		const wz = w * z2;

		out[0] = 1 - yy - zz;
		out[3] = yx - wz;
		out[6] = zx + wy;

		out[1] = yx + wz;
		out[4] = 1 - xx - zz;
		out[7] = zy - wx;

		out[2] = zx - wy;
		out[5] = zy + wx;
		out[8] = 1 - xx - yy;

		return out;
	},
};