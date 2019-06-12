import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as moment from 'moment';
import { MemoService } from '../../services/memo.service';
import { Memo } from '../../models/memo';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

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
	message: string;
	isLoading: boolean;

	controls: FormArray;

	dataSource: MatTableDataSource<Memo>;
	displayedColumns: string[] = ['id', 'question', 'answer', 'repeatDate', 'postponeLevel', 'scores'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private memoService: MemoService,
		private modalRef: BsModalRef
	) { }

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

			let memos = await this.memoService.getMemos();
			this.generateFormControls(memos);
			this.dataSource = new MatTableDataSource<Memo>(memos);
		} catch (error) {
			console.error(error.statusText);
			this.message = error.statusText;
		}
		finally {
			this.isLoading = false;
		}
	}

	private generateFormControls(memos: Memo[]) {
		const toGroups = memos.map(entity => {
			return new FormGroup({
				id: new FormControl(entity.id, Validators.required),
				question: new FormControl(entity.question, Validators.required),
				answer: new FormControl(entity.answer, Validators.required),
				repeatDate: new FormControl(entity.repeatDate, Validators.required),
				postponeLevel: new FormControl(entity.postponeLevel, Validators.required),
				scores: new FormControl(entity.scores, Validators.required)
			}, { updateOn: "blur" });
		});
		this.controls = new FormArray(toGroups);
	}

	public updateField(index: number, memo: Memo, field: string) {
		const control = this.getControl(index, field);
		if (control.valid) {
			try {
				this.isLoading = true;
				memo = control.value
				let tt = memo;
				console.log(tt);				
				
				//this.message = await this.memoService.updateMemo(this.currentMemo);
			} catch (error) {
				//this.message = new Message(error.message, 'danger');
			} finally {
				this.isLoading = false;
			}
			//this.core.update(index, field, control.value);
		}
	}

	public getControl(index: number, fieldName: string) {
		return this.controls.at(index).get(fieldName) as FormControl;
	}

	public hide() {
		this.modalRef.hide();
	}
}
