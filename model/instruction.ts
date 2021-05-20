export type Instruction = RotateLeft | RotateRight | Forward;
export type RotateLeft = 'G';
export type RotateRight = 'D';
export type Forward = 'A';

export function isInstruction(x: unknown): x is Instruction {
	return typeof x === 'string' && ['G', 'D', 'A'].includes(x);
}
export function isSetOfInstructions(arr: Array<unknown>): arr is Array<Instruction> {
	return arr.every(isInstruction);
}
