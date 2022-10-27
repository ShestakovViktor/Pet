export class TokenTypeNotFoundError extends Error {
	constructor(tokenType: string) {
		super(`"${tokenType}" - token type not found`);
		Error.captureStackTrace(this, new.target);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}