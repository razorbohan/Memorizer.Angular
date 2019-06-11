import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { HttpClient } from '@angular/common/http';

import * as moment from 'moment';

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

	data = [
		{
			id: 1,
			question: 'sdf1',
			answer: 'rtg1',
			repeatDate: '2019-04-25',
			postponeLevel: 250,
			scores: 4,
		},
		{
			id: 2,
			question: 'sdf2',
			answer: 'rtg2',
			repeatDate: '2019-04-26',
			postponeLevel: 100,
			scores: 3,
		},
		{
			id: 3,
			question: 'sdf3',
			answer: 'rtg3',
			repeatDate: '2019-04-27',
			postponeLevel: 2,
			scores: 1,
		},
		{
			id: 4787,
			question: 'sdf4hgh hjh',
			answer: 'rtg4 liug96t 7yf96f7ygh',
			repeatDate: '2019-04-28',
			postponeLevel: 15,
			scores: 15,
		},
		{
			id: 5,
			question: 'sdf5',
			answer: 'rtg5',
			repeatDate: '2019-04-29',
			postponeLevel: 0,
			scores: 0,
		},
		{
			id: 6,
			question: 'adf5',
			answer: 'artg5',
			repeatDate: '2019-04-29',
			postponeLevel: 0,
			scores: 0,
		},
		{
			id: 7,
			question: 'bdf5',
			answer: 'brtg5',
			repeatDate: '2019-04-21',
			postponeLevel: 40,
			scores: 12,
		}
	];
	dataSource = new MatTableDataSource(this.data);
	displayedColumns: string[] = ['id', 'question', 'answer', 'repeatDate', 'postponeLevel', 'scores'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private bsModalRef: BsModalRef,
		private http: HttpClient
	) { }

	ngOnInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	async getMemos() {
		try {
			let response = await this.http.get<ApiResponse>(`${this.baseUrl}/GetMemos`).toPromise();
			if (!response.success)
			//throw response.error;
			{
				reject(response.error);
				return;
			}

			let memos = <Memo[]>response.body;

			this.isLoading = true;
			let response = await this.http.get<ApiResponse>(`${this.baseUrl}/GetMemos`).toPromise();
			this.message = response.toString();
		} catch (error) {
			console.log(error.statusText);
			this.message = error.statusText;
		}
	}
}
