import {Camera, Engine, FpsMonitor} from '@engine';
import {View, View3D} from '@core/view';
import {Mode} from '@core/mode';
import {Scaffold} from './module';

export class Core {
	private scaffold: Scaffold;
	private view: View;
	private mode!: Mode;

	constructor(private engine: Engine) {
		this.scaffold = new Scaffold(this.engine);
		this.view = new View3D(this.engine);

		this.initMouseListener();
		this.loop();
	}

	getMode(): string {
		return 'Test';
	}

	getViewport(): HTMLCanvasElement {
		return this.engine.getViewport();
	}

	updateViewport(): void {
		this.engine.updateViewportSize();
	}

	getCamera(): Camera {
		return this.engine.camera;
	}

	getFps(): ReturnType<FpsMonitor['getFps']> {
		return this.engine.fpsMonitor.getFps();
	}

	changeProjection(): void {
		this.engine.camera.setProjectionMode(
			this.engine.camera.getProjectionMode() == 'perspective'
				? 'orthogonal'
				: 'perspective'
		);
	}

	initMouseListener(): void {
		this.engine.getViewport().addEventListener('mousemove', event => {
			this.view.onMouseMove(event);
			//this.mode.onMouseMove(event);
		});

		this.engine.getViewport().addEventListener('wheel', event => {
			this.view.onWheelRoll(event);
			//this.mode.onWheelRoll(event);
		}, {capture: true, passive: true});
	}


	loop(): void {
		this.engine.clear();
		//this.engine.draw(this.scaffold.origin.model);

		let m;

		m = this.scaffold.xAxis.getFoo();
		this.engine.monocolorRender(
			m.model,
			m.transform,
			m.color
		);

		m = this.scaffold.yAxis.getFoo();
		this.engine.monocolorRender(
			m.model,
			m.transform,
			m.color
		);

		m = this.scaffold.zAxis.getFoo();
		this.engine.monocolorRender(
			m.model,
			m.transform,
			m.color
		);

		m = this.scaffold.xyPlane.getFoo();
		this.engine.monocolorRender(
			m.model,
			m.transform,
			m.color
		);

		m = this.scaffold.yzPlane.getFoo();
		this.engine.monocolorRender(
			m.model,
			m.transform,
			m.color
		);

		m = this.scaffold.xzPlane.getFoo();
		this.engine.monocolorRender(
			m.model,
			m.transform,
			m.color
		);

		window.requestAnimationFrame(() => this.loop());
	}
}
