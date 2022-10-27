import {DbDriver} from '@core/interface';

export class WebDbDriver implements DbDriver {
	save(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}

	load(key: string): string | undefined {
		const value = window.localStorage.getItem(key);
		if (value) return value;
		else return undefined;
	}
}