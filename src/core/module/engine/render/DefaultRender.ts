import vertexShader from './DefaultRender.vert';
import fragmentShader from './DefaultRender.frag';

import {Model} from '@core/type';
import {Matrix4} from '@math';
import {GlDriver} from '@core/interface/gl';

export class DefaultRender {
	private glProgram;

	constructor(private gl: GlDriver) {
		this.glProgram = gl.createProgram(
			[
				gl.createShader('VERTEX_SHADER', vertexShader),
				gl.createShader('FRAGMENT_SHADER', fragmentShader),
			],
			{
				uniform: {
					uMMatrix: 'Matrix4fv',
					uPVMatrix: 'Matrix4fv',
				},
				attribute: {
					aVertexPosition: '3f',
					aVertexColor: '3f',
				},
			}
		);
	}


	render(
		model: Model,
		transform: Matrix4,
		projection: Matrix4
	): void {
		this.gl.useProgram(this.glProgram);

		this.gl.setUniformMatrix4fv(
			this.glProgram.uniform.uPVMatrix,
			projection
		);
		this.gl.setUniformMatrix4fv(this.glProgram.uniform.uMMatrix, transform);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vertexBuffer);

		this.gl.enableVertexAttribArray(
			this.glProgram.attribute.aVertexPosition
		);
		this.gl.setVertexAttribPointer(
			this.glProgram.attribute.aVertexPosition,
			3,
			this.gl.FLOAT,
			false,
			model.layout.stride,
			model.layout.position
		);

		if (!model.layout.color) throw new Error();

		this.gl.enableVertexAttribArray(
			this.glProgram.attribute.aVertexColor
		);
		this.gl.setVertexAttribPointer(
			this.glProgram.attribute.aVertexColor,
			3,
			this.gl.FLOAT,
			false,
			model.layout.stride,
			model.layout.color
		);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);

		this.gl.drawElements(model.mode, model.indexCount);
	}

}