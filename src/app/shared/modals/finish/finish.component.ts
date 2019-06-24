import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'memo-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  mode: string;

  constructor(private modalRef: BsModalRef) { }

  ngOnInit() { }

  hide() {
	this.modalRef.hide();
  }
}
