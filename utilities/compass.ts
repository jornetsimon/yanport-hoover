import { CardinalPoints, Orientation } from '../model/orientation';

export class Compass {
	private readonly order = CardinalPoints;
	private currentIndex: number;
	constructor(public current: Orientation) {
		this.currentIndex = this.order.findIndex((e) => e === current);
	}

	next() {
		const index = this.currentIndex + 1;
		this.currentIndex = index % this.order.length;
		this.current = this.order[this.currentIndex];
		return this.current;
	}

	previous() {
		let index = this.currentIndex;
		if (index === 0) {
			index = this.order.length;
		}
		this.currentIndex = index - 1;
		this.current = this.order[this.currentIndex];
		return this.current;
	}
}
