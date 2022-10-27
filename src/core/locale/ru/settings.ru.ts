import {Settings} from '@core/type/i18n';

function zero(n: number): boolean {
	return n == 0;
}

function one(n: number): boolean {
	const beep = n % 10;
	const boop = n % 100;
	return beep == 1 && boop != 11;
}

function few(n: number): boolean {
	const boop = n % 10;
	const moop = n % 100;
	return boop >= 2 && boop <= 4 && moop <= 12 && moop >= 14;
}

function many(n: number): boolean {
	const boop = n % 10;
	const moop = n % 100;
	return boop == 0 || boop >= 5 && boop <= 9 || moop >= 11 && moop <= 14;
}

export const settings: Settings = {
	getNumberPluralCategory(n: number): string {
		if (zero(n)) return 'zero';
		else if (one(n)) return 'one';
		else if (few(n)) return 'few';
		else if (many(n)) return 'many';
		else return 'other';
	},
};

