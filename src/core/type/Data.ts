import {Layout} from './Layout';
import {Mode} from './Mode';

export type Data = {
	vertices: number[];
	indices: number[];

	layout: Layout;
	mode: Mode;
};