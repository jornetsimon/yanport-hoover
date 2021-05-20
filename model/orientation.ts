export type Orientation = 'N' | 'E' | 'W' | 'S';
export const CardinalPoints: Array<Orientation> = ['N', 'E', 'S', 'W'];

export function isOrientation(x: unknown): x is Orientation {
	return typeof x === 'string' && CardinalPoints.includes(x as Orientation);
}
