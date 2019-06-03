import { Injectable } from '@angular/core';
import { Memo, PostponeLevels } from '../models/memo';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';

class ApiResponse {
	constructor(public success: boolean, public body: Object, public error: string) { }
}

@Injectable()
export class MemoService {

	private baseUrl = 'https://localhost:44367/api';
	private memos: Memo[];
	public memoSubject: BehaviorSubject<{ currentMemo: Memo, count: number }>;
	public modeSubject: BehaviorSubject<string>;
	public mode: string;

	constructor(private http: HttpClient) {
		this.mode = 'Repeat';
		this.modeSubject = new BehaviorSubject<string>(this.mode);
	}

	public async getMemos(): Promise<void> {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				let response = await this.http.get<ApiResponse>(`${this.baseUrl}/GetMemos`).toPromise();
				if (!response.success)
				//throw response.error;
				{
					reject(response.error);
					return;
				}

				let memos = <Memo[]>response.body;
				this.memos = this.filterMemos(memos);

				this.memoSubject = new BehaviorSubject<{ currentMemo: Memo, count: number }>
					({ currentMemo: this.memos.pop(), count: this.memos.length });

				//return count;
				resolve();
			}, 1000);
		});
	}

	public switchMode() {
		this.mode = this.mode == 'Repeat' ? 'Learn' : 'Repeat';
		this.modeSubject.next(this.mode);
	}

	private filterMemos(memos: Memo[]): Memo[] {
		return memos
			.filter((memo) => {
				return new Date(memo.repeatDate) < new Date()
					&& this.mode == 'Repeat'
					? memo.postponeLevel != 0
					: memo.postponeLevel == 0;
			}).sort((date1, date2) => {
				return new Date(date1.repeatDate).getTime() - new Date(date2.repeatDate).getTime();
			}).sort((level1, level2) => {
				return level1.postponeLevel - level2.postponeLevel;
			});
	}

	public async updateMemo(memo: Memo): Promise<Message> {
		return new Promise<Message>((resolve) => {
			setTimeout(async () => {
				try {
					let response = await this.http.post<ApiResponse>(`${this.baseUrl}/UpdateMemo`, memo).toPromise();
					if (response.success)
						//return new Message('Updated!', 'success');
						resolve(new Message('Updated!', 'success'));
					else //return new Message(`Error updating memo: ${response.error}`, 'danger')
						resolve(new Message(`Error updating memo: ${response.error}`, 'danger'));
				} catch (error) {
					//return new Message(`Error updating memo: ${error.status}: ${error.statusText}`, 'danger');
					resolve(new Message(`Error updating memo: ${error.status}: ${error.statusText}`, 'danger'));
				}
			}, 1000);
		});
	}

	public async addMemo(memo: Memo): Promise<Message> {
		return new Promise<Message>((resolve) => {
			setTimeout(async () => {
				try {
					let response = await this.http.post<ApiResponse>(`${this.baseUrl}/AddMemo`, memo).toPromise();
					if (response.success)
						//return new Message('Added!', 'success');
						resolve(new Message('Added!', 'success'));
					else //return new Message(`Error adding memo: ${response.error}`, 'danger')
						resolve(new Message(`Error adding memo: ${response.error}`, 'danger'));
				} catch (error) {
					//return new Message(`Error adding memo: ${error.status}: ${error.statusText}`, 'danger');
					resolve(new Message(`Error adding memo: ${error.status}: ${error.statusText}`, 'danger'));
				}
			}, 1000);
		});
	}

	public async deleteMemo(memo: Memo): Promise<Message> {
		return new Promise<Message>((resolve) => {
			setTimeout(async () => {
				try {
					let response = await this.http.post<ApiResponse>(`${this.baseUrl}/DeleteMemo`, memo.id).toPromise();
					if (response.success)
						//return new Message('Deleted!', 'success');
						resolve(new Message('Deleted!', 'success'));
					else //return new Message(`Error deleting memo: ${response.error}`, 'danger')
						resolve(new Message(`Error deleting memo: ${response.error}`, 'danger'));
				} catch (error) {
					//return new Message(`Error deleting memo: ${error.status}: ${error.statusText}`, 'danger');
					resolve(new Message(`Error deleting memo: ${error.status}: ${error.statusText}`, 'danger'));
				} finally {
					this.nextMemo();
				}
			}, 1000);
		});
	}

	public async submitAnswer(answer: string): Promise<Message> {
		let currentMemo = this.memoSubject.value.currentMemo;

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
				throw new Error(`Wrong answer: '${answer}'`);
			//resolve(new Message(`Wrong answer: '${answer}`, 'danger'));
			//return;
		}

		let message = await this.updateMemo(currentMemo);
		this.nextMemo();

		return message;
	}

	private nextMemo() {
		if (this.memos.length > 0) {
			this.memoSubject.next({ currentMemo: this.memos.pop(), count: this.memos.length });
		}
		else {
			this.memoSubject.complete();
		}
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