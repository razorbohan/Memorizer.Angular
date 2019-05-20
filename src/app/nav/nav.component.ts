import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddMemoComponent } from '../modals/add/add.component';
import { FindMemoComponent } from '../modals/find/find.component';

@Component({
	selector: 'memo-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent {

	addModalRef: BsModalRef;
	findModalRef: BsModalRef;

	constructor(private modalService: BsModalService) { }

	openAddModal() {
		this.addModalRef = this.modalService.show(AddMemoComponent, { class: 'modal-lg' });
	}

	openFindModal() {
		this.findModalRef = this.modalService.show(FindMemoComponent, { class: 'find-grid' });
	}
}