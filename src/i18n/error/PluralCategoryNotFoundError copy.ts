export class PluralKa extends Error {
	constructor(key: string) {
		super(`"${key}" - key not found`);
		Error.captureStackTrace(this, new.target);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}