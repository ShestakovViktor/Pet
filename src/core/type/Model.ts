import {GlBuffer} from '@core/interface/gl';
import {Data} from './Data';

export type Model = Data & {
	vertexBuffer: GlBuffer;
	indexBuffer: GlBuffer;
	indexCount: number;
};