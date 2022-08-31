
/*
import gm from '../../engine/math-library/index.js';
import Mode from '../mode.js';
import OccupyObjectAction from '../actions/OccupyObjectAction.js';
import ReleaseObjectAction from '../actions/ReleaseObjectAction.js';
import RotateObjectAction from '../actions/RotateObjectAction.js';

export default function Rotate({ engine, project, manager }) {
	let origin;
	let oldAngle;
	let pickedObject;
	let initial;

	function mouseDown(e) {
		if (e.buttons === 1) {
			pickedObject = engine.pick(project.scene, e);

			if (pickedObject) {
				initial = Float32Array.from(pickedObject.transform);

				origin = engine.viewController.project(
					gm.v3.of(
						pickedObject.transform[12],
						pickedObject.transform[13],
						pickedObject.transform[14]
					)
				);

				const dir = gm.v2.of(e.clientX, e.clientY);
				gm.v2.subtract(dir, dir, origin);

				oldAngle
					= Math.atan(dir[1] / dir[0])
					+ (dir[0] < 0 ? 3.14159 : dir[1] < 0 ? 6.28318 : 0);

				manager.execute(OccupyObjectAction({ object: pickedObject }));
			}
		}
	}

	function mouseMove(e) {
		if (pickedObject) {
			const nir = [e.clientX - origin[0], e.clientY - origin[1]];
			const angle
				= Math.atan(nir[1] / nir[0])
				+ (nir[0] < 0 ? 3.14159 : nir[1] < 0 ? 6.28318 : 0);
			const axis = engine.viewController.getOppositeBasePlane();
			gm.m4.rotate(pickedObject.transform, initial, axis, oldAngle - angle);
		}
	}

	function mouseUp(e) {
		if (pickedObject) {
			const nir = [e.clientX - origin[0], e.clientY - origin[1]];
			const angle
				= Math.atan(nir[1] / nir[0])
				+ (nir[0] < 0 ? 3.14159 : nir[1] < 0 ? 6.28318 : 0);
			const axis = engine.viewController.getOppositeBasePlane();

			initial.forEach(
				(value, index) => pickedObject.transform[index] = value
			);

			manager.execute(
				RotateObjectAction({
					object: pickedObject,
					axis,
					angle: oldAngle - angle,
				})
			);
			manager.execute(ReleaseObjectAction({ object: pickedObject }));
			pickedObject = undefined;
		}
	}

	return Object.assign({}, Mode(), {
		mouseDown,
		mouseMove,
		mouseUp,
	});
}

*/