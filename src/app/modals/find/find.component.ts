import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Http } from '@angular/http';

@Component({
	selector: 'memo-find',
	templateUrl: './find.component.html',
	styleUrls: ['./find.component.scss']
})
export class FindMemoComponent implements OnInit {
	message: string;

	constructor(
		public bsModalRef: BsModalRef,
		private http: Http) { }

	ngOnInit() {

	}

	async findMemo(key: string, value: string) {
		try {
			console.log("find!!");

			//this.isoading = true;
			let response = await this.http.get(`/Home/Find/${key}/${value}`).toPromise();
			this.message = response.toString();

			// ShowJsGrid(
			// 	async (filter) => await asyncGet(`/Home/Find/${key}/${value}`),
			// 	(memo) => { asyncPost("/Home/Add", memo); },
			// 	(memo) => { asyncPost("/Home/Update", memo); },
			// 	(memo) => { asyncPost("/Home/Delete/" + memo.id); });

			// $("#findModal").find(".modal-dialog").css("max-width", "90%");
		} catch (error) {
			console.log(error.statusText);
			this.message = error.statusText;
		}
	}
}
