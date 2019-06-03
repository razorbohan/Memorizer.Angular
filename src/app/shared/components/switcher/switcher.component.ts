import { Component } from '@angular/core';

@Component({
  selector: 'memo-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent {

  isChecked: boolean = false;

  constructor() { }
}