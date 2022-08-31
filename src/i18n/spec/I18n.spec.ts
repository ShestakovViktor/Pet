import {Locale} from '@i18n/type';
import {strict as assert} from 'assert';
import {I18n} from '..';
import {LocaleNotFoundError} from '../error';

describe('I18n', () => {
	const settings = {
		getNumberPluralCategory(n: number): string {
			if (n == 0) return 'zero';
			else if (n == 1) return 'one';
			else if (n > 1) return 'many';
			else return 'other';
		},
	};

	const data: {[key: string]: Locale} = {
		locale1: {
			name: 'locale1',
			settings,
			dictionary: {
				default: {
					translation: 'Translation from default namespace',
					locale: 'Name in locale #1 language',
				},
				different: {
					translation: 'Translation from different namespace',
				},
			},
		},
		locale2: {
			name: 'locale2',
			settings,
			dictionary: {
				default: {
					locale: 'Name in locale #2 language',
				},
			},
		},
	};

	describe('Translation', () => {
		const i18n = new I18n(data, {language: 'locale1'});

		it('Translation from default namespace', () => {
			const actual = i18n.t('translation');
			const expect = 'Translation from default namespace';
			assert.strictEqual(actual, expect);
		});

		it('Translation from different namespace', () => {
			const actual = i18n.t('translation', {ns: 'different'});
			const expect = 'Translation from different namespace';
			assert.strictEqual(actual, expect);
		});
	});

	describe('Locale', () => {
		it('Locale not found error', () => {
			assert.throws(
				() => new I18n(data, {language: 'random'}),
				LocaleNotFoundError
			);
		});

		it('Change locale', () => {
			const i18n = new I18n(data, {language: 'locale1'});

			let actual: string;
			let expect: string;

			actual = i18n.t('locale');
			expect = 'Name in locale #1 language';
			assert.strictEqual(actual, expect);

			i18n.setLocale('locale2');

			actual = i18n.t('locale');
			expect = 'Name in locale #2 language';
			assert.strictEqual(actual, expect);
		});
	});
});