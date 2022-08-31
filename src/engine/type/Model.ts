import {GlBuffer} from '@engine/gl';
import {Layout} from './Layout';
import {Mode} from './Mode';

export type Model = {
	vertices: number[];
	indices: number[];

	layout: Layout;
	mode: Mode;

	vertexBuffer: GlBuffer;
	indexBuffer: GlBuffer;
	indexCount: number;
};