import {Theme} from './type';
import {HSLA} from './type/HSL';

export class Style {
	private theme!: Theme;

	constructor(
		private themes: {[key: string]: Theme},
		private settings: Partial<{theme: string}>
	) {
		const themeName = settings.theme ?? 'dark';

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

	toCssFormat(theme: Theme): string {
		const cssName = this.toCssAttrFormat(theme.key);
		const cssProps = this.toCssVarsFormat(theme.scheme);

		return `[${cssName}] {${cssProps}};`;
	}

	private toCssAttrFormat(name: string): string {
		return `data-theme="${name}"`;
	}

	private toCssVarsFormat(colors: {[key: string]: HSLA}): string {
		let result = '';

		for (const [name, value] of Object.entries(colors)) {
			result += `--${name}: ${this.fooVal(value)};\n`;
		}

		return result;
	}

	private fooVal(value: HSLA): string {
		return `hsla(${value.h}deg, ${value.s}%, ${value.l}%, ${value.a})`;
	}
}