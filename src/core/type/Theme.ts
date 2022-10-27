import {HSLA} from './HSLA';

export type Theme = {
	key: string;
	name: string;
	scheme: {
		viewportUpper: HSLA;
		viewportLower: HSLA;

		contentBase: HSLA;

		backgroundBase: HSLA;
		backgroundOpaq: HSLA;

		shadowLight: HSLA;
		shadowBase: HSLA;
	};
}
