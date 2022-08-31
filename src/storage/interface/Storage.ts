export interface Storage {
	save(key: string, value: string): void;
	load(key: string): string | undefined;
}