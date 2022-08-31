import {Theme} from 'style/type';

export const defaultLight: Theme = {
	key: 'defaultLight',
	name: 'Default light',
	scheme: {
		viewportUpper: {h: 0, s: 0, l: 95, a: 1},
		viewportLower: {h: 0, s: 0, l: 95, a: 1},

		contentBase: {h: 0, s: 0, l: 20, a: 1},

		backgroundBase: {h: 0, s: 0, l: 85, a: 1},
		backgroundOpaq: {h: 0, s: 0, l: 85, a: .5},

		shadowLight: {h: 0, s: 0, l: 60, a: .6},
		shadowBase: {h: 0, s: 0, l: 55, a: .6},
	},
};