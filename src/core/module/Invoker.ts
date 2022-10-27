import {Action} from '@module';

export class Invoker {
	private done: Action[] = [];
	private canceled: Action[] = [];

	execute(action: Action): void {
		action.execute();
		if (action.type !== 'system') this.done.push(action);
		this.canceled.length = 0;
	}

	undo(): void {
		const action = this.done.pop();
		if (!action) return;

		action.cancel();
		this.canceled.push(action);
	}

	redo(): void {
		const action = this.canceled.pop();

		if (!action) return;

		action.execute();
		this.done.push(action);
	}
}