export class NamespaceNotFoundError extends Error {
	constructor(namespace: string) {
		super(`"${namespace}" - Namespace not found`);
		Error.captureStackTrace(this, new.target);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = new.target.name;
	}
}