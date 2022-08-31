import {Engine} from '@engine';
import {ml} from '@engine/math';
import {Entity} from '..';

export class Scaffold {
	xAxis;
	yAxis;
	zAxis;

	xyPlane;
	yzPlane;
	xzPlane;

	constructor(private engine: Engine) {
		const xAxis = engine.geometry.ray(ml.vec3.init(1, 0, 0));
		this.xAxis = new Entity(
			xAxis,
			ml.mat4.init(),
			new Float32Array([255, 0, 0])
		);

		const yAxis = engine.geometry.ray(ml.vec3.init(0, 1, 0));
		this.yAxis = new Entity(
			yAxis,
			ml.mat4.init(),
			new Float32Array([0, 255, 0])
		);

		const zAxis = engine.geometry.ray(ml.vec3.init(0, 0, 1));
		this.zAxis = new Entity(
			zAxis,
			ml.mat4.init(),
			new Float32Array([0, 0, 255])
		);



		const square = engine.geometry.square(5);

		let t;

		t = ml.mat4.init();
		ml.mat4.rotate(t, t, ml.vec3.init(1, 0, 0), ml.pi / 2);
		this.xyPlane = new Entity(
			square,
			t,
			new Float32Array([255, 255, 0])
		);

		t = ml.mat4.init();
		ml.mat4.rotate(t, t, ml.vec3.init(0, 0, 1), ml.pi / 2);
		ml.mat4.rotate(t, t, ml.vec3.init(0, 1, 0), ml.pi / 2);
		this.yzPlane = new Entity(
			square,
			t,
			new Float32Array([0, 255, 255])
		);

		t = ml.mat4.init();
		this.xzPlane = new Entity(
			square,
			t,
			new Float32Array([255, 0, 255])
		);


	}
}
