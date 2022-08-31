export abstract class Action {
	public type = '';
	abstract cancel(): void
	abstract execute(): void
	abstract toString(): void
}
