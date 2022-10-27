import {GlShader} from '@core/interface/gl';

export class WebGlShader implements GlShader {
	webglShader: WebGLShader;

	constructor(
		private webgl: WebGLRenderingContext,
		private type: 'VERTEX_SHADER' | 'FRAGMENT_SHADER',
		private glsl: string
	) {

		const webglShader = this.webgl.createShader(this.webgl[type]);
		if (!webglShader) throw Error();

		this.webgl.shaderSource(webglShader, glsl);
		this.webgl.compileShader(webglShader);

		if (
			!this.webgl.getShaderParameter(
				webglShader,
				this.webgl.COMPILE_STATUS
			)
		) {
			throw new Error(this.webgl.getShaderInfoLog(webglShader) ?? 'Error');
		}

		this.webglShader = webglShader;
	}
}