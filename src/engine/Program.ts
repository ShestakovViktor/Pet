import {Gl, GlAttribute, GlProgram, GlUniform} from './gl';

type Uniform = 'uniform';
type Attribute = 'attribute';


type KeysByValue<T, U> = keyof {
	[K in keyof T as T[K] extends U ? K : never]: any
};

type Qwe<T, U> = {
	[K in KeysByValue<T, U>]: U extends Uniform ? GlUniform : GlAttribute;
}

export class Program<T extends { [key: string]: Uniform | Attribute }>{
	glProgram: GlProgram;

	uniform;
	attribute;

	constructor(
		private gl: Gl,
		vertexShaderSrc: string,
		fragmentShaderSrc: string,
		params: T
	) {
		this.glProgram = gl.createProgram([
			gl.createShader('VERTEX_SHADER', vertexShaderSrc),
			gl.createShader('FRAGMENT_SHADER', fragmentShaderSrc),
		]);

		this.uniform = this.initUniforms(params);
		this.attribute = this.initAttributes(params);

	}

	private initUniforms(params: T): Qwe<T, Uniform> {
		const res: [KeysByValue<T, Uniform>, GlUniform][] = [];

		for (const name in params) {
			if (!this.isUniform(params, name)) continue;
			res.push([name, this.gl.getUniformLocation(this.glProgram, name)]);
		}

		return <Qwe<T, Uniform>>Object.fromEntries(res);
	}

	private isUniform(
		params: T,
		param: keyof T
	): param is KeysByValue<T, Uniform> {
		return params[param] === 'uniform';
	}

	private initAttributes(params: T): Qwe<T, Attribute> {
		const res: [KeysByValue<T, Attribute>, GlAttribute][] = [];

		for (const name in params) {
			if (!this.isAttribute(params, name)) continue;
			res.push([name, this.gl.getAttribLocation(this.glProgram, name)]);
		}

		return <Qwe<T, Attribute>>Object.fromEntries(res);
	}

	private isAttribute(
		params: T,
		param: keyof T
	): param is KeysByValue<T, Attribute> {
		return params[param] === 'attribute';
	}
}