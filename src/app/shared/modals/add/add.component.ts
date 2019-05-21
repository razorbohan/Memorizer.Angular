import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MemoService } from 'src/app/shared/services/memo.service';
import { Memo } from 'src/app/shared/models/memo';
import { Message } from '../../models/message';

@Component({
  selector: 'memo-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddMemoComponent implements OnInit {

  private message: Message;
  private isLoading: boolean;

  constructor(
    private modalRef: BsModalRef,
    private memoService: MemoService) { }

  ngOnInit() {
  }

  async AddNewMemo(newQuestion: any, newAnswer: any) {
    try {
      this.isLoading = true;

      this.message = await this.memoService.addMemo(new Memo(newQuestion.value, newAnswer.value));
    } catch (error) {
      this.message = new Message(error.statusText, 'error');
    } finally {
      this.isLoading = false;
      newQuestion.value = '';
      newAnswer.value = '';
      //this.modalRef.hide();
    }
  }
}