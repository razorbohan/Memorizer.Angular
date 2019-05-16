import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Memo } from './memo';

@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [HomeService]
})
export class HomeComponent implements OnInit {

	private memos: Memo[];
	private currentMemo: Memo;
	private isShowAnswer: boolean = false;

	constructor(private homeService: HomeService) { }

	async ngOnInit() {
		this.memos = await this.homeService.getMemos();
		this.currentMemo = this.memos[0];
	}

	public showAnswer() {
		this.isShowAnswer = true;
	}

	public submitAnswer(answer: string) {
		console.log(answer);
	}
}