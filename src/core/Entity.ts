import {Matrix4, Vector3, Model, Color} from '@engine/type';
import {ml} from '@engine/math';

export class Entity {
	private selected = false;
	private occupied = false;

	constructor(
		public model: Model,
		private transform: Matrix4,
		private color: Color = new Float32Array([0, 95, 135])
	) {
	}

	getPosition(): Vector3 {
		return ml.vec3.initFromValues(
			this.transform[12],
			this.transform[13],
			this.transform[14]
		);
	}

	getFoo(): {
		model: Model;
		transform: Matrix4;
		color: Color;
	} {
		return {
			model: this.model,
			transform: this.transform,
			color: this.color,
		};

	}


	select(): void {
		this.selected = true;
	}

	deselect(): void {
		this.selected = false;
	}

	isSelected(): boolean {
		return this.selected;
	}

	occupy(): void {
		this.occupied = true;
	}

	release(): void {
		this.occupied = false;
	}

	isOccupied(): boolean {
		return this.occupied;
	}

	move(position: Vector3): void {
		this.transform[12] = position[0];
		this.transform[13] = position[1];
		this.transform[14] = position[2];
	}
}