import {GlShader} from '.';

export class GlProgram {
	webglProgram: WebGLProgram;

	constructor(
		private webgl: WebGLRenderingContext,
		private shaders: GlShader[]
	) {
		this.webglProgram = this.createWebGLProgram();

		for (const {webglShader} of this.shaders) {
			this.webgl.attachShader(this.webglProgram, webglShader);
		}

		this.linkWebglProgram(this.webglProgram);
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