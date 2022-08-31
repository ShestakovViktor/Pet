export type Token = {
	type: string;
	key?: string;
	value?: string | {
		[key: string]: Token[];
	};
}


export type TextToken = {
	type: 'text';
	value: string;
}

export type ValueToken = {
	type: 'value';
	key: string;
}

export type PluralToken = {
	type: 'plural';
	key: string;
	value: {
		[key: string]: Token[];
	};
}

