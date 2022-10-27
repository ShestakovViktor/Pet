import {GlUniform} from '@core/interface/gl';

export class WebGlUniform implements GlUniform {
	constructor(public location: WebGLUniformLocation, public type: string) {}
}