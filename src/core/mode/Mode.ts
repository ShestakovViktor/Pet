export abstract class Mode {
	abstract onMouseMove(event: MouseEvent): void;
	abstract onWheelRoll(event: WheelEvent): void;
}
