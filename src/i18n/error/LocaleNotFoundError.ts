export class LocaleNotFoundError extends Error {
	constructor(locale: string) {
		super(`"${locale}" - locale not found`);
		Error.captureStackTrace(this, new.target);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}