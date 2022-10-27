import {MonoColorRender} from './render';

import {Monitor} from '.';
import {Model, Data} from '@core/type';
import {GlDriver} from '@core/interface/gl';

export class Engine {
	monitor: Monitor;
	foo;

	constructor(private gl: GlDriver) {
		this.setupContext();
		this.monitor = new Monitor();
		this.foo = new MonoColorRender(this.gl);
	}

	private setupContext(): void {
		this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(
			this.gl.SRC_ALPHA,
			this.gl.ONE_MINUS_SRC_ALPHA
		);

		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}


	monocolorRender(...args: Parameters<MonoColorRender['render']>): void {
		this.foo.render(...args);
	}

	updateViewportSize(): void {
		this.gl.updateViewport();
		this.clear();
	}

	clear(): void {
		this.monitor.perform();
		this.gl.clearColor(0, 0, 0, 0.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	createModel({vertices, indices, layout, mode}: Data): Model {
		const vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.fillBuffer(
			this.gl.ARRAY_BUFFER,
			new Float32Array(vertices),
			this.gl.STATIC_DRAW
		);

		const indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		this.gl.fillBuffer(
			this.gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(indices),
			this.gl.STATIC_DRAW
		);

		const indexCount = indices.length;

		return {
			vertices,
			indices,

			layout,
			mode,

			vertexBuffer,
			indexBuffer,
			indexCount,
		};
	}
}
