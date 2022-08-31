import {strict as assert} from 'assert';
import {Stringifier} from '../';
import {TokenTypeNotFoundError} from '../error';
import {Token} from '../type';

describe('Stringifier', () => {
	const settings = {
		getNumberPluralCategory(n: number): string {
			if (n == 0) return 'zero';
			else if (n == 1) return 'one';
			else if (n > 1) return 'many';
			else return 'other';
		},
	};

	const stringifier = new Stringifier(settings);

	describe('Plural string', () => {
		it('Simple string', () => {
			const tags = [{type: 'text', value: 'I have apple'}];
			const actual = stringifier.stringify(tags);
			const expect = 'I have apple';

			assert.strictEqual(actual, expect);
		});

		it('Unknown token type', () => {
			const tokens: Token[] = [{type: 'unknown', value: 'Hello world'}];

			assert.throws(
				() => stringifier.stringify(tokens),
				TokenTypeNotFoundError
			);
		});

		it('String with substitution', () => {
			const tokens: Token[] = [
				{type: 'text', value: 'Ave, '},
				{type: 'value', key: 'name'},
				{type: 'text', value: '!'},
			];
			const actual = stringifier.stringify(tokens, {name: 'Cesar'});
			const expect = 'Ave, Cesar!';

			assert.strictEqual(actual, expect);
		});
	});

	describe('Plural string', () => {
		const tokens: Token[] = [
			{type:'text', value: 'I have '},
			{
				type:'plural',
				key: 'apples',
				value: {
					zero: [
						{type:'value', key: 'apples'},
						{type:'text', value: ' apples'},
					],
					one: [
						{type:'value', key: 'apples'},
						{type:'text', value: ' apple'},
					],
					many: [
						{type:'value', key: 'apples'},
						{type:'text', value: ' apples'},
					],
				},
			},
		];


		it('zero', () => {
			const actual = stringifier.stringify(tokens, {apples: 0});
			const expect = 'I have 0 apples';

			assert.strictEqual(actual, expect);
		});

		it('one', () => {
			const actual = stringifier.stringify(tokens, {apples: 1});
			const expect = 'I have 1 apple';

			assert.strictEqual(actual, expect);
		});

		it('many', () => {
			const actual = stringifier.stringify(tokens, {apples: 2});
			const expect = 'I have 2 apples';

			assert.strictEqual(actual, expect);
		});
	});
});