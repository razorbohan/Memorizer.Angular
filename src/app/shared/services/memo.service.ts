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

	private baseUrl = 'https://localhost:3000/api';
	private memos: Memo[];
	public Subject = new BehaviorSubject<Memo>(null);

	constructor(private http: HttpClient) { }

	public async getMemos(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			setTimeout(async () => {
				let response = await this.http.get<ApiResponse>(`${this.baseUrl}/GetMemos`).toPromise();
				if (!response.success)
				//throw response.error;
				{
					reject(response.error);
					return;
				}

				this.memos = <Memo[]>response.body;
				let count = this.memos.length;
				this.nextMemo();

				//return count;
				resolve(count);
			}, 1000);
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
					//return new Message(`Error updating memo: ${error.status}: ${error.statusText}`, 'error');
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
					//return new Message(`Error adding memo: ${error.status}: ${error.statusText}`, 'error');
					resolve(new Message(`Error adding memo: ${error.status}: ${error.statusText}`, 'error'));
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
					//return new Message(`Error deleting memo: ${error.status}: ${error.statusText}`, 'error');
					resolve(new Message(`Error deleting memo: ${error.status}: ${error.statusText}`, 'error'));
				} finally {
					this.nextMemo();
				}
			}, 1000);
		});
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

		await this.updateMemo(currentMemo); //TODO: reurn message

		this.nextMemo();
	}

	private nextMemo() {
		if (this.memos.length > 0)
			this.Subject.next(this.memos.pop());
		else {
			this.Subject.complete();
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