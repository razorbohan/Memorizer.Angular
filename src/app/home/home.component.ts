import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { MemoService } from '../shared/services/memo.service';
import { Memo } from '../shared/models/memo';
import { Message } from '../shared/models/message';
import { FinishComponent } from '../shared/modals/finish/finish.component';
import { ConfirmComponent } from '../shared/modals/confirm/confirm.component';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { MatTableDataSource, MatSort } from '@angular/material';

interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
	selector: 'memo-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
	dataSource: MatTableDataSource<PeriodicElement>;

	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	@ViewChild(MatSort) sort: MatSort;

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

	ngOnInit() {
		this.dataSource = new MatTableDataSource(ELEMENT_DATA);
		this.dataSource.sort = this.sort;
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
			let message = await this.memoService.submitAnswer(answer);
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