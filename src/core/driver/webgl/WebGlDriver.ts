import {GlDriver} from '@core/interface/gl';
import {
	WebGlAttribute,
	WebGlBuffer,
	WebGlProgram,
	WebGlShader,
	WebGlUniform,
} from '@core/driver/webgl';


export class WebGlDriver implements GlDriver {
	webgl: WebGLRenderingContext;

	ARRAY_BUFFER: number;
	ELEMENT_ARRAY_BUFFER: number;
	STATIC_DRAW: number;
	UNSIGNED_SHORT: number;
	FLOAT: number;
	COLOR_BUFFER_BIT: number;

	DEPTH_TEST: number;
	LEQUAL: number;

	BLEND: number;
	SRC_ALPHA: number;
	ONE_MINUS_SRC_ALPHA: number;


	constructor(private canvas: HTMLCanvasElement) {
		const webgl = canvas.getContext('webgl');
		if (!webgl) throw Error();

		this.ARRAY_BUFFER = webgl.ARRAY_BUFFER;
		this.ELEMENT_ARRAY_BUFFER = webgl.ELEMENT_ARRAY_BUFFER;
		this.STATIC_DRAW = webgl.STATIC_DRAW;
		this.UNSIGNED_SHORT = webgl.UNSIGNED_SHORT;
		this.FLOAT = webgl.FLOAT;

		this.COLOR_BUFFER_BIT = webgl.COLOR_BUFFER_BIT;


		this.DEPTH_TEST = webgl.DEPTH_TEST;
		this.LEQUAL = webgl.LEQUAL;

		this.BLEND = webgl.BLEND;
		this.SRC_ALPHA = webgl.SRC_ALPHA;
		this.ONE_MINUS_SRC_ALPHA = webgl.ONE_MINUS_SRC_ALPHA;

		this.webgl = webgl;
	}

	enable(value: number): void {
		this.webgl.enable(value);
	}

	depthFunc(value: number): void {
		this.webgl.depthFunc(value);
	}

	blendFunc(sfactor: number, dfactor: number): void {
		this.webgl.blendFunc(sfactor, dfactor);
	}

	clearColor(r: number, g: number, b: number, a: number): void {
		this.webgl.clearColor(r, g, b, a);
	}

	clear(mask: number): void {
		this.webgl.clear(mask);
	}

	getAspectRatio(): number {
		return this.webgl.drawingBufferWidth / this.webgl.drawingBufferHeight;
	}

	getDrawingBufferWidth(): number {
		return this.webgl.drawingBufferWidth;
	}

	getDrawingBufferHeight(): number {
		return this.webgl.drawingBufferHeight;
	}

	updateViewport(): void {
		this.webgl.viewport(
			0,
			0,
			this.webgl.drawingBufferWidth,
			this.webgl.drawingBufferHeight
		);
	}

	createBuffer(): WebGlBuffer {
		const webglBuffer = this.webgl.createBuffer();
		if (!webglBuffer) throw Error();
		return new WebGlBuffer(webglBuffer);
	}

	bindBuffer(target: number, buffer: WebGlBuffer): void {
		this.webgl.bindBuffer(target, buffer.webglBuffer);
	}

	fillBuffer(target: number, data: ArrayBuffer, usage: number): void {
		this.webgl.bufferData(target, data, usage);
	}

	drawElements(mode: 'POINTS' | 'TRIANGLES' | 'LINES', count: number): void {
		this.webgl.drawElements(
			this.webgl[mode],
			count,
			this.UNSIGNED_SHORT,
			0
		);
	}

	createShader(
		type: 'VERTEX_SHADER' | 'FRAGMENT_SHADER',
		src: string
	): WebGlShader {
		return new WebGlShader(this.webgl, type, src);
	}

	createProgram<T extends {
		uniform?: {[key: string]: 'Matrix4fv' | '3f'};
		attribute?: {[key: string]: '3f'};
	}>(
		shaders: WebGlShader[],
		params: T
	): WebGlProgram<T> {
		return new WebGlProgram(this.webgl, shaders, params);
	}

	useProgram(program: WebGlProgram): void {
		this.webgl.useProgram(program.webglProgram);
	}


	setUniformMatrix4fv(uniform: WebGlUniform, data: Float32Array): void {
		this.webgl.uniformMatrix4fv(uniform.location, false, data);
	}

	setUniform3fv(uniform: WebGlUniform, data: Float32List): void {
		this.webgl.uniform3fv(uniform.location, data);
	}

	enableVertexAttribArray(attribute: WebGlAttribute): void {
		this.webgl.enableVertexAttribArray(attribute.index);
	}

	setVertexAttribPointer(
		glAttribute: WebGlAttribute,
		size: number,
		type: number,
		normalized: boolean,
		stride: number,
		offset: number
	): void {
		this.webgl.vertexAttribPointer(
			glAttribute.index,
			size,
			type,
			normalized,
			stride,
			offset
		);
	}
}