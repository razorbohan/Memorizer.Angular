import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeTrigger } from '../shared/animations/fade.animation';

@Component({
  selector: 'memo-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeTrigger]
})
export class AuthComponent implements OnInit {

  @HostBinding('@fade') a = true;

  constructor() { }

  ngOnInit() {
  }

}
