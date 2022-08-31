import {GlAttribute, GlBuffer, GlProgram, GlShader, GlUniform} from '.';

export class Gl {
	webgl: WebGLRenderingContext;

	ARRAY_BUFFER: number;
	ELEMENT_ARRAY_BUFFER: number;
	STATIC_DRAW: number;
	UNSIGNED_SHORT: number;
	FLOAT: number;
	COLOR_BUFFER_BIT: number;

	constructor(private canvas: HTMLCanvasElement) {
		const webgl = canvas.getContext('webgl');
		if (!webgl) throw Error();

		this.ARRAY_BUFFER = webgl.ARRAY_BUFFER;
		this.ELEMENT_ARRAY_BUFFER = webgl.ELEMENT_ARRAY_BUFFER;
		this.STATIC_DRAW = webgl.STATIC_DRAW;
		this.UNSIGNED_SHORT = webgl.UNSIGNED_SHORT;
		this.FLOAT = webgl.FLOAT;

		this.COLOR_BUFFER_BIT = webgl.COLOR_BUFFER_BIT;

		this.webgl = webgl;
		this.setupContext();
	}

	private setupContext(): void {
		this.webgl.clearColor(1.0, 0.0, 0.0, 1.0);
		this.webgl.enable(this.webgl.DEPTH_TEST);
		this.webgl.depthFunc(this.webgl.LEQUAL);

		this.webgl.enable(this.webgl.BLEND);
		this.webgl.blendFunc(
			this.webgl.SRC_ALPHA,
			this.webgl.ONE_MINUS_SRC_ALPHA
		);

		this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
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

	createBuffer(): GlBuffer {
		const webglBuffer = this.webgl.createBuffer();
		if (!webglBuffer) throw Error();
		return new GlBuffer(webglBuffer);
	}

	bindBuffer(target: number, buffer: GlBuffer): void {
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
	): GlShader {
		return new GlShader(this.webgl, type, src);
	}

	createProgram(shaders: GlShader[]): GlProgram {
		return new GlProgram(this.webgl, shaders);
	}

	useProgram(glProgram: GlProgram): void {
		this.webgl.useProgram(glProgram.webglProgram);
	}

	getUniformLocation(glProgram: GlProgram, name: string): GlUniform {
		const webglUniform = this.webgl.getUniformLocation(
			glProgram.webglProgram,
			name
		);

		if (!webglUniform) throw Error(`Can't get ${name} location`);

		return new GlUniform(webglUniform);
	}

	getAttribLocation(glProgram: GlProgram, name: string): GlAttribute {
		const webglAttribute = this.webgl.getAttribLocation(
			glProgram.webglProgram,
			name
		);

		if (webglAttribute < 0) throw Error(`Can't get ${name} location`);

		return new GlAttribute(webglAttribute);
	}

	setUniformMatrix4fv(uniform: GlUniform, data: Float32Array): void {
		this.webgl.uniformMatrix4fv(uniform.location, false, data);
	}

	setUniform3fv(uniform: GlUniform, data: Float32List): void {
		this.webgl.uniform3fv(uniform.location, data);
	}

	enableVertexAttribArray(glAttribute: GlAttribute): void {
		this.webgl.enableVertexAttribArray(glAttribute.index);
	}

	setVertexAttribPointer(
		glAttribute: GlAttribute,
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