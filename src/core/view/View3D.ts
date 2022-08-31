import {Engine} from '@engine';
import {View} from './View';

const LEFT_MOUSE = 1;
const MIDDLE_MOUSE = 4;

export class View3D extends View {
	private prev = new MouseEvent('mousemove');

	constructor(private engine: Engine) {
		super();
	}

	onMouseMove(event: MouseEvent): void {
		this.foo(
			this.prev.clientX - event.clientX,
			this.prev.clientY - event.clientY,
			event.buttons,
			event.ctrlKey,
			event.altKey,
			event.shiftKey
		);
		this.prev = event;
	}

	private foo(
		xOffset: number,
		yOffset: number,
		button: number,
		ctrl: boolean,
		alt: boolean,
		shift: boolean
	): void {
		if (button == LEFT_MOUSE) {
			if (alt) {
				this.engine.camera.rotate(xOffset, yOffset);
			}
			else if (ctrl) {
				this.engine.camera.zoom(yOffset);
			}
			else if (shift) {
				this.engine.camera.move(xOffset, yOffset);
			}
		}
		else if (button == MIDDLE_MOUSE) {
			if (shift) {
				this.engine.camera.move(xOffset, yOffset);
			}
			else {
				this.engine.camera.rotate(xOffset, yOffset);
			}
		}
	}

	onWheelRoll(event: WheelEvent): void {
		this.engine.camera.zoom(-event.deltaY);
	}
}