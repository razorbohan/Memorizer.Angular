import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { MemoService } from '../shared/services/memo.service';
import { Memo } from '../shared/models/memo';
import { FinishComponent } from '../shared/modals/finish/finish.component';
import { Message } from '../shared/models/message';
import { ConfirmComponent } from '../shared/modals/confirm/confirm.component';


@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	private currentMemo: Memo = new Memo();
	private count: number;
	private mode: string;

	public isLoading: boolean;
	private isShowAnswer: boolean;
	private isShowUpdateGroup: boolean;

	public message: Message;
	private finishModalRef: BsModalRef;

	constructor(private memoService: MemoService,
		private modalService: BsModalService) { }

	ngOnInit() {
		this.memoService.modeSubject.subscribe(
			(mode) => {
				this.mode = mode;
				this.clearView();
				this.subscribeToMemos();
			}
		);
	}

	private clearView() {
		this.isShowAnswer = false;
		this.currentMemo = null;
		this.count = 0;
	}

	private async subscribeToMemos() {
		try {
			this.isLoading = true;

			await this.memoService.getMemos();
			this.memoService.memoSubject.subscribe(
				(data) => {
					this.isShowAnswer = false;

					this.currentMemo = data.currentMemo;
					this.count = data.count;
				},
				(e) => console.log(e.message),
				() => {
					this.finishModalRef = this.modalService.show(FinishComponent, { initialState: { mode: this.mode } });
					this.clearView();
				}
			);
		} catch (error) {
			this.message = new Message(`Error getting memos: ${error}`, 'danger')
		} finally {
			this.isLoading = false;
		}
	}

	private showAnswer() {
		this.isShowAnswer = this.currentMemo ? true : false;
	}

	private showUpdateGroup(isShow: boolean) {
		this.isShowUpdateGroup = isShow;
	}

	private replaceMemos() {
		let question = this.currentMemo.question;
		let answer = this.currentMemo.answer;
		this.currentMemo.question = answer;
		this.currentMemo.answer = question;
	}

	private async submitAnswer(answer: string) {
		try {
			this.isLoading = true;
			let message = await this.memoService.submitAnswer(answer);
			if (message.type == 'danger')
				this.message = message;
		} catch (error) {
			this.message = new Message(error.statusText, 'danger');
		} finally {
			this.isLoading = false;
		}
	}

	private async updateMemo() {
		try {
			this.isLoading = true;
			this.message = await this.memoService.updateMemo(this.currentMemo);
		} catch (error) {
			this.message = new Message(error.statusText, 'danger');
		} finally {
			this.isLoading = false;
		}
	}

	private async deleteMemo() {
		try {
			let modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
			let result = modalRef.content.onClose.subscribe(async isConfirmed => {
				if (isConfirmed) {
					this.isLoading = true;
					this.message = await this.memoService.deleteMemo(this.currentMemo);
					this.isLoading = false;
				}
			})
		} catch (error) {
			this.message = new Message(error.statusText, 'danger');
		}
	}
}