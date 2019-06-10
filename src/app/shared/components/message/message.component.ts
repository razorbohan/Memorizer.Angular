import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Message } from '../../models/message';
import { fadeAnimation } from '../../animations/fade.animation';

@Component({
  selector: 'alert-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [fadeAnimation]
})
export class MessageComponent implements OnInit {

  constructor() { }

  @Input() message: Message;

  ngOnInit() {
  }

  private hideMessage() {
    this.message = null;
  }
}
