import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as moment from 'moment';
import { MemoService } from '../../services/memo.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Message } from '../../models/message';
import { Memo, PostponeLevels } from '../../models/memo';

export const MY_FORMATS = {
	parse: {
		dateInput: 'DD.MM.YYYY',
	},
	display: {
		dateInput: 'DD.MM.YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'DD.MM.YYYY',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

class CustomValidators {
	static dateVaidator(AC: AbstractControl) {
		if (AC && AC.value && !moment(AC.value, 'dd.MM.yyyy', true).isValid()) {
			return { dateVaidator: true };
		}
		return null;
	}
}

@Component({
	selector: 'memo-find',
	templateUrl: './find.component.html',
	styleUrls: ['./find.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class FindMemoComponent implements OnInit {
	message: Message;
	isLoading: boolean;

	controls: FormArray;
	levels: number[];

	dataSource: MatTableDataSource<Memo>;
	displayedColumns: string[] = ['id', 'question', 'answer', 'repeatDate', 'postponeLevel', 'scores'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private memoService: MemoService,
		private modalRef: BsModalRef
	) {
		this.levels = PostponeLevels;
	}

	async ngOnInit() {
		await this.getMemos();
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	private async getMemos() {
		try {
			this.isLoading = true;

			const memos = await this.memoService.getMemos();
			this.generateFormControls(memos);
			this.dataSource = new MatTableDataSource<Memo>(memos);
		} catch (error) {
			console.error(error.statusText);
			this.message = error.statusText;
		} finally {
			this.isLoading = false;
		}
	}

	private generateFormControls(memos: Memo[]) {
		const toGroups = memos.map(entity => {
			return new FormGroup({
				question: new FormControl(entity.question, Validators.required),
				answer: new FormControl(entity.answer, Validators.required),
				repeatDate: new FormControl(entity.repeatDate, Validators.compose([Validators.required, CustomValidators.dateVaidator])),
				postponeLevel: new FormControl(entity.postponeLevel),
				scores: new FormControl(entity.scores, Validators.required)
			}/*, { updateOn: "blur" }*/);
		});
		this.controls = new FormArray(toGroups);
	}

	public async updateField(index: number, memo: Memo, field: string) {
		const control = this.getControl(index, field);
		console.log(control);

		if (memo[field] == control.value) {
			return;
		}
		if (control.valid) {
			try {
				this.isLoading = true;

				memo[field] = control.value;
				this.message = await this.memoService.updateMemo(memo);
			} catch (error) {
				this.message = new Message(error.message, 'danger');
			} finally {
				this.isLoading = false;
			}
		}
	}

	public getControl(index: number, fieldName: string) {
		return this.controls.at(index).get(fieldName) as FormControl;
	}

	public hide() {
		this.modalRef.hide();
	}
}
