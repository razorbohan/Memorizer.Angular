import { Component, OnInit, HostBinding } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MemoService } from '../shared/services/memo.service';
import { Memo } from '../shared/models/memo';
import { Message } from '../shared/models/message';
import { FinishComponent } from '../shared/modals/finish/finish.component';
import { ConfirmComponent } from '../shared/modals/confirm/confirm.component';
import { fadeTrigger } from '../shared/animations/fade.animation';


@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [fadeTrigger]
})
export class HomeComponent implements OnInit {

	@HostBinding('@fade') anim = true;

	currentMemo: Memo = new Memo();
	count: number;
	mode: string;

	isLoading: boolean;
	isShowAnswer: boolean;
	isShowUpdateGroup: boolean;

	message: Message;

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
					this.modalService.show(FinishComponent, { initialState: { mode: this.mode } });
					this.clearView();
				}
			);
		} catch (error) {
			this.message = new Message(`Error getting memos: ${error.message}`, 'danger')
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
		let question = this.currentMemo.question;
		let answer = this.currentMemo.answer;
		this.currentMemo.question = answer;
		this.currentMemo.answer = question;
	}

	async submitAnswer(answer: string) {
		try {
			this.isLoading = true;
			let message = await this.memoService.submitAnswer('123');
			if (message.type == 'danger')
				this.message = message;
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
			let modalRef = this.modalService.show(ConfirmComponent, { class: 'modal-sm' });
			modalRef.content.onClose.subscribe(async isConfirmed => {
				if (isConfirmed) {
					this.isLoading = true;
					this.message = await this.memoService.deleteMemo(this.currentMemo);
					this.isLoading = false;
				}
			})
		} catch (error) {
			this.message = new Message(error.message, 'danger');
		}
	}
}