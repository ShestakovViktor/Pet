import {MouseMoveEvent, MouseWheelEvent} from '@core/type/event';
import {ml} from '@math';
import {Vector3, Matrix4} from '@core/type/math';

const LEFT_MOUSE = 1;
const MIDDLE_MOUSE = 4;
type Projection = 'perspective' | 'orthogonal';

export class View {
	private target = ml.vec3.init(0, 0, 0);
	private position = ml.vec3.init(0, 0, 10);
	private up = ml.vec3.init(0, 1, 0);

	private pvMatrix!: Matrix4;

	private projectionMode: Projection = 'orthogonal';
	private aspectRatio = 0.25;

	private rotateSens = 1;
	private moveSens = 0.01;
	private zoomSens = 0.75;

	constructor() {
		this.setPVMatrix();
	}

	getOrientation(): {target: Vector3; position: Vector3; up: Vector3} {
		return {target: this.target, position: this.position, up: this.up};
	}

	onWheelRoll({deltaY}: MouseWheelEvent): void {
		this.zoom(-deltaY);
	}

	onMouseMove(
		{xOffset, yOffset, button, ctrl, alt, shift}: MouseMoveEvent
	): void {
		if (button == LEFT_MOUSE) {
			if (alt) {
				this.rotate(xOffset, yOffset);
			}
			else if (ctrl) {
				this.zoom(yOffset);
			}
			else if (shift) {
				this.move(xOffset, yOffset);
			}
		}
		else if (button == MIDDLE_MOUSE) {
			if (shift) {
				this.move(xOffset, yOffset);
			}
			else {
				this.rotate(xOffset, yOffset);
			}
		}
	}

	setAscpetRatio(ratio: number): void {
		this.aspectRatio = ratio;
		this.setPVMatrix();
	}

	setProjectionMode(projection: Projection): void {
		this.projectionMode = projection;
		this.setPVMatrix();
	}

	getProjectionMode(): string {
		return this.projectionMode;
	}

	getPVMatrix(): Matrix4 {
		return this.pvMatrix;
	}

	setPVMatrix(): void {
		this.pvMatrix = ml.mat4.init();
		ml.mat4.multiply(
			this.pvMatrix,
			this.getProjectionMatrix(),
			this.getViewMatrix()
		);
	}

	getProjectionMatrix(): Matrix4 {
		const result = ml.mat4.init();

		if (this.projectionMode == 'perspective') {
			ml.perspective(result, 45, this.aspectRatio, 0.1, 100.0);
		}
		else {
			const res = ml.vec3.init();

			ml.vec3.subtract(res, this.position, this.target);

			const z = ml.vec3.length(res) / 3;

			const temp = z * this.aspectRatio;

			ml.ortho(result, -temp, temp, -z, z, -100, 100.0);
		}

		return result;
	}

	getViewMatrix(): Matrix4 {
		const eyeX = this.position[0];
		const eyeY = this.position[1];
		const eyeZ = this.position[2];
		const upX = this.up[0];
		const upY = this.up[1];
		const upZ = this.up[2];
		const targetX = this.target[0];
		const targetY = this.target[1];
		const targetZ = this.target[2];

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

		const out = ml.mat4.init();
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
	}


	/*
	foo(): void {

		const [x, y, z] = this.position;

		const rXZ = Math.sqrt(x * x + z * z);
		let aXZ = Math.atan2(x, z);

		const result = 90 * Math.PI / 180;

		const iXZ = (result - aXZ) / 100;



		const rYZ = Math.sqrt(y * y + z * z);
		let aYZ = Math.atan2(y, z);
		const iYZ = (result - aYZ) / 100;

		const interval = setInterval(() => {
			aXZ += iXZ;
			aYZ += iYZ;

			this.position[0] = Math.round(rXZ * Math.sin(aXZ) * 10) / 10;
			this.position[1] = Math.round(rYZ * Math.cos(aYZ) * 10) / 10;
			this.position[2] = Math.round(rXZ * Math.cos(aXZ) * 10) / 10;

			this.setPVMatrix();
			if (aXZ + iXZ > result) clearInterval(interval);
		}, 10);
	}
	*/

	zoom(a: number): void {
		const res = ml.vec3.init();

		ml.vec3.subtract(res, this.position, this.target);
		ml.vec3.normalize(res, res);
		ml.vec3.scale(res, res, this.zoomSens);

		if (a > 0) {
			ml.vec3.subtract(this.position, this.position, res);
		}
		else {
			ml.vec3.add(this.position, this.position, res);
		}

		this.setPVMatrix();
	}

	/**
	 * Move camera in xz plane by a given vector.
	 */
	move(x: number, y: number): void {
		const dir = ml.vec3.init();

		ml.vec3.subtract(dir, this.target, this.position);

		let a = -Math.atan(dir[0] / dir[2]);
		a = dir[2] > 0
			? a + Math.PI
			: dir[2] < 0 && dir[0] > 0
				? a + 2 * Math.PI
				: a;

		const offset = ml.vec3.init(
			x * Math.cos(a) - y * Math.sin(a),
			0,
			x * Math.sin(a) + y * Math.cos(a)
		);

		ml.vec3.scale(offset, offset, this.moveSens);
		ml.vec3.add(this.target, this.target, offset);
		ml.vec3.add(this.position, this.position, offset);

		this.setPVMatrix();
	}


	rotate(xr: number, yr: number): void {
		xr = -xr / 180 * ml.pi * this.rotateSens;
		yr = -yr / 180 * ml.pi * this.rotateSens;

		const dir = ml.vec3.init();
		ml.vec3.subtract(dir, this.position, this.target);

		const side = ml.vec3.init();
		ml.vec3.cross(side, dir, this.up);
		ml.vec3.normalize(side, side);

		const heading = ml.quat.initFromAxisAngle(ml.vec3.init(0, 1, 0), xr);
		const pitch = ml.quat.initFromAxisAngle(side, yr);
		const view = ml.quat.initFromVector(dir);

		const result = ml.quat.init();
		ml.quat.multiply(result, heading, pitch);
		ml.quat.multiply(result, result, view);

		ml.vec3.add(this.position, result, this.target);

		this.setPVMatrix();
	}

	getOppositeBasePlaneNormal(): Vector3 {
		const v = ml.vec3.subtract(ml.vec3.init(), this.target, this.position);
		return ml.vec3.init(
			+(Math.abs(v[0] / v[1]) > 1 && Math.abs(v[0] / v[2]) > 1),
			+(Math.abs(v[1] / v[0]) >= 1 && Math.abs(v[1] / v[2]) >= 1),
			+(Math.abs(v[2] / v[0]) > 1 && Math.abs(v[2] / v[1]) > 1)
		);
	}

	/*
	project(pos: Vector3): Vector2 {
		const pvMat = this.getPVMatrix();

		const point = ml.vec4.fromValues(pos[0], pos[1], pos[2], 1);
		ml.vec4.transformMat4(point, point, pvMat);
		point[0] /= point[3];
		point[1] /= point[3];
		point[2] /= point[3];

		const width = this.gl.getDrawingBufferWidth();
		const height = this.gl.getDrawingBufferHeight();

		return ml.vec2.of(
			(point[0] + 1) * width / 2,
			(point[1] - 1) * height / -2
		);
	}

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
}
