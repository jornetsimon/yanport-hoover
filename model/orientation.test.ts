import { isOrientation } from './orientation';

describe('instruction', () => {
	it('should have a guard', () => {
		expect(isOrientation('N')).toBe(true);
		expect(isOrientation('n')).toBe(false);
		expect(isOrientation('SE')).toBe(false);
		expect(isOrientation(1)).toBe(false);
	});
});
