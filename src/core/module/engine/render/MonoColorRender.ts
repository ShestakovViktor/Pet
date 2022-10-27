import vertexShader from './MonoColorRender.vert';
import fragmentShader from './MonoColorRender.frag';
import {GlDriver} from '@core/interface/gl';
import {Model, Color} from '@core/type';
import {Matrix4} from '@math';

export class MonoColorRender {
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
					uObjectColor: '3f',
				},
				attribute: {
					aVertexPosition: '3f',
				},
			}
		);
	}

	render(
		pvMat: Matrix4,
		model: Model,
		transform: Matrix4,
		color: Color
	): void {
		this.gl.useProgram(this.glProgram);

		const {
			uObjectColor,
			uPVMatrix,
			uMMatrix,
		} = this.glProgram.uniform;

		this.gl.setUniformMatrix4fv(uMMatrix, transform);
		this.gl.setUniform3fv(uObjectColor, color);
		this.gl.setUniformMatrix4fv(uPVMatrix, pvMat);



		const {aVertexPosition} = this.glProgram.attribute;

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