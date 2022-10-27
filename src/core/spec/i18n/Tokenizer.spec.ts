import {strict as assert} from 'assert';
import {Tokenizer} from '@module/i18n';
import {Token} from '@core/type/i18n';


describe('Tokenizer', () => {
	const tokenizer = new Tokenizer();

	describe('String', () => {
		it('Only text', () => {
			const rawString = 'Hello world';
			const actual = tokenizer.tokenize(rawString);
			const expect: Token[] = [{type: 'text', value: 'Hello world'}];

			assert.deepEqual(actual, expect);
		});
	});

	describe('Token', () => {
		it('Value', () => {
			const rawString = '{greetings}';
			const actual = tokenizer.tokenize(rawString);
			const expect: Token[] = [{type:'value', key: 'greetings'}];

			assert.deepEqual(actual, expect);
		});

		it('Plural', () => {
			const rawString = `{
				apples,
				plural,
				one {apple}
				few {apples}
			}`;
			const actual = tokenizer.tokenize(rawString);
			const expect = [{
				type: 'plural',
				key: 'apples',
				value: {
					one: [{type: 'text', value: 'apple'}],
					few: [{type: 'text', value: 'apples'}],
				},
			}];

			assert.deepEqual(actual, expect);
		});
	});

	describe('Mix', () => {
		it('Text and tag', () => {
			const rawString = 'Hello {name}';
			const actual = tokenizer.tokenize(rawString);
			const expect: Token[] = [
				{type:'text', value: 'Hello '},
				{type:'value', key: 'name'},
			];

			assert.deepEqual(actual, expect);
		});

		it('All variations in one string', () => {
			const rawString = `
				{greetings}, i have {
					apples, 
					plural, 
						one {{apples} apple}, 
						few {{apples} apples} 
				} and you?
			`;
			const actual = tokenizer.tokenize(rawString);
			const expect: Token[] = [
				{type:'text', value: '\n\t\t\t\t'},
				{type:'value', key: 'greetings'},
				{type:'text', value: ', i have '},
				{
					type:'plural',
					key: 'apples',
					value: {
						one: [
							{type:'value', key: 'apples'},
							{type:'text', value: ' apple'},
						],
						few: [
							{type:'value', key: 'apples'},
							{type:'text', value: ' apples'},
						],
					},
				},
				{type:'text', value: ' and you?\n\t\t\t'},
			];

			assert.deepEqual(actual, expect);
		});
	});
});