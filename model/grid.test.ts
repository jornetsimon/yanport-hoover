import { Grid } from './grid';

describe('the grid', () => {
	it('should instantiate', () => {
		const grid = new Grid({ x: 2, y: 2 });
		expect(grid).toBeInstanceOf(Grid);
		expect(grid.x).toEqual(2);
		expect(grid.y).toEqual(2);
	});

	it('should reject incorrect input dimensions', () => {
		expect(() => {
			new Grid({ x: -1, y: 7 });
		}).toThrow();
	});

	it('can parse dimensions', () => {
		expect(Grid.parseDimensions([3, '5'])).toEqual({ x: 3, y: 5 });
	});
});
