import { Component, Input, OnChanges } from '@angular/core';
import { Message } from '../../models/message';
import { fadeAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'alert-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [fadeAnimation]
})
export class MessageComponent implements OnChanges {

  canBeClosed: boolean;

  constructor() { }

  @Input() message: Message;

  ngOnChanges() {
    setTimeout(() => this.canBeClosed = true, 1000);
  }

  public hideMessage() {
    if (this.canBeClosed) {
      this.message = null;
      this.canBeClosed = false;
    }
  }
}
