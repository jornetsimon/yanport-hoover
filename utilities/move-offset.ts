import { Orientation } from '../model/orientation';
import { Coordinates } from '../model/coordinates';

export const MoveOffset: Readonly<Record<Orientation, Coordinates>> = {
	N: { x: 0, y: 1 },
	E: { x: 1, y: 0 },
	S: { x: 0, y: -1 },
	W: { x: -1, y: 0 },
};
