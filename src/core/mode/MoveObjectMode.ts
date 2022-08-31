/*
import { ml } from '@engine/math';
import { Mode } from '..';
import SelectObjectMode from './SelectObjectMode.js';

import {
	SelectObjectAction,
	OccupyObjectAction,
	ReleaseObjectAction,
	MoveObjectAction,
} from '../actions';

export class Move extends Mode {

	constructor({ engine, manager, project, selected = [] }) {
		const selectObjectMode = SelectObjectMode({
			engine,
			manager,
			project,
			selected,
		});

		let picked;
		let initialMouseProjection;
		let previousMouseProjection;
		let initialObjectsPositions;
	}

	getMouseProjection(mouseEvent) {
		return ml.mousePlaneProjection({
			mouseEvent,
			pvMatrix: engine.viewController.getPVMatrix(),
			viewportWidth: engine.viewport.width,
			viewportHeight: engine.viewport.height,
			planeNormal: engine.viewController.getOppositeBasePlaneNormal(),
			planePoint: Float32Array.of(0, 0, 0),
		});
	}

	mouseDown(mouseEvent): void {
		if (mouseEvent.button === 0) {
			picked = engine.pick({
				set: project.scene,
				point: mouseEvent,
			});

			if (!picked.length) return selectObjectMode.mouseDown(mouseEvent);
			else {
				initialMouseProjection = getMouseProjection(mouseEvent);
				previousMouseProjection = initialMouseProjection;

				if (picked.length && !picked[0].isSelected()) {
					manager.execute(
						SelectObjectAction({ storage: selected, objects: picked })
					);
				}

				initialObjectsPositions = selected.map((object) =>
					object.getPosition()
				);
				manager.execute(OccupyObjectAction({ objects: selected }));
			}
		}
	}

	mouseMove(mouseEvent): void {
		if (mouseEvent.buttons === 1) {
			if (!picked.length) return selectObjectMode.mouseMove(mouseEvent);
			else {
				const currentMouseProjection = getMouseProjection(mouseEvent);
				manager.execute(
					MoveObjectAction({
						objects: selected,
						vector: ml.v3.subtract(
							ml.v3.init(),
							currentMouseProjection,
							previousMouseProjection
						),
						silent: true,
					})
				);
				previousMouseProjection = currentMouseProjection;
			}
		}
	}

	mouseUp(mouseEvent): void {
		if (mouseEvent.button === 0) {
			if (!picked.length) return selectObjectMode.mouseUp(mouseEvent);
			else {
				selected.forEach((object, index) => {
					object.move(initialObjectsPositions[index]);
				});

				manager.execute(
					MoveObjectAction({
						objects: selected,
						vector: ml.v3.subtract(
							ml.v3.init(),
							getMouseProjection(mouseEvent),
							initialMouseProjection
						),
					})
				);

				manager.execute(ReleaseObjectAction({ objects: selected }));
				picked.length = 0;
			}
		}
	}
}

*/