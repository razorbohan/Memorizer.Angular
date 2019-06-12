import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as moment from 'moment';
import { MemoService } from '../../services/memo.service';
import { Memo } from '../../models/memo';

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

	dataSource: MatTableDataSource<Memo>;
	displayedColumns: string[] = ['id', 'question', 'answer', 'repeatDate', 'postponeLevel', 'scores'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private memoService: MemoService,
		private modalRef: BsModalRef
	) { }

	ngOnInit() {
		this.getMemos();
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	async getMemos() {
		try {
			this.isLoading = true;

			let memos = await this.memoService.getMemos();
			memos = memos.slice(0, 100);
			this.dataSource = new MatTableDataSource<Memo>(memos);
		} catch (error) {
			console.error(error.statusText);
			this.message = error.statusText;
		}
		finally {
			this.isLoading = false;
		}
	}

	hide() {
		this.modalRef.hide()
	}
}
