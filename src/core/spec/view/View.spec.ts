import {strict as assert} from 'assert';
import {View} from '@module';
import {ml} from '@math';

describe('View', () => {
	const view = new View();

	it('Orientation', () => {
		const orientation = view.getOrientation();

		assert.deepEqual(orientation, {
			position: ml.vec3.init(0, 0, 0),
			target: ml.vec3.init(0, 0, 0),
			up: ml.vec3.init(0, 2, 0),
		});
	});
});