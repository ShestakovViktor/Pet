export interface DbDriver {
	save(key: string, value: string): void;
	load(key: string): string | undefined;
}