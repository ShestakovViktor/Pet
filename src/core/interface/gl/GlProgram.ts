import {GlAttribute} from './GlAttribute';
import {GlUniform} from './GlUniform';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface GlProgram<

	T extends {
		uniform?: {[key: string]: any};
		attribute?: {[key: string]: any};
	} = never,

> {
	uniform: {[key in keyof T['uniform']]: GlUniform};
	attribute: {[key in keyof T['attribute']]: GlAttribute};
}
