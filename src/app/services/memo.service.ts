import { Injectable } from '@angular/core';
import { Memo, PostponeLevels } from './memo';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MemoService {

	private baseUrl = 'https://localhost:3000/api';
	private memos: Memo[];
	public Subject = new BehaviorSubject<Memo>(null);

	constructor(private http: HttpClient) { }

	public async getMemos(): Promise<number> {
		let response = await this.http.get<Array<Memo>>(`${this.baseUrl}/GetMemos`).toPromise();
		this.memos = response;

		let count = this.memos.length
		this.nextMemo();

		return count;
	}

	public async updateMemo(memo: Memo): Promise<string> {
		try {
			let response = await this.http.post(`${this.baseUrl}/UpdateMemo`, memo).toPromise();
			return 'Updated!';
		} catch (error) {
			return `Error updating memo: ${error.status}: ${error.statusText}`;
		}
	}

	public async addMemo(memo: Memo): Promise<string> {
		try {
			let response = await this.http.post(`${this.baseUrl}/AddMemo`, memo).toPromise();
			return 'Added!';
		} catch (error) {
			return `Error adding memo: ${error.status}: ${error.statusText}`;
		}
	}

	public async deleteMemo(memo: Memo): Promise<string> {
		try {
			let response = await this.http.post(`${this.baseUrl}/DeleteMemo`, memo.id).toPromise();
			this.nextMemo();
			return 'Deleted!';
		} catch (error) {
			return `Error deleting memo: ${error.status}: ${error.statusText}`;
		}
	}

	private nextMemo() {
		if (this.memos.length > 0)
			this.Subject.next(this.memos.pop());
		else {
			this.Subject.complete();
		}
	}

	async submitAnswer(answer: string) {
		let currentMemo = this.Subject.value;

		switch (answer) {
			case 'Bad':
				currentMemo.repeatDate = this.GetTomorrow();
				currentMemo.postponeLevel = 0;
				currentMemo.scores++;
				break;
			case 'Tomorrow':
				currentMemo.repeatDate = this.GetTomorrow();
				currentMemo.scores++;
				break;
			case 'Later':
				break;
			case 'Cool':
				var nextPostponeLevel = this.NextLevel(currentMemo.postponeLevel);
				currentMemo.repeatDate = this.GetTomorrow(nextPostponeLevel);
				currentMemo.postponeLevel = nextPostponeLevel;
				currentMemo.scores++;
				break;
			default:
				console.error(`Wrong answer: '${answer}'`);
		}

		await this.updateMemo(currentMemo);

		this.nextMemo();
	}

	private GetTomorrow(add = 1) {
		var tomorrow = new Date();
		tomorrow.setDate(new Date().getDate() + add);
		tomorrow.setHours(0, 0, 0, 0);

		return tomorrow;
	}

	private NextLevel(currentLevel) {
		let index = PostponeLevels.indexOf(currentLevel) + 1;
		return (PostponeLevels.length == index) ? currentLevel : PostponeLevels[index];
	}
}