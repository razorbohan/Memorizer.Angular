import { Component, OnInit } from '@angular/core';
import { MemoService } from './memo.service';
import { Memo } from './memo';
import { Http } from '@angular/http';

@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [MemoService]
})
export class HomeComponent implements OnInit {

	private currentMemo: Memo = null;
	private count: number;
	private mode: string = "Repeat";
	private isLoading: boolean;

	private isShowAnswer: boolean;
	private isShowUpdateGroup: boolean;

	private message: string;
	private isShowMessage: boolean;
	private isSuccess: boolean;

	constructor(private memoService: MemoService, private http: Http) { }

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

	public showUpdateGgroup(isShow: boolean) {
		this.isShowUpdateGroup = isShow;
	}

	public replaceMemos() {
		let question = this.currentMemo.question;
		let answer = this.currentMemo.answer;
		this.currentMemo.question = answer;
		this.currentMemo.answer = question;
	}

	public async updateMemos() {
		try {
			this.isLoading = true;
			let response = await this.http.post("/Home/Update", this.currentMemo).toPromise();
			this.message = response.toString();
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