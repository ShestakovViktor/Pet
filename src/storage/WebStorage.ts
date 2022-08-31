import {Storage} from '@storage/interface';

export class WebStorage implements Storage {
	save(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}

	load(key: string): string | undefined {
		const value = window.localStorage.getItem(key);
		if (value) return value;
		else return undefined;
	}
}