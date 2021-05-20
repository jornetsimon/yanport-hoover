import { isInstruction, isSetOfInstructions } from './instruction';

describe('instruction', () => {
	it('should have a guard', () => {
		expect(isInstruction('A')).toBe(true);
		expect(isInstruction('G')).toBe(true);
		expect(isInstruction('k')).toBe(false);
	});
	it('should have a set guard', () => {
		expect(isSetOfInstructions(['G', 'A', 'D'])).toBe(true);
		expect(isSetOfInstructions([5, 'A'])).toBe(false);
	});
});
