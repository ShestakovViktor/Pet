import {Stringifier, Tokenizer} from '.';
import {
	KeyNotFoundError,
	NamespaceNotFoundError,
} from '@core/error/i18n';
import {Locale, Dictionary, Token} from '@core/type/i18n';

type Settings = {
	[key: string]: string | undefined;
	namespace: string;
	language: string;
}

export class I18n {
	private settings: Settings = {
		namespace: 'default',
		language: 'en',
	};

	private tokenizer!: Tokenizer;
	private stringifier!: Stringifier;

	private locale!: Locale;
	private dict!: Dictionary<Token[]>;

	constructor(
		public locales: {[key: string]: Locale},
		settings?: Partial<Settings>
	) {
		for (const key in settings) {
			if (settings[key] != undefined) this.settings[key] = settings[key];
		}

		this.setLocale(this.settings.language);
	}

	getLocale(): Locale {
		return this.locale;
	}

	setLocale(key: string): void {
		const locale = this.locales[key];

		this.locale = locale;
		this.tokenizer = new Tokenizer();
		this.stringifier = new Stringifier(locale.settings);
		this.dict = this.genDictionary(locale.dictionary);
	}

	getLocales(): {name: string; key: string}[] {
		const result: {name: string; key: string}[] = [];

		for (const key in this.locales) {
			const locale = this.locales[key];
			result.push({key, name: locale.name});
		}

		return result;
	}

	genDictionary(dictionary: Dictionary<string>): Dictionary<Token[]> {
		const result: Dictionary<Token[]> = {};

		for (const section in dictionary) {
			result[section] = {};

			for (const word in dictionary[section]) {
				result[section][word] = this.tokenizer
					.tokenize(dictionary[section][word]);
			}
		}

		return result;
	}

	t(
		key: string,
		params?: Partial<{
			ns: string;
			replace: {[key: string]: string | number | Date};
		}>
	): string {
		const namespace = params?.ns ?? this.settings.namespace;

		if (!(namespace in this.dict)) {
			throw new NamespaceNotFoundError(namespace);
		}
		else if (!(key in this.dict[namespace])) {
			throw new KeyNotFoundError(key);
		}

		const words = this.dict[namespace];


		const word = words[key];

		return this.stringifier.stringify(word, params?.replace);
	}
}