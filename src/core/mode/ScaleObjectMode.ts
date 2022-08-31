/*

import ml from '../../engine/math-library/index.js';
import Mode from '../mode.js';
import ScaleObjectAction from '../actions/ScaleObjectAction.js';
import OccupyObjectAction from '../actions/OccupyObjectAction.js';
import ReleaseObjectAction from '../actions/ReleaseObjectAction.js';

export default function Scale({ engine, manager, project }) {
	let initialObjectTransform;
	let initialScaleVectorLength;
	let objectOriginScreenProjection;
	let pickedObject;

	// Initial scale vector - it's vector from object origin screen projection point to mouse down event point.
	function getScaleVectorLength(e) {
		const mouseScreenVector = ml.v2.of(e.clientX, e.clientY);
		ml.v2.subtract(
			mouseScreenVector,
			mouseScreenVector,
			objectOriginScreenProjection
		);
		return ml.v2.length(mouseScreenVector);
	}

	function mouseDown(e) {
		if (e.buttons === 1) {
			pickedObject = engine.pick(project.scene, e);
			if (pickedObject) {
				initialObjectTransform = Float32Array.from(pickedObject.transform);
				objectOriginScreenProjection = engine.viewController.project(
					ml.v3.of(
						pickedObject.transform[12],
						pickedObject.transform[13],
						pickedObject.transform[14]
					)
				);

				initialScaleVectorLength = getScaleVectorLength(e);
				manager.execute(OccupyObjectAction({ object: pickedObject }));
			}
		}
	}

	function mouseMove(e) {
		if (pickedObject) {
			const scaleFactor = getScaleVectorLength(e) / initialScaleVectorLength;
			const scaleVector = ml.v3.of(
				1 * scaleFactor,
				1 * scaleFactor,
				1 * scaleFactor
			);
			ml.m4.scale(pickedObject.transform, initialObjectTransform, scaleVector);
		}
	}

	function mouseUp(e) {
		if (pickedObject) {
			const scaleFactor = getScaleVectorLength(e) / initialScaleVectorLength;
			const scaleVector = ml.v3.of(
				1 * scaleFactor,
				1 * scaleFactor,
				1 * scaleFactor
			);

			initialObjectTransform.forEach(
				(value, index) => pickedObject.transform[index] = value
			);
			manager.execute(
				ScaleObjectAction({
					object: pickedObject,
					vector: scaleVector,
				})
			);

			manager.execute(ReleaseObjectAction({ object: pickedObject }));
			pickedObject = undefined;
		}
	}

	return Object.assign({}, Mode(), { mouseDown, mouseMove, mouseUp });
}

*/