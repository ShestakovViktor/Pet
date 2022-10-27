import {
	GlAttribute,
	GlBuffer,
	GlProgram,
	GlShader,
	GlUniform,
} from './';

export interface GlDriver {
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


	enable(value: number): void;

	depthFunc(value: number): void;
	blendFunc(sfactor: number, dfactor: number): void;

	clearColor(r: number, g: number, b: number, a: number): void;
	clear(mask: number): void;

	getAspectRatio(): number;

	getDrawingBufferWidth(): number;
	getDrawingBufferHeight(): number;

	updateViewport(): void;

	createBuffer(): GlBuffer;
	bindBuffer(target: number, buffer: GlBuffer): void;
	fillBuffer(target: number, data: ArrayBuffer, usage: number): void;

	drawElements(mode: 'POINTS' | 'TRIANGLES' | 'LINES', count: number): void;

	createShader(
		type: 'VERTEX_SHADER' | 'FRAGMENT_SHADER',
		src: string
	): GlShader;

	createProgram<T extends {
		uniform: {[key: string]: any};
		attribute: {[key: string]: any};
	}>(
		shaders: GlShader[],
		params: T
	): GlProgram<T>;

	useProgram(program: GlProgram): void;

	setUniformMatrix4fv(uniform: GlUniform, data: Float32Array): void;
	setUniform3fv(uniform: GlUniform, data: Float32List): void;

	enableVertexAttribArray(attribute: GlAttribute): void;
	setVertexAttribPointer(
		attribute: GlAttribute,
		size: number,
		type: number,
		normalized: boolean,
		stride: number,
		offset: number
	): void;
}