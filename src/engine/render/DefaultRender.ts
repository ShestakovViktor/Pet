import vertexShader from './DefaultRender.vert';
import fragmentShader from './DefaultRender.frag';

import {Gl, Program} from '@engine';
import {Model, Matrix4} from '@engine/type';

export class DefaultRender {
	private program;

	constructor(private gl: Gl) {
		this.program = new Program(
			this.gl,
			vertexShader,
			fragmentShader,
			{
				uMMatrix: 'uniform',
				uPVMatrix: 'uniform',
				aVertexPosition: 'attribute',
				aVertexColor: 'attribute',
			}
		);
	}


	render(
		model: Model,
		transform: Matrix4,
		projection: Matrix4
	): void {
		this.gl.useProgram(this.program.glProgram);

		this.gl.setUniformMatrix4fv(this.program.uniform.uPVMatrix, projection);
		this.gl.setUniformMatrix4fv(this.program.uniform.uMMatrix, transform);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vertexBuffer);

		this.gl.enableVertexAttribArray(
			this.program.attribute.aVertexPosition
		);
		this.gl.setVertexAttribPointer(
			this.program.attribute.aVertexPosition,
			3,
			this.gl.FLOAT,
			false,
			model.layout.stride,
			model.layout.position
		);

		if (!model.layout.color) throw new Error();

		this.gl.enableVertexAttribArray(
			this.program.attribute.aVertexColor
		);
		this.gl.setVertexAttribPointer(
			this.program.attribute.aVertexColor,
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