import * as locales from '@core/locale';
import * as themes from '@core/theme';

import {DbDriver, IoDriver, GlDriver} from '@core/interface';

import {WebDbDriver, WebGlDriver, WebIoDriver} from '@driver';

import {
	View,
	Scene,
	Visualizer,
	Mode,
	Invoker,
	Style,
	I18n,
	Engine,
} from '@module';

export class Core {
	private db: DbDriver;
	private gl: GlDriver;
	private io: IoDriver;

	private style: Style;

	private engine: Engine;
	private view: View;
	private scene: Scene;
	private visualizer: Visualizer;
	private mode: Mode;
	private invoker: Invoker;

	constructor(private viewport: HTMLCanvasElement) {
		this.gl = new WebGlDriver(this.viewport);
		this.io = new WebIoDriver(this.viewport);
		this.db = new WebDbDriver();

		const i18n = new I18n(locales, {language: this.db.load('locale')});
		this.style = new Style(themes, {theme: this.db.load('theme')});

		console.log(i18n);

		this.engine = new Engine(this.gl);

		this.view = new View();
		this.scene = new Scene(this.engine);
		this.visualizer = new Visualizer(this.engine, this.view, this.scene);
		this.invoker = new Invoker();
		this.mode = new Mode(this.invoker);

		this.initMouse();

		this.loop();
	}

	getStyle(): Style {
		return this.style;
	}

	private initMouse(): void {
		this.io.onMouseMove(event => {
			this.view.onMouseMove(event);
			this.mode.onMouseMove(event);
		});

		this.io.onWheelRoll(event => {
			this.view.onWheelRoll(event);
			this.mode.onWheelRoll(event);
		});
	}

	private loop(): void {
		this.engine.clear();
		this.visualizer.draw();
		window.requestAnimationFrame(() => this.loop());
	}

	updateViewportSize(): void {
		const width = this.viewport.clientWidth;
		const height = this.viewport.clientHeight;

		this.viewport.width = width;
		this.viewport.height = height;

		this.engine.updateViewportSize();
		this.view.setAscpetRatio(width / height);
	}
}
