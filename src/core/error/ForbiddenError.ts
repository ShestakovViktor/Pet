export class ForbiddenError extends Error {
	constructor(message: string) {
		super(message);

		Error.captureStackTrace(this, ForbiddenError);

		Object.setPrototypeOf(this, ForbiddenError.prototype);

		this.name = 'ForbiddenError';
	}
}