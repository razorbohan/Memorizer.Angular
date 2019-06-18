import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MemoService } from '../shared/services/memo.service';
import { Memo } from '../shared/models/memo';
import { Message } from '../shared/models/message';
import { FinishComponent } from '../shared/modals/finish/finish.component';
import { ConfirmComponent } from '../shared/modals/confirm/confirm.component';
import { fadeAnimation } from '../shared/animations/fade.animation';

@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {

	currentMemo: Memo = new Memo();
	count: number;
	mode: string;

	isLoading: boolean;
	isShowAnswer: boolean;
	isShowUpdateGroup: boolean;
	isFocused: boolean;

	message: Message;

	constructor(private memoService: MemoService,
		           private modalService: BsModalService) { }

	async ngOnInit() {
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

			await this.memoService.init();
			this.memoService.memoSubject.subscribe(
				(data) => {
					this.isShowAnswer = false;

					this.currentMemo = data.currentMemo;
					this.count = data.count;
				},
				(e) => console.log(e.message),
				() => {
					this.modalService.show(FinishComponent, { initialState: { mode: this.mode } });
					this.clearView();
				}
			);
		} catch (error) {
			this.message = new Message(`Error getting memos: ${error.message}`, 'danger');
		} finally {
			this.isLoading = false;
		}
	}

	showAnswer() {
		this.isShowAnswer = this.currentMemo ? true : false;
	}

	showUpdateGroup(isShow: boolean) {
		this.isShowUpdateGroup = isShow;
	}

	replaceMemos() {
		const question = this.currentMemo.question;
		const answer = this.currentMemo.answer;
		this.currentMemo.question = answer;
		this.currentMemo.answer = question;
	}

	async submitAnswer(answer: string) {
		try {
			this.isLoading = true;
			const message = await this.memoService.submitAnswer(answer);
			if (message.type == 'danger') {
				this.message = message;
			}
		} catch (error) {
			this.message = new Message(error.message, 'danger');
		} finally {
			this.isLoading = false;
		}
	}

	async updateMemo() {
		try {
			this.isLoading = true;
			this.message = await this.memoService.updateMemo(this.currentMemo);
		} catch (error) {
			this.message = new Message(error.message, 'danger');
		} finally {
			this.isLoading = false;
		}
	}

	async deleteMemo() {
		try {
			const modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
			modalRef.content.onClose.subscribe(async isConfirmed => {
				if (isConfirmed) {
					this.isLoading = true;
					this.message = await this.memoService.deleteMemo(this.currentMemo);
					this.isLoading = false;
				}
			});
		} catch (error) {
			this.message = new Message(error.message, 'danger');
		}
	}
}
