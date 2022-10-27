import {Theme} from '@core/type';

export class Style {
	private theme!: Theme;

	constructor(
		private themes: {[key: string]: Theme},
		private settings: Partial<{theme: string}>
	) {
		const themeName = settings.theme ?? 'defaultDark';

		this.setTheme(themeName);
	}

	getTheme(name?: string): Theme {
		return name
			?  this.themes[name]
			: this.theme;
	}

	getThemes(): {name: string; key: string}[] {
		const result: {name: string; key: string}[] = [];

		for (const key in this.themes) {
			const theme = this.themes[key];
			result.push({key, name: theme.name});
		}

		return result;
	}

	setTheme(key: string): void {
		this.theme = this.themes[key];
	}
}