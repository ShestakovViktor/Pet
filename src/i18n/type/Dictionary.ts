export type Dictionary<T = string> = {
	[key: string]: {[key: string]: T};
}
