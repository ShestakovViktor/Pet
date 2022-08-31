/* eslint-disable prefer-const */
import {Vector3, Matrix4} from '@engine/type';
import {
	Vector2Math,
	Vector3Math,
	Vector4Math,
	Matrix3Math,
	Matrix4Math,
	QuaternionMath,
} from '.';

export const EPSILON = 0.000001;

export const ml = {
	pi: 3.14,
	vec2: Vector2Math,
	vec3: Vector3Math,
	vec4: Vector4Math,
	mat3: Matrix3Math,
	mat4: Matrix4Math,
	quat: QuaternionMath,

	toRadian(a: number): number {
		return a * (Math.PI / 180);
	},

	equals(a: number, b: number): boolean {
		return Math.abs(a - b) <= EPSILON * Math.max(
			1.0, Math.abs(a), Math.abs(b)
		);
	},

	lookAt(out: Matrix4, eye: Vector3, target: Vector3, up: Vector3): Matrix4 {
		let eyeX = eye[0];
		let eyeY = eye[1];
		let eyeZ = eye[2];
		let upX = up[0];
		let upY = up[1];
		let upZ = up[2];
		let targetX = target[0];
		let targetY = target[1];
		let targetZ = target[2];

		let appX = eyeX - targetX;
		let appY = eyeY - targetY;
		let appZ = eyeZ - targetZ;

		//Normalize direction vector
		let len = 1 / Math.sqrt(appX * appX + appY * appY + appZ * appZ);
		appX *= len;
		appY *= len;
		appZ *= len;


		// Cross up vector and dir
		let absX = upY * appZ - upZ * appY;
		let absY = upZ * appX - upX * appZ;
		let absZ = upX * appY - upY * appX;

		len = Math.sqrt(absX * absX + absY * absY + absZ * absZ);

		if (!len) {
			absX = 0;
			absY = 0;
			absZ = 0;
		}
		else {
			len = 1 / len;
			absX *= len;
			absY *= len;
			absZ *= len;
		}

		// Cross dir and side vectors
		let ordX = appY * absZ - appZ * absY;
		let ordY = appZ * absX - appX * absZ;
		let ordZ = appX * absY - appY * absX;

		len = Math.sqrt(ordX * ordX + ordY * ordY + ordZ * ordZ);
		if (!len) {
			ordX = 0;
			ordY = 0;
			ordZ = 0;
		}
		else {
			len = 1 / len;
			ordX *= len;
			ordY *= len;
			ordZ *= len;
		}

		out[0] = absX;
		out[1] = ordX;
		out[2] = appX;
		out[3] = 0;
		out[4] = absY;
		out[5] = ordY;
		out[6] = appY;
		out[7] = 0;
		out[8] = absZ;
		out[9] = ordZ;
		out[10] = appZ;
		out[11] = 0;
		out[12] = -(absX * eyeX + absY * eyeY + absZ * eyeZ);
		out[13] = -(ordX * eyeX + ordY * eyeY + ordZ * eyeZ);
		out[14] = -(appX * eyeX + appY * eyeY + appZ * eyeZ);
		out[15] = 1;

		return out;
	},

	/**
	 * Generates a perspective projection matrix with the given bounds.
	 */
	perspective(
		out: Matrix4,
		fovy: number,
		aspect: number,
		near: number,
		far: number
	): Matrix4 {
		const f = 1.0 / Math.tan(fovy / 2);
		const nf = 1 / (near - far);

		out[0] = f / aspect;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = f;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = (far + near) * nf;
		out[11] = -1;
		out[12] = 0;
		out[13] = 0;
		out[14] = 2 * far * near * nf;
		out[15] = 0;

		return out;
	},

	/**
	 * Generates a orthogonal projection matrix with the given bounds.
	 */
	ortho(
		out: Matrix4,
		left: number,
		right: number,
		bottom: number,
		top: number,
		near: number,
		far: number
	): Matrix4 {
		const lr = 1 / (left - right);
		const bt = 1 / (bottom - top);
		const nf = 1 / (near - far);

		out[0] = -2 * lr;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = -2 * bt;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 2 * nf;
		out[11] = 0;
		out[12] = (left + right) * lr;
		out[13] = (top + bottom) * bt;
		out[14] = (far + near) * nf;
		out[15] = 1;

		return out;
	},

	/*
	 * Find intersection of a line and a plane.
	 * @param {Vector3} l0 - Start point of line.
	 * @param {Vector3} l1 - End point of line.
	 * @param {Vector3} n - Normal to plane.
	 * @param {Vector3} p - Point belonging to the plane.
	 * @return {Vector3} - Point of intersection.
	linePlaneIntersec(l0, l1, n, p) {
		p = v3.init(0, 0, 0);
		v3.subtract(l1, l1, l0);
		let pl1 = v3.dot(n, l1); //Projection lenght.

		if (Math.abs(pl1) > Number.EPSILON) {
			v3.subtract(p, p, l0);
			let pl2 = v3.dot(n, p);

			v3.scale(l1, l1, pl2 / pl1);

			return v3.add(l1, l1, l0);
		}
		else {
			return;
		}
	},

	mousePlaneProjection({
		mouseEvent: { offsetX, offsetY },
		pvMatrix,
		viewportWidth,
		viewportHeight,
		planeNormal,
		planePoint,
	}) {
		// prettier-ignore
		const near = unProject( offsetX, offsetY, 0, pvMatrix, viewportWidth, viewportHeight);
		// prettier-ignore
		const far = unProject( offsetX, offsetY, 1, pvMatrix, viewportWidth, viewportHeight);

		return linePlaneIntersec(near, far, planeNormal, planePoint);
	},

	unProject(x, y, z, pvMat, width, height) {
		//const pvMat = this.getPVMatrix();

		//const width = this.gl.drawingBufferWidth;
		//const height = this.gl.drawingBufferHeight;

		x = (x / width) * 2 - 1;
		y = (y / height) * -2 + 1;
		z = 2 * z - 1;

		let invMat = m4.invert(m4.init(), pvMat);
		let point = v3.init(x, y, z);
		v3.transform(point, point, invMat);

		return point;
	},
	*/


};