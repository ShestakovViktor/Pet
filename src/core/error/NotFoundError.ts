export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);

		Error.captureStackTrace(this, NotFoundError);

		Object.setPrototypeOf(this, NotFoundError.prototype);

		this.name = 'NotFoundError';
	}
}