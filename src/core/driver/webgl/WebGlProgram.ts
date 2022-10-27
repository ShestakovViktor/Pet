import {GlProgram} from '@core/interface/gl';
import {WebGlShader, WebGlAttribute, WebGlUniform} from '.';

export class WebGlProgram<

	T extends {
		uniform?: {[key: string]: 'Matrix4fv' | '3f'};
		attribute?: {[key: string]: '3f'};
	} = never,

> implements GlProgram {
	webglProgram: WebGLProgram;

	uniform = {} as {[key in keyof T['uniform']]: WebGlUniform};
	attribute = {} as {[key in keyof T['attribute']]: WebGlAttribute};

	constructor(
		private webgl: WebGLRenderingContext,
		private shaders: WebGlShader[],
		params: T
	) {
		this.webglProgram = this.createWebGLProgram();

		for (const {webglShader} of this.shaders) {
			this.webgl.attachShader(this.webglProgram, webglShader);
		}

		this.linkWebglProgram(this.webglProgram);


		for (const uniformName in params.uniform) {
			const uniformLocation =	this.webgl.getUniformLocation(
				this.webglProgram,
				uniformName
			);
			if (!uniformLocation) throw new Error();

			this.uniform[uniformName as keyof T['uniform']]
				= new WebGlUniform(uniformLocation, 'Matrix4f');
		}

		for (const attributeName in params.attribute) {
			const attributeLocation = this.webgl.getAttribLocation(
				this.webglProgram,
				attributeName
			);

			this.attribute[attributeName as keyof T['attribute']]
				= new WebGlAttribute(attributeLocation);
		}
	}

	private createWebGLProgram(): WebGLProgram {
		const webglProgram = this.webgl.createProgram();
		if (!webglProgram) throw Error();

		return webglProgram;
	}

	private linkWebglProgram(webglProgram: WebGLProgram): void {
		this.webgl.linkProgram(webglProgram);

		if (
			!this.webgl.getProgramParameter(
				webglProgram,
				this.webgl.LINK_STATUS
			)
		) {
			const info = this.webgl.getProgramInfoLog(webglProgram) ?? '';

			throw new Error(
				`Could not compile WebGL program. \n\n ${info}`
			);
		}
	}
}