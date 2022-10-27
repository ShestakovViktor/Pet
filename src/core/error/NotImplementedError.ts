export class NotImplementedError extends Error {
	constructor(message: string) {
		super(message);

		Error.captureStackTrace(this, NotImplementedError);

		Object.setPrototypeOf(this, NotImplementedError.prototype);

		this.name = 'NotImplementedError';
	}
}