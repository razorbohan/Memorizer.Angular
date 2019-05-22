import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'memo-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public onClose: Subject<boolean>;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public confirm(): void {
    this.onClose.next(true);
    this.modalRef.hide();
  }

  public cancel(): void {
    this.onClose.next(false);
    this.modalRef.hide();
  }
}
