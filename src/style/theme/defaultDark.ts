import {Theme} from 'style/type';

export const defaultDark: Theme = {
	key: 'defaultDark',
	name: 'Default dark',
	scheme: {
		viewportUpper: {h: 0, s: 0, l: 25, a: 1},
		viewportLower: {h: 0, s: 0, l: 20, a: 1},

		contentBase: {h: 0, s: 0, l: 90, a: 1},

		backgroundBase: {h: 0, s: 0, l: 25, a: 1},
		backgroundOpaq: {h: 0, s: 0, l: 25, a: .5},

		shadowLight: {h: 0, s: 0, l: 20, a: .6},
		shadowBase: {h: 0, s: 0, l: 15, a: .6},
	},
};
