import {Matrix4, Vector3, Quaternion} from '@core/type/math';

const EPSILON = 0.000001;

export const Matrix4Math = {
	fromRotationTranslation(out: Matrix4, q: Quaternion, v: Vector3): Matrix4 {
		const x = q[0];
		const y = q[1];
		const z = q[2];
		const w = q[3];

		const x2 = x + x;
		const y2 = y + y;
		const z2 = z + z;

		const xx = x * x2;
		const xy = x * y2;
		const xz = x * z2;
		const yy = y * y2;
		const yz = y * z2;
		const zz = z * z2;
		const wx = w * x2;
		const wy = w * y2;
		const wz = w * z2;

		out[0] = 1 - (yy + zz);
		out[1] = xy + wz;
		out[2] = xz - wy;
		out[3] = 0;
		out[4] = xy - wz;
		out[5] = 1 - (xx + zz);
		out[6] = yz + wx;
		out[7] = 0;
		out[8] = xz + wy;
		out[9] = yz - wx;
		out[10] = 1 - (xx + yy);
		out[11] = 0;
		out[12] = v[0];
		out[13] = v[1];
		out[14] = v[2];
		out[15] = 1;

		return out;
	},

	init(): Matrix4 {
		const out = new Float32Array(16);
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	},

	from(a: Matrix4): Matrix4 {
		return Float32Array.from(a);
	},

	identity(out: Matrix4): Matrix4 {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	},

	invert(out: Matrix4, a: Matrix4): void {
		const a00 = a[0];
		const a01 = a[1];
		const a02 = a[2];
		const a03 = a[3];
		const a10 = a[4];
		const a11 = a[5];
		const a12 = a[6];
		const a13 = a[7];
		const a20 = a[8];
		const a21 = a[9];
		const a22 = a[10];
		const a23 = a[11];
		const a30 = a[12];
		const a31 = a[13];
		const a32 = a[14];
		const a33 = a[15];
		const b00 = a00 * a11 - a01 * a10;
		const b01 = a00 * a12 - a02 * a10;
		const b02 = a00 * a13 - a03 * a10;
		const b03 = a01 * a12 - a02 * a11;
		const b04 = a01 * a13 - a03 * a11;
		const b05 = a02 * a13 - a03 * a12;
		const b06 = a20 * a31 - a21 * a30;
		const b07 = a20 * a32 - a22 * a30;
		const b08 = a20 * a33 - a23 * a30;
		const b09 = a21 * a32 - a22 * a31;
		const b10 = a21 * a33 - a23 * a31;
		const b11 = a22 * a33 - a23 * a32;

		let det = b00 * b11
			- b01 * b10 + b02 * b09
			+ b03 * b08 - b04 * b07
			+ b05 * b06;

		if (!det) {
			return;
		}

		det = 1.0 / det;

		out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	},

	multiply(out: Matrix4, a: Matrix4, b: Matrix4): Matrix4 {
		const a00 = a[0];
		const a01 = a[1];
		const a02 = a[2];
		const a03 = a[3];
		const a10 = a[4];
		const a11 = a[5];
		const a12 = a[6];
		const a13 = a[7];
		const a20 = a[8];
		const a21 = a[9];
		const a22 = a[10];
		const a23 = a[11];
		const a30 = a[12];
		const a31 = a[13];
		const a32 = a[14];
		const a33 = a[15];

		let b0 = b[0];
		let b1 = b[1];
		let b2 = b[2];
		let b3 = b[3];
		out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[4];
		b1 = b[5];
		b2 = b[6];
		b3 = b[7];
		out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[8];
		b1 = b[9];
		b2 = b[10];
		b3 = b[11];
		out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[12];
		b1 = b[13];
		b2 = b[14];
		b3 = b[15];
		out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		return out;
	},

	scale(out: Matrix4, a: Matrix4, v: Vector3): void {
		const x = v[0];
		const y = v[1];
		const z = v[2];

		out[0] = a[0] * x;
		out[1] = a[1] * x;
		out[2] = a[2] * x;
		out[3] = a[3] * x;
		out[4] = a[4] * y;
		out[5] = a[5] * y;
		out[6] = a[6] * y;
		out[7] = a[7] * y;
		out[8] = a[8] * z;
		out[9] = a[9] * z;
		out[10] = a[10] * z;
		out[11] = a[11] * z;
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	},

	rotate(out: Matrix4, a: Matrix4, axis: Vector3, rad: number): void {
		let x = axis[0];
		let y = axis[1];
		let z = axis[2];

		let len = Math.sqrt(x * x + y * y + z * z);

		if (len < EPSILON) return;

		len = 1 / len;

		x *= len;
		y *= len;
		z *= len;

		const s = Math.sin(rad);
		const c = Math.cos(rad);
		const t = 1 - c;

		const a00 = a[0];
		const a01 = a[1];
		const a02 = a[2];
		const a03 = a[3];
		const a10 = a[4];
		const a11 = a[5];
		const a12 = a[6];
		const a13 = a[7];
		const a20 = a[8];
		const a21 = a[9];
		const a22 = a[10];
		const a23 = a[11];

		// Construct the elements of the rotation matrix
		const b00 = x * x * t + c;
		const b01 = y * x * t + z * s;
		const b02 = z * x * t - y * s;
		const b10 = x * y * t - z * s;
		const b11 = y * y * t + c;
		const b12 = z * y * t + x * s;
		const b20 = x * z * t + y * s;
		const b21 = y * z * t - x * s;
		const b22 = z * z * t + c;

		// Perform rotation-specific matrix multiplication
		out[0] = a00 * b00 + a10 * b01 + a20 * b02;
		out[1] = a01 * b00 + a11 * b01 + a21 * b02;
		out[2] = a02 * b00 + a12 * b01 + a22 * b02;
		out[3] = a03 * b00 + a13 * b01 + a23 * b02;
		out[4] = a00 * b10 + a10 * b11 + a20 * b12;
		out[5] = a01 * b10 + a11 * b11 + a21 * b12;
		out[6] = a02 * b10 + a12 * b11 + a22 * b12;
		out[7] = a03 * b10 + a13 * b11 + a23 * b12;
		out[8] = a00 * b20 + a10 * b21 + a20 * b22;
		out[9] = a01 * b20 + a11 * b21 + a21 * b22;
		out[10] = a02 * b20 + a12 * b21 + a22 * b22;
		out[11] = a03 * b20 + a13 * b21 + a23 * b22;

		if (a !== out) {
			// If the source and destination differ, copy the unchanged last row
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}
	},

	translate(out: Matrix4, a: Matrix4, v: Vector3): void {
		const x = v[0];
		const y = v[1];
		const z = v[2];

		if (a === out) {
			out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
			out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
			out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
			out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
		}
		else {
			const a00 = a[0];
			const a01 = a[1];
			const a02 = a[2];
			const a03 = a[3];
			const a10 = a[4];
			const a11 = a[5];
			const a12 = a[6];
			const a13 = a[7];
			const a20 = a[8];
			const a21 = a[9];
			const a22 = a[10];
			const a23 = a[11];

			out[0] = a00;
			out[1] = a01;
			out[2] = a02;
			out[3] = a03;
			out[4] = a10;
			out[5] = a11;
			out[6] = a12;
			out[7] = a13;
			out[8] = a20;
			out[9] = a21;
			out[10] = a22;
			out[11] = a23;

			out[12] = a00 * x + a10 * y + a20 * z + a[12];
			out[13] = a01 * x + a11 * y + a21 * z + a[13];
			out[14] = a02 * x + a12 * y + a22 * z + a[14];
			out[15] = a03 * x + a13 * y + a23 * z + a[15];
		}
	},

	transpose(out: Matrix4, a: Matrix4): void {
		// If we are transposing ourselves we can skip a few steps but have to cache some values
		if (out === a) {
			const a01 = a[1];
			const a02 = a[2];
			const a03 = a[3];
			const a12 = a[6];
			const a13 = a[7];
			const a23 = a[11];

			out[1] = a[4];
			out[2] = a[8];
			out[3] = a[12];
			out[4] = a01;
			out[6] = a[9];
			out[7] = a[13];
			out[8] = a02;
			out[9] = a12;
			out[11] = a[14];
			out[12] = a03;
			out[13] = a13;
			out[14] = a23;
		}
		else {
			out[0] = a[0];
			out[1] = a[4];
			out[2] = a[8];
			out[3] = a[12];
			out[4] = a[1];
			out[5] = a[5];
			out[6] = a[9];
			out[7] = a[13];
			out[8] = a[2];
			out[9] = a[6];
			out[10] = a[10];
			out[11] = a[14];
			out[12] = a[3];
			out[13] = a[7];
			out[14] = a[11];
			out[15] = a[15];
		}
	},
};
