import { Grid } from './model/grid';
import { isOrientation } from './model/orientation';
import { Hoover } from './model/hoover';
import chalk from 'chalk';

// Arguments checking
const args = process.argv.slice(2);
if (!(args.length >= 3)) {
	throw new Error(
		`3 arguments sont attendus : dimension de la grille, position et orientation de l'aspirateur, instructions`
	);
}
const [dimensionsArg, positionArg, instructionsArg] = args;

// Build the grid
const gridDimensions = Grid.parseDimensions(dimensionsArg.split(','));
const grid = new Grid(gridDimensions);

// Build the hoover
const hooverPosition = Hoover.parsePosition(positionArg.split(','));
const orientationInput = positionArg.split(',')[2];
const hooverOrientation = isOrientation(orientationInput) ? orientationInput : 'N'; // Orientation defaults to N
const hooverInstructions = Hoover.validateInstructions([...instructionsArg]);
const hoover = new Hoover(grid, hooverPosition, hooverOrientation, hooverInstructions);

// Run the hoover
const finalState = hoover.run();
console.log(
	chalk.greenBright(`Position finale : x=${finalState.x} y=${finalState.y} orientation=${finalState.orientation}`)
);
