export class Monitor {
	private fps = 0;
	private frames: number[] = [];

	getFps(): number {
		return this.frames.length;
	}

	perform(): void {
		const now = performance.now();

		while (
			this.frames.length > 0
			&& this.frames[0] <= now - 1e3
		) {
			this.frames.shift();
		}

		this.fps = this.frames.length;
		this.frames.push(now);
	}
}