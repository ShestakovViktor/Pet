import {Settings} from '@core/type/i18n';

export const settings: Settings = {
	getNumberPluralCategory(n: number): string {
		if (n == 0) return 'zero';
		else if (n == 1) return 'one';
		else if (n > 1) return 'many';
		else return 'other';
	},
};