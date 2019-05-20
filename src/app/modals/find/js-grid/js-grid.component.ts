import { Component, OnInit } from '@angular/core';
import { Postpone } from '../../../services/memo';
import { SmartTableDatepickerRenderComponent, SmartTableDatepickerComponent } from '../datapicker/smart-table-datepicker.component';

@Component({
	selector: 'js-grid',
	templateUrl: './js-grid.component.html',
	styleUrls: ['./js-grid.component.scss']
})
export class JsGridComponent implements OnInit {

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
			answer: 'rtg4 liug96t 7yf96f7ygh yg 8yg087 guyfgy uf967 f9yughyh8  08 7g87 gyug 987 f086 gyug uy gu y',
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
		}
	];

	settings = {
		actions: { add: false, edit: true, delete: true, position: 'right' },
		confirmSave: true,
		columns: {
			id: {
				title: 'ID',
				width: '9%',
				editable: false,
			},
			question: {
				title: 'Question',
				type: 'string',
				width: '28%',
				editor: {
					type: 'textarea'
				},
			},
			answer: {
				title: 'Answer',
				type: 'string',
				width: '40%',
			},
			repeatDate: {
				title: 'Repeat date',
				width: '14%',
				type: 'custom',
				renderComponent: SmartTableDatepickerRenderComponent,
				editor: {
					type: 'custom',
					component: SmartTableDatepickerComponent,
				}
			},
			postponeLevel: {
				title: 'LVL',
				width: '8%',
				editor: {
					type: 'list',
					config: {
						list: [{ value: 0, title: 'Zero' }, //TODO: import pospone? 
						{ value: 1, title: 'One' },
						{ value: 2, title: 'Two' },
						{ value: 6, title: 'Three' },
						{ value: 15, title: 'Four' },
						{ value: 40, title: 'Five' },
						{ value: 100, title: 'Six' },
						{ value: 250, title: 'Seven' },
						{ value: 625, title: 'Eight' }]
					}
				},
			},
			scores: {
				title: 'Scores',
				type: 'number',
				width: '1%',
			},
		},
	};


	ngOnInit(): void {
		// { name: "_id", type: "number", title: "ID", align: "center", editing: false, width: 50 },
		// { name: "question", type: "text", title: "Question", align: "center", width: 150 },
		// { name: "answer", type: "text", title: "Answer", align: "center", width: 200 },
		// { name: "repeatDate", type: "date", formatter: "date", title: "Repeat date", align: "center", width: 90 },
		// {
		//     name: "postponeLevel", type: "select", title: "LVL", align: "center", width: 40,
		//     items: postponeLevels, valueField: "Lvl", textField: "Lvl"
		// },
		// { name: "scores", type: "number", title: "Scores", align: "center", width: 65 },
		// { type: "control", width: 52 }
	}

	onDelete(event) {
		console.log(event);
	}

	onSave(event) {
		console.log(event);
		event.newData['name'] += ' + added in code';
	}

	onCreate(event) {
		console.log(event);
		event.newData['name'] += ' + added in code';
	}
}