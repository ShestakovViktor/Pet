import {strict as assert} from 'assert';
import {ml} from '@math';

describe('Vector 3 math', () => {
	it('Length', () => {
		const vectorA = ml.vec3.init(1, 2, 3);

		const actual = ml.vec3.length(vectorA);
		const expect = 3.7416573867739413;

		assert.deepEqual(actual, expect);
	});

	it('Scale', () => {
		const vectorA = ml.vec3.init(1, 2, 3);

		const actual = ml.vec3.scale(vectorA, vectorA, 5);
		const expect = ml.vec3.init(5, 10, 15);

		assert.deepEqual(actual, expect);
	});

	it('Add', () => {
		const vectorA = ml.vec3.init(1, 1, 1);
		const vectorB = ml.vec3.init(1, 1, 1);

		const actual = ml.vec3.add(ml.vec3.init(), vectorA, vectorB);
		const expect = ml.vec3.init(2, 2, 2);

		assert.deepEqual(actual, expect);
	});

	it('Subtract', () => {
		const vectorA = ml.vec3.init(1, 1, 1);
		const vectorB = ml.vec3.init(1, 1, 1);

		const actual = ml.vec3.subtract(ml.vec3.init(), vectorA, vectorB);
		const expect = ml.vec3.init(0, 0, 0);

		assert.deepEqual(actual, expect);
	});

	it('Cross', () => {
		const vectorA = ml.vec3.init(1, 2, 3);
		const vectorB = ml.vec3.init(2, 2, 2);

		const actual = ml.vec3.cross(ml.vec3.init(), vectorA, vectorB);
		const expect = ml.vec3.init(-2, 4, -2);

		assert.deepEqual(actual, expect);
	});

	it('Dot', () => {
		const vectorA = ml.vec3.init(1, 2, 3);
		const vectorB = ml.vec3.init(2, 2, 2);

		const actual = ml.vec3.dot(vectorA, vectorB);
		const expect = 12;

		assert.deepEqual(actual, expect);
	});
});