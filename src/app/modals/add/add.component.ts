import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MemoService } from 'src/app/services/memo.service';
import { Memo } from 'src/app/services/memo';

@Component({
  selector: 'memo-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddMemoComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private memoService: MemoService) { }

  ngOnInit() {
  }

  async AddNewMemo(newQuestion: string, newAnswer: string) {
    try {
      let newMemo = new Memo(
        newQuestion,
        newAnswer
      );
      this.isLoading = true;
      this.message = await this.memoService.addMemo(newMemo);
    } catch (error) {
      this.message = error.statusText;
    } finally {
      this.isSuccess = !this.message.startsWith("Error");
      this.isShowMessage = true;
      this.isLoading = false;

      this.bsModalRef.hide()
    }
  }
}