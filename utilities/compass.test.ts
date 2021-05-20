import { Compass } from './compass';

describe('compass', () => {
	const compass = new Compass('S');

	it('should instantiate', () => {
		expect(compass).toBeInstanceOf(Compass);
	});

	it('should be able to move forward', () => {
		compass.previous();
		expect(compass.current).toBe('E');
		compass.previous();
		expect(compass.current).toBe('N');
		compass.previous();
		expect(compass.current).toBe('W');
		compass.previous();
		expect(compass.current).toBe('S');
	});
	it('should be able to move backwards', () => {
		compass.next();
		expect(compass.current).toBe('W');
		compass.next();
		expect(compass.current).toBe('N');
		compass.next();
		expect(compass.current).toBe('E');
		compass.next();
		expect(compass.current).toBe('S');
	});
	it('should return current when moved', () => {
		expect(compass.previous()).toBe('E');
		expect(compass.next()).toBe('S');
	});
});
