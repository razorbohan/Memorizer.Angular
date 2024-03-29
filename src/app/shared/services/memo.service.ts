import { Injectable } from '@angular/core';
import { Memo, PostponeLevels } from '../models/memo';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Message } from '../models/message';
import { environment } from '../../../environments/environment';

class ApiResponse {
	constructor(public success: boolean, public body: any, public error: string) { }
}

@Injectable()
export class MemoService {

	private baseUrl = environment.baseUrl;
	private memos: Memo[];
	public memoSubject: BehaviorSubject<{ currentMemo: Memo, count: number }>;
	public modeSubject: BehaviorSubject<string>;
	public mode: string;

	constructor(private http: HttpClient) {
		this.mode = 'Repeat';
		this.modeSubject = new BehaviorSubject<string>(this.mode);
	}

	public async init(): Promise<void> {
		const memos = await this.getMemos();
		this.memos = this.filterMemos(memos);

		this.memoSubject = new BehaviorSubject<{ currentMemo: Memo, count: number }>
			({ currentMemo: this.memos.pop(), count: this.memos.length });
	}

	public async getMemos(): Promise<Memo[]> {
		const response = await this.http.get<ApiResponse>(`${this.baseUrl}/GetMemos`).toPromise();
		if (!response.success) {
			throw new Error(response.error);
		}

		return response.body as Memo[];
	}

	public async updateMemo(memo: Memo): Promise<Message> {
		try {
			const response = await this.http.post<ApiResponse>(`${this.baseUrl}/UpdateMemo`, memo).toPromise();
			if (response.success) {
				return new Message('Updated!', 'success');
			} else {
				return new Message(`Error updating memo: ${response.error}`, 'danger')
			}
		} catch (error) {
			return new Message(`Error updating memo: ${error.status}: ${error.statusText}`, 'danger');
		}
	}

	public async addMemo(memo: Memo): Promise<Message> {
		try {
			const response = await this.http.post<ApiResponse>(`${this.baseUrl}/AddMemo`, memo).toPromise();
			if (response.success) {
				return new Message('Added!', 'success');
			} else {
				return new Message(`Error adding memo: ${response.error}`, 'danger')
			}
		} catch (error) {
			return new Message(`Error adding memo: ${error.status}: ${error.statusText}`, 'danger');
		}
	}

	public async deleteMemo(memo: Memo): Promise<Message> {
		try {
			const response = await this.http.post<ApiResponse>(`${this.baseUrl}/DeleteMemo`, memo.id).toPromise();
			if (response.success) {
				return new Message('Deleted!', 'success');
			} else {
				return new Message(`Error deleting memo: ${response.error}`, 'danger')
			}
		} catch (error) {
			return new Message(`Error deleting memo: ${error.status}: ${error.statusText}`, 'danger');
		} finally {
			this.nextMemo();
		}
	}

	public async submitAnswer(answer: string): Promise<Message> {
		const currentMemo = this.memoSubject.value.currentMemo;

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
				const nextPostponeLevel = this.NextLevel(currentMemo.postponeLevel);
				currentMemo.repeatDate = this.GetTomorrow(nextPostponeLevel);
				currentMemo.postponeLevel = nextPostponeLevel;
				currentMemo.scores++;
				break;
			default:
				throw new Error(`Wrong answer: '${answer}'`);
		}

		const message = await this.updateMemo(currentMemo);
		this.nextMemo();

		return message;
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

	private nextMemo() {
		if (this.memos.length > 0) {
			this.memoSubject.next({ currentMemo: this.memos.pop(), count: this.memos.length });
		} else {
			this.memoSubject.complete();
		}
	}

	public switchMode() {
		this.mode = this.mode == 'Repeat' ? 'Learn' : 'Repeat';
		this.modeSubject.next(this.mode);
	}

	private GetTomorrow(add = 1) {
		const tomorrow = new Date();
		tomorrow.setDate(new Date().getDate() + add);
		tomorrow.setHours(0, 0, 0, 0);

		return tomorrow;
	}

	private NextLevel(currentLevel) {
		const index = PostponeLevels.indexOf(currentLevel) + 1;
		return (PostponeLevels.length == index) ? currentLevel : PostponeLevels[index];
	}
}
