import { Grid } from './grid';
import { Coordinates } from './coordinates';
import { Orientation } from './orientation';
import { Instruction, isSetOfInstructions, RotateLeft, RotateRight } from './instruction';
import { Compass } from '../utilities/compass';
import { MoveOffset } from '../utilities/move-offset';
import chalk from 'chalk';

export class Hoover implements Coordinates {
	x: number = 0;
	y: number = 0;
	instructions: Array<Instruction>;
	compass: Compass;

	constructor(
		private readonly grid: Grid,
		position: Coordinates,
		public orientation: Orientation,
		instructions: Array<Instruction>
	) {
		this.validatePosition(position);
		this.position = position;
		this.compass = new Compass(this.orientation);
		this.instructions = instructions;
	}

	get position(): Coordinates {
		return { x: this.x, y: this.y };
	}

	set position(p: Coordinates) {
		this.x = p.x;
		this.y = p.y;
	}

	/**
	 * Parses an array of values for a position
	 * @param input
	 */
	static parsePosition(input: Array<string | number>): Coordinates {
		const positions = input.slice(0, 2).map((value) => {
			const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value;
			if (isNaN(parsedValue)) {
				throw new Error(`La position '${value}' est incorrecte. Un entier positif ou égal à zéro est attendu.`);
			}
			return parsedValue;
		});
		return {
			x: positions[0],
			y: positions[1],
		};
	}

	/**
	 * Ensures the set of instructions is correct
	 * @param input
	 */
	static validateInstructions(input: Array<unknown>) {
		if (!isSetOfInstructions(input)) {
			throw new Error(`Le jeu d'instructions est incorrect`);
		}
		return input;
	}

	private executeInstruction(instruction: Instruction) {
		console.log(chalk.magentaBright(`# Processing instruction ${instruction}`));
		switch (instruction) {
			case 'D':
			case 'G':
				this.rotate(instruction);
				break;
			case 'A':
				this.move();
				break;
		}
	}

	/**
	 * Perform a rotation
	 * @returns The new orientation
	 */
	private rotate(instruction: RotateLeft | RotateRight) {
		console.log(chalk.blueBright('Rotating'));
		switch (instruction) {
			case 'G':
				this.orientation = this.compass.previous();
				break;
			case 'D':
				this.orientation = this.compass.next();
				break;
		}
		console.log(`=> new orientation : ${this.orientation}`);
		return this.orientation;
	}

	/**
	 * Perform a move in towards the current orientation
	 * @private
	 * @returns The new position
	 */
	private move() {
		const offset = MoveOffset[this.orientation];
		const newPosition: Coordinates = { x: this.position.x + offset.x, y: this.position.y + offset.y };
		try {
			// Only if the move is valid withing the grid
			this.validatePosition(newPosition);
			// The new position is set
			this.position = newPosition;
			console.log(chalk.blueBright('Moving'));
		} catch {
			console.error(chalk.red('Mouvement invalide. Ignoré.'));
		}

		console.log(`=> new position : ${this.position.x},${this.position.y}`);
		return newPosition;
	}

	/**
	 * Ensures the hoover position is compatible with the grid dimensions
	 * @param position
	 */
	validatePosition(position: Coordinates) {
		const isXAxisCorrect = position.x >= 0 && position.x <= this.grid.x;
		const isYAxisCorrect = position.y >= 0 && position.y <= this.grid.y;
		if (!(isXAxisCorrect && isYAxisCorrect)) {
			throw new Error(
				`La position '${position.x},${position.y}' est incorrecte car elle n'est pas compatible avec la grille.`
			);
		}
		return position;
	}

	/**
	 * Executes the provided instructions
	 * @returns The final position and orientation
	 */
	run(): Coordinates & { orientation: Orientation } {
		for (const instruction of this.instructions) {
			this.executeInstruction(instruction);
		}
		return {
			...this.position,
			orientation: this.orientation,
		};
	}
}
