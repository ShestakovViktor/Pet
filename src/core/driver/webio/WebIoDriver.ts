import {IoDriver} from '@core/interface';
import {MouseMoveEvent, MouseWheelEvent} from '@core/type/event';

export class WebIoDriver implements IoDriver {
	private prevMouseMoveEvent = new MouseEvent('mousemove');

	constructor(private canvas: HTMLCanvasElement) {}

	onMouseMove(callback: (event: MouseMoveEvent) => void): void {
		this.canvas.addEventListener('mousemove', event => {
			callback(this.processMouseMoveEvent(event));
		});
	}

	private processMouseMoveEvent(event: MouseEvent): MouseMoveEvent {
		const e = {
			xOffset: event.clientX - this.prevMouseMoveEvent.clientX,
			yOffset: -(event.clientY - this.prevMouseMoveEvent.clientY),
			button: event.buttons,
			ctrl: event.ctrlKey,
			alt: event.altKey,
			shift: event.shiftKey,
		};

		this.prevMouseMoveEvent = event;

		return e;
	}

	onWheelRoll(callback: (event: MouseWheelEvent) => void): void {
		this.canvas.addEventListener('wheel', event => {
			callback(event);
		}, {capture: true, passive: true});
	}
}