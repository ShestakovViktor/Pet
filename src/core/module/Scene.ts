import {Engine, Entity, Geometry} from '@module';
import {ml} from '@math';

export class Scene {

	private scaffold: Entity[];
	private geometry: Geometry;

	constructor(private engine: Engine) {
		this.geometry = new Geometry();
		this.scaffold = this.scaffoldInit();
	}

	getScaffold(): Entity[] {
		return this.scaffold;
	}

	scaffoldInit(): Entity[] {
		const xAxis = new Entity(
			this.engine.createModel(
				this.geometry.ray(ml.vec3.init(1, 0, 0))
			),
			ml.mat4.init(),
			new Float32Array([255, 0, 0])
		);


		const yAxis = new Entity(
			this.engine.createModel(
				this.geometry.ray(ml.vec3.init(0, 1, 0))
			),
			ml.mat4.init(),
			new Float32Array([0, 255, 0])
		);

		const zAxis = new Entity(
			this.engine.createModel(
				this.geometry.ray(ml.vec3.init(0, 0, 1))
			),
			ml.mat4.init(),
			new Float32Array([0, 0, 255])
		);

		const square = this.engine.createModel(
			this.geometry.square(5)
		);

		let t;

		t = ml.mat4.init();
		ml.mat4.rotate(t, t, ml.vec3.init(1, 0, 0), ml.pi / 2);
		const xyPlane = new Entity(
			square,
			t,
			new Float32Array([255, 255, 0])
		);

		t = ml.mat4.init();
		ml.mat4.rotate(t, t, ml.vec3.init(0, 0, 1), ml.pi / 2);
		ml.mat4.rotate(t, t, ml.vec3.init(0, 1, 0), ml.pi / 2);
		const yzPlane = new Entity(
			square,
			t,
			new Float32Array([0, 255, 255])
		);

		t = ml.mat4.init();
		const xzPlane = new Entity(
			square,
			t,
			new Float32Array([255, 0, 255])
		);

		return [xAxis, yAxis, zAxis, xyPlane, xzPlane, yzPlane];
	}
}