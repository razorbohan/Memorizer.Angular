import { Component, OnInit } from '@angular/core';
import { MemoService } from '../shared/services/memo.service';
import { Memo } from '../shared/models/memo';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FinishComponent } from '../shared/modals/finish/finish.component';


@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [MemoService]
})
export class HomeComponent implements OnInit {

	private currentMemo: Memo = new Memo();
	private count: number;
	private mode: string = "Repeat";
	private isLoading: boolean;

	private isShowAnswer: boolean;
	private isShowUpdateGroup: boolean;

	private message: string;
	private isShowMessage: boolean;
	private isSuccess: boolean;

	private finishModalRef: BsModalRef;

	constructor(private memoService: MemoService,
		private modalService: BsModalService) { }

	async ngOnInit() {
		this.count = await this.memoService.getMemos();

		this.memoService.Subject.subscribe(
			(memo: Memo) => {
				this.isShowAnswer = false;
				this.currentMemo = memo;

				this.count--;
			},
			(e) => console.log(e.message),
			() => {
				this.finishModalRef = this.modalService.show(FinishComponent);
				this.isShowAnswer = false;
				this.currentMemo = null;
			}
		);
	}

	public showAnswer() {
		this.isShowAnswer = this.currentMemo ? true : false;
	}

	public submitAnswer(answer: string) {
		this.memoService.submitAnswer(answer);
	}

	public showUpdateGgroup(isShow: boolean) {
		this.isShowUpdateGroup = isShow;
	}

	public replaceMemos() {
		let question = this.currentMemo.question;
		let answer = this.currentMemo.answer;
		this.currentMemo.question = answer;
		this.currentMemo.answer = question;
	}

	public async updateMemo() {
		try {
			this.isLoading = true;
			this.message = await this.memoService.updateMemo(this.currentMemo);
		} catch (error) {
			this.message = error.statusText;
		}

		this.isSuccess = !this.message.startsWith("Error");
		this.isShowMessage = true;
		this.isLoading = false;
	}

	public async deleteMemo() {
		try {
			this.isLoading = true;
			this.message = await this.memoService.deleteMemo(this.currentMemo);
		} catch (error) {
			this.message = error.statusText;
		}

		this.isSuccess = !this.message.startsWith("Error");
		this.isShowMessage = true;
		this.isLoading = false;
	}

	public hideMessage() {
		this.isShowMessage = false;
	}
}