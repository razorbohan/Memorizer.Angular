import { Component, OnInit } from '@angular/core';
import { HomeService as MemoService } from './memo.service';
import { Memo } from './memo';

@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [MemoService]
})
export class HomeComponent implements OnInit {

	private currentMemo: Memo = null;
	private isShowAnswer: boolean;
	private count: number = 0;

	constructor(private memoService: MemoService) { }

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
				console.log("Finished!");
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
}