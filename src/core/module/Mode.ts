import {MouseMoveEvent, MouseWheelEvent} from '@core/type/event';
import {Invoker} from '@module';

export class Mode {
	constructor(private invoker: Invoker) {}

	onMouseMove(event: MouseMoveEvent): void {
		console.log(event);
	}

	onWheelRoll(event: MouseWheelEvent): void {
		console.log(event);
	}
}
