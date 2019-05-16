import { Injectable } from '@angular/core';
import { Memo } from "./memo";

@Injectable()
export class HomeService {

	private memos: Memo[] = [
		new Memo(1, 'sdf1', 'rtg1', 250, new Date('25.04.19'), 4),
		new Memo(2, 'sdf2', 'rtg2', 100, new Date('26.04.19'), 3),
		new Memo(3, 'sdf3', 'rtg3', 2, new Date('27.04.19'), 1),
		new Memo(4, 'sdf4', 'rtg3', 15, new Date('28.04.19'), 15),
		new Memo(5, 'sdf5', 'rtg5', 0, new Date('29.04.19'), 0)
	];

	constructor() { }

	getMemos(): Promise<Memo[]> {
		return Promise.resolve(this.memos);
	}
}