export abstract class View {
	abstract onMouseMove(event: MouseEvent): void;
	abstract onWheelRoll(event: WheelEvent): void;
}