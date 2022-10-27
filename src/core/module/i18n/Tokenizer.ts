import {Token} from '@core/type/i18n';

export class Tokenizer {
	tokenize(input: string): Token[] {
		const result: Token[] = [];

		this.tokenizeString(input, (node, type) => {
			result.push(type == 'text'
				? this.tokenizeText(node)
				: this.parseTag(node)
			);
		});

		return result;
	}


	private tokenizeString(
		input: string,
		callback: (node: string, type: 'text' | 'tag') => void
	): void {
		let lvl = 0;
		let node = '';

		for (let i = 0; i < input.length + 1; i++) {
			const char = input[i];

			const dir = char == '{' ? 1 : char == '}' ? -1 : 0;

			if (
				i == input.length
				|| lvl == 0 && dir == 1
				|| lvl == 1 && dir == -1
			) {
				const type = lvl == 0 ? 'text' : 'tag';
				if (node) {
					callback(node, type);
					node = '';
				}
			}
			else {
				node += char;
			}

			lvl += dir;
		}
	}

	private tokenizeText(textString: string): Token {
		return {
			type: 'text',
			value: textString,
		};
	}

	private parseTag(tagString: string): Token {
		const str = tagString.split(',');

		const [key, type = 'value', ...value] = str;

		const token: Token = {type: type.trim()};

		if (key) token.key = key.trim();

		if (value.length) token.value = this.parseValue(value.join(''));

		return token;
	}

	private parseValue(valueString: string): {[key: string]: Token[]} {
		const res: {[key: string]: Token[]} = {};

		let valueKey: string;

		this.tokenizeString(valueString, (str, type) => {
			if (type == 'text') valueKey = str.trim();
			else res[valueKey] = this.tokenize(str);
		});

		return res;
	}
}