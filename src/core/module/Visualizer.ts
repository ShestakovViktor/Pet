import {Engine, Scene, View} from '@module';

export class Visualizer {

	constructor(
		private engine: Engine,
		private view: View,
		private scene: Scene
	) {}

	draw(): void {

		const entities = this.scene.getScaffold();
		entities.forEach(entity => {
			const m = entity.getFoo();
			this.engine.monocolorRender(
				this.view.getPVMatrix(),
				m.model,
				m.transform,
				m.color
			);
		});
	}
}