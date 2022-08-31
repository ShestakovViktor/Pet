import {TokenTypeNotFoundError} from './error/TokenTypeNotFoundError';
import {Input, Token, TextToken, ValueToken, PluralToken, Settings} from './type';

export class Stringifier {
	constructor(private settings: Settings) {}

	stringify(tokens: Token[], dict?: Input): string {
		return tokens.reduce<string>(
			(acc, token) => acc += this.tokenToString(token, dict),
			''
		);
	}

	private tokenToString(token: Token, dict: Input = {}): string {
		if (this.isTextToken(token)) {
			return this.textTokenToString(token);
		}
		else if (this.isValueToken(token)) {
			return this.valueTokenToString(token, dict);
		}
		else if (this.isPluralToken(token)) {
			return this.pluralTokenToString(token, dict);
		}
		else {
			throw new TokenTypeNotFoundError(token.type);
		}
	}

	private isTextToken(token: Token): token is TextToken {
		return token.type == 'text';
	}

	private textTokenToString(token: TextToken): string {
		return token.value;
	}

	private isValueToken(token: Token): token is ValueToken {
		return token.type == 'value';
	}

	private valueTokenToString(token: ValueToken, dict: Input): string {
		return dict[token.key].toString();
	}

	private isPluralToken(token: Token): token is PluralToken {
		return token.type == 'plural';
	}

	private pluralTokenToString(token: PluralToken, dict: Input): string {
		const value = dict[token.key];
		if (typeof value != 'number') throw new Error('Not a number');

		const category = this.settings.getNumberPluralCategory(value);

		const tokens = token.value[category];

		return this.stringify(tokens, dict);
	}
}