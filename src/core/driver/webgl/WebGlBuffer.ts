import {GlBuffer} from '@core/interface/gl';

export class WebGlBuffer implements GlBuffer{
	webglBuffer: WebGLBuffer;

	constructor(buffer: WebGLBuffer) {
		this.webglBuffer = buffer;
	}
}