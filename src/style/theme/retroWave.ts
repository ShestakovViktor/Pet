import {Theme} from 'style/type';

export const retroWave: Theme = {
	key: 'retroWave',
	name: 'Retro wave',
	scheme: {
		viewportLower: {h: 280, s: 80, l: 30, a: 1},
		viewportUpper: {h: 330, s: 100, l: 50, a: 1},

		contentBase: {h: 280, s: 80, l: 50, a: 1},

		backgroundBase: {h: 0, s: 0, l: 90, a: 1},
		backgroundOpaq: {h: 0, s: 0, l: 50, a: .5},

		shadowLight: {h: 330, s: 100, l: 20, a: .5},
		shadowBase: {h: 330, s: 100, l: 10, a: .5},
	},
};