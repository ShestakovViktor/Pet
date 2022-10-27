import {MouseMoveEvent, MouseWheelEvent} from '@core/type/event';

export interface IoDriver {
	onMouseMove(callback: (event: MouseMoveEvent) => void): void;
	onWheelRoll(callback: (event: MouseWheelEvent) => void): void;
}