import vertexShader from './MonoColorRender.vert';
import fragmentShader from './MonoColorRender.frag';
import {Gl, Program, Camera, Matrix4, Model, Color} from '@engine';

export class MonoColorRender {
	private program;

	constructor(private gl: Gl, private camera: Camera) {
		this.program = new Program(
			gl,
			vertexShader,
			fragmentShader,
			{
				uMMatrix: 'uniform',
				uPVMatrix: 'uniform',
				uObjectColor: 'uniform',
				aVertexPosition: 'attribute',
			}
		);

	}

	render(
		model: Model,
		transform: Matrix4,
		color: Color
	): void {
		this.gl.useProgram(this.program.glProgram);

		const {
			uObjectColor,
			uPVMatrix,
			uMMatrix,
		} = this.program.uniform;

		this.gl.setUniformMatrix4fv(uMMatrix, transform);
		this.gl.setUniform3fv(uObjectColor, color);
		this.gl.setUniformMatrix4fv(uPVMatrix, this.camera.getPVMatrix());



		const {aVertexPosition} = this.program.attribute;

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vertexBuffer);
		this.gl.enableVertexAttribArray(aVertexPosition);
		this.gl.setVertexAttribPointer(
			aVertexPosition,
			3,
			this.gl.FLOAT,
			false,
			model.layout.stride,
			model.layout.position
		);


		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
		this.gl.drawElements(model.mode, model.indexCount);
	}
}