import { Injectable } from '@angular/core';
import { Memo } from "./memo";
import { BehaviorSubject } from 'rxjs';

let memos = [
	new Memo(1, 'sdf1', 'rtg1', 250, new Date('04.25.19'), 4),
	new Memo(2, 'sdf2', 'rtg2', 100, new Date('04.26.19'), 3),
	new Memo(3, 'sdf3', 'rtg3', 2, new Date('04.27.19'), 1),
	new Memo(4, 'sdf4', 'rtg3', 15, new Date('04.28.19'), 15),
	new Memo(5, 'sdf5', 'rtg5', 0, new Date('04.29.19'), 0)
];

@Injectable()
export class MemoService {

	private memos: Memo[];
	public Subject = new BehaviorSubject<Memo>(null);

	constructor() { }

	public async getMemos(): Promise<number> {
		this.memos = await Promise.resolve(memos);
		let count = this.memos.length
		this.nextMemo();

		return count;
	}

	private nextMemo() {
		if (memos.length > 0)
			this.Subject.next(memos.pop());
		else {
			this.Subject.complete();
		}
	}

	submitAnswer(answer: string) {
		console.log(answer);
		this.nextMemo();
	}
}