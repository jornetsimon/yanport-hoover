import { Grid } from './grid';
import { Hoover } from './hoover';
import { Compass } from '../utilities/compass';
import { Instruction } from './instruction';

describe('hoover', () => {
	const grid = new Grid({ x: 10, y: 10 });
	const position = { x: 0, y: 0 };
	const orientation = 'N';
	const instructions: Array<Instruction> = ['A', 'D', 'A'];
	const hoover = new Hoover(grid, position, orientation, instructions);

	it('should instantiate', () => {
		expect(hoover).toBeInstanceOf(Hoover);
		expect(hoover.x).toEqual(position.x);
		expect(hoover.instructions).toEqual(instructions);
		expect(hoover.compass).toBeInstanceOf(Compass);
	});

	describe('position validation', () => {
		it('should be called on instantiation', () => {
			expect(() => {
				new Hoover(grid, { x: 13, y: 5 }, orientation, instructions);
			}).toThrow();
		});
		it('should return the input', () => {
			const position = { x: 3, y: 3 };
			expect(hoover.validatePosition(position)).toEqual(position);
		});
	});

	it('should provide the current position', () => {
		expect(hoover.position).toEqual(position);
	});

	describe('position parser', () => {
		it('can parse', () => {
			expect(Hoover.parsePosition([12, '8'])).toEqual({
				x: 12,
				y: 8,
			});
		});
		it('should reject incorrect values', () => {
			expect(() => Hoover.parsePosition(['str', 2])).toThrow();
		});
	});

	it('can validate instructions', () => {
		expect(Hoover.validateInstructions(['A', 'D', 'G', 'A'])).toEqual(['A', 'D', 'G', 'A']);
		expect(() => Hoover.validateInstructions([3, 'A'])).toThrow();
		expect(() => Hoover.validateInstructions(['dd'])).toThrow();
	});

	describe('run', () => {
		const orientation = 'N';
		const instructions: Array<Instruction> = ['D', 'A', 'A', 'G', 'A', 'D', 'A'];
		const hoover = new Hoover(grid, position, orientation, instructions);
		const result = hoover.run();
		const expectedOrientation = 'E';
		const expectedPosition = { x: 3, y: 1 };

		it('should execute instructions correctly', () => {
			expect(hoover.orientation).toEqual(expectedOrientation);
			expect(hoover.position).toEqual(expectedPosition);
		});
		it('should return the final position and orientation', () => {
			expect(result).toEqual({
				...expectedPosition,
				orientation: expectedOrientation,
			});
		});
		it('should ignore invalid movements', () => {
			const hoover = new Hoover(grid, position, orientation, ['G', 'A', 'D', 'A']);
			hoover.run();
			expect(hoover.position).toEqual({ x: 0, y: 1 });
		});
	});
});
