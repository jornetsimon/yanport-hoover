import { Coordinates } from './coordinates';

export class Grid implements Coordinates {
	x: number;
	y: number;
	constructor(dimensions: Coordinates) {
		Grid.validateDimensions(dimensions);
		this.x = dimensions.x;
		this.y = dimensions.y;
	}

	/**
	 * Parses an array of values for dimensions
	 * @param input
	 */
	static parseDimensions(input: Array<string | number>): Coordinates {
		const dimensions = input.slice(0, 2).map((value) => (typeof value === 'string' ? parseInt(value, 10) : value));
		return {
			x: dimensions[0],
			y: dimensions[1],
		};
	}

	/**
	 * Ensures some dimensions are correct
	 * @param dimensions
	 */
	static validateDimensions(dimensions: Coordinates) {
		Object.values(dimensions).forEach((dimension) => {
			if (isNaN(dimension) || !(dimension > 0)) {
				throw new Error(`La dimension '${dimension}' est incorrecte. Un entier positif est attendu.`);
			}
		});
		return dimensions;
	}
}
