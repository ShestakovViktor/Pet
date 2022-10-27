import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from '@gui/component/root';
import {HSLA, Theme} from '@core/type';
import {Core} from '@core';

export class Gui {
	constructor(viewport: HTMLCanvasElement, core: Core) {
		const rootElement =	document.getElementById('root');
		if (!rootElement) throw new Error();

		const root = ReactDOM.createRoot(rootElement);

		root.render(<App viewport={viewport} core={core}/>);

		this.initThemes(core);
	}

	initThemes(core: Core): void {
		const style = core.getStyle();
		const themes = style.getThemes();

		for (const {key} of themes) {
			const theme = style.getTheme(key);
			const res = this.toCssFormat(theme);

			const element = document.createElement('style');
			element.innerHTML = res;
			document.head.appendChild(element);
		}
	}

	private toCssFormat(theme: Theme): string {
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
