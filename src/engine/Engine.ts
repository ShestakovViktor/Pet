import {Camera, Geometry} from '.';
import {Gl} from '@engine/gl';

import {MonoColorRender} from './render';

import {FpsMonitor} from './module';
import {Mode, Layout, Model} from './type';

export class Engine {
	private viewport: HTMLCanvasElement;
	private gl: Gl;

	geometry: Geometry;
	camera: Camera;

	fpsMonitor: FpsMonitor;

	foo;

	constructor() {
		this.viewport = this.initViewport();
		this.gl = new Gl(this.viewport);

		this.geometry = new Geometry(this);

		this.fpsMonitor = new FpsMonitor();

		this.camera = new Camera(this.gl);

		this.foo = new MonoColorRender(this.gl, this.camera);
	}

	private initViewport(): HTMLCanvasElement {
		return <HTMLCanvasElement>document.createElement('CANVAS');
	}

	monocolorRender(...args: Parameters<MonoColorRender['render']>): void {
		this.foo.render(...args);
	}

	getViewport(): HTMLCanvasElement {
		return this.viewport;
	}

	updateViewportSize(): void {
		this.viewport.width = this.viewport.clientWidth;
		this.viewport.height = this.viewport.clientHeight;

		this.gl.updateViewport();
		this.camera.setPVMatrix();
		this.clear();
	}

	clear(): void {
		this.fpsMonitor.perform();
		this.gl.clearColor(0, 0, 0, 0.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	createModel (
		vertices: number[],
		indices: number[],
		layout: Layout,
		mode: Mode
	): Model {
		const vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.fillBuffer(
			this.gl.ARRAY_BUFFER,
			new Float32Array(vertices),
			this.gl.STATIC_DRAW
		);

		const indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		this.gl.fillBuffer(
			this.gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(indices),
			this.gl.STATIC_DRAW
		);

		const indexCount = indices.length;

		return {
			vertices,
			indices,

			layout,
			mode,

			vertexBuffer,
			indexBuffer,
			indexCount,
		};
	}


	/*
	private pick({
		set,
		point,
		point2 = { offsetX: point.offsetX + 1, offsetY: point.offsetY + 1 },
	}) {
		const width = this.viewport.width;
		const height = this.viewport.height;

		let x1 = point.offsetX;
		let y1 = height - point.offsetY;

		let x2 = point2.offsetX;
		let y2 = height - point2.offsetY;

		let min = [Math.min(x1, x2), Math.min(y1, y2)];
		let max = [Math.max(x1, x2), Math.max(y1, y2)];

		let pickSectorWidth = max[0] - min[0];
		let pickSectorHeight = max[1] - min[1];

		const frameBuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
		gl.viewport(0, 0, width, height);

		//
		var colorBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, colorBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA8, width, height);
		gl.framebufferRenderbuffer(
			gl.FRAMEBUFFER,
			gl.COLOR_ATTACHMENT0,
			gl.RENDERBUFFER,
			colorBuffer
		);
		//

		const colorBuffer = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, colorBuffer);

		// prettier-ignore
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		// prettier-ignore
		gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorBuffer, 0);

		const depthBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
		gl.renderbufferStorage(
			gl.RENDERBUFFER,
			gl.DEPTH_COMPONENT16,
			width,
			height
		);
		gl.framebufferRenderbuffer(
			gl.FRAMEBUFFER,
			gl.DEPTH_ATTACHMENT,
			gl.RENDERBUFFER,
			depthBuffer
		);

		const f = {};
		set.forEach((v, i) => {
			i += 1;
			draw({
				...v,
				color: [i, 0, 0],
				program: 'p',
			});
			f[`${i}0`] = v;
		});

		const pixels = new Uint8Array(pickSectorWidth * pickSectorHeight * 4);
		gl.readPixels(
			min[0],
			min[1],
			pickSectorWidth,
			pickSectorHeight,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			pixels
		);

		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0, 0, width, height);

		const t = [];
		for (let i = 0, l = pixels.length; i < l; i += 4) {
			//console.log(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]);
			if (
				!t.some((v) => {
					return v[0] === pixels[i] && v[1] === pixels[i + 1];
				})
			)
				t.push([pixels[i], pixels[i + 1]]);
		}

		const r = [];
		t.forEach((v) => {
			const k = v.join('');
			if (k === '00') return;
			r.push(f[k]);
		});

		return r;
	}
	*/
}
